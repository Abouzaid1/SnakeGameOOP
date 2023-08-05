let snake = document.getElementById("snake")
let food = document.getElementById("food")
let score = document.getElementById("score")
let highscore = document.querySelectorAll("#highscore")
let canvas = document.getElementById("canvas")
let start = document.getElementById("start")
let screen = document.querySelector(".screen")
let screenLose = document.querySelector(".screenlose")
let arrows = Array.from(document.querySelectorAll("#arrow"))


class SnakeGame{
    constructor(){
        this.canavsWidth = window.innerWidth < 500 ? 300 : 500;
        this.canavsWidthPx = this.canavsWidth - 25
        this.x = 0
        this.y = 0
        this.counter = 0
        this.interval
        this.velocity = 100
        this.keyCode
        this.snakeVal = []
        this.snakeBody = Array.from(document.querySelectorAll(".body"))
        this.restBodyVal = []
        this.arrowId
        this.loseIdentfier = false
    }
    localStorage(){
      if(localStorage.getItem("highscore")!=null){
        highscore.forEach(item =>{

          item.innerText = localStorage.getItem("highscore")
        })
      }
    }
    startGame(){
      start.addEventListener("click",()=>{
        screen.classList.add("d-none")
      })
    }
    arrowsfunc(){
      arrows.forEach(item =>{
        item.addEventListener("click",()=>{
          this.arrowId = item.getAttribute("data-key")
          // this.keyCode = this.arrowId
            if(this.arrowId == "left" && this.keyCode != "right"){
              this.keyCode = this.arrowId
            }else if (this.arrowId == "right" && this.keyCode != "left") {
              this.keyCode = this.arrowId
            } else if (this.arrowId == "up" && this.keyCode != "down") {
              this.keyCode = this.arrowId
            } else if (this.arrowId == "down" && this.keyCode != "up") {
              this.keyCode = this.arrowId
            }
         })
        })
      }

    moveRight(){
        if(this.x==this.canavsWidthPx){
            // this.x = 0
            this.stopGame()
            this.loseIdentfier = true
        }else{
          this.snakeVal.unshift({ x: this.x, y: this.y});
            this.x += 25    
            snake.style.left = this.x + "px"
        }
        this.snakeTouchFood()
    }
    moveLeft(){
        if(this.x==0){
            // this.x = 475
            this.stopGame()
            this.loseIdentfier = true
        }else{
          this.snakeVal.unshift({ x: this.x, y: this.y});
            this.x -= 25 
            snake.style.left = this.x + "px"
        }
        this.snakeTouchFood()
    }
    moveDown(){
        if(this.y==this.canavsWidthPx){
            // this.y = 0
            this.stopGame()
            this.loseIdentfier = true
        }else{
          this.snakeVal.unshift({ x: this.x, y: this.y});
            this.y += 25 
            snake.style.top = this.y + "px"
        }
        this.snakeTouchFood()
    }
    moveUp(){
        if(this.y==0){
            // this.y =475
            this.stopGame()
            this.loseIdentfier = true
        }else{
          this.snakeVal.unshift({ x: this.x, y: this.y});
            this.y -= 25 
            snake.style.top = this.y + "px"
        }


        this.snakeTouchFood()
    }
    eventListeners(){
        document.addEventListener("keydown", (event) => {
            if ((event.keyCode === 39 && this.keyCode !== 37)) {
              this.keyCode = event.keyCode;
            } else if (event.keyCode === 37 && this.keyCode !== 39) {
              this.keyCode = event.keyCode;
            } else if (event.keyCode === 38 && this.keyCode !== 40) {
              this.keyCode = event.keyCode;
            } else if (event.keyCode === 40 && this.keyCode !== 38) {
              this.keyCode = event.keyCode;
            }
          });
          this.interval = setInterval(() => {
            if (this.keyCode === 39 || this.keyCode == "right") {
              this.moveRight();
            } else if (this.keyCode === 37 || this.keyCode == "left") {
              this.moveLeft();
            } else if (this.keyCode === 38 || this.keyCode == "up") {
              this.moveUp();
            } else if (this.keyCode === 40 || this.keyCode == "down") {
              this.moveDown();
            }
            this.LoseIdentifierFunc()
            this.gameOver()
          }, this.velocity);   
    }

    foodPosition(){
      this.foodX =   Math.floor(Math.random() * (this.canavsWidthPx  / 25)) * 25;
      this.foodY  = Math.floor(Math.random() * (this.canavsWidthPx  / 25)) * 25;
      food.style.left = this.foodX + 'px'
      food.style.top = this.foodY + 'px'
    }

    overlap(){
      this.snakeBody.forEach(item=>{
        while(item.style.left == this.foodX +"px" && item.style.top == this.foodY + "px"){
          this.foodPosition()
          console.log(item);
          console.log("overLapped");
        }
      })
    }

    removeLastTwoChars(string) {
      const length = string.length;
      const newString = string.slice(0, length - 2);
      return newString;
    }

    snakeTouchFood(){   
        if(this.x === this.foodX && this.y === this.foodY){
            this.foodPosition()
            this.counter += 1
            score.innerText = this.counter
            this.velocity -= 0.5
            this.body = document.createElement("div")
            this.body.className = "snake"
            this.body.classList.add("color5-bg")
            this.body.classList.add("body")
            canvas.append(this.body)
            setInterval(()=>this.snakeBodyMove(),10)
            this.snakeBody = Array.from(document.querySelectorAll(".body"))
            const eatSound = document.getElementById("eatSound");
        eatSound.currentTime = 0; // Reset the sound to the beginning
        eatSound.play(); 
          }  
    }

    snakeBodyMove(){
      this.snakeBody[0].style.top = this.snakeVal[0].y+ "px"
      this.snakeBody[0].style.left = this.snakeVal[0].x + "px"
      for(let i = this.snakeBody.length-1; i > 0; i--){
        this.snakeBody[i].style.top = this.snakeVal[i].y+ "px"
        this.snakeBody[i].style.left = this.snakeVal[i].x + "px"
        } 
        // console.log(this.snakeBody);
      this.overlap()
      }

      gameOver(){
        this.snakeBody.forEach(item=>{
          if(item.style.left == this.x +"px" && item.style.top == this.y + "px"){
            this.stopGame()
            this.loseIdentfier = true

          }
        })
       this.LoseIdentifierFunc()
      }

      stopGame(){
        if(localStorage.getItem("highscore")!=null){
          if(localStorage.getItem("highscore")<this.counter){
            localStorage.setItem("highscore",this.counter)
          }
        }else{
          localStorage.setItem("highscore",this.counter)
        }
        screenLose.classList.add("d-block")
        
      }

      LoseIdentifierFunc(){
        if(this.loseIdentfier == true){
          location.reload()
          console.log("reload");
        }
      }
    }

    let snakegame = new SnakeGame
    snakegame.localStorage()
    snakegame.startGame()
    snakegame.arrowsfunc()
    snakegame.eventListeners()
    snakegame.snakeTouchFood()
    snakegame.foodPosition()
    snakegame.overlap()
    snakegame.gameOver()
    snakegame.LoseIdentifierFunc()

    
