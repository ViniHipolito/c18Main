var trex, trex_running, trex_Down;
var edges;
var ground, ground_image;
var invisible_ground;
var cloud, cloudImg;
var score = 0;
var cactus1,cactus2,cactus3,cactus4,cactus5,cactus6;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var trexCollider;
var gameover, gameoverImg, restart, restartImg;
var jumpSound, checkPointSound, dieSound;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trexCollider = loadAnimation("trex_collided.png");
  trex_Down = loadAnimation("trex_low1.png", "trex_low1.png", "trex_low2.png", "trex_low2.png");
  ground_image = loadImage("ground2.png");
  cloudImg = loadImage("cloud.png");
  cactus1 = loadImage("obstacle1.png");
  cactus2 = loadImage("obstacle2.png");
  cactus3 = loadImage("obstacle3.png");
  cactus4 = loadImage("obstacle4.png");
  cactus5 = loadImage("obstacle5.png");
  cactus6 = loadImage("obstacle6.png");
  gameoverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  jumpSound = loadSound("jump.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
  dieSound = loadSound("die.mp3");
}


function setup() {
  createCanvas(windowWidth,windowHeight);

  invisible_ground = createSprite(width/2,height - 10,width,10);
  invisible_ground.visible = false;

  trex = createSprite(50, height - 40, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collider", trexCollider);
  trex.addAnimation("down", trex_Down);
  trex.scale = 0.5;
  trex.setCollider("rectangle",0,0,100,trex.height);
  trex.debug = false;

  edges = createEdgeSprites();

  ground = createSprite(width/2,height - 20,width,20);
  ground.x = ground.width / 2;
  ground.addImage("ground", ground_image);

  gameover = createSprite(width/2,height/2);
gameover.addImage("gameover", gameoverImg);
gameover.scale = 0.5;
gameover.visible = false;

 restart = createSprite(width/2,height/2 +40);
 restart.addImage("restart", restartImg);
 restart.scale = 0.5;
 restart.visible = false;


//var test = Math.round(random(1,100));
//console.log (test);
//console.log("olá"+"mundo");
CactusG = new Group;
CloudG = new Group;

}

function draw() {
  background('white');
textSize(30);
text("Score: "+score,width - 175,50);
//console.log("Isto é",gamestate);

if (gamestate === PLAY){
  ground.velocityX = -(6 + score / 1000);
  score = score + Math.round(getFrameRate() / 60 );  
  if (score > 0 && score % 250 === 0){
    checkPointSound.play();
  }
  if (ground.x<0){
    ground.x = ground.width / 2;
  }
  if(touches.length>0 || keyDown("space")){
    if(trex.y>=height-40){
      trex.velocityY = -10;
      jumpSound.play();
      touches = [];
  }
}

if (keyDown("Down_Arrow")&& trex.y >=160) {
  trex.changeAnimation("down", trex_Down);
  }
  else {
    trex.changeAnimation("running", trex_running);
  }
  trex.velocityY = trex.velocityY + 0.5;
  createClouds();
  createCactus();
  if (CactusG.isTouching(trex)){
    gamestate = END;
    dieSound.play();
    //trex.velocityY = -10;
    //jumpSound.play();
  }
}
else if (gamestate === END) {
  ground.velocityX = 0;
  trex.velocityY = 0;
  restart.visible = true;
  trex.changeAnimation("collider", trexCollider);
  CactusG.setLifetimeEach(-1);
  CloudG.setLifetimeEach(-1);
  CactusG.setVelocityXEach(0);
  CloudG.setVelocityXEach(0);
  gameover.visible = true;
  if(mousePressedOver(restart)||touches.length>0){
    touches = [];
    reset();
   }

}

  //trex.collide(edges[3]);
  trex.collide(invisible_ground);

  //console.log (frameCount);

  drawSprites();
}
function reset(){
  gamestate = PLAY;
  gameover.visible = false;
  restart.visible = false;
  CactusG.destroyEach();
  CloudG.destroyEach();
  trex.changeAnimation("running", trex_running);
  score = 0;
}
function createCactus(){
  if (frameCount%60===0){
  var cactus = createSprite(width + 10,height - 35,10,40);
  cactus.velocityX = -(6 + score / 1000);
var nunrandom = Math.round(random(1,6));
switch (nunrandom){
  case 1: cactus.addImage(cactus1);
  break;

  case 2: cactus.addImage(cactus2);
  break;

  case 3: cactus.addImage(cactus3);
  break;

  case 4: cactus.addImage(cactus4);
  break;

  case 5: cactus.addImage(cactus5);
  break;

  case 6: cactus.addImage(cactus6);
  break;
  default: break;
}
cactus.scale = 0.5;
cactus.lifetime = width + 10;
CactusG.add(cactus);
}
}

function createClouds(){
  if (frameCount%60===0){

  
cloud = createSprite(width + 10,height - 100,10,10);
cloud.addImage("cloud", cloudImg);
cloud.scale = 0.5;
cloud.y = Math.round(random(height - 150,height - 100));
cloud.velocityX = -3;
cloud.depth = trex.depth;
trex.depth = trex.depth+1;
console.log (cloud.depth);
console.log (trex.depth);
cloud.lifetime = width + 10;
CloudG.add(cloud);
}
}
