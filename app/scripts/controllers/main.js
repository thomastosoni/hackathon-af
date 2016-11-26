'use strict';

/**
 * @ngdoc function
 * @name hackathonAf2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hackathonAf2App
 */
angular.module('hackathonAf2App')
  .controller('MainCtrl', ['$scope', '$log', 'uiGmapGoogleMapApi', function ($scope, $log, uiGmapGoogleMapApi) {

    // Data Init
    $scope.selectedFlight = false;
    $scope.flights = [
      {id: 0, name: 'AF 1536', passengers: 23, optIn: 16, problems: 16},
      {id: 1, name: 'AF 5425', passengers: 45, optIn: 42, problems: 12},
      {id: 2, name: 'AF 7365', passengers: 56, optIn: 8, problems: 1}
    ];

    $scope.problems = [];
    $scope.problems[$scope.flights[0].id] = [
      {id: 0, type:"Délai", passengers: 16, solved: 16},
      {id: 1, type:"Bagage Perdu", passengers: 1, solved: 0},
      {id: 2, type:"Annulation", passengers: 2, solved: 0}
    ];

    $scope.listProblems = false;


    $scope.$watch('selectedFlight', function (flight) {
      if (flight !== undefined) {
        $scope.flight = $scope.flights[flight];
        $scope.problem = $scope.problems[flight];
      }
    });

    // all the basics settings (don't need google.map helpers)
    $scope.map = {
      show: true,
      showTraffic: true,
      center: {
        latitude: 48.8591778,
        longitude: 2.3155471
      },
      zoom: 12,
      options: {
        streetViewControl: false,
        mapTypeControl: true,
        scaleControl: true,
        rotateControl: true,
        zoomControl: true
      },
      markers: [],
      events: {
        click: function (map, eventName, originalEventArgs) {
          var e = originalEventArgs[0];
          var lat = e.latLng.lat(), lon = e.latLng.lng();
          var marker = {
            id: Date.now(),
            coords: {
              latitude: lat,
              longitude: lon
            }
          };
          $scope.map.markers.push(marker);
          console.log($scope.map.markers);
          $scope.$apply();
        }
      }
    };

    $scope.onClick = function (data) {
      $scope.windowOptions.show = !$scope.windowOptions.show;
      console.log('$scope.windowOptions.show: ', $scope.windowOptions.show);
      console.log('This is a ' + data);
      //alert('This is a ' + data);
    };

    $scope.closeClick = function () {
      $scope.windowOptions.show = false;
    };


    uiGmapGoogleMapApi.then(function () {
      // You can now merge your options which need google.map helpers
      angular.merge($scope.map, {
        options: {
        //   mapTypeId: google.MapTypeId.ROADMAP,
        //   zoomControlOptions: {
        //     style: google.maps.ZoomControlStyle.LARGE,
        //     position: google.maps.ControlPosition.LEFT_CENTER
        //   }
        }
      });
    })
  }]);
