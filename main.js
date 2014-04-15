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
    var playerX = 20;
    var playerY = 75;
    var playerW = 10;
    var playerH = 10;


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
    var playerRect = {
        x: playerX,
        y: playerY,
        width: playerW,
        height: playerH,
        fillColor: 'white'
    };

    /**
     * Block Objects
     */
    var blockRect = {
        x: 100,
        y: 75,
        width: 50,
        height: 50,
        fillColor: 'black'
    };

    var blockRect1 = {
        x: 250,
        y: 0,
        width: 20,
        height: 100,
        fillColor: 'blue'
    };

    var blockRect2 = {
        x: 300,
        y: 200,
        width: 20,
        height: 100,
        fillColor: 'green'
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
     * Playermovement with arrowkeys
     */
    function game() {
        function movePlayer(key) {
            // left
            if (key.keyCode == 39) {
                playerRect.x += 10;
            }
            // right
            if (key.keyCode == 37) {
                playerRect.x -= 10;
            }
            // down
            if (key.keyCode == 40) {
                playerRect.y += 10;
            }
            // up
            if (key.keyCode == 38) {
                playerRect.y -= 10;
            }

            // Collisiondetection with canvaswalls
            if (playerRect.x < 0) {
                playerRect.x = 0;
            }
            if (playerRect.y < 0) {
                playerRect.y = 0;
            }
            if (playerRect.x > canvasWidth - playerW) {
                playerRect.x = canvasWidth - playerW;
            }
            if (playerRect.y > canvasHeight - playerH) {
                playerRect.y = canvasHeight - playerH;
            }
        }

        document.onkeydown = movePlayer;
    }


    // This is where the Game happens
    setInterval(function () {

        /** Set Player, Blocks and Canvas **/
        drawCanvas();
        drawRectangles(blockRect);
        drawRectangles(blockRect1);
        drawRectangles(blockRect2);
        drawRectangles(playerRect);
        game();

    }, 20);

}); // end of jQuery

