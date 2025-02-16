////////////////////////////////////////UPDATES///////////////////////
/*
- Added Graphics
- Added multiple Collission bodies
- Added explosive TNT
- Used random generation for blocks,propeller, birds regaring their sizes, and       positions
- some cool block collision
- PIGS!?
- Added Timer
*/
//////////////////////////////////////////////////////////////////////
// Example is based on examples from: http://brm.io/matter-js/, https://github.com/shiffman/p5-matter
// add also Benedict Gross credit

//https://codepen.io/pedbad/pen/mdEjXKy

////////////////////////////////VARIABLES/////////////////////////////
var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Constraint = Matter.Constraint;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;

var engine;
var propeller;
var propellers = [];
var propellersSize = [];
var randomNumProp;

var boxes = [];
var pigs = [];
var boxWidth;
var boxHeight;
var boxSize = [];
var boxSizeAlt = [];
var birds = [];
var randomBirds = [];
var colors = [];
var r = [];
var g = [];
var b = [];
var ground;
var slingshotBird, slingshotConstraint, slingshotConstraint01;

var minRanNum;
var maxRanNum;
var randomBirdSize;

var angle=0;
var angleSpeed=0;
var canvas;
var timerValue = 60;
var framesPerSecond = 60;

var pigsInjured = [];
var boxCracked = [];
var explode = false;
var expRandom;
var scaled = false;
var timer;
var pigIsAwake = false;

var textLoad;
var ThemeSong;

////////////////////////////////PRELOAD FUNCTION/////////////////////////
/////////////////////////////////////////////////////////////////////////
function preload()
{
    //BIRDS AND SLINGSHOT IMAGES
    SlingShotImg = loadImage("Images/Sling Shot.png");
    SlingShot01Img = loadImage("Images/Sling Shot 01.png");
    RedImg = loadImage("Images/Red.png");
    StellaImg = loadImage("Images/Stella.png");
    ChuckImg = loadImage("Images/Chuck.png");
    BombImg = loadImage("Images/Bomb.png");
    TerrenceImg = loadImage("Images/Terrence.png");
    
    //PERCH IMAGES
    PerchImg = loadImage("Images/Perch.png");
    
    //ICE IMAGES
    IceBlockImg = loadImage("Images/Ice Block.png");
    IceRoundImg = loadImage("Images/Ice Round.png");
    IceTriImg = loadImage("Images/Ice Tri.png");
    IceSlabImg = loadImage("Images/Ice Slab.png");
    
    //WOOD IMAGES
    WoodBlockImg = loadImage("Images/Wood Block.png");
    WoodRoundImg = loadImage("Images/Wood Round.png");
    WoodTriImg = loadImage("Images/Wooden Tri.png");
    WoodSlabImg = loadImage("Images/Wooden Slab.png");
    
    //STONE IMAGES
    StoneBlockImg = loadImage("Images/Stone Block.png");
    StoneRoundImg = loadImage("Images/Stone Round.png");
    StoneTriImg = loadImage("Images/Stone Tri.png");
    StoneSlabImg = loadImage("Images/Stone Slab.png");
    StoneBlockCrackedImg = loadImage("Images/Stone Block Cracked.png");
    
    //TNT IMAGES
    TNTBlockImg = loadImage("Images/TNT Block.png");
    ExplotionBangImg = loadImage("Images/Explotion01.png");
    ExplotionBamImg = loadImage("Images/Explotion02.png");
    ExplotionPowImg = loadImage("Images/Explotion03.png");
    
    //PIG IMAGES
    PigImg = loadImage("Images/Pig.png");
    PigeyesclosedImg = loadImage("Images/Pig eyes closed.png");
    PighappyImg = loadImage("Images/Pig happy.png");
    
    PighurtImg = loadImage("Images/Pig hurt.png");
    Pighurt1Img = loadImage("Images/Pig hurt 1.png");
    
    //background
    GrasslandImg = loadImage("Images/grasslands.jpg");
    AngryCounterImg = loadImage("Images/angrycounter.png");
    
    //Angrybird logo
    AngryBirdsLogoImg = loadImage("Images/Angry-Birds-Logo.png");
    
    //Music.... oh yess i Did
    ThemeSong = loadSound('Images/Angry Birds Theme Song ( 256kbps cbr ).mp3');
}

////////////////////////////////SETUP FUNCTION///////////////////////////
/////////////////////////////////////////////////////////////////////////
function setup() 
{
    //1080p HD
    canvas = createCanvas(1920, 1080);
    //I changed the canvas to HD for the game to look nicer and work better.
    
    //720p HD
    //canvas = createCanvas(1280, 720); //This is ok with some minor problems
    
    //480p Garbage
    //canvas = createCanvas(854, 480); I wouldn't recommend this due to scaling
    
    engine = Engine.create();  // create an engine

    setupGround(); //

    setupPropeller();

    setupTower();

    setupSlingshot();

    setupMouseInteraction();
    
    frameRate(framesPerSecond);
    
    timerValue = timerValue * framesPerSecond;
}

////////////////////////////////DRAW FUNCTION////////////////////////////
/////////////////////////////////////////////////////////////////////////
function draw() 
{
    if(textLoad <= 100) //<--If you wish to see it with or without change the greater/less sign *I'll Disable it for marking purposes
    {
        background(GrasslandImg);

        Engine.update(engine);

        drawGround();

        drawPropeller();

        drawTower();

        drawBirds();

        drawSlingshot();
        
        gameTimer();
    }
    else
    {
        loadingScreen();
    }
}

