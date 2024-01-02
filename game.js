var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;
var level = 0;

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
    console.log(userClickedPattern);
})

$(document).keydown(function(){
    if(!gameStarted){
        nextSequence();
        gameStarted = true;
    }
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        $("h1").text("Game Over, Press Any Key to Restart");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver(){
    gameStarted = false;
    level = 0;
    gamePattern = [];
    $(document).keydown(function(){
        if(!gameStarted){
            nextSequence();
            gameStarted = true;
        }
    })
}

//Randomizer that will choose between the 4 colors from buttonColors
function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4); //there are 4 numbers from 0 to 3
    var randomChosenColor = buttonColors[randomNumber]; //Will randomly select between the 4 colors and push it to an empty array of gamePattern
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);

    //Selecting ID that has the same name as randomChosenColor & animating flash
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

    $("#level-title").text("Level " + level);
    level++;

    userClickedPattern = [];
}


function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name){
    //Syncing the color to the sound & play
    var audio = new Audio('sounds/' + name + ".mp3");
    audio.play();
}




