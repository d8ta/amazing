/**
 * Created by danielraudschus on 12.04.14.
 */
$(document).ready(function () {

    /**
     * basic variables for X, Y, Width and Height
     * @type {number}
     */
    var playerX = 10;
    var playerY = 75;
    var playerW = 10;
    var playerH = 10;

    var canvasX = 0;
    var canvasY = 0;
    var canvasWidth = 800;
    var canvasHeight = 400;


    // Get the Canvas Elementen by css id
    var canvas = document.getElementById("canvas");

    // Create the Canvas
    function drawCanvas() {
        var back = canvas.getContext('2d');
        back.fillStyle = 'grey';
        back.fillRect(canvasX, canvasY, canvasWidth, canvasHeight);
    }

    // Create the Player Rectangle
    function player() {
        var player = canvas.getContext("2d");
        player.fillStyle = 'white';
        // x, y, width, heigth
        player.fillRect(playerX, playerY, playerW, playerH);
    }

    /**
     * Setting up walls with start- and endingpoints
     * @param startX
     * @param startY
     * @param toX
     * @param toY
     */
    function walls(startX, startY, toX, toY) {
        var line = canvas.getContext("2d");
        line.beginPath();
        line.moveTo(startX, startY);
        line.lineTo(toX, toY);
        line.closePath();
        line.stroke();
    }

    /**
     * ToDo: Function for Random Linemaking ie Maze
     * HINT: To do that just use random toX, toY or add random and defined
     * numbers to toX, toY.
     */

    setInterval(function () {

        /** Player and Canvas is set **/
        drawCanvas();
        walls(100, 0, 100, 100);
        player();

        function movePlayer(key) {
            // left
            if (key.keyCode == 39) {
                playerX += 10;
            }
            // right
            if (key.keyCode == 37) {
                playerX -= 10;
            }
            // down
            if (key.keyCode == 40) {
                playerY += 10;
            }
            // up
            if (key.keyCode == 38) {
                playerY -= 10;
            }
        }

        // Collisiondetection with canvaswalls
        if (playerX < 0) {
            playerX = 0;
        }
        if (playerY < 0) {
            playerY = 0;
        }
        if (playerX > canvasWidth) {
            playerX = canvasWidth - playerW;
        }
        if (playerY > canvasHeight) {
            playerY = canvasHeight - playerH;
        }


        document.onkeydown = movePlayer;

    }, 20);

}); // end of jQuery
