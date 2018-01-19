"use strict";

/**
 * speed -> p5.Vector()
 */
class Cloud {
    constructor(url) {
        if (!url) {
            throw new Error("Image URL is not defined");
        }
        this.x = round(random(-fieldLenX, fieldLenX));
        this.y = round(random(-fieldLenY, fieldLenY));
        this.speed = new p5.Vector(0.5, 0.5);
        this.texture = loadImage(url, () => {
        }, (e) => {
            throw new Error(`Image ${url} is not loaded, Error: ${e}`)
        });
    }

    show() {
        image(this.texture, this.x, this.y);

        if ((this.x > fieldLenX + 300) || (this.y > fieldLenY + 300)) {
            this.x = -fieldLenX - 300;
            this.y = round(random(-fieldLenY - 300));
        }
        this.x += this.speed.x;
        this.y += this.speed.y;
    }
}

