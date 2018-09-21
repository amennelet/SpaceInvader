let backgroundImg;
let shipImg;
let ship;
let bulletImg;
let bullets;
let speed;

function preload() {
  backgroundImg = loadImage('./assets/bg_space.jpg');
  shipImg = loadImage('./assets/ship.png');
  bulletImg = loadImage('./assets/bullet_strip.png');
}

function setup() {
  // put setup code here
  createCanvas(800, 600);

  speed = 10;
  ship = new Ship(shipImg, width / 2, height - shipImg.height, speed, bulletImg);
  bullets = [];
}

function draw() {
  background(0);
  image(backgroundImg, 0, 0, width, height);

  for (let index = 0; index < bullets.length; index++) {
    const bullet = bullets[index];
    bullet.update();
    bullet.draw();
    if (bullet.pos.y <= -100) {
      bullets.splice(index, 1);
      index--;
    }
  }

  if (keyIsDown(LEFT_ARROW)) {
    ship.moveLeft();
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    ship.moveRight();
  }
  else {
    ship.stop();
  }
  ship.update();
  ship.draw();

  if (floor(frameCount % speed) == 0) {
    if (keyIsDown(32)) { // space
      bullets.push(ship.fire());
    }
  }
}

function keyPressed() {
  if (keyCode === 32) { // space
    bullets.push(ship.fire());
  }
}