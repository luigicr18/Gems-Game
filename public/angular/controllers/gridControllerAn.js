"use strict";

angular.module("gemsAngularApp")
.controller('gridControllerAn', function($scope){

  //console.log(gemsService.selectedAnRow + " - " + gemsService.selectedAnCol);
  $scope.shapes = [];
  $scope.jewelsAn=new Array();
  var bgColors = new Array("magenta","mediumblue","yellow","lime","cyan","orange","crimson","purple");
  

  for(var i=0; i < 8; i++){
    $scope.jewelsAn[i]=new Array();
    for(var j=0; j < 8; j++){
      $scope.jewelsAn[i][j]=-1;
    }
  }

  for(var i=0; i < 8; i++){
    for(var j=0; j < 8; j++){
      do{
        var randomValue = Math.floor(Math.random()*8);
        $scope.jewelsAn[i][j] = randomValue;
      }while(isAnStreak(i,j));
        $scope.shapes.push(buildParamBox(i,j,$scope.jewelsAn[i][j]));
    }
  }

  //gemsService.selectedAnRow = -1;
  //gemsService.selectedAnCol = -1;

  function buildParamBox (i,j,randomValue) {
    return {
      color     : (bgColors[randomValue]).toString(16),
      colorVal  : randomValue,
      x         : ((j*60)+10),
      y         : (i*60)+10,
      gemid     : ((i*8) +j)
    };
  };

  function isAnVerticalStreak(row,col){
    var gemValue=$scope.jewelsAn[row][col];
    var streak=0;
    var tmp=row;
    while(tmp>0 && $scope.jewelsAn[tmp-1][col]==gemValue){
      streak++;
      tmp--;
    }
    tmp=row;
    while(tmp<7 && $scope.jewelsAn[tmp+1][col]==gemValue){
      streak++;
      tmp++;
    }
    return streak>1;
  }

  function isAnHorizontalStreak(row,col){
    var gemValue=$scope.jewelsAn[row][col];
    var streak=0;
    var tmp=col;
    while(tmp>0 && $scope.jewelsAn[row][tmp-1]==gemValue){
      streak++;
      tmp--;
    }
    tmp=col;
    while(tmp<7 && $scope.jewelsAn[row][tmp+1]==gemValue){
      streak++;
      tmp++;
    }
    return streak>1;
  }

  function isAnStreak(row,col){
    return isAnVerticalStreak(row,col)||isAnHorizontalStreak(row,col);
  }

});


angular.module("gemsAngularApp").directive('isSelected', function(){
 return{
    restrict:'A',
    controller: 'gemSelectedController'
 } 
});