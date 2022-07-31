const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 700;
let canvasPosition = canvas.getBoundingClientRect();
const explosions = [];

class Explosion {
  constructor(x, y) { 
    this.x = x;
    this.y = y;
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.image = new Image();
    this.image.src = './images/boom.png';
    this.frame = 0;

  }
  update() {
    this.frame++
  }
  draw() { 
    /* ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh); */
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

window.addEventListener('click', function (e) {
  ctx.fillStyle = '#fff';
  // ctx.fillRect(e.x - canvasPosition.left, e.y - canvasPosition.top, 50, 50); // Draws at the click position
  ctx.fillRect(e.x - canvasPosition.left - 25, e.y - canvasPosition.top - 25, 50, 50); // Draws from center of click position
});