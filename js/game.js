/**
 * Einbindung des Canvas und festlegen des Kontext
 * @type {HTMLElement}
 */
var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');

context.canvas.height = window.innerHeight;
context.canvas.width = window.innerWidth;

var $c = $('canvas'), c = $c[0];
$(window).resize(function() {
    c.width = $c.width();
    c.height = $c.height();
});


/**
 * Adressbar verstecken
 */
window.addEventListener("load",function() {
        // Hide address bar!
        window.scrollTo(0, 1);
});


/**
 * Webkit einbindung für gängige Browser
 * @type {Function}
 */
var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;


/**
 * Automatischer reload der Site, wenn Browsergrösse verändert wird
 */
$(window).bind('resize', function () {

    location.reload();
});



/**
 * Spielaufruf in Animation Frame
 */
function game() {
    requestAnimationFrame(game);
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawCanvas();
    player.draw();
    motherCell.draw();
    playerMovement();
    happyEnd(motherCell, player);
    playerDeath();

    if (highscore > 100000) {
        highscore = 0;
    }
    else if (highscore < 0) {
        highscore = 0;
    }
}
requestAnimationFrame(game);


/**
 * Variablen für Spielerposition, -geschwindigkeit,
 * Highscorestartwert sowie Schwiergkeit (Integer für Anzahl der weissen Blutzellen)
 * und Lebensanzahle (counter)
 * @type {number}
 */
var playerStartposX = 15;
var playerWidth = 10;
var playerSpeed = 1;
var highscore = 100000;
var difficulty = 0;
var counter = 3;

/**
 * Update des Canvas und Zeichnen aller Circle (Zellen)
 */
function drawCanvas() {
    for (var i = 0; i < circles.length; i++) {
        var myCircle = circles[i];
        myCircle.update();
    }
}


/**
 * Spieler- und Zielzelle
 */
var player = new Cells(playerStartposX, playerStartposX, playerWidth, 'rgba(255, 122, 0, 1)', 'yellow', 1);
var motherCell = new Cells(canvas.width - 50, canvas.height - 50, 25, 'rgba(255, 122, 0, 1)', 'rgba(255, 255, 0, .5)', 20);


/**
 * Aufruf der Steuerung für die Spielerzelle
 */
var playerMovement = movement();


/**
 * Spielsteuerung
 * @returns {movePlayer}
 */
function movement() {


    /**
     * Beim antippen des Up-arrow wird das Spiel gestartet, vorher funktioniert die Steuerung nicht
     * Todo: auf OnWindowLoad setzten!!!
     * @type {HTMLElement}
     */
    var gamestart  = document.getElementById('up');
    Hammer(gamestart).on("touch", function() {
        left = right = up = down = touchLeft = touchRight = touchDown = touchUp = false;
    });

    /**
     * Touchsteuerung aktivieren
     * @type {HTMLElement}
     */
    var touchLeft = document.getElementById('left');
    Hammer(touchLeft).on("touch", function() {
        touchLeft = true;
    });

    var touchRight = document.getElementById('right');
    Hammer(touchRight).on("touch", function() {
        touchRight = true;
    });

    var touchUp = document.getElementById('up');
    Hammer(touchUp).on("touch", function() {
        touchUp = true;
    });

    var touchDown = document.getElementById('down');
    Hammer(touchDown).on("touch", function() {
        touchDown = true;
    });

    /**
     * Touchsteuerung deaktiviren bei loslassen
     */
    Hammer(touchLeft).on("release", function() {
        touchLeft = false;
    });

    Hammer(touchRight).on("release", function() {
        touchRight = false;
    });

    Hammer(touchUp).on("release", function() {
        touchUp = false;
    });

    Hammer(touchDown).on("release", function() {
        touchDown = false;
    });




    function keysUp(key) {
        // links
        if (key.keyCode == 39 || touchLeft) {
            left = touchLeft = false;
        }
        // rechts
        if (key.keyCode == 37 || touchRight) {
            right = touchRight = false;
        }
        // runter
        if (key.keyCode == 40 || touchDown) {
            down = touchDown = false;
        }
        // hoch
        if (key.keyCode == 38  || touchUp) {
            up = touchUp = false;
        }
    }


    function keysDown(key) {

        // links
        if (key.keyCode == 39) {
            left = true;
        }
        // rechts
        if (key.keyCode == 37) {
            right = true;
        }
        // runter
        if (key.keyCode == 40) {
            down = true;
        }
        // hoch
        if (key.keyCode == 38) {
            up = true;
        }
    }

    document.onkeyup = keysUp;
    document.onkeydown = keysDown;


    return function movePlayer() {
        // links
        if (touchRight || left) {
            player.xPos += playerSpeed;
        }
        // rechts
        if (touchLeft || right) {
            player.xPos -= playerSpeed;
        }
        // runter
        if (touchDown || down) {
            player.yPos += playerSpeed;
        }
        // hoch
        if (touchUp || up) {
            player.yPos -= playerSpeed;
        }

        /**
         * Setzt Spieler wieder auf maximale Canvaswerte zurück, falls er aus dem Canvas steuert (Wandkollision)
         */
        if (player.xPos < 0 + player.radius) {
            player.xPos = 0 + player.radius;
        }
        if (player.yPos < 0 + player.radius) {
            player.yPos = 0 + player.radius;
        }
        if (player.xPos > canvas.width - player.radius) {
            player.xPos = canvas.width - player.radius;
        }
        if (player.yPos > canvas.height - player.radius) {
            player.yPos = canvas.height - player.radius;
        }
    }
}


/**
 * Konstruktor für Circles (Blutzellen)
 * @param rad
 * @param speed
 * @param circleWidth
 * @param xPos
 * @param yPos
 * @constructor
 */
