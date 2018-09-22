class Destructible {
    constructor(pos, width, height, armor) {
        this.pos = pos;
        this.width = width;
        this.height = height;
        this.armor = armor;
        this.dammage = 0;
    }

    collide(point) {
        let isCollision = point.x > this.pos.x &&
            point.x < this.pos.x + this.width &&
            point.y > this.pos.y &&
            point.y < this.pos.y + this.height;

        if (isCollision) {
            this.dammage += 1;
        }
        return isCollision;
    }

    destroyed() {
        return this.dammage >= this.armor;
    }
}