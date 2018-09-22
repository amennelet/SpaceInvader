class Asteroid {
    constructor(img, pos) {
        this.asteroidImg = img;
        this.pos = pos;
    }

    draw() {
        push();
        translate(this.pos.x, this.pos.y);
        image(this.asteroidImg, 0, 0, this.asteroidImg.width, this.asteroidImg.height);
        pop();
    }
}