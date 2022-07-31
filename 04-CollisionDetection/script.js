const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 700;
let canvasPosition = canvas.getBoundingClientRect();
const explosions = [];

class Explosion {
  constructor(x, y) { 
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth * 0.7;
    this.height = this.spriteHeight * 0.7;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = './images/boom.png';
    this.frame = 0;
    this.timer = 0;
    this.angle = Math.random() * 6.2;
    this.sound = new Audio();
    this.sound.src = './sounds/boom.wav';
  }
  update() {
    if (this.frame === 0) {
      this.sound.play()
    }
    this.timer++;
    if (this.timer % 10 === 0) { 
      this.frame++
    }
  }
  draw() { 
    /* ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh); */
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      0 - this.width / 2,
      0 - this.height / 2,
      this.width,
      this.height
    );
    ctx.restore();
  }
}
function createAnimation(e) {
  let positionX = e.x - canvasPosition.left;
  let positionY = e.y - canvasPosition.top;
  explosions.push(
    new Explosion(positionX, positionY)
  );
}

window.addEventListener('click', function (e) {
  createAnimation(e)
});
// window.addEventListener('mousemove', function (e) {
//   createAnimation(e)
// });

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let index = 0; index < explosions.length; index++) {
    explosions[index].update()
    explosions[index].draw()
    if(explosions[index].frame > 5) {
      explosions.splice(index, 1)
      index--
    }
  }
  requestAnimationFrame(animate);
};

animate();