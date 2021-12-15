let Shader;
let pinned;
let sound;
const balls=[],radius=20,num=64,maxSpeed=15;
const G=radius/num*20;
function preload(){
  Shader=getShader(this._renderer);
}
function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  for (let i=0;i<num;i++) {
    let a=random(2*PI);
    let b={
      x:random(width),
      y:random(height),
      vx:cos(a),
      vy:sin(a),
      rad:20
    }
    balls.push(b);
  }
  ft = new p5.FFT(0.7,64);
  const audioTag = document.getElementById('audio-1');
  audioTag.addEventListener('play', (e) => {
    sound.play();
  });
  audioTag.addEventListener('pause', (e) => {
    sound.pause();
  });
  sound=loadSound('assets/accompaniment/ZEMBDKMtHqM.mp3');
}
function draw() {
  let data=[];
  if (mouseIsPressed) {pinned.vx=0;pinned.vy=0;pinned.x=mouseX;pinned.y=mouseY;}
  if (!keyIsDown(32)) {
    for (let b of balls) {
      for (let bb of balls) {
        if (b!=bb) {
          let dstSq=(b.x-bb.x)**2+(b.y-bb.y)**2;
          if (dstSq<((b.rad+bb.rad)/2)**2) {dstSq=((b.rad+bb.rad)/2)**2;}
          let f=G*b.rad*bb.rad/dstSq;
          let a=atan2(bb.y-b.y,bb.x-b.x);
          b.vx=constrain(b.vx+cos(a)*f/b.rad,-maxSpeed,maxSpeed);
          b.vy=constrain(b.vy+sin(a)*f/b.rad,-maxSpeed,maxSpeed);
        }
      }
    }
  } else {
    for (let b of balls) {
      let f=(num/radius);
      let a=atan2(mouseY-b.y,mouseX-b.x);
      b.vx=constrain(b.vx+cos(a)*f/b.rad,-maxSpeed,maxSpeed);
      b.vy=constrain(b.vy+sin(a)*f/b.rad,-maxSpeed,maxSpeed);
    }
  }
  let freq=ft.analyze();
  for (let i=0;i<64;i++) {
    b=balls[i];
    b.x+=b.vx;
    b.y+=b.vy;
    if (b.x<       b.rad) {b.x=      b.rad;b.vx*=-1;}
    if (b.x>width -b.rad) {b.x=width -b.rad;b.vx*=-1;}
    if (b.y<       b.rad) {b.y=      b.rad;b.vy*=-1;}
    if (b.y>height-b.rad) {b.y=height-b.rad;b.vy*=-1;}
    data.push(b.x,b.y,freq[i]/5);
  }
  shader(Shader);
  Shader.setUniform("balls",data);
  rect(0,0,width,height);
  //print(frameRate());
}
function mousePressed() {
  pinned=balls[0];
  let dst=(pinned.x-mouseX)**2+(pinned.y-mouseY)**2;
  for (let i=1;i<balls.length;i++) {
    let d=(balls[i].x-mouseX)**2+(balls[i].y-mouseY)**2;
    if (d<dst) {dst=d;pinned=balls[i];}
  }
}
function getShader(_renderer) {
  const vert = `
    precision highp float;
    attribute vec3 aPosition;
    attribute vec2 aTexCoord;
    varying vec2 vTexCoord;
    void main() {
      vTexCoord = aTexCoord;
      vec4 positionVec4=vec4(aPosition,1.);
      positionVec4.xy=positionVec4.xy*2.-1.;
      gl_Position = positionVec4;
    }
  `;
  const frag = `
    precision highp float;
    varying vec2 vTexCoord;
    const float WIDTH=${windowWidth}.;
    const float HEIGHT=${windowHeight}.;
    uniform vec3 balls[${num}];
    void main() {
      float x=vTexCoord.x*WIDTH;
      float y=HEIGHT-vTexCoord.y*HEIGHT;
      float r=0.;
      for (int i=0;i<${num};i++) {
        vec3 b=balls[i];
        r+=b.z*b.z/((b.x-x)*(b.x-x)+(b.y-y)*(b.y-y));
      }
      //r=pow(r,3./4.);
      float g=(r-.5)*2.;
      float b=(r-5./6.)*6.;
      gl_FragColor = vec4(r,g,b,1.);
    }
  `;
  return new p5.Shader(_renderer, vert, frag);
}