function Circle(rad, speed, circleWidth, xPos, yPos) {
    this.radius = rad;
    this.speed = speed;
    this.bubbleRadius = circleWidth;
    this.xPos = xPos;
    this.yPos = yPos;

    this.opacity = Math.random() * .25;

    /**
     * Zähler der nach + oder - zählt und somit 360° Bewegung der Zellen ermöglicht
     */
    this.counter = 0;

    /**
     * Zufallserstellung einer Bewegung gegen oder mit dem Uhrzeigersinn
     */
    var direction = Math.floor(Math.random() * 2);

    if (direction == 1) {
        this.dir = -1;
    } else {
        this.dir = 1;
    }
}


/**
 * Update Methode für Circle Objekte (rote Blutzellen)
 */
Circle.prototype.update = function () {

    this.counter += this.dir * this.speed;

    context.beginPath();
    context.arc(
            this.xPos + Math.cos(this.counter / 100) *
            this.radius, this.yPos + Math.sin(this.counter / 100) *
            this.radius, this.bubbleRadius, 0, 2 * Math.PI, false);
    context.closePath();
    context.fillStyle = 'rgba(255, 0, 0,' + this.opacity + ')';
    context.fill();
};


/**
 *
 * @param c Circle der gezeichnet wird
 */
Cells.prototype.draw = function () {
    context.beginPath();
    context.arc(this.xPos, this.yPos, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.fillStyle;

    context.shadowColor = 'white';
    context.shadowBlur = 0;

    context.fill();
    context.strokeStyle = this.strokeStyle;
    context.lineWidth = this.lineWidth;
    context.stroke();
};


/**
 * Array zum Speichern aller erstellten circle (rote Blutzellen)
 */
var circles = new Array();


/**
 * Zeichnen der roten Blutzellen
 */
function drawCircles() {
    for (var i = 0; i < difficulty; i++) {
        var rad = Math.round(Math.random() * 200);
        var randomX = Math.round(Math.random() * (canvas.width + 200));
        var randomY = Math.round(Math.random() * (canvas.height + 200));
        var speed = Math.random();
        var circleWidth = Math.random() * 30;
        var circle = new Circle(rad, speed, circleWidth, randomX, randomY);
        circles.push(circle);
    }
}

/**
 * Aufruf ausserhalb des rAF, da sonst ständig neugezeichnet wird (mit jeweils neuen randomisierten Positionen)
 */
drawCircles();


/**
 *
 * @param xPos
 * @param yPos
 * @param radius
 * @param color
 * @param border
 * @param borderwidth
 * @constructor
 */
function Cells(xPos, yPos, radius, color, border, borderwidth) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.radius = radius;
    this.fillStyle = color;
    this.strokeStyle = border;
    this.lineWidth = borderwidth;

    this.opacity = .2;
}

/**
 * Punkteabzug über Zeit
 */
setInterval(function () {
    highscore -= 10;
}, 10);


/**
 * Spieler wird zurück auf Startposition gesetzt und es wird ein Sound abgespielt, wenn er mit weißen Zellen kollidiert.
 */
function playerDeath() {
    for (var i = 0; i < circles.length; i++) {
        var myCircle = circles[i];
        if (whiteCellCollision(player, myCircle)) {
            document.getElementById('pop').play();
            counter -= 1;

            /* Lifecounter zählt runter*/
            if (counter == 2) {
                document.getElementById("heart1").src = "bilder/heart_black.png";
                }
            if (counter == 1) {
                document.getElementById("heart2").src = "bilder/heart_black.png";
                }
            if (counter == 0) {
                document.getElementById("heart3").src = "bilder/heart_black.png";
                }
            if (counter == -1) {
                window.location.href = "gameover.html";
            }
            player.xPos = 15;
            player.yPos = 10;
        }
    }
}


/**
 * Spielende und Gewinn
 * @param c1 Spieler (circle)
 * @param c2 Mutterzelle (circle)
 */
function happyEnd(c1, c2) {
    if (collide(c1, c2)) {
        player.xPos = -300;
        player.yPos = -300;
        localStorage.highscore = highscore;
        alert("your Score is: " + highscore);
        window.location.href = "input.html";
    }
}

/**
 *
 * @param c1 Circle
 * @param c2 Circle
 * @returns {boolean}
 */
function collide(c1, c2) {
    var dx = c1.xPos - c2.xPos;
    var dy = c1.yPos - c2.yPos;
    var distance = c1.radius + c2.radius;

    return (dx * dx + dy * dy <= distance * distance);
}

/**
 *
 * @param c1 Spieler (circle)
 * @param c2 Weiße Zellen (circle)
 * @returns {boolean}
 */
function whiteCellCollision(c1, c2) {

    /**
     * Animation der roten Blutzellen im Hintergrund
     */
    var bubbleX = c2.xPos + Math.cos(c2.counter / 100) * c2.radius;
    var bubbleY = c2.yPos + Math.cos(c2.counter / 100) * c2.radius;

    /**
     * Erstellen und zeichnen der weißen Blutzellen (in direkter Abhängigkeit zu den roten Zellen im Hintergrund
     */
    var whiteCells = new Cells(bubbleX, bubbleY, c2.bubbleRadius, 'rgba(255, 255, 255, .25)', 'rgba(151, 151, 170, .125)', 20);
    whiteCells.draw();

    var dx = c1.xPos - bubbleX;
    var dy = c1.yPos - bubbleY;
    var distance = c1.radius + c2.bubbleRadius;

    /**
     * Distanz von einem Circlemidpoint zum anderen (incl. Radius des Circle)
     */
    return (dx * dx + dy * dy <= distance * distance);
}


