/**
 * Created by danielraudschus on 12.04.14.
 */


// Player variables
var pPosX = 55;
var pPosY = 3;
var pW = 10;
var pH = 10;
var minPlayer = 5;
var maxPlayer = 50;


var playerSpeed = 5;
var animSpeed = .5;
var highscore = 100000;

/**
 * Highscore math
 */
setInterval(function () {
    highscore -= 10;
}, 10);

/**
 * Gives highscore value to the form in input.html to send it to the
 * server for PHP SQL queries
 */
function myScore() {
    document.getElementById("score").value = highscore;
}


window.onload = function () {

    // Draws all elements of the game every 30 milliseconds to the canvas
    setInterval(function () {
        drawBackground();
        //blocks();
        drawRectangle(getBig);
        drawRectangle(winstone);
        drawRectangle(getSmall);
        //lines();
        drawRectangle(player);
        grow(player, getBig);
        shrink(player, getSmall);
        movement();
        win(player, winstone);
    }, 30);

    // Get and set canvas and context
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext('2d');

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
     * Drawing some lines on the canvas
     */
    function lines() {
        context.beginPath();
        context.lineWidth = '10';
        context.strokeStyle = 'black';
        context.moveTo(20, 20);
        context.lineTo(500, 20);
        context.lineTo(500, 200);
        context.lineTo(700, 200);
        context.lineTo(700, 400);
        context.lineTo(200, 400);
        context.lineTo(200, 300);
        context.lineTo(300, 300);
        context.lineTo(300, 100);
        context.lineTo(10, 100);
        context.lineTo(10, 425);
        context.stroke();
    }

}; // End of onload


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
 * Rect Objects
 */
var player = new rectangle(pPosX, pPosY, pW, pH, 'darkgrey');
var block = new rectangle(0, 0, 50, 50, 'black');
var wall = new rectangle(50, 50, 10, 10, 'black');
var winstone = new rectangle(125, 50, 25, 25, 'grey');
var getBig = new rectangle(275, 350, 25, 25, 'grey');
var getSmall = new rectangle(50, 125, 25, 25, 'grey');


function drawBackground() {
    var back = canvas.getContext('2d');
    back.fillStyle = 'white';
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

/**
 * Draw lines
 * @param r: rect
 * @param startX: startpos.
 * @param startY: startpos-
 * @param context
 */
function drawWalls(r, startX, startY, context) {
    var startX; //Math.round(Math.random() * canvas.width);
    var startY; //Math.round(Math.random() * canvas.height);
    r.x = startX;
    r.y = startY;
    var context = canvas.getContext('2d');
    context.fillStyle = r.fillColor;
    context.fillRect(r.x, r.y, r.width, r.height);
}

/**
 * Drawing blocks over the canvas
 */
function blocks() {
    for (var i = 0; i < canvas.width; i += 75) {
        for (var j = 0; j < canvas.height; j += 75) {
            drawWalls(block, i, j);
            die(player, block);
        }
    }
}

/**
 *
 * @param r: rect.
 * @param k: koordinates (x or y)
 * @param k: direction (width or heigth
 */
function animate(r, k, d) {
    r.k += animSpeed;
    if (r.k > canvas.d) {
        animSpeed *= -1;
    }
}

/**
 * @param p: playerrect.
 * @param r: rect. to collide with
 */
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
function grow(p, r) {
    if (collide(p, r)) {
        if (p.width > maxPlayer) {
            p.width = maxPlayer;
            p.height = maxPlayer;
        }
        player.width += .5;
        player.height += .5;
    }
}

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



