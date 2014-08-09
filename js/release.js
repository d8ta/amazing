/*! Hammer.JS - v1.1.3 - 2014-05-22
 * http://eightmedia.github.io/hammer.js
 *
 * Copyright (c) 2014 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */


!function(a,b){"use strict";function c(){d.READY||(s.determineEventTypes(),r.each(d.gestures,function(a){u.register(a)}),s.onTouch(d.DOCUMENT,n,u.detect),s.onTouch(d.DOCUMENT,o,u.detect),d.READY=!0)}var d=function v(a,b){return new v.Instance(a,b||{})};d.VERSION="1.1.3",d.defaults={behavior:{userSelect:"none",touchAction:"pan-y",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}},d.DOCUMENT=document,d.HAS_POINTEREVENTS=navigator.pointerEnabled||navigator.msPointerEnabled,d.HAS_TOUCHEVENTS="ontouchstart"in a,d.IS_MOBILE=/mobile|tablet|ip(ad|hone|od)|android|silk/i.test(navigator.userAgent),d.NO_MOUSEEVENTS=d.HAS_TOUCHEVENTS&&d.IS_MOBILE||d.HAS_POINTEREVENTS,d.CALCULATE_INTERVAL=25;var e={},f=d.DIRECTION_DOWN="down",g=d.DIRECTION_LEFT="left",h=d.DIRECTION_UP="up",i=d.DIRECTION_RIGHT="right",j=d.POINTER_MOUSE="mouse",k=d.POINTER_TOUCH="touch",l=d.POINTER_PEN="pen",m=d.EVENT_START="start",n=d.EVENT_MOVE="move",o=d.EVENT_END="end",p=d.EVENT_RELEASE="release",q=d.EVENT_TOUCH="touch";d.READY=!1,d.plugins=d.plugins||{},d.gestures=d.gestures||{};var r=d.utils={extend:function(a,c,d){for(var e in c)!c.hasOwnProperty(e)||a[e]!==b&&d||(a[e]=c[e]);return a},on:function(a,b,c){a.addEventListener(b,c,!1)},off:function(a,b,c){a.removeEventListener(b,c,!1)},each:function(a,c,d){var e,f;if("forEach"in a)a.forEach(c,d);else if(a.length!==b){for(e=0,f=a.length;f>e;e++)if(c.call(d,a[e],e,a)===!1)return}else for(e in a)if(a.hasOwnProperty(e)&&c.call(d,a[e],e,a)===!1)return},inStr:function(a,b){return a.indexOf(b)>-1},inArray:function(a,b){if(a.indexOf){var c=a.indexOf(b);return-1===c?!1:c}for(var d=0,e=a.length;e>d;d++)if(a[d]===b)return d;return!1},toArray:function(a){return Array.prototype.slice.call(a,0)},hasParent:function(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1},getCenter:function(a){var b=[],c=[],d=[],e=[],f=Math.min,g=Math.max;return 1===a.length?{pageX:a[0].pageX,pageY:a[0].pageY,clientX:a[0].clientX,clientY:a[0].clientY}:(r.each(a,function(a){b.push(a.pageX),c.push(a.pageY),d.push(a.clientX),e.push(a.clientY)}),{pageX:(f.apply(Math,b)+g.apply(Math,b))/2,pageY:(f.apply(Math,c)+g.apply(Math,c))/2,clientX:(f.apply(Math,d)+g.apply(Math,d))/2,clientY:(f.apply(Math,e)+g.apply(Math,e))/2})},getVelocity:function(a,b,c){return{x:Math.abs(b/a)||0,y:Math.abs(c/a)||0}},getAngle:function(a,b){var c=b.clientX-a.clientX,d=b.clientY-a.clientY;return 180*Math.atan2(d,c)/Math.PI},getDirection:function(a,b){var c=Math.abs(a.clientX-b.clientX),d=Math.abs(a.clientY-b.clientY);return c>=d?a.clientX-b.clientX>0?g:i:a.clientY-b.clientY>0?h:f},getDistance:function(a,b){var c=b.clientX-a.clientX,d=b.clientY-a.clientY;return Math.sqrt(c*c+d*d)},getScale:function(a,b){return a.length>=2&&b.length>=2?this.getDistance(b[0],b[1])/this.getDistance(a[0],a[1]):1},getRotation:function(a,b){return a.length>=2&&b.length>=2?this.getAngle(b[1],b[0])-this.getAngle(a[1],a[0]):0},isVertical:function(a){return a==h||a==f},setPrefixedCss:function(a,b,c,d){var e=["","Webkit","Moz","O","ms"];b=r.toCamelCase(b);for(var f=0;f<e.length;f++){var g=b;if(e[f]&&(g=e[f]+g.slice(0,1).toUpperCase()+g.slice(1)),g in a.style){a.style[g]=(null==d||d)&&c||"";break}}},toggleBehavior:function(a,b,c){if(b&&a&&a.style){r.each(b,function(b,d){r.setPrefixedCss(a,d,b,c)});var d=c&&function(){return!1};"none"==b.userSelect&&(a.onselectstart=d),"none"==b.userDrag&&(a.ondragstart=d)}},toCamelCase:function(a){return a.replace(/[_-]([a-z])/g,function(a){return a[1].toUpperCase()})}},s=d.event={preventMouseEvents:!1,started:!1,shouldDetect:!1,on:function(a,b,c,d){var e=b.split(" ");r.each(e,function(b){r.on(a,b,c),d&&d(b)})},off:function(a,b,c,d){var e=b.split(" ");r.each(e,function(b){r.off(a,b,c),d&&d(b)})},onTouch:function(a,b,c){var f=this,g=function(e){var g,h=e.type.toLowerCase(),i=d.HAS_POINTEREVENTS,j=r.inStr(h,"mouse");j&&f.preventMouseEvents||(j&&b==m&&0===e.button?(f.preventMouseEvents=!1,f.shouldDetect=!0):i&&b==m?f.shouldDetect=1===e.buttons||t.matchType(k,e):j||b!=m||(f.preventMouseEvents=!0,f.shouldDetect=!0),i&&b!=o&&t.updatePointer(b,e),f.shouldDetect&&(g=f.doDetect.call(f,e,b,a,c)),g==o&&(f.preventMouseEvents=!1,f.shouldDetect=!1,t.reset()),i&&b==o&&t.updatePointer(b,e))};return this.on(a,e[b],g),g},doDetect:function(a,b,c,d){var e=this.getTouchList(a,b),f=e.length,g=b,h=e.trigger,i=f;b==m?h=q:b==o&&(h=p,i=e.length-(a.changedTouches?a.changedTouches.length:1)),i>0&&this.started&&(g=n),this.started=!0;var j=this.collectEventData(c,g,e,a);return b!=o&&d.call(u,j),h&&(j.changedLength=i,j.eventType=h,d.call(u,j),j.eventType=g,delete j.changedLength),g==o&&(d.call(u,j),this.started=!1),g},determineEventTypes:function(){var b;return b=d.HAS_POINTEREVENTS?a.PointerEvent?["pointerdown","pointermove","pointerup pointercancel lostpointercapture"]:["MSPointerDown","MSPointerMove","MSPointerUp MSPointerCancel MSLostPointerCapture"]:d.NO_MOUSEEVENTS?["touchstart","touchmove","touchend touchcancel"]:["touchstart mousedown","touchmove mousemove","touchend touchcancel mouseup"],e[m]=b[0],e[n]=b[1],e[o]=b[2],e},getTouchList:function(a,b){if(d.HAS_POINTEREVENTS)return t.getTouchList();if(a.touches){if(b==n)return a.touches;var c=[],e=[].concat(r.toArray(a.touches),r.toArray(a.changedTouches)),f=[];return r.each(e,function(a){r.inArray(c,a.identifier)===!1&&f.push(a),c.push(a.identifier)}),f}return a.identifier=1,[a]},collectEventData:function(a,b,c,d){var e=k;return r.inStr(d.type,"mouse")||t.matchType(j,d)?e=j:t.matchType(l,d)&&(e=l),{center:r.getCenter(c),timeStamp:Date.now(),target:d.target,touches:c,eventType:b,pointerType:e,srcEvent:d,preventDefault:function(){var a=this.srcEvent;a.preventManipulation&&a.preventManipulation(),a.preventDefault&&a.preventDefault()},stopPropagation:function(){this.srcEvent.stopPropagation()},stopDetect:function(){return u.stopDetect()}}}},t=d.PointerEvent={pointers:{},getTouchList:function(){var a=[];return r.each(this.pointers,function(b){a.push(b)}),a},updatePointer:function(a,b){a==o?delete this.pointers[b.pointerId]:(b.identifier=b.pointerId,this.pointers[b.pointerId]=b)},matchType:function(a,b){if(!b.pointerType)return!1;var c=b.pointerType,d={};return d[j]=c===(b.MSPOINTER_TYPE_MOUSE||j),d[k]=c===(b.MSPOINTER_TYPE_TOUCH||k),d[l]=c===(b.MSPOINTER_TYPE_PEN||l),d[a]},reset:function(){this.pointers={}}},u=d.detection={gestures:[],current:null,previous:null,stopped:!1,startDetect:function(a,b){this.current||(this.stopped=!1,this.current={inst:a,startEvent:r.extend({},b),lastEvent:!1,lastCalcEvent:!1,futureCalcEvent:!1,lastCalcData:{},name:""},this.detect(b))},detect:function(a){if(this.current&&!this.stopped){a=this.extendEventData(a);var b=this.current.inst,c=b.options;return r.each(this.gestures,function(d){!this.stopped&&b.enabled&&c[d.name]&&d.handler.call(d,a,b)},this),this.current&&(this.current.lastEvent=a),a.eventType==o&&this.stopDetect(),a}},stopDetect:function(){this.previous=r.extend({},this.current),this.current=null,this.stopped=!0},getCalculatedData:function(a,b,c,e,f){var g=this.current,h=!1,i=g.lastCalcEvent,j=g.lastCalcData;i&&a.timeStamp-i.timeStamp>d.CALCULATE_INTERVAL&&(b=i.center,c=a.timeStamp-i.timeStamp,e=a.center.clientX-i.center.clientX,f=a.center.clientY-i.center.clientY,h=!0),(a.eventType==q||a.eventType==p)&&(g.futureCalcEvent=a),(!g.lastCalcEvent||h)&&(j.velocity=r.getVelocity(c,e,f),j.angle=r.getAngle(b,a.center),j.direction=r.getDirection(b,a.center),g.lastCalcEvent=g.futureCalcEvent||a,g.futureCalcEvent=a),a.velocityX=j.velocity.x,a.velocityY=j.velocity.y,a.interimAngle=j.angle,a.interimDirection=j.direction},extendEventData:function(a){var b=this.current,c=b.startEvent,d=b.lastEvent||c;(a.eventType==q||a.eventType==p)&&(c.touches=[],r.each(a.touches,function(a){c.touches.push({clientX:a.clientX,clientY:a.clientY})}));var e=a.timeStamp-c.timeStamp,f=a.center.clientX-c.center.clientX,g=a.center.clientY-c.center.clientY;return this.getCalculatedData(a,d.center,e,f,g),r.extend(a,{startEvent:c,deltaTime:e,deltaX:f,deltaY:g,distance:r.getDistance(c.center,a.center),angle:r.getAngle(c.center,a.center),direction:r.getDirection(c.center,a.center),scale:r.getScale(c.touches,a.touches),rotation:r.getRotation(c.touches,a.touches)}),a},register:function(a){var c=a.defaults||{};return c[a.name]===b&&(c[a.name]=!0),r.extend(d.defaults,c,!0),a.index=a.index||1e3,this.gestures.push(a),this.gestures.sort(function(a,b){return a.index<b.index?-1:a.index>b.index?1:0}),this.gestures}};d.Instance=function(a,b){var e=this;c(),this.element=a,this.enabled=!0,r.each(b,function(a,c){delete b[c],b[r.toCamelCase(c)]=a}),this.options=r.extend(r.extend({},d.defaults),b||{}),this.options.behavior&&r.toggleBehavior(this.element,this.options.behavior,!0),this.eventStartHandler=s.onTouch(a,m,function(a){e.enabled&&a.eventType==m?u.startDetect(e,a):a.eventType==q&&u.detect(a)}),this.eventHandlers=[]},d.Instance.prototype={on:function(a,b){var c=this;return s.on(c.element,a,b,function(a){c.eventHandlers.push({gesture:a,handler:b})}),c},off:function(a,b){var c=this;return s.off(c.element,a,b,function(a){var d=r.inArray({gesture:a,handler:b});d!==!1&&c.eventHandlers.splice(d,1)}),c},trigger:function(a,b){b||(b={});var c=d.DOCUMENT.createEvent("Event");c.initEvent(a,!0,!0),c.gesture=b;var e=this.element;return r.hasParent(b.target,e)&&(e=b.target),e.dispatchEvent(c),this},enable:function(a){return this.enabled=a,this},dispose:function(){var a,b;for(r.toggleBehavior(this.element,this.options.behavior,!1),a=-1;b=this.eventHandlers[++a];)r.off(this.element,b.gesture,b.handler);return this.eventHandlers=[],s.off(this.element,e[m],this.eventStartHandler),null}},function(a){function b(b,d){var e=u.current;if(!(d.options.dragMaxTouches>0&&b.touches.length>d.options.dragMaxTouches))switch(b.eventType){case m:c=!1;break;case n:if(b.distance<d.options.dragMinDistance&&e.name!=a)return;var j=e.startEvent.center;if(e.name!=a&&(e.name=a,d.options.dragDistanceCorrection&&b.distance>0)){var k=Math.abs(d.options.dragMinDistance/b.distance);j.pageX+=b.deltaX*k,j.pageY+=b.deltaY*k,j.clientX+=b.deltaX*k,j.clientY+=b.deltaY*k,b=u.extendEventData(b)}(e.lastEvent.dragLockToAxis||d.options.dragLockToAxis&&d.options.dragLockMinDistance<=b.distance)&&(b.dragLockToAxis=!0);var l=e.lastEvent.direction;b.dragLockToAxis&&l!==b.direction&&(b.direction=r.isVertical(l)?b.deltaY<0?h:f:b.deltaX<0?g:i),c||(d.trigger(a+"start",b),c=!0),d.trigger(a,b),d.trigger(a+b.direction,b);var q=r.isVertical(b.direction);(d.options.dragBlockVertical&&q||d.options.dragBlockHorizontal&&!q)&&b.preventDefault();break;case p:c&&b.changedLength<=d.options.dragMaxTouches&&(d.trigger(a+"end",b),c=!1);break;case o:c=!1}}var c=!1;d.gestures.Drag={name:a,index:50,handler:b,defaults:{dragMinDistance:10,dragDistanceCorrection:!0,dragMaxTouches:1,dragBlockHorizontal:!1,dragBlockVertical:!1,dragLockToAxis:!1,dragLockMinDistance:25}}}("drag"),d.gestures.Gesture={name:"gesture",index:1337,handler:function(a,b){b.trigger(this.name,a)}},function(a){function b(b,d){var e=d.options,f=u.current;switch(b.eventType){case m:clearTimeout(c),f.name=a,c=setTimeout(function(){f&&f.name==a&&d.trigger(a,b)},e.holdTimeout);break;case n:b.distance>e.holdThreshold&&clearTimeout(c);break;case p:clearTimeout(c)}}var c;d.gestures.Hold={name:a,index:10,defaults:{holdTimeout:500,holdThreshold:2},handler:b}}("hold"),d.gestures.Release={name:"release",index:1/0,handler:function(a,b){a.eventType==p&&b.trigger(this.name,a)}},d.gestures.Swipe={name:"swipe",index:40,defaults:{swipeMinTouches:1,swipeMaxTouches:1,swipeVelocityX:.6,swipeVelocityY:.6},handler:function(a,b){if(a.eventType==p){var c=a.touches.length,d=b.options;if(c<d.swipeMinTouches||c>d.swipeMaxTouches)return;(a.velocityX>d.swipeVelocityX||a.velocityY>d.swipeVelocityY)&&(b.trigger(this.name,a),b.trigger(this.name+a.direction,a))}}},function(a){function b(b,d){var e,f,g=d.options,h=u.current,i=u.previous;switch(b.eventType){case m:c=!1;break;case n:c=c||b.distance>g.tapMaxDistance;break;case o:!r.inStr(b.srcEvent.type,"cancel")&&b.deltaTime<g.tapMaxTime&&!c&&(e=i&&i.lastEvent&&b.timeStamp-i.lastEvent.timeStamp,f=!1,i&&i.name==a&&e&&e<g.doubleTapInterval&&b.distance<g.doubleTapDistance&&(d.trigger("doubletap",b),f=!0),(!f||g.tapAlways)&&(h.name=a,d.trigger(h.name,b)))}}var c=!1;d.gestures.Tap={name:a,index:100,handler:b,defaults:{tapMaxTime:250,tapMaxDistance:10,tapAlways:!0,doubleTapDistance:20,doubleTapInterval:300}}}("tap"),d.gestures.Touch={name:"touch",index:-1/0,defaults:{preventDefault:!1,preventMouse:!1},handler:function(a,b){return b.options.preventMouse&&a.pointerType==j?void a.stopDetect():(b.options.preventDefault&&a.preventDefault(),void(a.eventType==q&&b.trigger("touch",a)))}},function(a){function b(b,d){switch(b.eventType){case m:c=!1;break;case n:if(b.touches.length<2)return;var e=Math.abs(1-b.scale),f=Math.abs(b.rotation);if(e<d.options.transformMinScale&&f<d.options.transformMinRotation)return;u.current.name=a,c||(d.trigger(a+"start",b),c=!0),d.trigger(a,b),f>d.options.transformMinRotation&&d.trigger("rotate",b),e>d.options.transformMinScale&&(d.trigger("pinch",b),d.trigger("pinch"+(b.scale<1?"in":"out"),b));break;case p:c&&b.changedLength<2&&(d.trigger(a+"end",b),c=!1)}}var c=!1;d.gestures.Transform={name:a,index:45,defaults:{transformMinScale:.01,transformMinRotation:1},handler:b}}("transform"),"function"==typeof define&&define.amd?define(function(){return d}):"undefined"!=typeof module&&module.exports?module.exports=d:a.Hammer=d}(window);
//# sourceMappingURL=hammer.min.map
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
var difficulty = 50;
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

    var left = right = up = down = touchLeft = touchRight = touchDown = touchUp = false;

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



/**
 * Gives the highscore value to the input.html form to send it to the
 * server for PHP SQL queries
 */
function myScore() {
    document.getElementById('score').value = localStorage.highscore;
}