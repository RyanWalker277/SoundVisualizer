var song
var fft
var particles = []

function preload() {
  song = loadSound('test.mp3')
}

function setup() {
  createCanvas(1536 , 713);
  fft = new p5.FFT()
  angleMode(DEGREES)
}

function draw() {
  background(0);
  stroke(255)
  noFill() //for removing fill when using beginshape and endhsape

  translate(width/2 , height/2) //to place circle in the center of the canvas

  var wave = fft.waveform()

  for(var t = -1 ; t<=1;t+=2)
  {
    beginShape() //for connecting all dots with a line
    for(var i = 0 ; i<180;i+=0.5){
      var index = floor(map(i,0,180,0,wave.length-1)) //we used floor to convert everything to an integer
      var r = map(wave[index],-1,1,150,350)
      var x = r * sin(i) * t
      var y = r * cos(i)
      vertex(x,y)
    }
    endShape() //for connecting all dots with a line
  }

  var p = new particle()
  particles.push(p)

  for(var i = particles.length-1 ; i >=0  ; i--){
    
    if(!particles[i].edges()){
      particles[i].update()
      particles[i].show()
    }
    else{
      particles.splice(i,1)
    }

  }

}

function mouseClicked(){
  if(song.isPlaying()){
    song.pause()
    noLoop() //for freezing the canvas on pausing the sound
  }
  else{
    song.play()
    loop()
  }
}

class particle{
  constructor(){
    this.pos = p5.Vector.random2D().mult(250)
    this.velocity = createVector(0,0)
    this.acc = this.pos.copy().mult(random(0.001 , 0.0001))

    this.w = random(3,5)

    this.color = [random(200 , 255) , random(200 , 255) , random(200 , 255)]
  }

  update(){
    this.velocity.add(this.acc)
    this.pos.add(this.velocity)
  }

  edges(){
    if(this.pos.x < -width/2 || this.pos.x > width/2 || this.pos.y < -height/2 || this.pos.y > height/2){
      return true
    }
    else{
      return false
    }
  }

  show(){
    noStroke
    fill(this.color)
    ellipse(this.pos.x , this.pos.y , this.w)
  }
}