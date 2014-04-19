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
            back.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Player variables
        var pPosX = 55;
        var pPosY = 10;
        var pW = 10;
        var pH = 10;
        var minPlayer = 5;
        var maxPlayer = 50;


        var playerSpeed = 5;
        var animSpeed = .5;
        var keycounter = 0;
        var highscore = 10000;

//        TODO: Algo. for the gamescore


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
         * Block Objects
         */
        var player = new rectangle(pPosX, pPosY, pW, pH, 'white');
        var brick = new rectangle(0, 0, 50, 50, 'black');
        var getSmall = new rectangle(20, 50, 25, 25, 'teal');
        var getBig = new rectangle(200, 200, 25, 25, 'green');
        var portal = new rectangle(780, 350, 50, 25, 'green');
        var back = new rectangle(0, 0, canvas.width, canvas.height, 'grey');


        /**
         * Draw rectangles
         */
        function drawRectangles(r, context) {
            var context = canvas.getContext('2d');
            context.fillStyle = r.fillColor;
            context.fillRect(r.x, r.y, r.width, r.height);
        }

        function drawWalls(r, startX, startY, context) {
            var startX;//Math.round(Math.random() * canvas.width);
            var startY;//Math.round(Math.random() * canvas.height);
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
            r.x += animSpeed;
            if (r.x > canvas.width) {
                r.x += animSpeed;
            }
//            if (r.x > canvas.width / 4) {
//                animSpeed += .1;
//            }
        }


//    function objectCollison(p, r) {
//        if (collide(p, r)) {
//
//            if (p.x + p.width > r.x) {
//                p.x = r.x - p.width;
//            }
//            else if (p.x < r.x + r.width) {
//                p.x = r.x + r.width;
//            }
//
//            else if (p.y + p.height > r.y) {
//                p.y = r.y - p.height;
//            }
//            else if (p.y < r.y + r.height) {
//                p.y = r.y + r.height;
//            }
//
//        }
//    }


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
                if (confirm('You just died! Try again.')) {
                    window.location.reload();
                }
            }
        }

        function win(p, r) {
            if (collide(p, r)) {
                if (confirm("You Win! Your Score: " + (highscore - (keycounter * 5)))) {
                    document.location = "highscore.html";

//                    TODO: pass Score to DB

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
                    keycounter++;
                }
                // right
                if (key.keyCode == 37) {
                    player.x -= playerSpeed;
                    keycounter++;
                }
                // down
                if (key.keyCode == 40) {
                    player.y += playerSpeed;
                    keycounter++;
                }
                // up
                if (key.keyCode == 38) {
                    player.y -= playerSpeed;
                    keycounter++;
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


//                if (player.x < 0)
//                    player.x = 0;
//                if (player.y < 0)
//                    player.y = 0;
//                if (player.x + player.width > canvas.width)
//                    player.x = canvas.width - player.width;
//                if (player.y + player.height > canvas.height)
//                    player.y = canvas.height - player.height;

            }

            document.onkeydown = movePlayer;
        }

        /**
         * Setting Blocks
         */
        function blocks() {
            for (var i = 0; i < canvas.width; i += 75) {
                for (var j = 0; j < canvas.height; j += 75) {
                    drawWalls(brick, i, j);
                    die(player, brick);
                }
            }
        }

        // This is where the Game happens
        setInterval(function () {

            /** Set Player, Blocks and Canvas **/
            drawCanvas();
            blocks();
            drawRectangles(getBig);
            drawRectangles(portal);
            drawRectangles(getSmall);
            drawRectangles(player);
            grow(player, getBig);
            shrink(player, getSmall);
            movement();
            win(player, portal);

        }, 30);
    }
); // end of jQuery