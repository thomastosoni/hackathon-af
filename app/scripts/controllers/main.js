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
      {id: 0, type: "Délai", passengers: 16, solved: 16},
      {id: 1, type: "Bagage Perdu", passengers: 1, solved: 0},
      {id: 2, type: "Annulation", passengers: 2, solved: 0}
    ];

    $scope.listProblems = false;


    $scope.$watch('selectedFlight', function (flight) {
      if (flight !== undefined) {
        $scope.flight = $scope.flights[flight];
        $scope.problem = $scope.problems[flight];
      }
    });

    var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="thirdHeading" class="marker-heading">M. François Dupont</h1>'+
      '<div id="bodyContent" class="marker-details">'+
      '<p>' +
      '<b>Vol: </b> AF 1536<br>' +
      '<b>Irrégularité: </b> Vol retardé<br>' +
      '<b>Temps de retard: </b> 3h<br>' +
      '<b>Point de départ: </b> Paris<br>' +
      '<b>Destination: </b> Jérusalem</p>'+
      '<p>Actions Disponibles<br/><a href="">Display</a> <a href="">Email </a> <a href="">Sms</a> <a href="">Bot</a> <a href="">Appel</a></p>'+
      '<p><a href="https://www.google.com">Fiche détaillée</a></p>'+
      '</div>'+
      '</div>';

    var infowindow = new google.maps.InfoWindow({
      content: contentString
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
      markers: [{
        id: 1,
        latitude: 48.8591778,
        longitude: 2.3155471

      }, {
        id: 2,
        latitude: 39.5925511,
        longitude: 2.633202
      }],
      markersEvents: {
        click: function (marker) {
          console.log('Click marker');
          infowindow.open($scope.map, marker);
        }
      },
      window: {
        marker: {},
        show: false,
        closeClick: function () {
          // this.show = false;
        },
        options: {}
      }
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
