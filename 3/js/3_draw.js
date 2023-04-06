/* * * * * * * * * * * * * *
*          3_DRAW          *
* * * * * * * * * * * * * */

//TUTORIALS-------------------------------------------------------------------------------------------------------------------------------------
//https://editor.p5js.org/owenroberts/sketches/Bkik3aw2z
//https://www.infoworld.com/article/3332931/javascript-tutorial-create-a-watercolor-edge-with-p5js.html
//https://www.infoworld.com/article/3332676/javascript-tutorial-create-a-textured-paper-background-with-p5js.html
//https://www.rand-on.com/projects/2018_oil_brush/brush.html

const mg_3_2 = {top: 0, right: 0, bottom: 0, left: 0};
const wd_3_2= document.getElementById('viz3_2').getBoundingClientRect().width - mg_3_2.left - mg_3_2.right;
const ht_3_2 = document.getElementById('viz3_2').getBoundingClientRect().height - mg_3_2.top - mg_3_2.bottom;

const posY = document.getElementById('viz3_2').getBoundingClientRect().top + window.scrollY;

var poemColor = ['rgba(211,217,38,0.01)', 'rgba(194,32,37,0.01)', 'rgba(180,87,29,0.01)', 'rgba(4,162,72,0.01)',
    'rgba(58,140,175,0.01)','rgba(30,28,85,0.01)', 'rgba(11,11,19,0.01)','rgba(102,102,102,0.0025)']


var c = "black";

const minR = 1;
const maxR = 10;
const radiusVelocity = 0.01;
const colorVelocity = 0.1;




var bg;

function preload(){
    bg = loadImage('img/paper.jpg')
}


function setup() {
    let myCanvas = createCanvas(wd_3_2, ht_3_2);
    myCanvas.parent('viz3_2');
    // background('white');
    angleMode(DEGREES);

    // SLIDER FLOW RATE
    slider_flowRate = createSlider(0, 0.5, 0.15,0.001);
    slider_flowRate.position(100, posY-30);
    slider_flowRate.addClass("mySliders");

    // SLIDER STROKE WEIGHT
    slider_strokeWeight = createSlider(0, 50, 20,0.001);
    slider_strokeWeight.position(280, posY-30);
    slider_strokeWeight.addClass("mySliders");

    // BUTTON RESET
    let button = createButton("reset sketch");
    button.mousePressed(resetSketch);
    button.position(450, posY-70);

    // BACKGROUND PAPER TEXTURE
    image(bg, 0, 0, wd_3_2, ht_3_2, 0, 0, bg.width, bg.height, COVER);
}

function draw() {

    if (mouseIsPressed) {
        // stroke(poemColor[1])
        stroke(poemColor[6]);
        ink(mouseX, mouseY, pmouseX, pmouseY);

    }
}

//this will run whenever the mouse is pressed
function mousePressed() {
    if (mouseX > 0 && mouseX < 40 && mouseY > 0 && mouseY < 40) {
        //set the variables to random values
        c = "red";
    }
    if (mouseX > 40 && mouseX < 80 && mouseY > 0 && mouseY < 40) {
        //set the variables to random values
        c = "blue";
    }
}

function ink (x,y,px,py) {

    let flow = random(5,30);
    let flowRate = slider_flowRate.value();
    let stroke = slider_strokeWeight.value();

    let r = stroke+5*Math.sin(frameCount)
    strokeWeight(r);

    for (let i=0; i<flow; i++){

        let flowAmount = i*flowRate;

        line(x,y+flowAmount,px,py+flowAmount);
        line(x,y-flowAmount,px,py-flowAmount);
        line(x,y+2*flowAmount,px,py+2*flowAmount);
        line(x,y+5*flowAmount,px,py+5*flowAmount);

        line(x,y+5*flowAmount,px,py+5*flowAmount);
        line(x,y-10*flowAmount,px,py-10*flowAmount);

        line(x+flowAmount,y,px+flowAmount,py);
        line(x-flowAmount,y,px-flowAmount,py);
        line(x+3*flowAmount,y,px+3*flowAmount,py);
        line(x-3*flowAmount,y,px-3*flowAmount,py);



        if(i % 4 == 0) {
            line(x-2*flowAmount,y-2*flowAmount,px-2*flowAmount,py-2*flowAmount);
            line(x+2*flowAmount,y+2*flowAmount,px+2*flowAmount,py+2*flowAmount);
        }
    }
    // line(x+sin(frameCount),y+cos(frameCount),px,py);
}


function resetSketch() {
    clear();
    image(bg, 0, 0, wd_3_2, ht_3_2, 0, 0, bg.width, bg.height, COVER);
}