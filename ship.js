class Ship {

    constructor(img, x, y, speed) {
        this.pos = createVector(x, y);
        this.shipImg = img;
        this.dir = 0;
        this.speed = speed;
    }

    update() {
        this.pos.x += this.dir;
    }

    draw() {
        push();
        translate(this.pos.x, this.pos.y);
        image(this.shipImg, 0, 0);
        pop();
    }

    moveLeft() {
        this.dir = -this.speed;
    }

    moveRight() {
        this.dir = this.speed;
    }

    stop() {
        this.dir = 0;
    }
}