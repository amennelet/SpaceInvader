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
let alienCount = 4;
let alienRows = 4;
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
  let asteroidY = height - shipImg.height - asteroidImg.height - (height / 20);
  for (let index = 0; index < asteroidCount; index++) {
    let x = (width / asteroidCount * index) + (height / 20);
    asteroids.push(new Asteroid(asteroidImg, createVector(x, asteroidY)));
  }
  aliens = [];
  for (let row = 0; row < alienRows; row++) {
    let alienOffset = row * alienImg.height * 1.5;
    y = alienImg.height - alienOffset;
    for (let index = 0; index < alienCount; index++) {
      let spaceBetween = width / (alienCount + 1);
      let x = (spaceBetween * index) + (row % 2 * (spaceBetween / 2));
      aliens.push(new Alien(alienImg, createVector(x, y), asteroidY - alienImg.height - alienOffset, speed, bulletImg));
    }
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
    let collisionPoint = createVector(bullet.pos.x + bullet.bulletImg.width / 2, bullet.pos.y + bullet.spriteHeight / 3);
    if (collisionPoint.y <= 0 || collisionPoint.y > height) {
      toRemove = true;
    }
    if (!toRemove) {
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
        toRemove = true;
      }
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
  let rightAlien = aliens[0];
  if (leftAlien) {
    for (let index = 0; index < aliens.length; index++) {
      const alien = aliens[index];
      if (alien.pos.x < leftAlien.pos.x)
        leftAlien = alien;
      if (alien.pos.x > rightAlien.pos.x)
        rightAlien = alien;
    }
    let alienDir = 0;
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
      if (alien.pos.y + alien.alienImg.height > 0)
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