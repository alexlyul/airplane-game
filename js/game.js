"use strict";
const w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    sWidth = w.innerWidth || e.clientWidth || g.clientWidth,
    sHeight = w.innerHeight || e.clientHeight || g.clientHeight
;

let player,
    planes = [],
    zoom = 1,
    mainPlayerImg;

function setup() {
    createCanvas(sWidth, sHeight);
    player = new Plane(0, 0, 64, 0, true);
    for (let i = 0; i < 200; i++) {
        const x = random(-width,width);
        const y = random(-height,height);
        planes[i] = new Plane(x, y, 16);
    }
    mainPlayerImg = loadImage("sprites/airplane.png");
}

function draw() {
    background(0);
    translate(width/2, height/2);
    scale(new p5.Vector(5, 5));
    translate(-player.pos.x, -player.pos.y);

    for (let i = planes.length-1; i >=0; i--) {
        planes[i].show();
        if (player.eats(planes[i])) {
            planes.splice(i, 1);
        }
    }

    player.show();
    player.update();

}