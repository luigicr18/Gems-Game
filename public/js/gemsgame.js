var selectedRow=-1
var selectedCol=-1
var posX;
var posY;
var jewels=new Array();
var jewelsTemp=new Array();
var movingItems=0;
var gameState="pick";
var bgColors=new Array("magenta","mediumblue","yellow","lime","cyan","orange","crimson","purple");

function clickGem(gemSelected){
  if(gameState=="pick"){ 
    posY=$(gemSelected).position().top;
    posX=$(gemSelected).position().left;
    $("#marker").show();
    $("#marker").css("top",posY).css("left",posX);
    if(selectedRow==-1){
      selectedRow= Math.round((posY-10)/60);
      selectedCol= Math.round((posX-10)/60);
    }
    else{
      posY=Math.round((posY-10)/60);
      posX=Math.round((posX-10)/60);
     if((Math.abs(selectedRow-posY)==1 && selectedCol==posX)||(Math.abs(selectedCol-posX)==1 && selectedRow==posY)){
        $("#marker").hide();
        gameState="switch";
        gemSwitch();
      }
      else{
        selectedRow=posY;
        selectedCol=posX;
      }
    }
  }
}

function hasAvailVerticalMoves(row,col){
  var gemValue=jewelsTemp[row][col];
  var streak=0;
  var tmp=row;
  while(tmp>0 && jewelsTemp[tmp-1][col]==gemValue){
    streak++;
    tmp--;
  }
  tmp=row;
  while(tmp<7 && jewelsTemp[tmp+1][col]==gemValue){
    streak++;
    tmp++;
  }
  return streak>=2;
}

function hasAvailHorizontalMoves(row,col){
  var gemValue=jewelsTemp[row][col];
  var streak=0;
  var tmp=col;
  while(tmp>0 && jewelsTemp[row][tmp-1]==gemValue){
    streak++;
    tmp--;
  }
  tmp=col;
  while(tmp<7 && jewelsTemp[row][tmp+1]==gemValue){
    streak++;
    tmp++;
  }
  return streak>=2;
}

function hasMovesAvailable(rowOrgPos,colOrgPos,rowNewPos,colNewPos){
  changeTemporalValues(rowOrgPos,colOrgPos,rowNewPos,colNewPos);
  var hasMoves = hasAvailVerticalMoves(rowOrgPos,colOrgPos)||hasAvailHorizontalMoves(rowOrgPos,colOrgPos)||hasAvailVerticalMoves(rowNewPos,colOrgPos)||hasAvailHorizontalMoves(rowNewPos,colNewPos);
  changeTemporalValues(rowOrgPos,colOrgPos,rowNewPos,colNewPos);
  return hasMoves;
}

function changeTemporalValues(orgTempPosX, orgTempPosY, newTempPosX, newTempPosY){
  var tmpValue = jewelsTemp[newTempPosX][newTempPosY]
  jewelsTemp[newTempPosX][newTempPosY] = jewelsTemp[orgTempPosX][orgTempPosY];
  jewelsTemp[orgTempPosX][orgTempPosY] = tmpValue;
}

function validateCorners(i,j){
  switch(i){
    case 0:{
      switch(j){
        case 0:{
          if((!hasMovesAvailable(i,j,i+1,j)) && (!hasMovesAvailable(i,j,i,j+1))){
            return false;
          }
          break;
        }
        case 7:{
          if((!hasMovesAvailable(i,j,i,j-1)) && (!hasMovesAvailable(i,j,i+1,j))){
            return false;
          }
          break;   
        }
      }
      break;
    }
    case 7:{
      switch(j){
        case 0:{
          if((!hasMovesAvailable(i,j,i-1,j)) && (!hasMovesAvailable(i,j,i,j+1))){
            return false;
          }
          break;
        }
        case 7:{
          if((!hasMovesAvailable(i,j,i,j-1)) && (!hasMovesAvailable(i,j,i-1,j))){
            return false;
          }
          break;   
        }
      }
    }
  }
  return true;
}

function validateTopBottom(i,j){
  if( i == 0){
    if((!hasMovesAvailable(i,j,i,j-1)) && (!hasMovesAvailable(i,j,i+1,j)) && (!hasMovesAvailable(i,j,i,j+1)))
      return false;
  }
  else{
    if((!hasMovesAvailable(i,j,i,j-1)) && (!hasMovesAvailable(i,j,i-1,j)) && (!hasMovesAvailable(i,j,i,j+1)))
      return false;
  }
  return true;
}

function validateLRRows(i,j){
  if( j == 0){
   if((!hasMovesAvailable(i,j,i-1,j)) && (!hasMovesAvailable(i,j,i,j+1)) && (!hasMovesAvailable(i,j,i+1,j)))
      return false; 
  }
  else{
   if((!hasMovesAvailable(i,j,i-1,j)) && (!hasMovesAvailable(i,j,i,j-1)) && (!hasMovesAvailable(i,j,i+1,j)))
      return false; 
  }
  return true;
}

