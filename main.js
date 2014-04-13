/**
 * Created by danielraudschus on 12.04.14.
 */
$(document).ready(function () {

    var canvas = document.getElementById("canvas");
    var line = canvas.getContext("2d");

    /**
     * Setting the Player with x and y
     * @param posX
     * @param posY
     */
    function drawPlayer(posX, posY) {
        var player = canvas.getContext("2d");
        player.fillStyle = 'teal';
        // x, y, width, heigth
        player.fillRect(posX, posY, 5, 5);
    }

    drawPlayer(10, 10);

    /**
     * Setting up walls with start- and endingpoints
     * @param startX
     * @param startY
     * @param toX
     * @param toY
     */
    function drawWall(startX, startY, toX, toY) {
        line.moveTo(startX, startY);
        line.lineTo(toX, toY);
        line.stroke();
    }

    drawWall(50, 0, 50, 100);
    drawWall(100, 20, 100, 100);
    // ToDo: Function for Random Linemaking ie Maze


    function move(key) {
        var moveX, moveY;
        move = move || window.event;
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


    }


}); // end of jQuery