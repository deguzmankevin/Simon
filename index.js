
  //prep board
var nums = [0, 1, 2, 3];
var map = {0: "darkred", 1: "darkblue", 
           2: "gold", 3: "darkgreen"};
var map1 = {0: "red", 1: "blue", 
           2: "yellow", 3: "green"};
var switchCol = {"yellow": "gold", "green": "darkgreen", "blue": "darkblue", "red": "darkred"};
var reversemap = {"red": 0, "blue": 1, 
                 "yellow": 2, "green": 3};
var soundMap =  {"red": "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3", "blue": "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3", 
                 "yellow": "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3", "green": "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"};
var newnum = true;
var mySequence = [];
var gameSequence = [];
var i = 0;
var count = 0;
var j = 0;
var streak = 0;
var strict = false;
 $("#reset").click(function() {
   newGame();
    $("#start").trigger('click');
  });
  $("#score").html(count);
  $("#strict").click(function() {
    
//    $(this).toggleClass('clicked'); 
    if (!strict) {
    
    strict = true;
    }
    else {
      strict = false;
    }
    
    
  });
  
  //start process
   $("#start").click(function() {
    $("#start").hide();
    
      $.blockUI.defaults.overlayCSS.opacity = 0.0; 
      $.blockUI.defaults.overlayCSS.cursor = 'default'; 
          $.blockUI.defaults.message = null;

       showSequence(newnum);     
  });
  function showSequence(bool) {
       i = 0;     
       count++;
    if (count > 9) {
      $('#score').css('left', '41%');
    }
     $("#score").html(count);
    if(bool) {
          var rand = nums[Math.floor(Math.random()*nums.length)];
          gameSequence.push(rand);
        }
        var sequence = setInterval(function() { 
        var color = map1[gameSequence[i]];
        var switchColor = map[gameSequence[i]];
        i++;
        $("#" + color).css("background-color", switchColor);
          playSound(color);
        setTimeout(function(){
          
         $("#" + color).css("background-color", color);   
              }, 300);
         
        if (i >= count) {
           $.unblockUI();
          clearInterval(sequence);
        }
      }, 1000); 
    resetPlayer();
    $.blockUI();
  }
 
  
  function addToPlayerSequence(clicked_id){ 
    if (count == 0) {
      null;
    }
    else {
      var myNum = reversemap[clicked_id];
    mySequence.push(myNum);    
    playerTurn(clicked_id);
  }
  }

function playerTurn(id) {
  playSound(id);
  
   if (mySequence[mySequence.length - 1] != gameSequence[mySequence.length - 1]) {
     if (strict) {
       alert("try again!...from the beginning");
       $("#reset").trigger('click');
       strict = true;
     }
     else {
       setTimeout(function() {
         alert("try again!");
     }, 200);
  
    count--;
    showSequence(false);
     }
     
  
  }
  else {
    var switchColor = switchCol[id];
    $("#" + id).css('background-color', switchColor);
    setTimeout(function(){
      $("#" + id).css('background-color', id);
    }, 200);
    
    newnum = true;
     streak++;
      if(streak == count) {
         
        if(streak == 20) {
          alert('you win!');
          newGame();
        }
        
  //       if (mySequence.length > gameSequence.length) {
  //   alert('hi2');
  //   alert("you losee!");
  //   count--;
  //   showSequence(false);
  // }
        else {
          setTimeout(function(){
             
          }, 200);
         
           streak = 0;
       $("#start").trigger('click');
        }
     

       }
  }
}

function resetPlayer(){
  streak = 0;
  mySequence = [];
}
    
function clearGame() {
  count = 0;
  gameSequence = [];
  strict = false;
}

function newGame() {
  resetPlayer();
  clearGame();
  $("#start").show();
}

function playSound(id) {
  var url = soundMap[id];
  
   var a = new Audio(url);
    a.play();
}

// document.getElementById("#strict").style.borderStyle = "outset";