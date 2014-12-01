'use strict';

angular.module('gemsAngularApp').directive('grid', function(){
  return{
    restrict:'E',
    replace:true,
    transclude:true,
    templateUrl : './angular/views/templates/directives/gemBox.html',
    controller: 'gridControllerAn'
  }
});

/*angular.module('gemsAngularApp').directive('switchelements', function(){
  return{
    restrict:'A',
    link: function(scope, element, attr){
            console.log('call switchelements function');
    }
  }
});*/





