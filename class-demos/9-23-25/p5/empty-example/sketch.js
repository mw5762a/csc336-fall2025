let dots = []; 

// runs automatically - this is where you can set things up for the whole program 
function setup() {
 createCanvas(400,400); 

 // the location is going to be relative to the canvas height and width 
  for (let i = 0; i < 100; i++)
  {
   let dot = new Dot(width/2, height/2, i); 
   dots.push(dot); 
  }

}

// this is the update function 
function draw() {
  background(0,0,0); // r,g,b
  for (let dot of dots)
  {
    dot.draw(); 
  }
}

class Dot {
  constructor(x,y, id) {
    this.x = x; 
    this.y = y; 
    this.id = id
    this.hue = Math.random() * 360; 
    this.radius = 100 - dots.length - this.id *2; 

    this.velocityX = random(-5, 5); 
    this.velocityY = random(-5,5); 
  }

  draw() {
    this.x += this.velocityX
    this.y +=this.velocityY

    if (this.x > width || this.x < 0){
      this.velocityX *=-1
    }
    if (this.y > height || this.y < 0){
      this.velocityY *=-1
    }

    fill(this.hue, 60, 100); 
    elipse(this.x, this.y, this.radius); 
  }
}