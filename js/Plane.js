"use strict";

class Plane {
    constructor(x, y, player = false, texturePath) {
        this.pos = createVector(x, y);
        this.vel = createVector(0.1, 0.001);
        this.player = player;
        this.angle = 180;
        this.rotSpeed = 0.3;
        this.mag = 2;
        this.magMax = 6;
        this.magMin = 1.7;
        this.magChangeSpeed = 1.007;
        this.texture = loadImage(texturePath);
        this.TrackItem = class {
            constructor(x, y, angle) {
                this.angleCreated = angle;
                this.x = x;
                this.y = y;
                this.lifetimeCounter = 150;
                this.lifeTimeStep = 3;
            }

            show() {
                push();
                translate(this.x, this.y);
                rotate(this.angleCreated);
                stroke(160, this.lifetimeCounter);
                strokeWeight(15);
                //todo: fix location using geometry sin cos etc...
                point(0, -20);
                point(0,  20);
                this.lifetimeCounter -= this.lifeTimeStep;
                pop();
            }
        };
        this.track = [];
    }

    update() {
        let rotatedBy = 0;
        if (this.player) {
            for (let i = 0, len = DOWNBUTTONS.length; i < len; i++) {
                if (DOWNBUTTONS[i] === 37) {
                    rotatedBy = -this.rotSpeed;
                }
                if (DOWNBUTTONS[i] === 39) {
                    rotatedBy = this.rotSpeed;
                }
                if (DOWNBUTTONS[i] === 38) {
                    this.mag = constrain(this.mag * this.magChangeSpeed, this.magMin, this.magMax);
                }
                if (DOWNBUTTONS[i] === 40) {
                    this.mag = constrain(this.mag / this.magChangeSpeed, this.magMin, this.magMax);
                }
            }
            this.angle += rotatedBy;
        }

        let newVel = this.vel.rotate(rotatedBy);
        newVel.setMag(this.mag);
        this.vel.lerp(newVel, 0.02);
        this.pos.add(p5.Vector.mult(this.vel, -1.6)); //innervation
    }

    drawTrack() {
        for (let i = 0, len = this.track.length; i < len; i++) {
            if(this.track[i]) {
                this.track[i].show();
                if (this.track[i].lifetimeCounter <= 0) {
                    this.track.pop();
                }
            }
        }
        this.track.unshift(new this.TrackItem(-this.pos.x, -this.pos.y, this.angle));
    }

    show() {

        if (!this.player) {
            push();
            translate(halfWidth, halfHeight);
        }

        rotate(this.angle);
        const imgWidthHalf = this.texture.width / 2;
        image(this.texture, -imgWidthHalf, -imgWidthHalf, this.texture.width, this.texture.height);


        rotate(-this.angle);
        if (!this.player) pop();
        this.update();

    }
}