var PLAY =1
var END = 0
var gameState = PLAY
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var invisibleGround
var ground,groundImage
var collidedMonkey

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("ground.PNG");
  collidedMonkey = loadAnimation("sprite_7.png");
  
}



function setup() {
  createCanvas(1200,600);
  ground = createSprite(0,0,600,200);
  ground.addImage(groundImage);
  ground.scale = 2;
  ground.x = ground.width/2
  
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running" , monkey_running);
  monkey.addAnimation("collided" , collidedMonkey);
  
  monkey.scale = 0.1;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  
  
  score = 0;
}


function draw() {
  
  monkey.collide(invisibleGround);

  
 
  
  if(gameState === PLAY){
    ground.velocityX = -3;
    
    if(ground.x<0){
      ground.x = ground.width/2
    }
    
    
   
  
  
  if(keyDown("space")){
    monkey.velocityY=-12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
   score = score + Math.round(getFrameRate()/60);
    
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
    }
    
    if(obstacleGroup.isTouching(monkey)){
      gameState = END;
    }
  
  
  spawnBananas();
  spawnObstacles();
    
  
    
  }
    
    
  if (gameState === END){
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    monkey.changeAnimation("collided",collidedMonkey);
    ground.velocityX = 0;

    textSize(30);
    text("GAME HAS ENDED",300,300);
    
  }
  
  
  drawSprites();
  fill("white");
  textSize(20);
   text("Score: "+ score, 500,50);
}

function spawnBananas() {
  //write code here to spawn the bananas
  if (frameCount % 120===0) {
    var banana = createSprite(600,100,40,10);
    banana.y = Math.round(random(60,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  //write code here to spawn the obstacles
  if (frameCount % 200===0) {
    var obstacle = createSprite(600,165,10,40);
    
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    
    //adjust the depth
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}






