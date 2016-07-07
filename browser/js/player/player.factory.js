'use strict';

juke.factory('PlayerFactory', function($rootScope){
  // non-UI logic in here
  var audio = document.createElement('audio');
  var playing = false;
  var currentSong = null;
  var songs = null;
  var progress = 0;

  console.log(songs)

  function mod (num, m) { return ((num % m) + m) % m; };

  function skip (interval) {
    if (!currentSong) return;
    var index = songs.indexOf(currentSong);
    index = mod( (index + (interval || 1)), songs.length );
    currentSong = songs[index];
    if (playing) factoryObj.start(currentSong, songs);
    if (!playing) {
      audio.src = currentSong.audioUrl;
      audio.load();
    }
  }

  function seek (decimal) {
    audio.currentTime = audio.duration * decimal;
  }



  audio.addEventListener('ended', function () {
    factoryObj.next();
    // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
    $rootScope.$evalAsync(); // likely best, schedules digest if none happening
  });

  audio.addEventListener('timeupdate', function () {
    progress = audio.currentTime / audio.duration;
    // $scope.$digest(); // re-computes current template only (this scope)
    $rootScope.$evalAsync(); // likely best, schedules digest if none happening
  });


  var factoryObj = {};

  factoryObj.start = function (song, songList) {
    songs = songList;
    // stop existing audio (e.g. other song) in any case
    factoryObj.pause();
    playing = true;
    // resume current song
    //if (song === currentSong) return audio.play();
    // enable loading new song
    currentSong = song;
    audio.src = song.audioUrl;
    audio.load();
    audio.play();
  }

  factoryObj.pause = function() {
    playing = false;
    audio.pause();
  }

  factoryObj.resume = function() {
    audio.play();
    playing = true;
  }

  factoryObj.isPlaying = function() {
    return playing
  }

  factoryObj.getCurrentSong = function () {
    return currentSong;
  }

  factoryObj.next = function () {
    skip(1);
  }

  factoryObj.previous = function () {
    skip(-1);
  }

  factoryObj.getProgress = function () {
    return progress;
  }

  // factoryObj.toggle = function(song, songList) {
  //   if (playing && song === currentSong) {
  //     factoryObj.pause()
  //   } else if (!playing && song === currentSong) {
  //     factoryObj.resume()
  //   }
  //   else factoryObj.start(song, songList)
  // }

  factoryObj.isCurrentSong = function(song) {
    return song === currentSong
  }
  return factoryObj;
});

