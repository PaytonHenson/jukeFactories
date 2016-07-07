'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

  $scope.currentSong;
  $scope.playing = false;

  // main toggle
  $scope.toggle = function () {
    if (PlayerFactory.isPlaying()) {
      PlayerFactory.pause();
    } else {
      PlayerFactory.resume();
    }
  }

  $scope.getCurrentSong = PlayerFactory.getCurrentSong

  $scope.isPlaying = PlayerFactory.isPlaying

  $scope.pause = PlayerFactory.pause

  $scope.play = PlayerFactory.start

  $scope.next = PlayerFactory.next

  $scope.prev = PlayerFactory.previous

  $scope.progress = PlayerFactory.getProgress;

  function seek (decimal) {
    audio.currentTime = audio.duration * decimal;
  }

  $scope.handleProgressClick = function (evt) {
    seek(evt.offsetX / evt.currentTarget.scrollWidth);
  };

});
