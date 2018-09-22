class Asteroid extends Destructible {
    constructor(img, pos) {
        super(pos, img.width, img.height);
        this.asteroidImg = img;
    }

    update() {
    }

    draw() {
        push();
        translate(this.pos.x, this.pos.y);
        image(this.asteroidImg, 0, 0, this.asteroidImg.width, this.asteroidImg.height);
        pop();
    }

    destroyed() {
        return this.dammage > 5;
    }
}