function validateSingleRow(i,j){
  if((!hasMovesAvailable(i,j,i-1,j)) && (!hasMovesAvailable(i,j,i,j+1)) && (!hasMovesAvailable(i,j,i+1,j)) && (!hasMovesAvailable(i,j,i,j-1)))
    return false;
  return true;
}

function hasMoreMoves(){
  for(i=0;i<8;i++){
    for(j=0;j<8;j++){
      //Special validation if is a corner
      if((i == 0 && j == 0) || (i == 7 && j == 0) ||  (i == 0 && j == 7) || (i == 7 && j == 7)){ 
        if (validateCorners(i,j))
          return true;
      }
      //Special validation  if not is a corner, but a gem is on top or bottom
      else if((i == 0 && ( j > 0 && j < 7 )) || (i == 7  && ( j > 0 && j < 7 ))){
        if (validateTopBottom(i,j))
          return true;
      }
      //Special validation if a gem is at left or right of the matrix
      else if((j == 0 && ( i > 0 && i < 7 )) || (j == 7  && ( i > 0 && i < 7 ))){
        if (validateLRRows(i,j))
          return true;
      }
      //Single row has to validate all his neighboards
      else{
        if (validateSingleRow(i,j))
          return true;
      }
    }
  }
  return false;
}

function checkMoving(){
  movingItems--;
  if(movingItems==0){
    switch(gameState){
      case "revert":
      case "switch":
        if(!isStreak(selectedRow,selectedCol) && !isStreak(posY,posX)){
          if(gameState!="revert"){
            gameState="revert";
            gemSwitch();
          }
          else{
            gameState="pick";
            selectedRow=-1;    
          }
        }
        else{
          gameState="remove";
          if(isStreak(selectedRow,selectedCol)){
            removeGems(selectedRow,selectedCol);
          }
          if(isStreak(posY,posX)){
            removeGems(posY,posX);
          }
          gemFade();
        }
        break;
      case "remove":
        checkFalling();
        break;
      case "refill":
        placeNewGems();
        break;
      }
  }
}

function placeNewGems(){
  var gemsPlaced = 0;
  for(i=0;i<8;i++){
    if(jewels[0][i]==-1){
      var randomValue = Math.floor(Math.random()*8); 
      jewels[0][i]=randomValue;
      jewelsTemp[0][i]=randomValue;
      $("#gamefield").append('<div onclick="javascript:clickGem(this);" class="gem" id="gem_0_'+i+'"></div>');
      $("#gem_0_"+i).css({"top":"10px","left":(i*60)+10+"px","width":"50px","height":"50px","position":"absolute","border":"1px solid white","cursor":"pointer","background-color":bgColors[jewels[0][i]]});
      gemsPlaced++;
    }
  }
  if(gemsPlaced){
    gameState="remove";
    checkFalling();
  }
  else{
    var combo=0
    for(i=0;i<8;i++){
      for(j=0;j<8;j++){
        if(j<=5 && jewels[i][j]==jewels[i][j+1] && jewels[i][j]==jewels[i][j+2]){
          combo++;
          removeGems(i,j);     
        }
        if(i<=5 && jewels[i][j]==jewels[i+1][j] && jewels[i][j]==jewels[i+2][j]){
          combo++;
          removeGems(i,j);     
        }             
      }
    }
    if(combo>0){
      gameState="remove";
      gemFade();
    }        
    else{
      gameState="pick";
      selectedRow=-1;
    }
  }
  if(gameState=="pick" && selectedRow==-1){
    if(!hasMoreMoves())
    {
      alert('No more moves!!');
    }
  }
}

function checkFalling(){
  var fellDown=0;
  for(j=0;j<8;j++){
    for(i=7;i>0;i--){
      if(jewels[i][j]==-1 && jewels[i-1][j]>=0){
        $("#gem_"+(i-1)+"_"+j).addClass("fall").attr("id","gem_"+i+"_"+j);
        jewels[i][j]=jewels[i-1][j];
        jewels[i-1][j]=-1;
        jewelsTemp[i][j]=jewelsTemp[i-1][j];
        jewelsTemp[i-1][j]=-1;
        fellDown++;
      }
    }
  }
  $.each($(".fall"),function(){
      movingItems++;
      $(this).animate({
        top: "+=60"
        },{
        duration: 200,
        complete: function(){
          $(this).removeClass("fall");
          checkMoving();
          }
        }
      );
  });     
  if(fellDown==0){
    gameState="refill";
    movingItems=1;
    checkMoving();    
  }    
}

