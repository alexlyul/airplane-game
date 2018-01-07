class Plane {
    constructor(x, y, r, z=0, player = false) {
        this.pos = createVector(x, y);
        this.r = r;
        this.vel = createVector(0,0);
        this.player = player;
    }

    update() {
        let newvel = createVector(mouseX-width/2, mouseY-height/2);
        newvel.setMag(3);
        this.vel.lerp(newvel, 0.2);
        this.pos.add(this.vel);
    }

    eats(other) {
        let d = p5.Vector.dist(this.pos, other.pos);
        if (d < this.r + other.r) {
            let sum = PI * this.r * this.r + PI * other.r * other.r;
            this.r = sqrt(sum / PI);
            //this.r += other.r;
            return true;
        } else {
            return false;
        }
    }

    show() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
        fill(0);
        line(this.pos.x, this.pos.y, this.pos.x + this.r, this.pos.y);
        if(this.player) {
            image(mainPlayerImg, this.pos.x, this.pos.y, mainPlayerImg.width/1.3, mainPlayerImg.height/1.3);
            rotate(PI/4.0);
        }

    }
}