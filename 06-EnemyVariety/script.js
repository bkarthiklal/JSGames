window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 500;
  canvas.height = 500;

  class Game {
    constructor(ctx, width, height) {
      this.ctx = ctx;
      this.width = width;
      this.height = height;
      this.enemies = [];
      this.enemyInterval = 1000;
      this.enemyTimer = 0;
      this.enemyTypes = ['worm', 'ghost']
    }
    update(deltaTime) {
      /** Delta time is to ensure same speed of rendering on
       * machines of different speed and refresh rates
       */
      if (this.enemyTimer > this.enemyInterval) {
        /** Check for enemies outside canvas and delete them */
        this.enemies = this.enemies.filter(x => !x.markedForDeletion)
        
        this.#addNewEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach(enemy => enemy.update(deltaTime));
    }
    draw() {
      this.enemies.forEach(enemy => enemy.draw());
    }
    /** Private method */
    #addNewEnemy() {
      const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemies.length)]
      if (randomEnemy === 'ghost') {
        this.enemies.push(new Ghost(this));
      } else if (randomEnemy === 'worm') {
        this.enemies.push(new Worm(this));
      }
      /** Sorts to ensure elements higher in the y axis are drawn
       * behind elements lower in the y axis
       */
      this.enemies.sort((a, b) => {
        return a.y - b.y;
      })
    }
  }

  class Enemy {
    constructor(game) {
      this.game = game;
      this.markedForDeletion = false;
    }
    update(deltaTime) {
      this.x -= this.vx * deltaTime;
      if (this.x < 0 - this.width) {
        this.markedForDeletion = true;
      }
    }
    draw() {
      this.game.ctx.drawImage(
        this.image, /** Image src */
        0, 
        0,
        this.spriteWidth,
        this.spriteHeight,
        this.x, this.y, this.width, this.height)
    }
  } 

  class Worm extends Enemy {
    constructor(game) {
      /** Super used to call parent constructor
       * call super before using this object 
       */
      super(game);
      this.spriteWidth = 229;
      this.spriteHeight = 171;
      this.width = this.spriteWidth/2;
      this.height = this.spriteHeight/2;
      this.x = this.game.width;
      /** -height to make the assets(worms), stick to the ground */
      this.y = this.game.height -this.height;
      /** In Html, an element (image) with an id, is automatically mapped to that id word 
       * Hence 'worm' image with id="worm", get assigned to "worm" keyword below
      */
      this.image = worm;
      this.vx = Math.random() * 0.1 + 0.1;
    }
  }

  class Ghost extends Enemy {
    constructor(game) {
      /** Super used to call parent constructor
       * call super before using this object 
       */
      super(game);
      this.spriteWidth = 261;
      this.spriteHeight = 209;
      this.width = this.spriteWidth/2;
      this.height = this.spriteHeight/2;
      this.x = this.game.width;
      /** 0.8 to restrict the asset render to 80% of height from top */
      this.y = this.game.height * Math.random() * 0.8;
      /** In Html, an element (image) with an id, is automatically mapped to that id word 
       * Hence 'ghost' image with id="ghost", get assigned to "ghost" keyword below
      */
      this.image = ghost;
      this.vx = Math.random() * 0.1 + 0.3;
    }
  }


  const game = new Game(ctx, canvas.width, canvas.height);
  let lastTime = 1;
  function animate(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    game.update(deltaTime);
    game.draw();
    /** Some code */
    requestAnimationFrame(animate)
  };
  animate(0);
})