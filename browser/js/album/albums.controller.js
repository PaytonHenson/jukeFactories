juke.controller('AlbumsCtrl', function ($scope, AlbumFactory, $log) {
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
});
