"use strict";

var app = angular.module('hackathonAf2App');

app.controller('BotController', ['$scope', 'close', function($scope, close) {

  $scope.close = function(result) {
    close(result, 500); // close, but give 500ms for bootstrap to animate
  };

}]);
