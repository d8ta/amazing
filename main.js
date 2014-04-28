/**
 * Created by danielraudschus on 12.04.14.
 */


/**
 * TODO: Randomisiert ausgesuchte Lab. (4 - 5) bauen und starten lassen
 */


// Player variables
var pPosX = 3;
var pPosY = 3;
var pW = 20;
var pH = 20;
var minPlayer = 5;
var maxPlayer = 50;


var playerSpeed = 5;
var animSpeed = 2;
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

        //drawBlocks();

        drawRectangle(winstone);
        win(player, winstone);

        drawRectangle(player);
        movement();


    }, 30);

    /**
    update function erstellen in die alle Dinge kommen die ein Update brauchen
    der REST nicht!!
    **/

    /** Get and set canvas and context **/
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext('2d');

}; // End of onload

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
 * Rect Objects
 */
var player = new rectangle(pPosX, pPosY, pW, pH, 'darkgrey');
var block = new rectangle(0, 0, 50, 50, 'black');
var wall = new rectangle(25, 0, 470, 440, 'black');
var winstone = new rectangle(550, 200, 25, 25, 'silver');
var getBig = new rectangle(50, 0, 400, 50, '#f5f5f5');
var getSmall = new rectangle(0, 425, 25, 25, 'green');



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

/**
 * Draw lines
 * @param r: rect
 * @param startX: startpos.
 * @param startY: startpos-
 * @param context
 */
function drawWalls(r, startX, startY, context) {
    var randX = 10; //Math.round(Math.random() * canvas.width);
    var randY = 10; //Math.round(Math.random() * canvas.height);
    var startX = randX;
    var startY = randY;
    r.x = startX;
    r.y = startY;
    var context = canvas.getContext('2d');
    context.fillStyle = r.fillColor;
    context.fillRect(r.x, r.y, r.width, r.height);
}

/**
 * Drawing drawBlocks over the canvas
 */
function drawBlocks() {
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
 * @param k: direction (width or heigth)
 */
function animate(r, k, d) {
    r.k += animSpeed;
    if (r.k > canvas.d) {
        animSpeed *= -1;
    }

  /* wall.x += animSpeed;
     if (wall.x > 300) {
     animSpeed *= -1;
     }
     else if (wall.x < 10){
     animSpeed *= -1;
     }*/
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



