"use strict";

angular.module("gemsAngularApp").controller('gridController', function($scope){
  
  function callSomeFunction(){
    console.log('callsome');
  }

  $scope.gems = [];
  var gameState="pick";
  var selectedRow=-1
  var selectedCol=-1
  var posX;
  var posY;
  var gemSwitch1;
  var gemSwitch2;

    
      var gem = {};
      var gemId = "gem_" + i + "_" + j;
      var gemTop = ((i*60)+10);
      var gemLeft = ((j*60)+10);
      var bgColor = getBackgroundColor();
      gem.id = gemId;
      gem.style = "top:" + gemTop +  "px;" + "left:" + gemLeft +"px;width:50px;height:50px;position:absolute;border:1px solid white;cursor:pointer;background-color:" + bgColor;
      $scope.gems.push(gem)
    }
  }

  $scope.clickGem = function(gem){
    //console.log('Click gem: ' + gem);
    if(gameState=="pick"){ 
      posY=angular.element('#'+ gem).position().top;
      posX=angular.element('#'+ gem).position().left;
      //console.log('PosX: ' + posX + ' PosY:' + posY);
      //$("#marker").show();
      //$("#marker").css("top",posY).css("left",posX);
      if(selectedRow==-1){
        selectedRow= Math.round((posY-10)/60);
        selectedCol= Math.round((posX-10)/60);
        gemSwitch1 = gem;
        //angular.element('#'+ gem).attr('switchEl','');
      }
      else{
        posY=Math.round((posY-10)/60);
        posX=Math.round((posX-10)/60);
        //angular.element('#'+ gem).attr('switchEl','');
       if((Math.abs(selectedRow-posY)==1 && selectedCol==posX)||(Math.abs(selectedCol-posX)==1 && selectedRow==posY)){
          //$("#marker").hide();
          gemSwitch2 = gem;
          gameState="switch";
          gemSwitch();
        }
        else{
          selectedRow=posY;
          selectedCol=posX;
          gemSwitch1 = gem;
        }
      }
    }
    //console.log(gameState + " gemSwitch1: " + gemSwitch1 + " gemSwitch2:" + gemSwitch2);
  }

  function gemSwitch(){
    //console.log("arrgem00: " + $scope.gems[0].id + " arrgem01:" + $scope.gems[1].id);
    //console.log("gemSwitch1: " + gemSwitch1 + " gemSwitch2:" + gemSwitch2); 
    console.log("completeStyle: " + angular.element('#'+ gemSwitch1).style);
    posY = Math.round(angular.element('#'+ gemSwitch2).position().top);
    posX = Math.round(angular.element('#'+ gemSwitch2).position().left);
    selectedRow = Math.round(angular.element('#'+ gemSwitch1).position().top);
    selectedCol = Math.round(angular.element('#'+ gemSwitch1).position().left);
    angular.element('#'+ gemSwitch1).y = posY;
    angular.element('#'+ gemSwitch1).x = posX;
    angular.element('#'+ gemSwitch2).y = selectedRow;
    angular.element('#'+ gemSwitch2).x = selectedCol;
    var tempGem = gemSwitch1;
    gemSwitch1 = gemSwitch2;
    gemSwitch2 = tempGem;
    console.log("gemSwitch1: " + gemSwitch1 + " gemSwitch2:" + gemSwitch2); 
    console.log("arrgem00: " + $scope.gems[0].id + " arrgem01:" + $scope.gems[1].id); 

    /*console.log("gemSwitch1: " + gemSwitch1 + " gemSwitch2:" + gemSwitch2); 
    angular.element('#'+ gemSwitch1).attr('switchelements','');
    angular.element('#'+ gemSwitch2).attr('switchelements',''); */
  }

  function getBackgroundColor(){
    var bgColors=new Array("magenta","mediumblue","yellow","lime","cyan","orange","crimson","purple");
    var randomValue = Math.floor(Math.random()*8); 
    return bgColors[randomValue];
  }
});


