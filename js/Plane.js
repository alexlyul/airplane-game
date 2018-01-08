class Plane {
    constructor(x, y, player = false) {
        this.pos = createVector(x, y);
        this.vel = createVector(0.1, 0.001);
        this.player = player;
        this.angle = -180;
        this.rotSpeed = 0.3;
        this.mag = 2;
        this.magMax = 6;
        this.magMin = 1.7;
        this.magChangeSpeed = 1.007;
    }

    update() {
        let rotatedBy = 0;
        if (keyIsPressed === true) {
            //No switch statements!
            if (keyCode === 37) {
                rotatedBy = -this.rotSpeed;
            }
            if (keyCode === 39) {
                rotatedBy = this.rotSpeed;
            }
            if (keyCode === 38) {
                this.mag = constrain(this.mag * this.magChangeSpeed, this.magMin, this.magMax);
            }
            if (keyCode === 40) {
                this.mag = constrain(this.mag / this.magChangeSpeed, this.magMin, this.magMax);
            }
            this.angle += rotatedBy;
        }

        let newvel = this.vel.rotate(rotatedBy);
        newvel.setMag(this.mag);
        this.vel.lerp(newvel, 0.02);
        this.pos.add(p5.Vector.mult(this.vel, -1.6)); //innervation
    }

    show() {
        if (this.player) {
            rotate(this.angle);
            const imgWidthHalf = mainPlayerImg.width / 2;
            image(mainPlayerImg, 0 - imgWidthHalf, 0 - imgWidthHalf, mainPlayerImg.width, mainPlayerImg.height);
            rotate(-this.angle);
        }

    }
}