class Plane {
    constructor(x, y, r, z = 0, player = false) {
        this.pos = createVector(x, y);
        this.r = r;
        this.vel = createVector(0.1, 0.001);
        this.player = player;
        this.angle = -180;
        this.rotSpeed = 0.3;
        this.mag = 2;
        this.magChangeSpeed = 1.007;
    }

    update() {
        let rotatedBy = 0;
        if (keyIsPressed === true) {
                if(keyCode === 37) {
                    rotatedBy = -this.rotSpeed;
                }
                if(keyCode === 39) {
                    rotatedBy = this.rotSpeed;
                }
                if(keyCode === 38) {
                    this.mag *= this.magChangeSpeed;
                }
                if(keyCode === 40) {
                    this.mag /= this.magChangeSpeed;
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

            //const angle = atan2(-(mouseY - halfHeight), -(mouseX - halfWidth));
            rotate(this.angle);
            const imgWidthHalf = mainPlayerImg.width / 2;
            image(mainPlayerImg, 0 - imgWidthHalf, 0 - imgWidthHalf, mainPlayerImg.width, mainPlayerImg.height);
            rotate(-this.angle);
        }

    }
}