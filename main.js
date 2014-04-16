/**
 * Created by danielraudschus on 12.04.14.
 */
$(document).ready(function () {


    // Get canvas and context
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext('2d');

    // Draw the Canvas
    function drawCanvas() {
        var back = canvas.getContext('2d');
        back.fillStyle = 'grey';
        back.fillRect(canvasX, canvasY, canvasWidth, canvasHeight);
    }


    // Canvas variables
    var canvasX = 0;
    var canvasY = 0;
    var canvasWidth = 800;
    var canvasHeight = 400;

    // Player variables
    var pPosX = 60;
    var pPosY = 60;
    var pW = 10;
    var pH = 10;
    var minPlayer = 5;
    var maxPlayer = 50;

    /**
     * Player Object
     */
    var player = {
        x: pPosX,
        y: pPosY,
        width: pW,
        height: pH,
        fillColor: 'white'
    };

    /** variable for spead in animations
     *
     * @type {number}
     */
    var speed = .5;

    /**
     * Block Objects
     */
    var brick = {
        x: 0,
        y: 0,
        width: 50,
        height: 50,
        fillColor: 'black'
    };

    var getSmall = {
        x: 650,
        y: 350,
        width: 25,
        height: 25,
        fillColor: 'blue'
    };

    var getBig = {
        x: 200,
        y: 200 ,
        width: 25,
        height: 25,
        fillColor: 'grey'
    };

    var portal = {
        x: 780,
        y: 350,
        width: 50,
        height: 25,
        fillColor: 'tan'
    };

    var theWave = {
        x: 0,
        y: 0,
        width: 20,
        height: canvas.height,
        fillColor: 'blue'
    };


    /**
     * Draw rectangles
     */
    function drawRectangles(r, context) {
        var context = canvas.getContext('2d');
        context.fillStyle = r.fillColor;
        context.fillRect(r.x, r.y, r.width, r.height);
    }


    function drawWalls(r, startX, startY, context) {
        var startX;
        var startY;
        r.x = startX;
        r.y = startY;
        var context = canvas.getContext('2d');
        context.fillStyle = r.fillColor;
        context.fillRect(r.x, r.y, r.width, r.height);
    }


    /**
     * Block animations
     * @param r = rect
     * Todo: needs fixing
     */
    function animateX(r) {
        r.x += speed;
        if (r.x > canvas.width) {
            r.x += speed;
        }
        if (r.x > canvas.width / 4) {
            speed += .1;
        }
    }


    /**
     * Collsion with Objects
     **/
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
            if (confirm('You just died! Try again')) {
                window.location.reload();
            }
        }
    }

    function win(p, r) {
        if (collide(p, r)) {
            var score = 20000;
            if (confirm("You Win! Your Score: " + score)) {
                document.location = "http://m.memegen.com/5vcv9q.jpg";
                //window.location.reload();
            }
        }
    }


    /**
     * Object collision
     * Todo: not working right
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
     * Playermovement with arrowkeys
     */
    function movement() {
        function movePlayer(key) {
            // left
            if (key.keyCode == 39) {
                player.x += 5;
            }
            // right
            if (key.keyCode == 37) {
                player.x -= 5;
            }
            // down
            if (key.keyCode == 40) {
                player.y += 5;
            }
            // up
            if (key.keyCode == 38) {
                player.y -= 5;
            }

            /**
             * Wall detection and avoidance
             */

            if (player.x < 0) {
                player.x = 0;
            }
            if (player.y < 0) {
                player.y = 0;
            }
            if (player.x > canvasWidth - player.width) {
                player.x = canvasWidth - player.width;
            }
            if (player.y > canvasHeight - player.height) {
                player.y = canvasHeight - player.height;
            }
        }

        document.onkeydown = movePlayer;
    }


    // This is where the Game happens
    setInterval(function () {

        /** Set Player, Blocks and Canvas **/
        drawCanvas();
        for (var i = 0; i < canvas.width; i += 75) {
            for (var j = 0; j < canvas.height; j += 75) {
                drawWalls(brick, i, j);
                die(player, brick);
            }
        }
        drawRectangles(getBig);
        drawRectangles(portal);
        drawRectangles(getSmall);
        drawRectangles(player);
        drawRectangles(theWave);
        die(player,theWave);
        animateX(theWave);
        grow(player,getBig);
        shrink(player, getSmall);
        movement();
        win(player, portal);

    }, 30);

}); // end of jQuery

