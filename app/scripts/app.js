'use strict';

/**
 * @ngdoc overview
 * @name hackathonAf2App
 * @description
 * # hackathonAf2App
 *
 * Main module of the application.
 */
angular
  .module('hackathonAf2App', [
    'ui.bootstrap',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'uiGmapgoogle-maps'
  ])
  .config(function ($routeProvider, uiGmapGoogleMapApiProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });

    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyDwOkAE192ztiUqisxVKjAY-fcoz7pQ3Ug',
      v: '3.20',
      libraries: 'weather,geometry,visualization'
    });


  });
