var cvs  = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

// audio
var fly = new Audio();
var score_audio = new Audio();
var end_game = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";
end_game.src = "audio/over.mp3"

// score and middle heght
var gap = 100;
var score = 0;

// bird position
var xPos = 10;
var yPos = 150;
var grav = 1.5;

// space keydown
document.addEventListener("keydown", function(e){
    if(e.keyCode == 38){
        yPos -= 25;
        fly.play();
    }
    else if(e.keyCode == 40){
        yPos += 25;
        fly.play();
    }
});

// crate block
var pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
}

var continueAnimating=true;
// draw
function draw(){

    if(!continueAnimating){return;}

    ctx.drawImage(bg, 0, 0);

    for(let i = 0; i<pipe.length; i++){
        ctx.drawImage(pipeUp, pipe[i].x , pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x , pipe[i].y + pipeUp.height + gap);
        pipe[i].x-- ;

        if(pipe[i].x == 10){
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
            || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) 
            || yPos + bird.height >= cvs.height - fg.height) {
                end_game.play();
                continueAnimating = false;
                swal( "Score: " + score)
                .then(() => {
                    location.reload();
                });
            }

        if(pipe[i].x == 5){
            score++;
            score_audio.play();
        }
    }
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "25px Verdana";
    ctx.fillText("Score: "+ score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;