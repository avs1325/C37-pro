var database;
var lines = [];
var dbLines = [];
var clear;
var canvas;

function setup(){
    canvas = createCanvas(displayWidth, displayHeight);
    background(255);

    database = firebase.database();
    clear = createButton("CLEAR");
    clear.position(displayWidth/2, displayHeight/2);

    readData();
}

function mouseDragged(){
    var point = {
        x: mouseX,
        y: mouseY,
        x1: pmouseX,
        y1: pmouseY
    }
    lines.push(point);
    var drawingRef = database.ref("drawing");
    drawingRef.set({
        d: lines,
    });
}

function draw(){  
    for (var i of dbLines) {
        stroke(random(0, 255), random(0, 255), random(0, 255));
        strokeWeight(3)     
        line(i.x, i.y, i.x1, i.y1);
    }

    clear.mousePressed(() => {
        dbLines = [];
        lines = [];
        var drawingRef = database.ref("drawing");
        drawingRef.set({
          d: [],
        });
        background(255);
    });
}


function readData() {
    var query = database.ref("drawing/").on("value", (data) => {
      dbLines = data.val().d;
    });
}