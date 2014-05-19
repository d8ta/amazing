/**
 * Created by danielraudschus on 12.04.14.
 */
/** Get and set canvas and context **/


var amazing = amazing || {};

var canvas = document.getElementById("canvas"); // referencing to Canvas element
var context = canvas.getContext('2d'); // calling 2D API

// for using the requestAnimatonFrame in all browser....
var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;


// player variables
var pPosX = 15;
var pPosY = 10;
var pW = 5;
var playerSpeed = 7;
/* starting score */
var highscore = 100000;


// circle construktor for random circles
function Circle(rad, speed, circleWidth, xPos, yPos) {
    this.radius = rad;      // from rotationpoint
    this.speed = speed;
    this.bubbleRadius = circleWidth;
    this.xPos = xPos;
    this.yPos = yPos;

    this.opacity = Math.random() * .1;

    this.counter = 0;

    var direction = Math.floor(Math.random() * 2);

    if (direction == 1) {
        this.dir = -1;     // counterclockwise
    } else {
        this.dir = 1;      // clockwise
    }
}


Circle.prototype.update = function () {

    this.counter += this.dir * this.speed; // defines rotation of the bubbles


    context.beginPath();
    context.arc(this.xPos + Math.cos(this.counter / 100) * this.radius, this.yPos + Math.sin(this.counter / 100) * this.radius, this.bubbleRadius, 0, 2 * Math.PI, false);
    context.closePath();
    context.fillStyle = 'rgba(255, 255, 255,' + this.opacity + ')';
    context.fill();
};


// array for all the random created circles
var circles = new Array();


function drawCircles() {
    for (var i = 0; i < 30; i++) {
        var rad = Math.round(Math.random() * 200);       // from random rotation point! This is what should be checked about colliding with player
        var randomX = Math.round(Math.random() * (canvas.width + 200));
        var randomY = Math.round(Math.random() * (canvas.height + 200));
        var speed = Math.random() * 1;
        var circleWidth = Math.random() * 50;         // radius of the circles

        var circle = new Circle(rad, speed, circleWidth, randomX, randomY);
        circles.push(circle);                             // stack it to the array

    }
}
drawCircles(); // dont call in rAF

// updates the prototype of circles
function draw() {
    for (var i = 0; i < circles.length; i++) {
        var myCircle = circles[i];
        myCircle.update();
    }
}


// circle constructor
function createCircle(xPos, yPos, radius, fillColor, strokeColor) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.radius = radius;
    this.fillStyle = fillColor;
    this.fillColor = strokeColor;
}


function drawCreateCirle(c) {
    context.beginPath();
    context.arc(c.xPos, c.yPos, c.radius, 0, Math.PI * 2, false);
    context.stroke();
}


/**
 * Highscore math subtracts 10 from the startscore every second
 */
setInterval(function () {
    highscore -= 10;
}, 10);

/**
 * Basic game components
 */
function gameBasics() {
    requestAnimationFrame(gameBasics);
    context.clearRect(0, 0, 700, 450);

    drawCreateCirle(player);
    drawCreateCirle(winCircle);

    movement(player);
    win(player, winCircle);
    draw();

    /**
     * ToDo: Collision wird für die gesamte Fläche vom rotationspkt bis zu circle überwacht!
     */
    for (var i = 0; i < circles.length; i++) {
        var myCircle = circles[i];
        if (collideBubbles(player, myCircle)) {
            console.log("collide");
            if (confirm("The bubbles ate you, try again!"))
                window.location.reload();
        }
    }
}
requestAnimationFrame(gameBasics);


/**
 * circle Objects
 */
var player = new createCircle(pPosX, pPosX, pW, 'red', 'orange');
var winCircle = new createCircle(700, 450, 25);


/**
 *
 * @param p playerrect.
 * @param r rect.
 */
function win(p, c) {
    if (collide(p, c)) {
        if (confirm("you won!"))
            localStorage.highscore = highscore;
        document.location = "input.html";
    }
}

function collide(c1, c2) {
    var dx = c1.xPos - c2.xPos;
    var dy = c1.yPos - c2.yPos;
    var distance = c1.radius + c2.radius;

    // Pytagorean Theorem
    return (dx * dx + dy * dy <= distance * distance);
}


function collideBubbles(c1, c2) {


    // moving/rotation xPos and yPos
    var bubbleX = c2.xPos + Math.cos(c2.counter / 100) * c2.radius; // see the actual collision with DebugMark in the canvas
    var bubbleY = c2.yPos + Math.cos(c2.counter / 100) * c2.radius; // see the actual collision with DebugMark in the canvas


    var whiteBubble = new createCircle(bubbleX, bubbleY, c2.bubbleRadius);
    drawCreateCirle(whiteBubble);


    //console.log('bubbleX:  ' + bubbleX);
    //console.log('bubbleY:  ' + bubbleY);


    var dx = c1.xPos - bubbleX; // change with pos from actual bubble!
    var dy = c1.yPos - bubbleY; // change with pos from actual bubble!
    var distance = c1.radius + c2.bubbleRadius;

    // Pytagorean Theorem
    return (dx * dx + dy * dy <= distance * distance);
}


/**
 * Playermovement with arrowkeys
 * ToDo: mit KeyDown arbeiten
 */
function movement() {
    function movePlayer(key) {
        // left
        if (key.keyCode == 39) {
            player.xPos += playerSpeed;
        }
        // right
        if (key.keyCode == 37) {
            player.xPos -= playerSpeed;
        }
        // down
        if (key.keyCode == 40) {
            player.yPos += playerSpeed;
        }
        // up
        if (key.keyCode == 38) {
            player.yPos -= playerSpeed;
        }

        /**
         * Wall detection and avoidance
         **/
        if (player.xPos < 0 + player.radius) {
            player.xPos = 0 + player.radius;
        }
        if (player.yPos < 0 + player.radius) {
            player.yPos = 0 + player.radius;
        }
        if (player.xPos > canvas.width - player.radius) {
            player.xPos = canvas.width - player.radius;
        }
        if (player.yPos > canvas.height - player.radius) {
            player.yPos = canvas.height - player.radius;
        }
    }

    document.onkeydown = movePlayer;
}