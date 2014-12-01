angular
  .module("gemsAngularApp", ['ngRoute'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider

       .when('/', {
           templateUrl: "./angular/views/templates/home.html",
           controller  :  'indexController'
       })

       .when('/about_us', {
           templateUrl: "./angular/views/templates/about_us.html",
           controller  :  'aboutUsController'
       })

       .when('/gemsgame', {
           templateUrl: "./angular/views/templates/gemsgame.html",
           controller  :  'gemsgameController'
       })

       .when('/gemsgameAngular', {
           templateUrl: "./angular/views/templates/gemsgameAngular.html",
           controller  :  'gemsgameAngularController'
       })

  });
;