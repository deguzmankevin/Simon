
  //prep board
var nums = [0, 1, 2, 3];
var map = {0: "red", 1: "blue", 
           2: "yellow", 3: "green"};
var reversemap = {"red": 0, "blue": 1, 
                 "yellow": 2, "green": 3};
var mySequence = [];
  var i = 0;
  var count = 0;
  var j = 0;
var streak = 0;
  $("#screen").html(count);
  $("#strict").click(function() {
    document.getElementById("strict").style.borderStyle = "inset";
  });
  var numlist = [];
  //start process
   $("#start").click(function() {
    // $("#start").hide();
      
       showSequence();     
  });
  function showSequence() {
       i = 0;
       j = 0;
       count++;
       $("#screen").html(count);
      var sequence = setInterval(function() {    
        var rand = nums[Math.floor(Math.random()*nums.length)];
        numlist += rand;
        var color = map[numlist[i]];
        $("#" + color).css("background-color", color);
        setTimeout(function(){
         $("#" + color).css("background-color", "white");      
              }, 300);
         i++;
        if (i >= count) {
          clearInterval(sequence);
        }
      }, 1000); 
    resetPlayer();
  }
 
  
  function reply_click(clicked_id){  
    playerTurn(clicked_id);
}

function playerTurn(id) {
  var num = reversemap[id];
  mySequence += num;
   if (num != numlist[j]) {
     
    alert("you lose!");
    count--;
     j--;
    mySequence.slice(-1, 1);
    showSequence();
  }
  if (mySequence.length > numlist.length) {
    alert("you losee!");
    count--;
    j--;
    mySequence.slice(-1, 1);
    mySequence.slice(-1, 1);
    showSequence();
  }
 
  
  else {
    j++;
   // streak++;
   //  if(streak == count) {
   //  alert('nice!');
   //  streak = 0;
   //  $("#start").trigger('click');
   //   }
  }
}

function resetPlayer(){
  mySequence = [];
  
}
    
function clearGame() {
  count = 0;
  
}