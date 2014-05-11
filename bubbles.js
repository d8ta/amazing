

var mainCanvas = document.getElementById("myCanvas");
var context = mainCanvas.getContext('2d');


var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;


var circles = new Array();


function Circle(radius, speed, width, xPos, yPos) {
    this.radius = radius;
    this.speed = speed;
    this.width = width;
    this.xPos = xPos;
    this.yPos = yPos;
    this.counter = 0;
}

Circle.prototype.update = function () {

    this.counter += this.speed;

    context.beginPath();

    context.arc(this.xPos + Math.cos(this.counter / 100) * this.radius,
        this.yPos + Math.sin(this.counter / 100) * this.radius,
        this.width,
        0,
        Math.PI * 2,
        false);

    context.closePath();

    context.fillStyle = 'black';
    context.fill();
};

function drawCircles() {
    for (var i = 0; i < 13; i++) {
        var randomX = Math.round(Math.random() * 600);
        var randomY = Math.round(Math.random() * 350);
        var speed = Math.random() * 2;
        var size = Math.random() * 90;

        var circle = new Circle(150, speed, size, randomX, randomY);
        circles.push(circle);
    }
    draw();
}
drawCircles();

function draw() {
    context.clearRect(0, 0, 700, 450);

    for (var i = 0; i < circles.length; i++) {
        var myCircle = circles[i];
        myCircle.update();
    }
    requestAnimationFrame(draw);
}
