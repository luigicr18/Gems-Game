"use strict";

angular.module("gemsAngularApp")
.service('gemsService', function(){
    this.gameAnState="pick";
    this.selectedAnRow=-1;
    this.selectedAnCol=-1;
    this.posAnX=-1;
    this.posAnY=-1;
    this.gemSwitch1=-1;
    this.gemSwitch2=-1;
    this.gemSwitch1Color=-1;
    this.gemSwitch2Color=-1;
    this.movingItems=0;
    this.isFirstPick=true;
    return this
})
.controller('gemSelectedController', ['$scope', '$element', '$timeout','gemsService', function($scope, $element, $timeout,gemsService){

  //console.log(gemsService.selectedAnRow)

  $scope.clickAngularGem = function(gem){
    if(gemsService.gameAnState=="pick"){ 
      gemsService.posAnY=angular.element('#'+ gem).position().top;
      gemsService.posAnX=angular.element('#'+ gem).position().left;
      if(gemsService.isFirstPick){
        gemsService.isFirstPick = false;
        gemsService.selectedAnRow= Math.round((gemsService.posAnY-10)/60);
        gemsService.selectedAnCol= Math.round((gemsService.posAnX-10)/60);
        gemsService.gemSwitch1 = gem;
      }
      else{
        gemsService.posAnY=Math.round((gemsService.posAnY-10)/60);
        gemsService.posAnX=Math.round((gemsService.posAnX-10)/60);
       if((Math.abs(gemsService.selectedAnRow-gemsService.posAnY)==1 && gemsService.selectedAnCol==gemsService.posAnX)||(Math.abs(gemsService.selectedAnCol-gemsService.posAnX)==1 && gemsService.selectedAnRow==gemsService.posAnY)){
          gemsService.gemSwitch2 = gem;
          gemsService.gameAnState="switch";
          gemAnSwitch();
       }
       else{
         gemsService.selectedAnRow=gemsService.posAnY;
         gemsService.selectedAnCol=gemsService.posAnX;
         gemsService.gemSwitch1 = gem;
       }
     }
    }
  }

  function gemAnSwitch(){
  /*  var tempX = $scope.shapes[gemsService.gemSwitch1].x;
    var tempY = $scope.shapes[gemsService.gemSwitch1].y;
    //var tempColor = $scope.shapes[gemsService.gemSwitch1].color;
    var tempGem = $scope.jewelsAn[gemsService.selectedAnRow][gemsService.selectedAnCol];

    console.log('Gem 1 coordinates- X:' + $scope.shapes[gemsService.gemSwitch1].x + "Y:" + $scope.shapes[gemsService.gemSwitch1].y);
    console.log('Gem 2 coordinates- X:' + $scope.shapes[gemsService.gemSwitch2].x + "Y:" + $scope.shapes[gemsService.gemSwitch2].y);
    $scope.shapes[gemsService.gemSwitch1].x = $scope.shapes[gemsService.gemSwitch2].x;
    $scope.shapes[gemsService.gemSwitch1].y = $scope.shapes[gemsService.gemSwitch2].y;
    gemsService.gemSwitch1Color = $scope.shapes[gemsService.gemSwitch2].color;
    gemsService.gemSwitch2Color = $scope.shapes[gemsService.gemSwitch1].color;
    $scope.shapes[gemsService.gemSwitch2].x = tempX;
    $scope.shapes[gemsService.gemSwitch2].y = tempY;
    //$scope.shapes[gemsService.gemSwitch2].color = tempColor;

    $scope.jewelsAn[gemsService.selectedAnRow][gemsService.selectedAnCol] = $scope.jewelsAn[gemsService.posAnY][gemsService.posAnX];
    $scope.jewelsAn[gemsService.posAnY][gemsService.posAnX] = tempGem;
    if(gameState!="revert"){
      checkAnMoving();
    }*/
    var yOffset= gemsService.selectedAnRow-gemsService.posAnY;
    var xOffset= gemsService.selectedAnCol-gemsService.posAnX;
    var tempGem = $scope.jewelsAn[gemsService.selectedAnRow][gemsService.selectedAnCol];
    var dirValue = -1;
    if (gemsService.gameAnState == "switch"){
      angular.element("#"+((gemsService.selectedAnRow * 8 )+gemsService.selectedAnCol)).addClass("switch").attr("dir","-1");
      angular.element("#"+((gemsService.posAnY * 8 )+gemsService.posAnX)).addClass("switch").attr("dir","1");
    }
    else if (gemsService.gameAnState == "revert")
    {
      angular.element("#"+((gemsService.selectedAnRow * 8 )+gemsService.selectedAnCol)).removeAttr("dir");
      angular.element("#"+((gemsService.posAnY * 8 )+gemsService.posAnX)).removeAttr("dir");

      angular.element("#"+((gemsService.selectedAnRow * 8 )+gemsService.selectedAnCol)).attr("dir","1");
      angular.element("#"+((gemsService.posAnY * 8 )+gemsService.posAnX)).attr("dir","-1");
    }
    angular.forEach(angular.element(".switch"), function(gemElement){
      gemsService.movingItems++;
      var moves = 10;
      var times = 0;
      var ticker = function(){  
        if( times < 6 )
        {
          times++;
          $scope.shapes[gemElement.id].x += (xOffset*moves*(gemElement.attributes["dir"].value));
          $scope.shapes[gemElement.id].y += (yOffset*moves*(gemElement.attributes["dir"].value));
          $timeout(ticker, 100);
        }
      }
      $timeout(ticker, 100)
    });

    $scope.jewelsAn[gemsService.selectedAnRow][gemsService.selectedAnCol] = $scope.jewelsAn[gemsService.posAnY][gemsService.posAnX];
    $scope.jewelsAn[gemsService.posAnY][gemsService.posAnX] = tempGem;
    checkAnMoving();
    $timeout(removeClass, 2000);
    console.log("movingItems: " + gemsService.movingItems);
  }

  function callTimeoutComplete(){
    console.log("Finish time out");
  }

  function removeClass(){
    angular.element("#"+((gemsService.selectedAnRow * 8 )+gemsService.selectedAnCol)).removeClass("switch").removeAttr("dir");
    angular.element("#"+((gemsService.posAnY * 8 )+gemsService.posAnX)).removeClass("switch").removeAttr("dir");
  }

  function removeAnGems(row,col){
    var gemValue = $scope.jewelsAn[row][col];
    var tmp = row;
    angular.element("#"+((row*8) +col)).addClass("gemRemove");
    if(isAnVerticalStreak(row,col)){
      while(tmp>0 && $scope.jewelsAn[tmp-1][col]==gemValue){                          
        angular.element("#"+((tmp*8)+col)).addClass("gemRemove");
        $scope.jewelsAn[tmp-1][col]=-1;
        tmp--;
      }
      tmp=row;
      while(tmp<7 && $scope.jewelsAn[tmp+1][col]==gemValue){
        angular.element("#"+((tmp*8)+col)).addClass("gemRemove");
        $scope.jewelsAn[tmp+1][col]=-1;
        tmp++;
      }
    }
    if(isAnHorizontalStreak(row,col)){
      tmp = col;
      while(tmp>0 && $scope.jewelsAn[row][tmp-1]==gemValue){
        angular.element("#"+((row*8)+(tmp-1))).addClass("gemRemove");
        $scope.jewelsAn[row][tmp-1]=-1;
        tmp--;
      }
      tmp=col;
      while(tmp<7 && $scope.jewelsAn[row][tmp+1]==gemValue){
        angular.element("#"+((row*8)+(tmp+1))).addClass("gemRemove");
        $scope.jewelsAn[row][tmp+1]=-1;
        tmp++;
      }
    }
    jewelsAn[row][col]=-1;
  }

  function checkAnMoving(){
  //movingItems--;
  //if(movingItems==0){
    switch(gemsService.gameAnState){
      case "revert":
      case "switch":{
        if(!isAnStreak(gemsService.selectedAnRow,gemsService.selectedAnCol) && !isAnStreak(gemsService.posAnY,gemsService.posAnX)){
          if(gemsService.gameAnState!="revert"){
            gemsService.gameAnState="revert";
            var testTimeout =  $timeout(function(){gemAnSwitch();}, 700).then(callTimeoutComplete());
          }
          else{
            gemsService.gameAnState="pick";
            gemsService.isFirstPick=true;
          }
        }
        else{
          gemsService.gameAnState="remove";
          if(isAnStreak(gemsService.selectedAnRow,gemsService.selectedAnCol)){
            //removeAnGems(gemsService.selectedAnRow,gemsService.selectedAnCol);
          }
          if(isAnStreak(gemsService.posAnY,gemsService.posAnX)){
            //removeAnGems(gemsService.posAnY,gemsService.posAnX);
          }
          //gemFade();
        }
        //removeClass();
        break;
        }
      case "remove":
        //checkFalling();
        break;
      case "refill":
        //placeNewGems();
        break;
      }
  //}
  }

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

}]);