gemsAngularApp.config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider
      // route for the home page
      .when('/', {
          templateUrl : '../views/index.html'
      })

      .when('/index', {
          templateUrl : '../views/index.html'
      })

      // route for the about page
      .when('/about', {
          templateUrl : 'pages/about.html',
          controller  : 'aboutController'
      })

      // route for the contact page
      .when('/contact', {
          templateUrl : 'pages/contact.html',
          controller  : 'contactController'
      });
});