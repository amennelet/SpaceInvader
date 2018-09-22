let backgroundImg;
let shipImg;
let ship;
let bulletImg;
let bullets;
let asteroidImg;
let asteroids;
let alienImg;
let aliens;

let asteroidCount = 6;
let alienCount = 5;
let speed = 10;

function preload() {
  backgroundImg = loadImage('./assets/bg_space.jpg');
  shipImg = loadImage('./assets/ship.png');
  bulletImg = loadImage('./assets/bullet_strip.png');
  asteroidImg = loadImage('./assets/asteroid.png');
  alienImg = loadImage('./assets/alien.png');
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
  aliens = [];
  y = alienImg.height;
  for (let index = 0; index < alienCount; index++) {
    let x = (width / alienCount * index);
    aliens.push(new Alien(alienImg, createVector(x, y), speed, bulletImg));
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
    if (bullet.pos.y <= -100 || bullet.pos.y > height + 100) {
      toRemove = true;
    }
    let collisionPoint = createVector(bullet.pos.x + bullet.bulletImg.width / 2, bullet.pos.y + bullet.spriteHeight / 3);

    asteroids.forEach(asteroid => {
      if (asteroid.collide(collisionPoint)) {
        toRemove = true;
      }
    });
    aliens.forEach(alien => {
      if (bullet.speed > 0) {
        if (alien.collide(collisionPoint)) {
          toRemove = true;
        }
      }
    });
    if (ship.collide(collisionPoint)) {
      console.log('ship dammage');
      toRemove = true;
    }
    if (toRemove) {
      bullets.splice(index, 1);
      index--;
    }
  }

  for (let index = 0; index < asteroids.length; index++) {
    const asteroid = asteroids[index];
    asteroid.draw();
    if (asteroid.destroyed()) {
      asteroids.splice(index, 1);
      index--;
    }
  }

  let leftAlien = aliens[0];
  let rightAlien = aliens[aliens.length - 1];
  let alienDir = 0;
  if (leftAlien) {
    if (leftAlien.pos.x < 0) {
      alienDir = 1;
    }
    if (rightAlien.pos.x + rightAlien.alienImg.width > width) {
      alienDir = -1;
    }

    for (let index = 0; index < aliens.length; index++) {
      const alien = aliens[index];
      if (alienDir !== 0) {
        alien.setDir(alienDir);
      }
      alien.update();
      alien.fire(bullets);
      alien.draw();
      if (alien.destroyed()) {
        aliens.splice(index, 1);
        index--;
      }
    }
  } else {
    noLoop();
    textSize(65);
    fill(255);
    text("You won!!", height / 2, width / 2 - 100);
  }

  if (ship.destroyed()) {
    noLoop();
    textSize(65);
    fill(255);
    text("You loose!!", height / 2, width / 2 - 100);
  } else {

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

    textSize(30);
    fill(255);
    text(`Hits:${ship.dammage}/${ship.armor}`, 0, 30);
  }

  if (floor(frameCount % speed) == 0) {
    if (keyIsDown(32)) { // space
      ship.fire(bullets);
    }
  }
}

function keyPressed() {
  if (keyCode === 32) { // space
    ship.fire(bullets);
  }
}