class Alien extends Destructible {
    constructor(img, pos, maxY, speed, bulletImg) {
        super(pos, img.width, img.height, 3);
        this.alienImg = img;
        this.speed = speed;
        this.bulletImg = bulletImg;
        this.dir = 1;
        this.maxY = maxY;
    }

    setDir(dir) {
        this.dir = dir;
        this.pos.y += this.alienImg.height / 2;
    }

    update() {
        this.pos.x += this.dir;
        if (this.pos.y > this.maxY)
            this.pos.y = this.maxY;
    }

    draw() {
        push();
        translate(this.pos.x, this.pos.y);
        image(this.alienImg, 0, 0, this.alienImg.width, this.alienImg.height);
        pop();
    }

    fire(bullets) {
        if (random(0, 150) <= 1) {
            bullets.push(new Bullet(this.bulletImg, createVector(this.pos.x + this.alienImg.width / 2 - this.bulletImg.width / 2, this.pos.y + this.bulletImg.height / 6), 0 - (this.speed)));
        }
    }
}