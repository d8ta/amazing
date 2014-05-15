/**
 * Created by danielraudschus on 12.04.14.
 */
/** Get and set canvas and context **/
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
var playerSpeed = 9;
/* starting score */
var highscore = 100000;


// circle construktor for random circles
function Circle(radius, speed, width, xPos, yPos) {
    this.radius = radius;
    this.speed = speed;
    this.width = width; // from rotationpoint
    this.xPos = xPos;
    this.yPos = yPos;

    this.opacity = Math.random() * .5;

    this.counter = 0;

    var direction = Math.floor(Math.random() * 2);

    if (direction == 1) {
        this.sign = -1;     // counterclockwise
    } else {
        this.sign = 1;      // clockwise
    }
}


Circle.prototype.update = function () {

    this.counter += this.sign * this.speed; // defines rotation of the bubbles

    context.beginPath();
    context.arc(this.xPos + Math.cos(this.counter / 100) * this.radius, this.yPos + Math.sin(this.counter / 100) * this.radius, this.width, 0, 2 * Math.PI, false);
    context.closePath();
    context.fillStyle = 'rgba(255, 255, 255,' + this.opacity + ')';
    context.fill();
};


// array for all the random created circles
var circles = new Array();


function drawCircles() {
    for (var i = 0; i < 30; i++) {
        var randomX = Math.round(Math.random() * 700);
        var randomY = Math.round(Math.random() * 450);
        var speed = Math.random() * 1;
        var distance = Math.random() * 100;     // from random rotation point

        var circle = new Circle(150, speed, distance, randomX, randomY);
        circles.push(circle);                   // stack it to the array
    }
}
drawCircles(); // dont call in rAF


function draw() {
    for (var i = 0; i < circles.length; i++) {
        var myCircle = circles[i];
        myCircle.update();
    }
}


// circle constructor
function createCircle(xPos, yPos, radius) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.radius = radius;
}


function drawCreateCirle(c) {
    context.beginPath();
    context.arc(c.xPos, c.yPos, c.radius, 0, Math.PI * 2, false);
    context.stroke();
}


/**
 * Highscore math subtracts 10 from the startscore every second
 */
//setInterval(function () {
//    highscore -= 10;
//}, 10);


/**
 * Gives highscore value to the form in input.html to send it to the
 * server for PHP SQL queries
 */
function myScore() {
    document.getElementById('score').value = highscore;
}


/**
 * Basic game components
 */
function gameBasics() {
    requestAnimationFrame(gameBasics);
    context.clearRect(0, 0, 700, 450);

    drawCreateCirle(playerCircle);
    drawCreateCirle(winCircle);
    drawCreateCirle(dieCircle);
    movement(playerCircle);
    win(playerCircle, winCircle);
    die(playerCircle, dieCircle);
    // console.log(highscore);

    /**
     * ToDo: For Loop for collision
     */
    draw();


}
requestAnimationFrame(gameBasics);


/**
 * circle Objects
 */
var playerCircle = new createCircle(pPosX, pPosX, pW, 'orange');
var winCircle = new createCircle(700, 450, 25);
var dieCircle = new createCircle(350, 225, 50);


/**
 *
 * @param p playerrect.
 * @param r rect.
 */
function win(r, c) {
    if (collide(r, c)) {
        confirm("win");
        //document.location = "input.html";
        //myScore();
        // temp. for testing
        window.location.reload();
    }
}


/**
 * Set Player back to startpoint
 * @param p = playerrect.
 * @param r = rect.
 */
function die(r, c) {
    if (collide(r, c)) {
        if (confirm("The bubbles ate you, try again!"))
            window.location.reload();
    }
}


/**
 * Collisoncheck
 * @param r: rectangle 1
 * @param c: rectangle 2
 * @returns {boolean} if colliding or not
 */
function collide(p, c) {
    if (p.xPos + p.radius + c.radius > c.xPos
        && p.xPos < c.xPos + p.radius + c.radius
        && p.yPos + p.radius + c.radius > c.yPos
        && p.yPos < c.yPos + p.radius + c.radius) {
        return true;
    }
    return false;
}


/**
 * Playermovement with arrowkeys
 */
function movement() {
    function movePlayer(key) {
        // left
        if (key.keyCode == 39) {
            playerCircle.xPos += playerSpeed;
        }
        // right
        if (key.keyCode == 37) {
            playerCircle.xPos -= playerSpeed;
        }
        // down
        if (key.keyCode == 40) {
            playerCircle.yPos += playerSpeed;
        }
        // up
        if (key.keyCode == 38) {
            playerCircle.yPos -= playerSpeed;
        }

        /**
         * Wall detection and avoidance
         **/
        if (playerCircle.xPos < 0 + playerCircle.radius) {
            playerCircle.xPos = 0 + playerCircle.radius;
        }
        if (playerCircle.yPos < 0 + playerCircle.radius) {
            playerCircle.yPos = 0 + playerCircle.radius;
        }
        if (playerCircle.xPos > canvas.width - playerCircle.radius) {
            playerCircle.xPos = canvas.width - playerCircle.radius;
        }
        if (playerCircle.yPos > canvas.height - playerCircle.radius) {
            playerCircle.yPos = canvas.height - playerCircle.radius;
        }
    }

    document.onkeydown = movePlayer;
}