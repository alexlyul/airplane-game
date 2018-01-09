class Plane {
    constructor(x, y, player = false, texturePath) {
        this.pos = createVector(x, y);
        this.vel = createVector(0.1, 0.001);
        this.player = player;
        this.angle = -180;
        this.rotSpeed = 0.3;
        this.mag = 2;
        this.magMax = 6;
        this.magMin = 1.7;
        this.magChangeSpeed = 1.007;
        this.texture = loadImage(texturePath);
    }

    update() {
        let rotatedBy = 0;
        if (keyIsPressed === true && this.player) {
            //todo: make asynchronous, important: no switch
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
        let newVel = this.vel.rotate(rotatedBy);
        newVel.setMag(this.mag);
        this.vel.lerp(newVel, 0.02);
        this.pos.add(p5.Vector.mult(this.vel, -1.6)); //innervation
    }

    show() {
        if (!this.player) {
            push();
            translate(halfWidth, halfHeight);
        }
        rotate(this.angle);
        const imgWidthHalf = this.texture.width / 2;
        image(this.texture, 0 - imgWidthHalf, 0 - imgWidthHalf, this.texture.width, this.texture.height);
        rotate(-this.angle);
        if (!this.player) pop();
    }
}