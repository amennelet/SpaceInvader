class Ship extends Destructible {
    constructor(img, pos, speed, bulletImg) {
        super(pos, img.width, img.height);
        this.pos = pos;
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
        if (this.dammage <= 10) {
            push();
            translate(this.pos.x, this.pos.y);
            image(this.shipImg, 0, 0);
            pop();
        }
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
        return new Bullet(this.bulletImg, createVector(this.pos.x + this.shipImg.width / 2 - this.bulletImg.width / 2, this.pos.y - this.bulletImg.height / 6), this.speed + 5);
    }
}