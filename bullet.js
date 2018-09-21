class Bullet {

    constructor(img, pos, speed) {
        this.bulletImg = img;
        this.pos = pos;
        this.speed = speed;
        this.spriteIndex = 2;
        this.spriteHeight = this.bulletImg.height / 3;
    }

    update() {
        this.pos.y -= this.speed;
    }

    draw() {
        push();
        translate(this.pos.x, this.pos.y);
        this.spriteIndex = floor(this.pos.y * 3 / height);
        if (this.spriteIndex < 0) this.spriteIndex = 0;
        image(this.bulletImg.get(0, this.spriteHeight * this.spriteIndex, this.bulletImg.width, this.spriteHeight), 0, 0);
        pop();
    }
}