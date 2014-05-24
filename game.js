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
var playerSpeed = 3;
/* starting score */
var highscore = 100000;
/* defaul with normal setting (75) */
var difficulty = 75;

/**
 * circle Objects
 */
var player = new createCircle(pPosX, pPosX, pW, 'rgba(255, 122, 0, 1)', 'yellow', 1)
var winCircle = new createCircle(canvas.width - 50, canvas.height - 50, 25, 'rgba(255, 122, 0, .75)', 'rgba(255, 255, 0, .5)', 20);


/**
 * Basic game components
 */
var movePlayer = movement(player);
function gameBasics() {
    requestAnimationFrame(gameBasics);
    context.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    drawCreateCirle(player);
    drawCreateCirle(winCircle);
    movePlayer();
    win(winCircle, player);
    die();


    if (highscore > 100000) {
        highscore = 0;
    }
    else if (highscore < 0) {
        highscore = 0;
    }
}
requestAnimationFrame(gameBasics);



// circle construktor for random circles
function Circle(rad, speed, circleWidth, xPos, yPos) {
    this.radius = rad;      // from rotationpoint
    this.speed = speed;
    this.bubbleRadius = circleWidth;
    this.xPos = xPos;
    this.yPos = yPos;

    this.opacity = Math.random() * .25;

    this.counter = 0;

    var direction = Math.floor(Math.random() * 2);

    if (direction == 1) {
        this.dir = -1;     // counterclockwise
    } else {
        this.dir = 1;      // clockwise
    }
}


Circle.prototype.update = function () {

    this.counter += this.dir * this.speed; // defines rotation, direction and speed of the bubbles


    context.beginPath();
    context.arc(this.xPos + Math.cos(this.counter / 100) * this.radius, this.yPos + Math.sin(this.counter / 100) * this.radius, this.bubbleRadius, 0, 2 * Math.PI, false);
    context.closePath();
    context.fillStyle = 'rgba(255, 0, 0,' + this.opacity + ')';
    context.fill();
};


// array for all the random created circles
var circles = new Array();


function drawCircles() {
    for (var i = 0; i < difficulty; i++) {
        var rad = Math.round(Math.random() * 200);     // from random rotation point! This is what should be checked about colliding with player
        var randomX = Math.round(Math.random() * (canvas.width + 200));
        var randomY = Math.round(Math.random() * (canvas.height + 200));
        var speed = Math.random() * 1;
        var circleWidth = Math.random() * 75;         // radius of the circles

        var circle = new Circle(rad, speed, circleWidth, randomX, randomY);
        circles.push(circle);                         // stack it to the array

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

    context.shadowColor = 'red';
    context.shadowBlur = 0;

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




function die() {
    for (var i = 0; i < circles.length; i++) {
        var myCircle = circles[i];
        if (collideBubbles(player, myCircle)) {
            player.xPos = 15;
            player.yPos = 10;

        }
    }
}
/**
 *
 * @param p playerrect.
 * @param r rect.
 */
function win(c1, c2) {
    if (collide(c1, c2)) {
        player.xPos = -300;
        player.yPos = -300;
        localStorage.highscore = highscore;
        alert("your Score is: " + highscore);
        window.location.href = "input.html";
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

    // white bloodcells
    var destroyerBubble = new createCircle(bubbleX, bubbleY, c2.bubbleRadius, 'rgba(255, 255, 255, .25)', 'rgba(151, 151, 170, .125)', 20);
    drawCreateCirle(destroyerBubble);

    var dx = c1.xPos - bubbleX;
    var dy = c1.yPos - bubbleY;
    var distance = c1.radius + c2.bubbleRadius;

    // Pytagorean Theorem for rot.
    return (dx * dx + dy * dy <= distance * distance);
}


/**
 * Playermovement with arrowkeys
 */
function movement() {
    var up = down = left = right = false;


    function keysUp(key) {
        // left
        if (key.keyCode == 39) {
            left = false;
        }
        // right
        if (key.keyCode == 37) {
            right = false;
        }
        // down
        if (key.keyCode == 40) {
            down = false;
        }
        // up
        if (key.keyCode == 38) {
            up = false;
        }
    }


    function keysDown(key) {

        // left
        if (key.keyCode == 39) {
            left = true;
        }
        // right
        if (key.keyCode == 37) {
            right = true;
        }
        // down
        if (key.keyCode == 40) {
            down = true;
        }
        // up
        if (key.keyCode == 38) {
            up = true
        }
    }

    document.onkeyup = keysUp;
    document.onkeydown = keysDown;

    return function movePlayer() {
        // left
        if (left) {
            player.xPos += playerSpeed;
        }
        // right
        if (right) {
            player.xPos -= playerSpeed;
        }
        // down
        if (down) {
            player.yPos += playerSpeed;
        }
        // up
        if (up) {
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
}