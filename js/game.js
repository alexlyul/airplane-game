"use strict";

const sWidth = window.innerWidth || document.documentElement.clientWidth ||
    document.getElementsByTagName('body')[0].clientWidth,
    sHeight = window.innerHeight || document.documentElement.clientHeight ||
        document.getElementsByTagName('body')[0].clientHeight,
    fieldLenX = 2048,
    fieldLenY = 2048;

const terrain = function () {
    for (let i = -fieldLenX; i < fieldLenX; i += 512) {
        for (let j = -fieldLenY; j < fieldLenY; j += 512) {
            image(terrainGrass, i, j, 512, 512);
        }
    }
    stroke('green');
    strokeWeight(6);
    line(0, -fieldLenY, 0, fieldLenY);
    line(-fieldLenX, 0, fieldLenX, 0);
    let xFrom = -fieldLenX;
    let yFrom = -fieldLenY;
    stroke('gray');
    strokeWeight(2);
    const step = fieldLenX * 2 / 40;
    for (let i = 0; i < 40; i++) {
        if (xFrom < fieldLenX) {
            line(xFrom, -fieldLenY, xFrom, fieldLenY);
        }
        if (yFrom < fieldLenX) {
            line(-fieldLenX, yFrom, fieldLenX, yFrom);
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

    clouds.forEach((cloud) => {
        cloud.show();
    });
    player.drawTrack();
};

let player,
    opponents = [],
    dots = [],
    halfWidth,
    halfHeight,
    terrainGrass = 'sprites/terrainGrass.jpg',
    clouds = [];

function setup() {
    terrainGrass = loadImage(terrainGrass);
    createCanvas(sWidth, sHeight);
    player = new Plane(0, 10, true, 'sprites/airplanemain.png');
    opponents.push(new Plane(0, 0, false, 'sprites/airplane.png'));

    for (let i = 0; i < 8; i++) {
        clouds.push(new Cloud(`sprites/cloud/cloud_${round(random(-0.5, 2))}.png`),)
    }


    for (let i = 0; i < 100; i++) {
        dots[i] = new p5.Vector(random(-fieldLenX, fieldLenX), random(-fieldLenY, fieldLenY), 20);
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
    terrain();

    for (let i = 0, len = opponents.length; i < len; i++) {
        opponents[i].show();
        opponents[i].update();
    }
    pop();

    for (let i = 0, len = dots.length; i < len; i++) {
        dots[i].x += 1;
        dots[i].y += 1;
    }

    translate(halfWidth, halfHeight);
    player.show();
}