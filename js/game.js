"use strict";
const sWidth = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth,
    sHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;


const greed = function () {
    for (let i = -width; i < width; i += 400) {
        for (let j = -height; j < height; j += 400) {
            image(terrainGrass, i, j, 400, 400);
        }
    }
    stroke('green');
    strokeWeight(6);
    line(0, -height, 0, height);
    line(-width, 0, width, 0);
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
        fill(dots[i].color);
        ellipse(dots[i].x, dots[i].y, dots[i].z, dots[i].z);
        fill(0);
        line(dots[i].x, dots[i].y, dots[i].x + dots[i].z, dots[i].y);
    }
};

let player,
    opponents = [],
    dots = [],
    halfWidth,
    halfHeight,
    terrainGrass = 'sprites/terrainGrass.jpg';

function setup() {
    terrainGrass = loadImage(terrainGrass);
    createCanvas(sWidth, sHeight);
    player = new Plane(0, 10, true, 'sprites/airplanemain.png');
    opponents.push(new Plane(0, 0, false, 'sprites/airplane.png'));

    for (let i = 0; i < 100; i++) {
        const x = random(-width, width);
        const y = random(-height, height);
        dots[i] = new p5.Vector(x, y, 20);
        dots[i].color = random(0, 1) < 0.5 ? 'red' : 'green';
    }
    halfWidth = width / 2;
    halfHeight = height / 2;
}

function draw() {
    background(0);
    angleMode(DEGREES); // set angle mode to DEGREES

    push();
    translate(halfWidth, halfHeight);
    translate(player.pos.x, player.pos.y);
    greed();

    for (let i = 0, len = opponents.length; i < len; i++) {
        opponents[i].show();
        opponents[i].update();
    }
    pop();


    translate(halfWidth, halfHeight);
    player.show();
    player.update();
}