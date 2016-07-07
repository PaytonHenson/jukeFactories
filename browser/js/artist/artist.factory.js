juke.factory('ArtistFactory', function ($rootScope, $http, $log) {

  var artistObj = {};

  artistObj.fetchAll = function () {
    return $http.get('/api/artists')
    .then(function (res) {
      return res.data;
    })
    .catch($log.error);
  };

  return artistObj;
});
