//Hey,Compass Columbus! I have made a game for you ... Thats the deal! Bye...

//declare global variables

  var monkey;
  var sun; 
  var banana;
  var fruit;
  var obstacle;
  var obstacle1,obstacle2,obstacle3;
  var apple,pear,orange,papaya; 
  var survivalTime=0; 
  var score=0;
  var fruitGroup;
  var ostaclesGroup;
  var PLAY = 0;
  var END = 1;
  var INTRO = 2;
  var gameState = INTRO;
  var gameover;
  
 
 function preload(){
  
//load the mages here
   
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacle1 = loadImage("obstacle.png");
  obstacle2 = loadImage("stone2-removebg-preview.png");
  obstacle3 = loadImage("stoneforp5-removebg-preview.png"); 
  sunimg  = loadImage("sun_png-removebg-preview.png");
  apple = loadImage("apple_p5_png-removebg-preview.png");
  pear = loadImage("pear_p5_png-removebg-preview.png");
  orange = loadImage("orange_p5_png-removebg-preview.png");
  papaya = loadImage("papaya_p5_png-removebg-preview.png");
  gameover = loadImage("gameover-removebg-preview (1).png");
  monkeystable = loadImage("sprite_1.png");
   
 }


  function setup() {
  createCanvas(600,600);
    
  monkey = createSprite(60,490);
  monkey.addAnimation("running",monkey_running);  
  monkey.scale = 0.22;

  ground = createSprite(0,560,900,10);
  ground.shapeColor="lightgreen";   
  ground.velocityX = -4;
  ground.x = ground.width/2;

  sun = createSprite(300,80);
  sun.addImage("sun",sunimg);
    
  gameOver = createSprite(300,300);
  gameOver.visible = false;
  gameOver.addImage(gameover);
    
  monkeyStable = createSprite(60,490);
  monkeyStable.addImage(monkeystable);
  monkeyStable.scale = 0.22;  

  fruitGroup = createGroup();
  obstacleGroup = createGroup();  
  }


  function draw() {
  background("white");

//gamestates    
    
  if(gameState === INTRO) 
    { 
     monkey.visible = false;
     intro();
      
     if(keyDown("space")&&gameState == INTRO)
    {
     gameState = PLAY;
    }
      
    }
  else if(gameState === PLAY)  
    { 
      monkeyStable.destroy();
      monkey.visible = true;    
      stroke("black");
      textSize(20);
      fill("black");
      survivalTime = Math.ceil(frameCount/frameRate()*3)
      text("SURVIVAL TIME : "+survivalTime,400,50);
  
      if(keyDown("space") && gameState == PLAY && monkey.y>480)   
      {
      monkey.velocityY = -50 ;
      }  
      monkey.velocityY = monkey.velocityY +3;
      monkey.collide(ground);

      if(monkey.isTouching(fruitGroup))
      {
       fruitGroup.destroyEach();
       score = score+2;
      }
      
      if(monkey.isTouching(obstacleGroup))
      { 
      gameState = END;
      }  
        
      spawnFruits();
      spawnObstacles();  
    
    }
   else if (gameState === END)
   {
     monkey.destroy();
     gameOver.visible = true;
     
    fruitGroup.destroyEach();
    obstacleGroup.destroyEach();
   } 
    
  if(ground.x>200)
      {
      ground.x = ground.width/2;  
      }
    
  stroke("black");
  textSize(20);
  fill("black");
  text("SCORE : "+score,50,50);  
        
  drawSprites();}

//functions for Fruits and Obstacles

  function spawnFruits()
  {
  if(frameCount%110===0)
  {
   fruit = createSprite(700,600);
   fruit.velocityX = -8; 

   fruit.setLifetime =2; 
   fruit.y= Math.round(random(200,400));
   fruitGroup.add(fruit);

   r = Math.round(random(1,5));
  if(r==1){fruit.addImage("fruit1",apple);fruit.scale = 0.3}
  else if(r==2){fruit.addImage("fruit2",pear);fruit.scale = 0.3}
  else if(r==3){fruit.addImage("fruit3",orange);fruit.scale =0.2 }
  else if(r==4){fruit.addImage("fruit4",papaya);fruit.scale =0.3 }
  else if(r==5){fruit.addImage("fruit5",bananaImage);fruit.scale =0.15}  
  }
  }
    
  function spawnObstacles()   
  {if(frameCount%150===0)
  {
  obstacle = createSprite(700,510);
  obstacle.debug = false;
  obstacle.setCollider("rectangle",0,0,obstacle.width,obstacle.height);
  obstacle.velocityX = -8;
  obstacle.setLifetime = 2;
  obstacleGroup.add(obstacle);
  
  r = Math.round(random(1,3))
  if(r == 1){obstacle.addImage(obstacle1);obstacle.scale =   0.28  }
  else if(r == 2)      {obstacle.addImage(obstacle2);obstacle.scale = 0.8}
  else if(r == 3){obstacle.addImage(obstacle3);obstacle.scale = 1}  
  }
  }
  
 function intro(){
   textSize(20);
   fill("red");
   noStroke();
   
  text("A poor Monkey escaped from the zoo but is starving!",60,200);
  text("Please help grab his food and stay fresh and healthy!",60,230);
   text("You earn two points on feeding a fruit to the monkey.",60,260);
   text("When you touch an obstacle, the game is over.",60,290);
   text("Press space to start! Good luck!",120,320);
 }  