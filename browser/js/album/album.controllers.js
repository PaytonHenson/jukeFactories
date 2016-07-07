'use strict';

juke.factory('StatsFactory', function ($q) {
  var statsObj = {};
  statsObj.totalTime = function (album) {
    var audio = document.createElement('audio');
    return $q(function (resolve, reject) {
      var sum = 0;
      var n = 0;
      function resolveOrRecur () {
        if (n >= album.songs.length) resolve(sum);
        else audio.src = album.songs[n++].audioUrl;
      }
      audio.addEventListener('loadedmetadata', function () {
        sum += audio.duration;
        resolveOrRecur();
      });
      resolveOrRecur();
    });
  };
  return statsObj;
});

juke.controller('AlbumCtrl', function ($scope, $rootScope, $log, StatsFactory, AlbumFactory, PlayerFactory) {

    $rootScope.$on('showAlbums', function() {
      $scope.showAlbum = false
    })

    $rootScope.$on('showAlbum', function(event, album) {

      $scope.showAlbum = true

      album.imageUrl = '/api/albums/' + album.id + '/image';
      album.songs.forEach(function (song, i) {
        song.audioUrl = '/api/songs/' + song.id + '/audio';
        song.albumIndex = i;
      });

      $scope.album = album;

      StatsFactory.totalTime(album)
      .then(function (time) {
        $scope.duration = Math.floor(time / 60) + " minutes";
      });

      $rootScope.$on()

    })

    $rootScope.$on('showAllArtists', function () {
      $scope.showAlbum = false;
    })

  // main toggle
  $scope.toggle = function(song, songList) {
    if (PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
      PlayerFactory.pause();
    } else if (!PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
      PlayerFactory.resume();
    }
    else PlayerFactory.start(song, songList);
  }

  $scope.isCurrentSong = PlayerFactory.isCurrentSong

  $scope.isPlaying = PlayerFactory.isPlaying
});

juke.factory('AlbumFactory', function ($http, $log) {

  var albumObj = {};

  albumObj.fetchAll = function () {
    return $http.get('/api/albums').then(function (res) {
      return res.data;
    })
    .catch($log.error);
  };

  albumObj.fetchById = function (id) {
    return $http.get('/api/albums/' + id).then(function (res) {
      return res.data;
    }).catch($log.error);
  };

  return albumObj;

});
