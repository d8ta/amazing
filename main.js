/**
 * Created by danielraudschus on 12.04.14.
 */


/**
 * TODO: Codewiederholungen verändern
 */


// Player variables
var pPosX = 3;
var pPosY = 3;
var pW = 13;
var pH = 13;
var minPlayer = 5;
//var maxPlayer = 50;
var playerSpeed = 5;

/* speed for animations*/
var animSpeed = 20;

/* starting score */
var highscore = 100000;

/* variables for animated rocks */
var posY1 = Math.round(Math.random() * 400);
var posY2 = Math.round(Math.random() * 400);
var posY3 = Math.round(Math.random() * 400);
var posY4 = Math.round(Math.random() * 400);
var posY5 = Math.round(Math.random() * 400);
var posY6 = Math.round(Math.random() * 400);

/* random block pos */
var randomX = Math.floor(Math.random() * 700);
var randomY = Math.floor(Math.random() * 400);

var randomX1 = Math.floor(Math.random() * 700);
var randomY1 = Math.floor(Math.random() * 400);

var randomX2 = Math.floor(Math.random() * 700);
var randomY2 = Math.floor(Math.random() * 400);

var randomX3 = Math.floor(Math.random() * 700);
var randomY3 = Math.floor(Math.random() * 400);


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

/* select random funktions for the maze from the mazeArray */
var randomfunktion1 = Math.floor(Math.random() * 5);
var randomfunktion2 = Math.floor(Math.random() * 5);


window.onload = function () {

        drawBackground();
        gameBasics();
        mazeArray[randomfunktion1]();
        mazeArray[randomfunktion2]();
        //underlyingMaze();

    /** Get and set canvas and context **/
    var canvas = document.querySelector("canvas"); // referencing to Canvas element
    var context = canvas.getContext('2d'); // calling 2D API

    requestAnimationFrame(window.onload);

}; // End of onload

/*  Testing circles */
var circles = new Array();  // storing all the circle objects

// for using the requestAnimatonFrame in all browser....
var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;


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
 * Array for all Maze functions
 */
var mazeArray = [

    /**
     * player must get right color to pass
     */
        function colorBarrier() {
        drawRectangle(colorblock);
        drawRectangle(colorblockBig);
        drawRectangle(colorwall);
        if (collide(player, colorwall)) {
            player.fillColor = 'red';
        }
        if (player.fillColor !== 'red') {
            die(player, colorblock);
            die(player, colorblockBig);
        }
    },

    /**
     * shrink to get through the bottleneck
     */
        function bottleneck() {
        drawRectangle(shrinker);
        drawRectangle(bottle1);
        drawRectangle(bottle2);
        shrink(player, shrinker);
        die(player, bottle1);
        die(player, bottle2);
    },

    /**
     * slow chasing wall from left to right
     */
        function wallChaser() {
        drawRectangle(wall);
        setInterval(function () {
            wall.x += 0.1
        }, 3000);
        die(player, wall);
    },

    /**
     * player have to beam through walls
     */
        function beamer() {
        drawRectangle(wall1);
        drawRectangle(wall2);
        drawRectangle(wall3);

        die(player, wall1);
        die(player, wall2);
        die(player, wall3);
        die(player, movingWall1);
        die(player, movingWall2);

        drawRectangle(beamer1);
        drawRectangle(beamer2);
        drawRectangle(beamer3);
        drawRectangle(beamer4);
        drawRectangle(beamer5);
        drawRectangle(beamer6);
        drawRectangle(movingWall1);
        drawRectangle(movingWall2);
        movingWall1.x += animSpeed;
        movingWall2.x -= animSpeed;
        if (movingWall1.x > 700) {
            animSpeed *= -1
        }
        if (movingWall1.x < -600) {
            animSpeed *= -1;
        }

        beamPlus(player, beamer1, 220);
        beamPlus(player, beamer2, 400);

        beamMinus(player, beamer3, 400);
        beamMinusY(player, beamer4, 200);

        beamPlus(player, beamer5, 200);

        if (collide(player, beamer6)) {
            playerSpeed += 2;
            if (playerSpeed > 15) {
                playerSpeed = 15;
            }
        }
    },

    /**
     * Rocks flying from right to left
     */
        function rocks() {
        drawRectangle(rock1);
        drawRectangle(rock2);
        drawRectangle(rock3);
        drawRectangle(rock4);
        drawRectangle(rock5);
        drawRectangle(rock6);

        animateXMinus(rock1, 1000, -300);
        animateXMinus(rock2, 1000, -300);
        animateXMinus(rock3, 1000, -300);
        animateXMinus(rock4, 1000, -300);
        animateXMinus(rock5, 1000, -300);
        animateXMinus(rock6, 1000, -300);


        die(player, rock1);
        die(player, rock2);
        die(player, rock3);
        die(player, rock4);
        die(player, rock5);
        die(player, rock6);
    }
];
/* end of array */

