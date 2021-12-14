var mic;

function preload() {

  song = loadSound('../../cache/accompaniment/SlbfAYvA_gI.mp3')

}
function setup() {
  createCanvas(600, 600);

  //rectMode(CENTER);
  song.loop();

  //amplitude
  analyzer = new p5.Amplitude(0, 5);
  analyzer.setInput(song);
  //mic
  mic = new p5.AudioIn()
  mic.start();

}

function draw() {
  background(220);
  var color1 = color(255, 153, 204);
  var color2 = color(153,204,255);
  var color3 = color(255, 0, 0);
  var color4 = color(255,215,0);
  setGradient(0, 0, 600, 600, color3, color4, "Y");
  /*for (var i = 0; i < 30; i++) {
  var w = random(600);
  var y = random(400);
  //noStroke();
  stroke(255);
  fill(255);
  ellipse(w, y, 3, 3);
}*/
  //create a variable that will hold the mic volume
  //it will be between 0 and 1
  micLevel = mic.getLevel();
  //text(micLevel,200,200);
  var level = analyzer.getLevel();
  //text(level,200,300);
  var songCurrentTime=round(song.currentTime());
  textSize(10);
  text(songCurrentTime,10,20);

  //lyric part
  var lyricData=[
  {
    "timeStart": 0,
    "timeStop": 23.9,
    "lyrics": "",
    "visualState":0,
    "textState":1,
  },
  {
    "timeStart": 17,
    "timeStop": 24,
    "lyrics": "Loving can hurt, loving can hurt sometimes",
    "visualState":1
  },
  {
    "timeStart": 25,
    "timeStop": 33,
    "lyrics": "But it's the only thing that I know",
    "visualState":1
  },
  {
    "timeStart": 34,
    "timeStop": 42,
    "lyrics": "When it gets hard, you know it can get hard sometimes",
    "visualState":2
  },
  {
    "timeStart": 43,
    "timeStop": 52.5,
    "lyrics": "It is the only thing makes us feel alive",
    "visualState":2
  },
  {
    "timeStart": 52.6,
    "timeStop": 57.5,
    "lyrics": "We keep this love in a photograph",
    "visualState":3
  },
  {
    "timeStart": 57.57,
    "timeStop": 61.1,
    "lyrics": "We made these memories for ourselves",
    "visualState":3
  },
  {
    "timeStart": 61.26,
    "timeStop": 63.7,
    "lyrics": "Where our eyes are never closing",
    "visualState":3
  },
  {
    "timeStart": 63.8,
    "timeStop": 66.05,
    "lyrics": "Hearts are never broken",
    "visualState":3
  },
  {
    "timeStart": 66.06,
    "timeStop": 69.6,
    "lyrics": "And time's forever frozen still  ",
    "visualState":3
  },
  {
    "timeStart": 69.75,
    "timeStop": 72,
    "lyrics": "So you can keep me",
    "visualState":1
  },
  {
    "timeStart": 72.58,
    "timeStop": 77,
    "lyrics": "Inside the pocket of your ripped jeans ",
    "visualState":1
  },
  {
    "timeStart": 77.11,
    "timeStop": 81,
    "lyrics": "Holding me closer 'til our eyes meet ",
    "visualState":2
  },
  {
    "timeStart": 81.6,
    "timeStop": 90,
    "lyrics": "You won't ever be alone, wait for me to come home ",
    "visualState":2
  }
]


//loop through lyric list
  var currentLyricText = "";
  for(var x=0;x<lyricData.length;x++){
   if(songCurrentTime >= lyricData[x].timeStart && songCurrentTime < lyricData[x].timeStop){
     textSize(24);
     textAlign(CENTER);
     currentLyricText = lyricData[x].lyrics;
     visualState = lyricData[x].visualState;
     textState = lyricData[x].textState;
    }
  }

  var circleSize = map(level,0,1,80,150);



  if(visualState==0){
    //noFill();
    background("green");
    fill(255);
    ellipse(300,170,circleSize,circleSize);
    rect(150,250,300,10);
    rect(150,290,300,10);
    ellipse(300,370,circleSize,circleSize);
    textSize(45);
    text("E D  S H E E R A N",300,80);
    text("P H O T O G R A P H",300,490);

    //set lyric color
    fill("red");

  }
  var circleSize2 = map(level,0,1,10,50);
  var micLevelShapeSize = map(micLevel,0,0.5,10,80);

  if(visualState==1){

  fill(230,230,250);
  stroke(230,230,250);
  ellipse(300,360,100+(2*micLevelShapeSize),100+(2*micLevelShapeSize));
  noFill();
   stroke(255,20,147);
  ellipse(300,360,250+circleSize2,250+circleSize2);
  stroke(255);
  ellipse(300,360,320,320);
   stroke(255,20,147);
  ellipse(300,360,380+circleSize2,380+circleSize2);
  fill("white");
  stroke("white");
  line(0,600,600,200);
  line(0,500,600,100);
  line(0,550,600,150);

    //set the font color
    fill("red");

  }
  if(visualState==2){
  fill(221,160,221);
  stroke(221,160,221);
  ellipse(300,360,100+(2*micLevelShapeSize),100+(2*micLevelShapeSize));
  noFill();
   stroke(221,160,221);
  ellipse(300,360,250+circleSize2,250+circleSize2);
  stroke(255);
  ellipse(300,360,320,320);
   stroke(221,160,221);
  ellipse(300,360,380+circleSize2,380+circleSize2);
  fill("white");
  stroke("white");
  line(0,600,600,200);
  line(0,500,600,100);
  line(0,550,600,150);
  }
  if(visualState==3){
  fill(255,140,200);
  stroke(255,140,200);
  ellipse(150,330,50+(2*micLevelShapeSize),50+(2*micLevelShapeSize));
  ellipse(380,410,100+circleSize2,100+circleSize2);
  noFill();
  stroke("white");
  ellipse(380,410,150,150);
  ellipse(380,410,180+circleSize2,180+circleSize2);
  stroke(255);
  ellipse(380,410,200,200);
  rect(100,280,400,250);
  rect(130,250,80,30);
  rect(390,250,60,30);
  rect(380,240,80,30);
  }

  //display the lyric text
  text(currentLyricText,300,130);
}


function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  if (axis == "Y") {  // Top to bottom gradient
    for (let i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }
  else if (axis == "X") {  // Left to right gradient
    for (let j = x; j <= x+w; j++) {
      var inter2 = map(j, x, x+w, 0, 1);
      var d = lerpColor(c1, c2, inter2);
      stroke(d);
      line(j, y, j, y+h);
    }
  }

}
function processVisualState(visualState){


  //based on the visual state, change the background

 if(visualState==0){
  //setGradient(0, 0, 600, 600, color3, color4, "Y");
   background(255,0,0);
  }
  if(visualState==2){
  setGradient(0, 0, 600, 600, color3, color4, "Y");
  }
  if(visualState==3){
  setGradient(0, 0, 600, 600, color1, color2, "Y");
  }
  if(visualState==4){
  setGradient(0, 0, 600, 600, color1, color2, "Y");
  }

}
