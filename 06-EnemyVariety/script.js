const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

class Game {
  constructor() {
    this.enemies = [];
  }
  update() {

  }
  draw() {

  }
  /** Private method */
  #addNewEnemy() {

  }
}

class Enemy {
  constructor() {

  }
  update() {

  }
  draw() {

  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  /** Some code */
  requestAnimationFrame(animate)

}