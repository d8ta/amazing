/**
 * Created by danielraudschus on 12.04.14.
 */
// for using the requestAnimatonFrame in all browser....
var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

// callback for drawGame because its allways better to ask nicely
requestAnimationFrame(updateGame);

/* this is where the game get drawn and updated */
function updateGame() {

    /** Get and set canvas and context **/
    var canvas = document.querySelector("canvas"); // referencing to Canvas element
    var context = canvas.getContext('2d'); // calling 2D API

    // clearing the whole canvas
    context.clearRect(0, 0, 700, 450);
    gameBasics();

    requestAnimationFrame(updateGame);
}

/**
 * Highscore math subtracts 10 from the startscore every second
 */
setInterval(function () {
    highscore -= 10;
}, 10);
/**
 * Gives highscore value to the form in input.html to send it to the
 * server for PHP SQL queries
 */
function myScore() {
    document.querySelector("score").value = highscore;
}

// Player variables
var pPosX = 15;
var pPosY = 10;
var pW = 13;
var pH = 13;
var minPlayer = 5;
//var maxPlayer = 50;
var playerSpeed = 5;

/* starting score */
var highscore = 100000;

/**
 * Basic game components
 */
function gameBasics() {
    drawRectangle(winstone);
    win(player, winstone);
    drawRectangle(player);
    movement();
}

/**
 * Rectangle Objects
 */
/* basics */
var player = new rectangle(pPosX, pPosY, pW, pH, 'darkgrey');
var winstone = new rectangle(675, 425, 25, 25, 'silver');
/* end */

/**
 *
 * @param p playerrect.
 * @param r rect.
 */
function win(p, r) {
    if (collide(p, r)) {
        if (confirm("You Win!")) {
            document.location = "input.html";
            myScore();
        }
    }
}


/**
 * Rectangle Object constructor
 */
function rectangle(x, y, width, height, fillColor) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fillColor = fillColor;
}


/**
 * Draw rectangles
 */
function drawRectangle(r, context) {
    var context = canvas.getContext('2d');
    context.fillStyle = r.fillColor;
    context.fillRect(r.x, r.y, r.width, r.height);
}


/**
 * Collisonchek
 * @param r1: rect. 1
 * @param r2: rect. 2
 * @returns {boolean} if colliding or not
 */
function collide(r1, r2) {
    if (r1.x > r2.x + r2.width ||
        r1.x + r1.width < r2.x ||
        r1.y > r2.y + r2.height ||
        r1.y + r1.height < r2.y) {
        return false;
    }
    return true;
}

/**
 * Let Player grow till he is maxPlayer
 * @param p = playerrect.
 * @param r = rect.
 */
//function grow(p, r) {
//    if (collide(p, r)) {
//        if (p.width > maxPlayer) {
//            p.width = maxPlayer;
//            p.height = maxPlayer;
//        }
//        player.width += .5;
//        player.height += .5;
//    }
//}

/**
 * Let Player shring till he is minPlayer
 * @param p = playerrect.
 * @param r = rect.
 */
function shrink(p, r) {
    if (collide(p, r)) {
        if (p.width < minPlayer) {
            p.width = minPlayer;
            p.height = minPlayer;
        }
        player.width -= .5;
        player.height -= .5;
    }
}

/**
 * Set Player back to startpoint
 * @param p = playerrect.
 * @param r = rect.
 */
function die(p, r) {
    if (collide(p, r)) {
        p.x = pPosX;
        p.y = pPosY;
        if (confirm('You just died! Try again.')) {
            window.location.reload();
        }
    }
}

/**
 * Playermovement with arrowkeys
 */
function movement() {
    function movePlayer(key) {
        // left
        if (key.keyCode == 39) {
            player.x += playerSpeed;
        }
        // right
        if (key.keyCode == 37) {
            player.x -= playerSpeed;
        }
        // down
        if (key.keyCode == 40) {
            player.y += playerSpeed;
        }
        // up
        if (key.keyCode == 38) {
            player.y -= playerSpeed;
        }

        /**
         * Wall detection and avoidance
         **/

        if (player.x < 0) {
            player.x = 0;
        }
        if (player.y < 0) {
            player.y = 0;
        }
        if (player.x > canvas.width - player.width) {
            player.x = canvas.width - player.width;
        }
        if (player.y > canvas.height - player.height) {
            player.y = canvas.height - player.height;
        }
    }

    document.onkeydown = movePlayer;
}



