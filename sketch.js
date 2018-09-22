let backgroundImg;
let shipImg;
let ship;
let bulletImg;
let bullets;
let asteroidImg;
let asteroids;

let asteroidCount = 6;
let speed = 10;

function preload() {
  backgroundImg = loadImage('./assets/bg_space.jpg');
  shipImg = loadImage('./assets/ship.png');
  bulletImg = loadImage('./assets/bullet_strip.png');
  asteroidImg = loadImage('./assets/asteroid.png');
}

function setup() {
  // put setup code here
  createCanvas(800, 600);

  ship = new Ship(shipImg, createVector(width / 2, height - shipImg.height), speed, bulletImg);
  bullets = [];
  asteroids = [];
  let y = height - shipImg.height - asteroidImg.height - (height / 20);
  for (let index = 0; index < asteroidCount; index++) {
    let x = (width / asteroidCount * index) + (height / 20);
    asteroids.push(new Asteroid(asteroidImg, createVector(x, y)));
  }
}

function draw() {
  background(0);
  image(backgroundImg, 0, 0, width, height);

  for (let index = 0; index < bullets.length; index++) {
    const bullet = bullets[index];
    bullet.update();
    bullet.draw();
    let toRemove = false;
    if (bullet.pos.y <= -100) {
      toRemove = true;
    }
    let collisionPoint = createVector(bullet.pos.x + bullet.bulletImg.width / 2, bullet.pos.y + bullet.spriteHeight / 3);

    asteroids.forEach(asteroid => {
      if (asteroid.collide(collisionPoint)) {
        toRemove = true;
      }
      ship.collide(collisionPoint);
    });
    if (toRemove) {
      bullets.splice(index, 1);
      index--;
    }
  }

  for (let index = 0; index < asteroids.length; index++) {
    const asteroid = asteroids[index];
    asteroid.update();
    asteroid.draw();
    if (asteroid.destroyed()) {
      asteroids.splice(index, 1);
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