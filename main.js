/**
 * Created by danielraudschus on 12.04.14.
 */

    /** Canvas element zeichnen **/
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.fillStyle = "#0000ff";
ctx.fillRect(60, 10, 10, 10);

/** FischButton **/
function showGoldi() {
    document.getElementById("redButton").innerHTML = "<img src='bilder/goldi.png' width='25%' height='25%'><h3>...comming soon...</h3>";
}



/** switch statement: if key == right -> ctx,fillRect(x,y,width,heigth) {x ++} **/