function underlyingMaze() {
    drawRectangle(horiBlock);
    drawRectangle(vertBlock);
    drawRectangle(vertBlock1);
    drawRectangle(horiBlock1);
    drawRectangle(vertBlock2);
    drawRectangle(horiBlock2);
    drawRectangle(vertBlock3);
    drawRectangle(horiBlock3);

    die(player, horiBlock);
    die(player, horiBlock1);
    die(player, horiBlock2);
    die(player, horiBlock3);
    die(player, vertBlock);
    die(player, vertBlock1);
    die(player, vertBlock2);
    die(player, vertBlock3);

    drawRectangle(playerStartForbidden);
    drawRectangle(playerEndForbidden);

    if (collide(playerStartForbidden, horiBlock) || collide(playerEndForbidden, vertBlock)) {
        block.x = 200;
        block.y = 200;
    }

}

/**
 * Rectangle Objects
 */
/* basics */
var player = new rectangle(pPosX, pPosY, pW, pH, 'darkgrey');
var winstone = new rectangle(675, 425, 25, 25, 'silver');
/* end */

/* random blocks in T form to spawn over the maze */
// the 'T'

var horiBlock = new rectangle(randomX, randomY, 100, 10, 'black');
var vertBlock = new rectangle(randomX + 45, randomY, 10, 75, 'black');

var horiBlock1 = new rectangle(randomX1 - 20, randomY1 + 35, 75, 10, 'black');
var vertBlock1 = new rectangle(randomX1 + 45, randomY1, 10, 80, 'black');

var horiBlock2 = new rectangle(randomX2, randomY2 + 70, 100, 10, 'black');
var vertBlock2 = new rectangle(randomX2 + 45, randomY2, 10, 75, 'black');

var horiBlock3 = new rectangle(randomX3 + 45, randomY3 + 35, 75, 10, 'black');
var vertBlock3 = new rectangle(randomX3 + 45, randomY3, 10, 80, 'black');

// constraining fields for start- and endpoints
var playerStartForbidden = new rectangle(0, 0, 25, 25, 'red');
var playerEndForbidden = new rectangle(675, 425, 25, 25, 'red');
/* end */

/* bulletstones*/
var rock1 = new rectangle(700, posY1, 25, 25, 'black');
var rock2 = new rectangle(700, posY2, 25, 25, 'black');
var rock3 = new rectangle(700, posY3, 25, 25, 'black');
var rock4 = new rectangle(700, posY4, 25, 25, 'black');
var rock5 = new rectangle(700, posY5, 25, 25, 'black');
var rock6 = new rectangle(700, posY6, 25, 25, 'black');
/* end */

