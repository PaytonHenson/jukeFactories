juke.controller('AlbumsCtrl', function ($scope, $rootScope, AlbumFactory, $log) {
  AlbumFactory.fetchAll()
  .then(function (albums) {
    $scope.albums = albums;
    albums.forEach(function (album) {
      album.imageUrl = '/api/albums/' + album.id + '/image';
      album.songs.forEach(function (song, i) {
        song.audioUrl = '/api/songs/' + song.id + '/audio';
        song.albumIndex = i;
      });
    });
  }).catch($log.error);

  $scope.showAlbums = true

  $rootScope.$on('showAlbums', function() {
    $scope.showAlbums = true
  })

  $rootScope.$on('showAllArtists', function () {
    $scope.showAlbums = false
  })

  $scope.showOneAlbum = function(album) {
    $scope.showAlbums = false
    $rootScope.$broadcast('showAlbum', album)
  }
});
