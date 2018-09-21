let backgroundImg;
let shipImg;
let ship;
let bulletImg;

function preload() {
  backgroundImg = loadImage('./assets/bg_space.jpg');
  shipImg = loadImage('./assets/ship.png');
  bulletImg = loadImage('./assets/bullet_strip.png');
}

function setup() {
  // put setup code here
  createCanvas(800, 600);
  ship = new Ship(shipImg, width / 2, height - shipImg.height, 10, bulletImg);
}

function draw() {
  background(0);
  image(backgroundImg, 0, 0, width, height);
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
}

function keyPressed() {
  if (keyCode === 32) { // space
    ship.fire();
  }
}