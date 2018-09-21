class Ship {

    constructor(img, x, y, speed, bulletImg) {
        this.pos = createVector(x, y);
        this.shipImg = img;
        this.dir = 0;
        this.speed = speed;
        this.bulletImg = bulletImg;
    }

    update() {
        this.pos.x += this.dir;
        if (this.pos.x <= 0) {
            this.stop();
            this.pos.x = 0;
        }
        if (this.pos.x + this.shipImg.width >= width) {
            this.stop();
            this.pos.x = width - this.shipImg.width;
        }
    }

    draw() {
        push();
        translate(this.pos.x, this.pos.y);
        image(this.shipImg, 0, 0);
        pop();
    }

    moveLeft() {
        this.dir = 0 - this.speed;
    }

    moveRight() {
        this.dir = this.speed;
    }

    stop() {
        this.dir = 0;
    }

    fire() {
        return new Bullet(this.bulletImg, createVector(this.pos.x, this.pos.y), this.speed + 5);
    }
}