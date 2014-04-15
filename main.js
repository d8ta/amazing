/**
 * Created by danielraudschus on 12.04.14.
 */
$(document).ready(function () {

    // Canvas variables
    var canvasX = 0;
    var canvasY = 0;
    var canvasWidth = 800;
    var canvasHeight = 400;

    // Player variables
    var pPosX = 10;
    var pPosY = 150;
    var pW = 10;
    var pH = 10;


    // Get canvas and context
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext('2d');

    // Draw the Canvas
    function drawCanvas() {
        var back = canvas.getContext('2d');
        back.fillStyle = 'grey';
        back.fillRect(canvasX, canvasY, canvasWidth, canvasHeight);
    }

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

    /**
     * Block Objects
     */
    var block1 = {
        x: 50,
        y: 50,
        width: 70,
        height: 50,
        fillColor: 'black'
    };

    var block2 = {
        x: 650,
        y: 50,
        width: 70,
        height: 50,
        fillColor: 'black'
    };

    var block3 = {
        x: 210,
        y: 250,
        width: 100,
        height: 100,
        fillColor: 'red'
    };

    var block4 = {
        x: 410,
        y: 250,
        width: 100,
        height: 100,
        fillColor: 'blue'
    };

    var makewhite = {
        x: 300,
        y: 50,
        width: 100,
        height: 100,
        fillColor: 'white'
    };

    var wall1 = {
        x: 100,
        y: 150,
        width: 50,
        height: 50,
        fillColor: 'black'
    };

    /**
     * Draw rectangles
     */
    function drawRectangles(r, context) {
        var context = canvas.getContext('2d');
        context.fillStyle = r.fillColor;
        context.fillRect(r.x, r.y, r.width, r.height);
    }


    /**
     * Collsion with Objects
     */
     function collide(r1, r2) {
        if (r1.x > r2.x + r2.width ||
            r1.x + r1.width < r2.x ||
            r1.y > r2.y + r2.height ||
            r1.y + r1.height < r2.y) {
            return false;
        } return true;
    }


    function changeApperance() {
        if (collide(block1, player)) {
            player.width++;
            player.height++;
        } else if (collide(block2, player)) {
            player.width--;
            player.height--;
        } else if (collide(block3, player)) {
            player.fillColor = block3.fillColor;
        } else if (collide(block4, player)) {
            player.fillColor = block4.fillColor;
        } else if (collide(makewhite, player)) {
            player.fillColor = makewhite.fillColor;
        }
    }


    /**
     * Object collision
     */
     function objectCollison(p , r) {
        if (collide(p, r)) {
            if (p.x + p.width > r.x) {
                p.fillColor = 'navy';
                p.x = r.x - p.width;
            }
            else if (p.x + p.width > r.x) {
                p.fillColor = 'green';
                p.x = r.x - p.width;

        }
    }


    /**
     * Playermovement with arrowkeys
     */
    function game() {
        function movePlayer(key) {
            // left
            if (key.keyCode == 39) {
                player.x += 10;
            }
            // right
            if (key.keyCode == 37) {
                player.x -= 10;
            }
            // down
            if (key.keyCode == 40) {
                player.y += 10;
            }
            // up
            if (key.keyCode == 38) {
                player.y -= 10;
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
        drawRectangles(block1);
        drawRectangles(block2);
        drawRectangles(block3);
        drawRectangles(block4);
        drawRectangles(makewhite);
        drawRectangles(wall1);
        drawRectangles(player);
        game();
        changeApperance();
        objectCollison(player, wall1);
    }, 30);

}); // end of jQuery