////////////////////////////////KEY PRESSED FUNCTION/////////////////////
/////////////////////////////////////////////////////////////////////////
//use arrow keys to control propeller
function keyPressed()
{
    if (keyCode == LEFT_ARROW)
    {
        //your code here
        angleSpeed += 0.01;
    }
    else if (keyCode == RIGHT_ARROW)
    {
        //your code here
        angleSpeed -= 0.01;
    }
}

////////////////////////////////KEYTYPED FUNCTION////////////////////////
/////////////////////////////////////////////////////////////////////////
function keyTyped()
{
  //if 'b' create a new bird to use with propeller
    if (key==='b')
    {
        setupBird(); 
        
        if(!ThemeSong.isPlaying())
        {
            ThemeSong.setVolume(0.1);
            ThemeSong.loop();
        }
    }

    //if 'r' reset the slingshot
    if (key==='r')
    {
        removeFromWorld(slingshotBird);
        removeFromWorld(slingshotConstraint,slingshotConstraint01);
        setupSlingshot();
    }
}

////////////////////////////////GAME TIMERS FUNCTION/////////////////////
/////////////////////////////////////////////////////////////////////////
function gameTimer()
{  
    //TIMER
    if (timerValue > 0) 
    {
        timerValue--;
        image(AngryCounterImg,0,0,width/8+ width/11,height/8);
        fill(255);
        noStroke();
        textAlign(CENTER);
        textSize(width/40);
        text("Time: " + round(timerValue/60),width/8,height/12);
    }

    //WIN RESULT
    if (boxes.length <= 0) 
    {
        fill(0,150);
        rect(0,0,width,height);

        fill(255);
        textAlign(CENTER);
        textSize(width/2/width*200);
        text("YOU WIN",width/2,height/2);
        noLoop();
    }
    
    //GAME OVER RESULT
    if (timerValue == 0) 
    {
        fill(0,150);
        rect(0,0,width,height);

        fill(255);
        textAlign(CENTER);
        textSize(width/2/width*200);
        text("GAME OVER",width/2,height/2);
        noLoop();
    }
}

////////////////////////////////LOADING SCREEN FUNCTION//////////////////
/////////////////////////////////////////////////////////////////////////
function loadingScreen()
{   
    fill(200,10,10);
    rect(0,0,width,height);
    image(AngryBirdsLogoImg,0,-100,width,height); //<--Logo
    
    fill(0,200,255,200);
    strokeWeight(15);
    stroke(0);
    textAlign(CENTER);
    textSize(150);
    textFont('Forte');
    text("CLONE",0,height/2,width,height); //<--Clone Text
    
    //*This works off of the frameCount this is not a an actual loading screen that takes into consideration of different assets loading, everything is preloaded. This is just for visual purposes and fun*
    
    //*It can be disabled in the draw function
    var loadBar;
    
    if (frameCount < width - 200)
    {
        loadBar =frameCount*5 + map(noise(frameCount/50),0,1,5,100);
    }
    else
    {
        loadBar = width - 200;
    }
    
    textLoad = round(map(loadBar,0,width -200,0,100));
    var fillLoad = round(map(loadBar,0,width -200,0,255));
    
    fill(255);
    strokeWeight(2);
    textSize(30);
    text("Loading... ",170,height - height/5-10);
    text("["+ textLoad + "%" +"]",280,height - height/5-10);
    
    fill(255-fillLoad,0,fillLoad,200);
    noStroke();
    rect(100,height - height/5,loadBar,50,10);
    
    strokeWeight(4);
    fill(200,10,10,0);
    stroke(0);
    rect(100,height - height/5,width - 200,50,10);
}

//**********************************************************************
//  HELPER FUNCTIONS - DO NOT WRITE BELOW THIS line
//**********************************************************************

//if mouse is released destroy slingshot constraint so that
//slingshot bird can fly off
function mouseReleased()
{
    setTimeout(() => 
    {
        slingshotConstraint.bodyB = null;
        slingshotConstraint.pointA = { x: 0, y: 0 };
    }, 100);
    
    setTimeout(() => 
    {
        slingshotConstraint01.bodyB = null;
        slingshotConstraint01.pointA = { x: 0, y: 0 };
    }, 100);
}

/////////////////////REMOVE BODY IF OFFSCREEN///////////////
////////////////////////////////////////////////////////////
//tells you if a body is off-screen
function isOffScreen(body)
{
    var pos = body.position;
    return (pos.y > height || pos.x<0 || pos.x>width);
}

//////////////////////////REMOVE PHYSICS BODY///////////////
////////////////////////////////////////////////////////////
//removes a body from the physics world
function removeFromWorld(body) 
{
    World.remove(engine.world, body);
}

///////////////////////DRAW VERTICES////////////////////////
////////////////////////////////////////////////////////////
function drawVertices(vertices)
{
    beginShape();
    for (var i = 0; i < vertices.length; i++) 
    {
        vertex(vertices[i].x, vertices[i].y);
    }
    endShape(CLOSE);
}

///////////////////////DRAW CONSTRAINT//////////////////////
////////////////////////////////////////////////////////////
function drawConstraint(constraint) 
{
    push();
        var offsetA = constraint.pointA;
        var posA = {x:0, y:0};
        if (constraint.bodyA) 
        {
            posA = constraint.bodyA.position;
        }
        var offsetB = constraint.pointB;
        var posB = {x:0, y:0};
        if (constraint.bodyB)
        {
            posB = constraint.bodyB.position;
        }
        strokeWeight(10);
        line(
        posA.x + offsetA.x,
        posA.y + offsetA.y,
        posB.x + offsetB.x,
        posB.y + offsetB.y
        );
    pop();
}
