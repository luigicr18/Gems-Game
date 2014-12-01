'use strict';

var gemsAngularApp = angular.module('gemsAngularApp', ['ngRoute']);

angular.module("gemsAngularApp").service('gemsService', function(){
    this.gameAnState="pick";
    this.selectedAnRow=-1;
    this.selectedAnCol=-1;
    this.posAnX=-1;
    this.posAnY=-1;
    this.gemSwitch1=-1;
    this.gemSwitch2=-1;
});

