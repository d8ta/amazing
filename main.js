/**
 * Created by danielraudschus on 12.04.14.
 */
$(document).ready(function () {

    // Get the Canvas Elemten by css id
    var canvas = document.getElementById("canvas");

    function drawCanvas(canvasX, canvasY, canvasWidth, canvasHeight) {
        var back = canvas.getContext('2d');
        back.fillStyle = 'grey';
        back.fillRect(canvasX, canvasY, canvasWidth, canvasHeight);
    }


    /**
     * Setting the Player with x and y
     * @param posX
     * @param posY
     */
    function drawPlayer(posX, posY, width, height) {
        var player = canvas.getContext("2d");
        player.fillStyle = 'white';
        // x, y, width, heigth
        player.fillRect(posX, posY, width, height);
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
    // ToDo: Function for Random Linemaking ie Maze
    /**
     * HINT: To do that just use random toX, toY or add random and defined
     * numbers to toX, toY.
     */

    var posX = 0, posY = 0, width = 5, height = 5;
    setInterval(function(){
        drawCanvas(0, 0, 800, 400);
        drawPlayer(posX, posY, width, height);
        posX ++;
        if  (posX > 100) {
            posY++;
            posX --;
            if (posY > 100) {
                posY --;
                posX ++;
            }
        }

    }, 30);

    /**
     * Player movement via keys:
     *      setInterval and let paint the canvas with the background
     *      (every 30 milsec.) use switch statement for movement
     */


    /*function movePlayer(key) {
        var moveX, moveY;
        movePlayer = movePlayer || window.event;
        switch (key.keyCode) {
            case 38: // arrow up
                moveX = player - 3;
                moveY = player;
                break;
            case 40: // arrow down
                moveX = player + 3;
                moveY = player;
                break;
            case 39: // arrow right
                moveX = player;
                moveY = player + 3;
                break;
            case 37: // arrow left
                moveX = player;
                moveY = player - 3;
                break;
        }


    }*/


}); // end of jQuery