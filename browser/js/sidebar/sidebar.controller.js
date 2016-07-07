juke.controller('SidebarCtrl', function($scope, $rootScope, $log) {
  $scope.viewAlbums = function() {
    $rootScope.$broadcast('showAlbums')
  }
  $scope.viewAllArtists = function () {
    $rootScope.$broadcast('showAllArtists');
  }
})
