"use strict";
const sWidth = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth,
    sHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;


const greed = function () {
    stroke('green');
    strokeWeight(6);
    line(0, -height, 0, height * 2);
    line(-width * 2, 0, width * 2, 0);
    let xFrom = -width;
    let yFrom = -height - 13;
    stroke('gray');
    strokeWeight(2);
    const step = width * 2 / 40;
    for (let i = 0; i < 40; i++) {
        if (xFrom < width) {
            line(xFrom, -height, xFrom, height);
        }
        if (yFrom < width) {
            line(-width, yFrom, width, yFrom);
        }
        xFrom += step;
        yFrom += step;
    }
    for (let i = 0, len = dots.length; i < len; i++) {
        fill(255);
        ellipse(dots[i].x, dots[i].y, dots[i].z, dots[i].z);
        fill(0);
        line(dots[i].x, dots[i].y, dots[i].x + dots[i].z, dots[i].y);
    }
};

let player,
    dots = [],
    mainPlayerImg,
    halfWidth,
    halfHeight;

function setup() {
    createCanvas(sWidth, sHeight);
    player = new Plane(0, 0, true);
    for (let i = 0; i < 200; i++) {
        const x = random(-width, width);
        const y = random(-height, height);
        dots[i] = new p5.Vector(x, y, 16);
    }
    mainPlayerImg = loadImage("sprites/airplane.png");
    halfWidth = width / 2;
    halfHeight = height / 2;
}

function draw() {
    background(0);
    angleMode(DEGREES); // set angle mode to DEGREES

    push();
        translate(player.pos.x, player.pos.y);
        greed();
    pop();

    translate(halfWidth, halfHeight);
    player.show();
    player.update();
    translate(player.pos.x, player.pos.y);
}