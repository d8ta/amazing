/**
 * Created by danielraudschus on 12.04.14.
 */
/** Get and set canvas and context **/

//var backgroundImage = new Image();
//backgroundImage.src = 'bilder/bloodcells.png';

var canvas = document.getElementById("canvas"); // referencing to Canvas element
var context = canvas.getContext('2d'); // calling 2D API

context.width = window.innerWidth;
context.height = window.innerHeight;

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

    this.opacity = Math.random() * .125;

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
    context.fillStyle = 'rgba(204, 0, 0,' + this.opacity + ')';
    context.fill();
};


// array for all the random created circles
var circles = new Array();


function drawCircles() {
    for (var i = 0; i < 50; i++) {
        var rad = Math.round(Math.random() * 200);       // from random rotation point! This is what should be checked about colliding with player
        var randomX = Math.round(Math.random() * (canvas.width + 200));
        var randomY = Math.round(Math.random() * (canvas.height + 200));
        var speed = Math.random() * 1;
        var circleWidth = Math.random() * 75;         // radius of the circles

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
function createCircle(xPos, yPos, radius, color, border, borderwidth) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.radius = radius;
    this.fillStyle = color;
    this.strokeStyle = border;
    this.lineWidth = borderwidth;

    this.opacity = .1;
}


function drawCreateCirle(c) {
    context.beginPath();
    context.arc(c.xPos, c.yPos, c.radius, 0, Math.PI * 2, false);
    context.fillStyle = c.fillStyle

    context.fill();
    context.strokeStyle = c.strokeStyle;
    context.lineWidth = c.lineWidth;
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
    context.clearRect(0, 0, canvas.width, canvas.height);
    // context.drawImage(backgroundImage, 0, 0);
    draw();
    drawCreateCirle(player);
    drawCreateCirle(winCircle);
    movement(player);
    win(player, winCircle);
    die();
}
requestAnimationFrame(gameBasics);


/**
 * circle Objects
 */
var player = new createCircle(pPosX, pPosX, pW, 'rgba(255, 122, 0, 1)', 'red', .5);
var winCircle = new createCircle(canvas.width - 30, canvas.height - 30, 25, 'rgba(255, 122, 0, 1)', 'rgba(255, 122, 0, .5)', 10);


function die() {
    for (var i = 0; i < circles.length; i++) {
        var myCircle = circles[i];
        if (collideBubbles(player, myCircle)) {
            window.location.reload();
        }
    }
}
/**
 *
 * @param p playerrect.
 * @param r rect.
 */
function win(p, c) {
    if (collideBubbles(p, c)) {
        localStorage.highscore = highscore;
        window.location = "input.html";
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
    var bubbleX = c2.xPos + Math.cos(c2.counter / 100) * c2.radius;
    var bubbleY = c2.yPos + Math.cos(c2.counter / 100) * c2.radius;

    var destroyerBubble = new createCircle(bubbleX, bubbleY, c2.bubbleRadius, 'rgba(245, 214, 204, 0.7)', 'white', 0.1);
    drawCreateCirle(destroyerBubble);

    var dx = c1.xPos - bubbleX;
    var dy = c1.yPos - bubbleY;
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