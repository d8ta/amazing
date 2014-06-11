
var touchLeft = document.getElementById('left');
Hammer(touchLeft).on("tap", function() {
    alert("left!!");
});

var touchRight = document.getElementById('right');
Hammer(touchRight).on("tap", function() {
    alert("right!!");
});

var touchUp = document.getElementById('up');
Hammer(touchUp).on("tap", function() {
    alert("up!!");
});

var touchDown = document.getElementById('down');
Hammer(touchDown).on("tap", function() {
    alert("down!!");
});