function gemFade(){
  $.each($(".remove"),function(){
      movingItems++;
      $(this).animate({
        opacity:0
        },{
        duration: 200,
        complete: function(){
          $(this).remove();
          checkMoving();
          }
        }
      );
  });
}

function gemSwitch(){
  var yOffset=selectedRow-posY;
  var xOffset=selectedCol-posX;
  $("#gem_"+selectedRow+"_"+selectedCol).addClass("switch").attr("dir","-1");
  $("#gem_"+posY+"_"+posX).addClass("switch").attr("dir","1");
  $.each($(".switch"),function(){
    movingItems++;
    $(this).animate({
      left: "+="+xOffset*60*$(this).attr("dir"),
      top: "+="+yOffset*60*$(this).attr("dir")
      },{
      duration: 500,
      complete: function(){
          checkMoving();
      }
    }).removeClass("switch")
  });
  $("#gem_"+selectedRow+"_"+selectedCol).attr("id","temp");
  $("#gem_"+posY+"_"+posX).attr("id","gem_"+selectedRow+"_"+selectedCol);
  $("#temp").attr("id","gem_"+posY+"_"+posX);
  var temp=jewels[selectedRow][selectedCol];
  jewels[selectedRow][selectedCol]=jewels[posY][posX];
  jewels[posY][posX]=temp;
  jewelsTemp[selectedRow][selectedCol]=jewelsTemp[posY][posX];
  jewelsTemp[posY][posX]=temp;
}

function removeGems(row,col){
  var gemValue = jewels[row][col];
  var tmp = row;
  $("#gem_"+row+"_"+col).addClass("remove");
  if(isVerticalStreak(row,col)){
    while(tmp>0 && jewels[tmp-1][col]==gemValue){                          
      $("#gem_"+(tmp-1)+"_"+col).addClass("remove");
      jewels[tmp-1][col]=-1;
      jewelsTemp[tmp-1][col]=-1;
      tmp--;
    }
    tmp=row;
    while(tmp<7 && jewels[tmp+1][col]==gemValue){
      $("#gem_"+(tmp+1)+"_"+col).addClass("remove");
      jewels[tmp+1][col]=-1;
      jewelsTemp[tmp+1][col]=-1;
      tmp++;
    }
  }
  if(isHorizontalStreak(row,col)){
    tmp = col;
    while(tmp>0 && jewels[row][tmp-1]==gemValue){
      $("#gem_"+row+"_"+(tmp-1)).addClass("remove");
      jewels[row][tmp-1]=-1;
      jewelsTemp[row][tmp-1]=-1;
      tmp--;
    }
    tmp=col;
    while(tmp<7 && jewels[row][tmp+1]==gemValue){
      $("#gem_"+row+"_"+(tmp+1)).addClass("remove");
      jewels[row][tmp+1]=-1;
      jewelsTemp[row][tmp+1]=-1;
      tmp++;
    }
  }
  jewels[row][col]=-1;
  jewelsTemp[row][col]=-1;
}


function isVerticalStreak(row,col){
  var gemValue=jewels[row][col];
  var streak=0;
  var tmp=row;
  while(tmp>0 && jewels[tmp-1][col]==gemValue){
    streak++;
    tmp--;
  }
  tmp=row;
  while(tmp<7 && jewels[tmp+1][col]==gemValue){
    streak++;
    tmp++;
  }
  return streak>1;
}

function isHorizontalStreak(row,col){
  var gemValue=jewels[row][col];
  var streak=0;
  var tmp=col;
  while(tmp>0 && jewels[row][tmp-1]==gemValue){
    streak++;
    tmp--;
  }
  tmp=col;
  while(tmp<7 && jewels[row][tmp+1]==gemValue){
    streak++;
    tmp++;
  }
  return streak>1;
}

function isStreak(row,col){
  return isVerticalStreak(row,col)||isHorizontalStreak(row,col);
}

function createScenarion(){
  for(i=0;i<8;i++){
    jewels[i]=new Array();
    jewelsTemp[i]=new Array();
    for(j=0;j<8;j++){
      jewels[i][j]=-1;
      jewelsTemp[i][j]=-1;
    }
  }
  for(i=0;i<8;i++){
    for(j=0;j<8;j++){
      do{
        var randomValue = Math.floor(Math.random()*8); 
        jewels[i][j]=randomValue;
        jewelsTemp[i][j]=randomValue;
      }while(isStreak(i,j));
      $("#gamefield").append('<div onclick="javascript:clickGem(this);" class="gem" id="gem_'+i+'_'+j+'"></div>');
      $("#gem_"+i+"_"+j).css({"top":(i*60)+10+"px","left":(j*60)+10+"px","width":"50px","height":"50px","position":"absolute","border":"1px solid white","cursor":"pointer","background-color":bgColors[jewels[i][j]]});
    }
  }
}

$(document).ready(function(){
  $("#marker").hide();
  createScenarion();
});
