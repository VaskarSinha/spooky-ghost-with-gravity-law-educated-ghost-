var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost=createSprite(300,300);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;
doorsGroup=new Group();
climbersGroup=new Group();
invisibleBlockGroup=new Group();
spookySound.loop();
}

function draw() {
  background(0);
  if (gameState=="play"){
      if(tower.y > 400){
      tower.y = 300
    }
   ghost.velocityY=ghost.velocityY+0.5;
   if (keyDown("left")){
     ghost.x=ghost.x-5
   }
   if (keyDown("right")){
    ghost.x=ghost.x+5
  }
   if (keyDown("space")){
    ghost.velocityY=-5;
  }
 obstacle();
  if(ghost.isTouching(climbersGroup)){
    ghost.velocityY=0;
  }
if(ghost.isTouching(invisibleBlockGroup)||ghost.y>600){
  ghost.destroy();
  gameState="end";
}


    drawSprites();
}
if (gameState=="end"){
  textSize(30);
  fill("yellow");
  text("GAME OVER ", width/2,height/2);
}
}
function obstacle(){
  if (frameCount%100==0){
    door=createSprite(random(70,530),-10,10,10);
    door.addImage(doorImg);
    door.velocityY=4;
    door.lifetime=350;
    doorsGroup.add(door);
    ghost.depth=door.depth+1;

    climber=createSprite(door.x,door.y+50,10,10);
    climber.addImage(climberImg);
    climber.velocityY=4;
    climber.lifetime=350;
    climbersGroup.add(climber);
     climber.scale=0.7;

    invisibleBlock=createSprite(door.x,door.y+70,door.width,10);
    invisibleBlock.debug=true;
    invisibleBlock.velocityY=4;
    invisibleBlock.lifetime=350;
    invisibleBlockGroup.add(invisibleBlock);


  }
}