/* for beamer */
var wall1 = new rectangle(100, 0, 50, 450, 'black');
var wall2 = new rectangle(300, 0, 50, 450, 'black');
var wall3 = new rectangle(500, 0, 50, 450, 'black');
var movingWall1 = new rectangle(-600, 100, 600, 50, 'black');
var movingWall2 = new rectangle(700, 300, 600, 50, 'black');
var beamer1 = new rectangle(30, 230, 25, 25, 'lightgrey');
var beamer2 = new rectangle(30, 380, 25, 25, 'lightgrey');
var beamer3 = new rectangle(200, 230, 25, 25, 'lightgrey');
var beamer4 = new rectangle(200, 380, 25, 25, 'lightgrey');
var beamer5 = new rectangle(400, 230, 25, 25, 'lightgrey');
var beamer6 = new rectangle(400, 380, 25, 25, 'lightgrey');

/* end */

var colorblock = new rectangle(675, 375, 25, 50, 'red');
var colorblockBig = new rectangle(625, 375, 50, 75, 'red');
/* end */

/* for colorbarrier */
var colorwall = new rectangle(675, 0, 25, 25, 'red');
var colorblock = new rectangle(675, 375, 25, 50, 'red');
var colorblockBig = new rectangle(625, 375, 50, 75, 'red');
/* end */

/* for wallchaser */
var wall = new rectangle(-700, 0, 700, 450, 'grey');
/* end */

/* for bottleneck */
var shrinker = new rectangle(675, 0, 25, 25, 'darkgrey');
var bottle1 = new rectangle(575, 420, 125, 5, 'black');
var bottle2 = new rectangle(575, 435, 100, 20, 'black');
/* end */

/**
 *
 * @param p: player
 * @param r: rect.
 * @param d: distance
 */
function beamPlus(p, r, d) {
    if (collide(p, r)) {
        p.x = p.x + d;
    }
}

function beamMinus(p, r, d) {
    if (collide(p, r)) {
        p.x = p.x - d;
    }
}

function beamMinusY(p, r, d) {
    if (collide(p, r)) {
        p.y = p.y - d;
    }
}

function beamPlusY(p, r, d) {
    if (collide(p, r)) {
        p.y = p.y + d;
    }
}

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
 Painting the background
 **/
function drawBackground() {
    var back = canvas.getContext('2d');
    back.fillStyle = '#f5f5f5';
    back.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Draw rectangles
 */
function drawRectangle(r, context) {
    var context = canvas.getContext('2d');
    context.fillStyle = r.fillColor;
    context.fillRect(r.x, r.y, r.width, r.height);
}


///**
// * Draw lines
// * @param r: rect
// * @param startX: startpos.
// * @param startY: startpos-
// * @param context
// */
//function drawWalls(r, startX, startY, context) {
//    var randX = 50//Math.round(Math.random() * canvas.width);
//    var randY = 50//Math.round(Math.random() * canvas.height);
//    var startX = randX;
//    var startY = randY;
//    r.x = startX;
//    r.y = startY;
//    var context = canvas.getContext('2d');
//    context.fillStyle = r.fillColor;
//    context.fillRect(r.x, r.y, r.width, r.height);
//}
//
///**
// * Drawing drawBlocks over the canvas
// */
//function drawBlocks() {
//    for (var i = 0; i < canvas.width; i += 75) {
//        for (var j = 0; j < canvas.height; j += 75) {
//            drawWalls(block, i, j);
//           // die(player, block);
//        }
//    }
//}

/**
 *
 * @param r: rect.
 */
function animateXMinus(r, start, end) {
    r.x -= animSpeed;
    if (r.x > start) {
        animSpeed *= -1
    }
    if (r.x < end) {
        animSpeed *= -1;
    }
}

/**
 * @param p: playerrect.
 * @param r: rect. to collide with
 */ // TODO: Dont work properly richt now
function objectCollison(p, r) {
    if (collide(p, r)) {

        if (p.x + p.width > r.x) {
            p.x = r.x - p.width;
        }
        else if (p.x < r.x + r.width) {
            p.x = r.x + r.width;
        }
        else if (p.y + p.height > r.y) {
            p.y = r.y - p.height;
        }
        else if (p.y < r.y + r.height) {
            p.y = r.y + r.height;
        }

    }
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



