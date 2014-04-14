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
    var playerW = 5;
    var playerH = 5;

    var canvasX = 0;
    var canvasY = 0;
    var canvasWidth = 800;
    var canvasHeight = 400;


    // Get the Canvas Elemten by css id
    var canvas = document.getElementById("canvas");

    function drawCanvas() {
        var back = canvas.getContext('2d');
        back.fillStyle = 'grey';
        back.fillRect(canvasX, canvasY, canvasWidth, canvasHeight);
    }

    function drawPlayer() {
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
    function drawWall(startX, startY, toX, toY) {
        var line = canvas.getContext("2d");
        line.beginPath();
        line.moveTo(startX, startY);
        line.lineTo(toX, toY);
        line.lineTo(190, 50);
        line.lineTo(60, 40);
        line.lineTo(220, 10);
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
        drawPlayer();

        function movePlayer(key) {
            // left
            if (key.keyCode == 39) {
                playerX += 5;
            }
            // right
            if (key.keyCode == 37) {
                playerX -= 5;
            }
            // down
            if (key.keyCode == 40) {
                playerY += 5;
            }
            // up
            if (key.keyCode == 38) {
                playerY -= 5;
            }
        }

        document.onkeydown = movePlayer;

    }, 30);

}); // end of jQuery
