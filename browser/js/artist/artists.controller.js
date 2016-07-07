juke.controller('ArtistCtrl', function (ArtistFactory, $rootScope, $log, $scope) {
  $rootScope.$on('showAllArtists', function () {
    console.log('here');
    $scope.showArtists = true;
    ArtistFactory.fetchAll()
    .then(function (artists) {
      $scope.artists = artists;
    })
    .catch($log.error);
  });

  $scope.showOneArtist = function(artistId) {
    $scope.showArtists = false
    $scope.showArtist = true
    console.log(artistId)
    $scope.artists.forEach(function(artist) {
      if (artist.id === artistId) {
        $scope.artist = artist
      }
    })
    console.log($scope.artist)
  }
});
