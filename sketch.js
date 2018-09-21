let backgroundImg;
let shipImg;
let ship;

function preload() {
  backgroundImg = loadImage('./assets/bg_space.jpg');
  shipImg = loadImage('./assets/ship.png');
}

function setup() {
  // put setup code here
  createCanvas(800, 600);
  ship = new Ship(shipImg, width / 2, height - shipImg.height, 10);
}

function draw() {
  background(0);
  image(backgroundImg, 0, 0, width, height);
  ship.update();
  ship.draw();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    ship.moveLeft();
  } else if (keyCode === RIGHT_ARROW) {
    ship.moveRight();
  }
}

function keyReleased() {
  ship.stop();
}