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
      {id: 0, name: 'AF 977', destination: "Libreville", passengers: 23, optIn: 16, problems: 16},
      {id: 1, name: 'AF 5425', destination: "Jerusalem", passengers: 45, optIn: 42, problems: 12},
      {id: 2, name: 'AF 7365', destination: "Hong Kong", passengers: 246, optIn: 8, problems: 1}
    ];

    $scope.problems = [];
    $scope.problems[$scope.flights[0].id] = [
      {id: 0, type: "Délai", passengers: 16, solved: 16},
      {id: 1, type: "Bagage Perdu", passengers: 1, solved: 0},
      {id: 2, type: "Annulation", passengers: 2, solved: 0},
      {id: 3, type: "Report", passengers: 1, solved: 0}
    ];

    $scope.parisCenter = {
      latitude: 48.905636,
      longitude: 2.406023
    };

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
      '<h1 id="thirdHeading" class="marker-heading">M. Pierre Poulpi</h1>'+
      '<div id="bodyContent" class="marker-details">'+
      '<p><b>Dossier BBB222</b><br>' +
      '<b>Vol: </b> AF 977<br>' +
      '<b>Irrégularité: </b> Vol reporté<br>' +
      '<b>Départ: </b> le 28/11/206 à 14h30<br>' +
      '<b>Point de départ: </b> Paris CDG<br>' +
      '<b>Destination: </b> Libreville LBV<br>'+
      '<b>Hotel: </b> Kyriad Gare du Nord<br>'+
      '<b>Numéro: </b><a href="">06 17 63 29 18</a></p>'+
      '<p>Options Activées<br/><a href="">Display</a> <a href="">Sms</a> <a href="">Bot</a> <a href="">Appel</a></p>'+
      '<p><a href="https://www.google.com">Fiche détaillée</a></p>'+
      '<p style="font-size: 13px !important;">Dernière mise à jour: il y a <b>17</b> minutes</p>'+
      '</div>'+
      '</div>';

    var infoWindow = new google.maps.InfoWindow({
      content: contentString
    });


    // all the basics settings (don't need google.map helpers)
    $scope.map = {
      show: true,
      showTraffic: true,
      center: $scope.parisCenter,
      zoom: 11,
      options: {
        streetViewControl: false,
        mapTypeControl: true,
        scaleControl: true,
        rotateControl: true,
        zoomControl: true
      },
      markers: [{
        id: 1,
        latitude: 48.8795288,
        longitude: 2.3535132
      }, {
        id: 2,
        latitude: 49.006299,
        longitude: 2.585805
      }, {
        id: 3,
        latitude: 49.000299,
        longitude: 2.585805
      }, {
        id: 4,
        latitude: 49.006299,
        longitude: 2.584805
      }, {
        id: 5,
        latitude: 49.006299,
        longitude: 2.585805
      }, {
        id: 6,
        latitude: 49.006699,
        longitude: 2.587505
      }, {
        id: 7,
        latitude: 49.005499,
        longitude: 2.580805
      }, {
        id: 8,
        latitude: 49.005599,
        longitude: 2.589805
      }, {
        id: 9,
        latitude: 48.932589,
        longitude: 2.449258
      }, {
        id: 10,
        latitude: 48.930689,
        longitude: 2.455258
      }],
      markersEvents: {
        click: function (marker) {
          console.log('Click marker');
          infoWindow.open($scope.map, marker);
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
