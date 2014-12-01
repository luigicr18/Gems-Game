"use strict";

angular.module("gemsAngularApp").controller('aboutUsController', function($scope, $http){
  $scope.success = "";

  $http.get("api/users").success(function(response) { 
    $scope.success = response.success;
  });
  
  $scope.headingTitle = "About Us Page Gems Game";
});