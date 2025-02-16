////////////////////////////GROUND///////////////////////////
////////////////////////////////////////////////////////////////
function setupGround()
{
    ground = Bodies.rectangle(width/2, 
                              height - height/11, 
                              width, 100, 
                              {isStatic: true, 
                               angle: 0,
                               friction: 1});
    World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround()
{
    push();
        noFill();
        noStroke();
        drawVertices(ground.vertices);
    pop();
}

////////////////////////////PROPELLER///////////////////////////
////////////////////////////////////////////////////////////////
////SETUP
function setupPropeller()
{
    // your code here
    randomNumProp = round(random(0,3));
    for (var i = 0;i < randomNumProp;i++)
    {
        //Local Propeller Position and size variables
        var propX = round(random(width/4,width/2));
        var propY = round(random(height/3,height - height/5));
        
        var propWidth = round(random(200,400));
        var propHeight = round(random(20,40));
        
        //CREATE ADD PROPELLERS TO WORLD
        propeller = Bodies.rectangle(propX, propY, 
                                     propWidth, propHeight, 
                                     {isStatic: true, angle: angle});
        
        propellers.push(propeller);
        propellersSize.push(new createVector(propWidth,propHeight));
        World.add(engine.world, [propellers[i]]);  
    } 
}
////////////////////////////////////////////////////////////////
/////DRAW
//updates and draws the propeller
function drawPropeller()
{
    // your code here
    push();
        for (var i = 0;i < randomNumProp;i++)
        {
            noFill();
            noStroke();
            drawVertices(propellers[i].vertices);
            Body.setAngle(propellers[i], angle);
            Body.setAngularVelocity(propellers[i], angleSpeed);
            angle += angleSpeed;

            var StoneIMGSize = new createVector(round(sqrt(propellers[i].area))/2,
                        round(sqrt(propellers[i].area))/2);
            var StoneIMGLoc = new createVector(propellers[i].position.x,
                         propellers[i].position.y);

            var StoneSlabIMGSize = new createVector(propellersSize[i].x,propellersSize[i].y);
            var StoneSlabIMGLoc = new createVector(propellers[i].position.x,
                         propellers[i].position.y);

            push();
                translate(StoneIMGLoc.x,StoneIMGLoc.y);
                rotate(propellers[i].angle);

                image(StoneSlabImg,
                      0 - StoneSlabIMGSize.x/2,
                      0 - StoneSlabIMGSize.y/2,
                      StoneSlabIMGSize.x,
                      StoneSlabIMGSize.y);

                rotate(angle);
                image(StoneRoundImg,
                      0 - StoneIMGSize.x/2,
                      0 - StoneIMGSize.y/2,
                      StoneIMGSize.x,
                      StoneIMGSize.y);
            pop();
        }
    pop();
}

////////////////////////////BIRDS///////////////////////////////
////////////////////////////////////////////////////////////////
///////SETUP
function setupBird()
{            
    var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
    restitution: 0.95 });
    Matter.Body.setMass(bird, bird.mass*50);
    World.add(engine.world, [bird]);
    birds.push(bird);
    randomBirds.push(round(random(0,3)));
}

////////////////////////////////////////////////////////////////
////DRAW
function drawBirds()
{
    push();
    //your code here
    for(var i = 0; i < birds.length;i++)
    {
        noFill();
        noStroke();
        drawVertices(birds[i].vertices);
        
        var birdsIMGSize = new createVector(55,50);
        var birdsIMGLoc = new createVector(birds[i].position.x,
                     birds[i].position.y);

        push();
            translate(birdsIMGLoc.x,birdsIMGLoc.y);
            rotate(birds[i].angle);
        
            if(randomBirds[i] == 0)
            {
                image(ChuckImg,
                  0 - birdsIMGSize.x/1.9,
                  0 - birdsIMGSize.y/1.7,
                  birdsIMGSize.x,
                  birdsIMGSize.y);  
            }
        
            if(randomBirds[i] == 1)
            {
                image(RedImg,
                  0 - birdsIMGSize.x/2,
                  0 - birdsIMGSize.y/2,
                  birdsIMGSize.x,
                  birdsIMGSize.y);  
            }
        
            if(randomBirds[i] == 2)
            {
                image(BombImg,
                  0 - birdsIMGSize.x/1.9,
                  0 - birdsIMGSize.y/1.7,
                  birdsIMGSize.x,
                  birdsIMGSize.y+birdsIMGSize.y/2.5);  
            }
        
            if(randomBirds[i] == 3)
            {
                image(TerrenceImg,
                  0 - birdsIMGSize.x/1.9,
                  0 - birdsIMGSize.y/1.7,
                  birdsIMGSize.x,
                  birdsIMGSize.y);  
            }
        pop();
        
        //Limit
        if(birds.length > 20 ||
          isOffScreen(birds[i]))
        {
            removeFromWorld(birds[i]);
            birds.splice(i,1);
            i--;
        }
    }
    pop();
}

////////////////////////////TOWER///////////////////////////////
////////////////////////////////////////////////////////////////
//creates a tower of boxes
/////SETUP
function setupTower()
{
    //you code here
    randomLoopX = round(random(1,6));
    randomLoopY = round(random(1,6));
    
    for(var i = 0; i < randomLoopX; i++)
    {
        for(var j = 0; j < randomLoopY; j++)
        {
            //I changed the box sizes, this is part of my further Development
            var boxSizeRandom = round(random(80,150));
            var randomObj = round(random(1,1));
               
            var obj;
            if(randomObj == 1)
            {
                boxWidth = boxSizeRandom;
                boxHeight = boxSizeRandom;
                
                obj = Bodies.polygon(boxWidth * i + width/1.6,boxHeight * j+ height/1.6, 4,boxHeight/1.5, {friction: 1,restitution:0.95});
            }
            
            Matter.Body.setMass(obj, obj.mass*10);
            
            World.add(engine.world, [obj]);
            
            r.push(round(random(0,255)));
            g.push(round(random(0,255)));
            b.push(round(random(0,255)));
            
            for(var k = 0; k < r.length; k++)
            {
                colors.push(color(r[k],g[k],b[k]));   
            }
            
            boxes.push(new createVector(obj,randomObj));
            boxSize.push(new createVector(boxWidth,boxHeight));
            boxSizeAlt.push(new createVector(boxWidth,boxHeight));
            pigs.push(obj);
            pigsInjured.push(0);
            boxCracked.push(0);
        }
    }   
    
    setupTower01();
}

//Other Objects
function setupTower01()
{
    randomLoopX = round(random(1,1));
    randomLoopY = round(random(1,1));
    
    for(var i = 0; i < randomLoopX; i++)
    {
        for(var j = 0; j < randomLoopY; j++)
        {
            var boxSizeRandom = round(random(80,150));
            var randomObj = round(random(2,4));
            boxWidth = boxSizeRandom;
            boxHeight = boxSizeRandom;
            
            var obj;
            if(randomObj == 2)
            {
                boxWidth = round(random(boxSizeRandom,boxSizeRandom*4));
                boxHeight =  round(random(boxSizeRandom/4,boxSizeRandom/2));
                
                obj = Bodies.rectangle(boxWidth * i + width/1.6,boxHeight * j+ height/1.6, boxWidth,boxHeight, {friction: 1,restitution:0.25}); 
            }
            
            if(randomObj == 3)
            {
                obj = Bodies.polygon(boxWidth * i + width/1.6,boxHeight * j+ height/1.6, 3,boxWidth/2, {friction: 1,restitution:0.5});
            }
            
            if(randomObj == 4)
            {   
                obj = Bodies.circle(boxWidth * i + width/1.6,boxHeight * j+ height/1.6, boxWidth/2, {friction: 1,restitution:0.5});
            }
            
            Matter.Body.setMass(obj, obj.mass*10);
            
            World.add(engine.world, [obj]);
            
            r.push(round(random(0,255)));
            g.push(round(random(0,255)));
            b.push(round(random(0,255)));
            
            for(var k = 0; k < r.length; k++)
            {
                colors.push(color(r[k],g[k],b[k]));   
            }
            
            boxes.push(new createVector(obj,randomObj));
            boxSize.push(new createVector(boxWidth,boxHeight));
            boxSizeAlt.push(new createVector(boxWidth,boxHeight));
            pigs.push(obj);
            pigsInjured.push(0);
            boxCracked.push(0);
        }
    }
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower()
{
    push();
    //your code here
    
    levelBuilder(); //The code for building randomized levels was getting to long so I moved it to its own function
    //Bare in mind it is very complex
    pop();
}

//////////////////////////////SLINGSHOT/////////////////////////
////////////////////////////////////////////////////////////////
//////SETUP
function setupSlingshot()
{
    //your code here
    minRanNum = 20; //Min value for bird size
    maxRanNum = 50;
    
    randomBirdSize = round(random(minRanNum,maxRanNum));
    slingshotBird = Bodies.circle(290,290, randomBirdSize, {friction: 1,
    restitution: 0.95 });
    Matter.Body.setMass(slingshotBird, slingshotBird.mass*100);
    
    slingshotConstraint = 
    Constraint.create({
    pointA: { x: 309, y: 290 },
    bodyB: slingshotBird,
    pointB: { x: 20, y: 0 },
    stiffness: 0.01,
    damping: 0.0001});
    
    slingshotConstraint01 = 
    Constraint.create({
    pointA: { x: 270, y: 302 },
    bodyB: slingshotBird,
    pointB: { x: -20, y: 0 },
    stiffness: 0.01,
    damping: 0.0001});
    
    World.add(engine.world, [slingshotBird, slingshotConstraint,slingshotConstraint01]);
}

////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
////DRAW
function drawSlingshot()
{
    push();
        // your code here
        if(isOffScreen(slingshotBird))
        {
            removeFromWorld(slingshotBird);
        }
        
        stroke(112,66,65);
        drawConstraint(slingshotConstraint);
        noFill();
        noStroke(0);
        drawVertices(slingshotBird.vertices);
        
        var slingShotIMGSize = new createVector(30,150);
        var slingShotIMGLoc = new createVector(300,350);
    
        push();
            translate(slingShotIMGLoc.x,slingShotIMGLoc.y);
            image(SlingShotImg,
                  0 - slingShotIMGSize.x/2,
                  0 - slingShotIMGSize.y/2,
                  slingShotIMGSize.x,
                  slingShotIMGSize.y);
        pop();
        
        if(!isOffScreen(slingshotBird))
        {
            var birdsIMGSize = randomBirdSize*2;
            var birdsIMGLoc = new createVector(slingshotBird.position.x,
                         slingshotBird.position.y);

            push();
                translate(birdsIMGLoc.x,birdsIMGLoc.y);
                rotate(slingshotBird.angle);
                
                if(randomBirdSize <= minRanNum + 5)
                {
                    image(RedImg,
                      0 - birdsIMGSize/2,
                      0 - birdsIMGSize/2,
                      birdsIMGSize,
                      birdsIMGSize);  
                }
            
                if(randomBirdSize > minRanNum + 5 &&
                   randomBirdSize <= minRanNum + 10)
                {
                    image(StellaImg,
                      0 - (birdsIMGSize+birdsIMGSize/1.5)/2,
                      0 - (birdsIMGSize+birdsIMGSize/6)/2,
                      birdsIMGSize+birdsIMGSize/3,
                      birdsIMGSize); 
                }
                
                if(randomBirdSize > minRanNum + 10 &&
                   randomBirdSize <= minRanNum + 15)
                {
                    image(ChuckImg,
                      0 - birdsIMGSize/1.7,
                      0 - birdsIMGSize/1.5,
                      birdsIMGSize + birdsIMGSize/10,
                      birdsIMGSize); 
                }
                
                if(randomBirdSize > minRanNum + 15 &&
                   randomBirdSize <= minRanNum + 20)
                {
                    image(BombImg,
                      0 - (birdsIMGSize-birdsIMGSize/8)/2,
                      0 - (birdsIMGSize+birdsIMGSize/3)/2,
                      birdsIMGSize-birdsIMGSize/12,
                      birdsIMGSize+birdsIMGSize/10); 
                }
                
                if(randomBirdSize > maxRanNum - 10)
                {
                    image(TerrenceImg,
                      0 - (birdsIMGSize+birdsIMGSize/5)/2,
                      0 - birdsIMGSize/2,
                      birdsIMGSize + birdsIMGSize/10,
                      birdsIMGSize); 
                }
            pop();
        }
        
        stroke(112,66,65);
        drawConstraint(slingshotConstraint01);
            
        var slingShot01IMGSize = new createVector(30,75);
        var slingShot01IMGLoc = new createVector(280,322);
    
        push();
            translate(slingShot01IMGLoc.x,slingShot01IMGLoc.y);
            image(SlingShot01Img,
                  0 - slingShot01IMGSize.x/2,
                  0 - slingShot01IMGSize.y/2,
                  slingShot01IMGSize.x,
                  slingShot01IMGSize.y);
        pop();
    image(PerchImg,0,421,350,120);
    pop();
}

/////////////////////////////////////////////////////////////////
function setupMouseInteraction()
{
    var mouse = Mouse.create(canvas.elt);
    var mouseParams = {
        mouse: mouse,
        constraint: { stiffness: 0.05 }
    }
    mouseConstraint = MouseConstraint.create(engine, mouseParams);
    mouseConstraint.mouse.pixelRatio = pixelDensity();
    World.add(engine.world, mouseConstraint);
}

////////////////////////////////LEVELBUILDER/////////////////////////
/////I Built a custom function to almost simulate what would appear in an Angrybirds game.
///TNT
///PIGS
///Different Blocks
///This function makes use of the colours array to determine what type of blocks should be spawned
///Each level is now completely unique, with their own challenges and randomness
///!!!WARNING!!! The TNT collision is unstable more TNT appearances may come with unexpected consequences. One appearance should be fine though

//*I may Have fixed this problem, though sometimes the code bugs and does not go through all the processes due to some factors not existing anymore.

function levelBuilder()
{
    push();
        //your code here
        for(var i = 0; i < boxes.length; i++)
        {
            if(isOffScreen(boxes[i].x))
            {
                removeAsset(i); //If they are off screen remove the item
                i--;
            }
            else
            {
                noFill();
                noStroke();
                drawVertices(boxes[i].x.vertices); //Draws the boxes
                
                /////
                
                ////CHAOS PROGRAMMING BELOW HIS POINT
                var BlockIMGSize = new createVector(boxSize[i].x,boxSize[i].y);
                var BlockIMGLoc = new createVector(boxes[i].x.position.x,
                             boxes[i].x.position.y);

                //WOOD
                if(r[i] > 100 && g[i] > 100 && b[i] < 50)
                {
                    push();
                        translate(BlockIMGLoc.x,BlockIMGLoc.y);
                        rotate(boxes[i].x.angle);
                        
                        //SQUARE
                        if(boxes[i].y == 1)
                        {
                            image(WoodBlockImg,
                              0 - BlockIMGSize.x/2,
                              0 - BlockIMGSize.y/2,
                              BlockIMGSize.x,
                              BlockIMGSize.y);
                        }
                        //SLAB
                        else if(boxes[i].y == 2)
                        {
                            image(WoodSlabImg,
                                0 - BlockIMGSize.x/2,
                                0 - BlockIMGSize.y/2,
                                BlockIMGSize.x,
                                BlockIMGSize.y);
                        }
                        //TRI
                        else if(boxes[i].y == 3)
                        {
                            push();
                                angleMode(DEGREES);
                                rotate(30);
                                image(WoodTriImg,
                                    0 - (BlockIMGSize.x/1.2)/2,
                                    0 - (BlockIMGSize.y/1.2)/2 - BlockIMGSize.y/9,
                                    BlockIMGSize.x/1.2,
                                    BlockIMGSize.y/1.2);
                                angleMode(RADIANS);
                            pop();
                        }
                        //ROUND
                        else if(boxes[i].y == 4)
                        {
                            image(WoodRoundImg,
                                0 - BlockIMGSize.x/2,
                                0 - BlockIMGSize.y/2,
                                BlockIMGSize.x,
                                BlockIMGSize.y);
                        }
                    pop();
                }
                
                //ICE
                else if(r[i] < 100 && g[i] < 100 && b[i] > 100)
                {
                    push();
                        translate(BlockIMGLoc.x,BlockIMGLoc.y);
                        rotate(boxes[i].x.angle);
                    
                        //BLOCK
                        if(boxes[i].y == 1)
                        {
                            image(IceBlockImg,
                              0 - BlockIMGSize.x/2,
                              0 - BlockIMGSize.y/2,
                              BlockIMGSize.x,
                              BlockIMGSize.y);
                        }
                        //SLAB
                        else if(boxes[i].y == 2)
                        {
                            image(IceSlabImg,
                                0 - BlockIMGSize.x/2,
                                0 - BlockIMGSize.y/2,
                                BlockIMGSize.x,
                                BlockIMGSize.y);
                        }
                        //TRI
                        else if(boxes[i].y == 3)
                        {
                            push();
                                angleMode(DEGREES);
                                rotate(30);
                                image(IceTriImg,
                                    0 - (BlockIMGSize.x/1.2)/2,
                                    0 - (BlockIMGSize.y/1.2)/2 - BlockIMGSize.y/9,
                                    BlockIMGSize.x/1.2,
                                    BlockIMGSize.y/1.2);
                                angleMode(RADIANS);
                            pop();
                        }
                        //ROUND
                        else if(boxes[i].y == 4)
                        {
                            image(IceRoundImg,
                                0 - BlockIMGSize.x/2,
                                0 - BlockIMGSize.y/2,
                                BlockIMGSize.x,
                                BlockIMGSize.y);
                        }
                    pop();
                }
                
                //STONE
                else if(r[i] < 100 && g[i] < 100 && b[i] < 100)
                {
                    push();
                        translate(BlockIMGLoc.x,BlockIMGLoc.y);
                        rotate(boxes[i].x.angle);

                        ///Stone Block collision Animation
                        if(dist(boxes[i].x.position.x,
                                boxes[i].x.position.y,
                                slingshotBird.position.x,
                                slingshotBird.position.y) < boxSize[i].x &&
                                boxCracked[i] == 0)
                        {   
                            boxCracked[i] = 1;   
                        }
                    
                        if(boxCracked[i] == 0)
                        {
                            //BLOCK
                            if(boxes[i].y == 1)
                            {
                                image(StoneBlockImg,
                                  0 - BlockIMGSize.x/2,
                                  0 - BlockIMGSize.y/2,
                                  BlockIMGSize.x,
                                  BlockIMGSize.y);
                            }
                            //SLAB
                            else if(boxes[i].y == 2)
                            {
                                image(StoneSlabImg,
                                    0 - BlockIMGSize.x/2,
                                    0 - BlockIMGSize.y/2,
                                    BlockIMGSize.x,
                                    BlockIMGSize.y);
                            }
                            //TRI
                            else if(boxes[i].y == 3)
                            {
                                push();
                                    angleMode(DEGREES);
                                    rotate(30);
                                    image(StoneTriImg,
                                        0 - (BlockIMGSize.x/1.2)/2,
                                        0 - (BlockIMGSize.y/1.2)/2 - BlockIMGSize.y/9,
                                        BlockIMGSize.x/1.2,
                                        BlockIMGSize.y/1.2);
                                    angleMode(RADIANS);
                                pop();
                            }
                            //ROUND
                            else if(boxes[i].y == 4)
                            {
                                image(StoneRoundImg,
                                    0 - BlockIMGSize.x/2,
                                    0 - BlockIMGSize.y/2,
                                    BlockIMGSize.x,
                                    BlockIMGSize.y);
                            }
                        }
                    
                        if(boxes[i].y == 1)
                        {
                            if(boxCracked[i] == 1)
                            {
                                image(StoneBlockCrackedImg,
                                    0 - BlockIMGSize.x/2,
                                  0 - BlockIMGSize.y/2,
                                  BlockIMGSize.x,
                                  BlockIMGSize.y);  
                            }
                        }
                    pop();
                }
                
                //TNT
                else if(r[i] > 100 && g[i] < 100 && b[i] < 100 && 
                        boxes[i].y == 1)
                {
                    var compSize;
                    
                    push();
                        translate(BlockIMGLoc.x,BlockIMGLoc.y);
                        rotate(boxes[i].x.angle);

                        if(dist(boxes[i].x.position.x,
                                boxes[i].x.position.y,
                                slingshotBird.position.x,
                                slingshotBird.position.y) < boxSize[i].x && 
                                boxSize[i].x == boxSizeAlt[i].x)
                        {   
                            boxes[i].x = Bodies.polygon(boxes[i].x.position.x,boxes[i].x.position.y, 10,boxHeight/1.5, {friction: 1,restitution:0.95});
                            
                            Matter.Body.setMass(boxes[i].x, boxes[i].x.mass*10);
            
                            World.add(engine.world, [boxes[i].x]);
                            
                            Body.setStatic(boxes[i].x,true); //Made it static So it is more controlled
                            Body.scale(boxes[i].x,3,3); //I used scale to create an exlpotion
                            boxSize[i].x = boxSizeAlt[i].x*3;
                            boxSize[i].y = boxSizeAlt[i].y*3;
                            boxes[i].x.angle = 0;
                            
                            timer = 20; //20 sec = 2 sec
                            scaled = true;

                            expRandom = round(random(0,2));
                        }
                        
                        if(boxSize[i].x == boxSizeAlt[i].x && 
                           boxSize[i].y == boxSizeAlt[i].y)
                        {
                            image(TNTBlockImg,
                              0 - BlockIMGSize.x/2,
                              0 - BlockIMGSize.y/2,
                              BlockIMGSize.x,
                              BlockIMGSize.y); 
                        }
                        else if(boxSize[i].x > boxSizeAlt[i].x &&                   
                                boxSize[i].y > boxSizeAlt[i].y)
                        {   
                            //Some Visual Effects
                            if(expRandom == 0)
                            {
                               image(ExplotionBangImg,
                                  0 - (BlockIMGSize.x + BlockIMGSize.x/10)/2,
                                  0 - BlockIMGSize.y/2,
                                  BlockIMGSize.x + BlockIMGSize.x/10,
                                  BlockIMGSize.y);  
                            }  
                            if(expRandom == 1)
                            {
                               image(ExplotionBamImg,
                                  0 - BlockIMGSize.x/2,
                                  0 - BlockIMGSize.y/2,
                                  BlockIMGSize.x + BlockIMGSize.x/10,
                                  BlockIMGSize.y);   
                            }  
                            if(expRandom == 2)
                            {
                               image(ExplotionPowImg,
                                  0 - (BlockIMGSize.x + BlockIMGSize.x/10)/2,
                                  0 - BlockIMGSize.y/2,
                                  BlockIMGSize.x + BlockIMGSize.x/10,
                                  BlockIMGSize.y);  
                            }  
                        }
                    
                        //This is a Timer for the explotions
                        if(scaled)
                        {
                            timer--;
                            if(timer <= 0)
                            {     
                                removeAsset(i);
                                i--;   
                                scaled = false;
                            } 
                            
                            if (timer == 1 && scaled)
                            {
                                removeAsset(i);
                                i--; 
                                scaled = false;
                            }
                        }

                    pop();
                }
                else
                {
                    ////Blocks that pigs will appear in
                    push();
                        translate(BlockIMGLoc.x,BlockIMGLoc.y);
                        rotate(boxes[i].x.angle);

                        ///Stone Block collision Animation
                        if(dist(boxes[i].x.position.x,
                                boxes[i].x.position.y,
                                slingshotBird.position.x,
                                slingshotBird.position.y) < boxSize[i].x &&
                                boxCracked[i] == 0 && 
                                boxes[i].y == 1)
                        {   
                            boxCracked[i] = 1;   
                        }
                    
                        if(boxes[i].y == 1)
                        {
                            if(boxCracked[i] == 1)
                            {
                                image(StoneBlockCrackedImg,
                                    0 - BlockIMGSize.x/2,
                                  0 - BlockIMGSize.y/2,
                                  BlockIMGSize.x,
                                  BlockIMGSize.y);  
                            }
                            if(boxCracked[i] == 0)
                            {
                                image(StoneBlockImg,
                                  0 - BlockIMGSize.x/2,
                                  0 - BlockIMGSize.y/2,
                                  BlockIMGSize.x,
                                  BlockIMGSize.y);
                            }
                        }
                        else if(boxes[i].y == 2)
                        {
                            image(StoneSlabImg,
                              0 - BlockIMGSize.x/2,
                              0 - BlockIMGSize.y/2,
                              BlockIMGSize.x,
                              BlockIMGSize.y);
                        }
                        else if(boxes[i].y == 3)
                        {
                            push();
                                angleMode(DEGREES);
                                rotate(30);
                                image(StoneTriImg,
                                    0 - (BlockIMGSize.x/1.2)/2,
                                    0 - (BlockIMGSize.y/1.3)/2 - BlockIMGSize.y/9,
                                    BlockIMGSize.x/1.2,
                                    BlockIMGSize.y/1.3);
                                angleMode(RADIANS);
                            pop();
                        }
                        else if(boxes[i].y == 4)
                        {
                            image(StoneRoundImg,
                                0 - BlockIMGSize.x/2,
                                0 - BlockIMGSize.y/2,
                                BlockIMGSize.x,
                                BlockIMGSize.y);
                        }
                        /////////
                        
                    
                        ///PIG Collision Animation
                        if(boxes[i].y == 1)
                        {
                            var PigIMGSize = new createVector(boxSize[i].x,boxSize[i].y);
                            var PigIMGLoc = new createVector(pigs[i].position.x,
                            pigs[i].position.y);

                            ///Pig collision Animation
                            if(dist(pigs[i].position.x,
                                    pigs[i].position.y,
                                    slingshotBird.position.x,
                                    slingshotBird.position.y) < boxSize[i].x &&
                                    pigsInjured[i] == 0)
                            {   
                                pigsInjured[i] = 1;   
                            }

                            if(pigsInjured[i] == 1)
                            {
                                image(PighurtImg,
                                    0 - PigIMGSize.x/3,
                                    0 - PigIMGSize.y/3,
                                    PigIMGSize.x/1.5,
                                    PigIMGSize.y/1.5);  
                            }

                            else
                            {
                                //Blink Animation
                                if(frameCount % 120 >= round(random(random(0,10),random(0,10))))
                                {
                                   image(PigImg,
                                          0 - PigIMGSize.x/3,
                                          0 - PigIMGSize.y/3,
                                          PigIMGSize.x/1.5,
                                          PigIMGSize.y/1.5);
                                }
                                
                                else if(!pigIsAwake)
                                {
                                    image(PigeyesclosedImg,
                                          0 - PigIMGSize.x/3,
                                          0 - PigIMGSize.y/3,
                                          PigIMGSize.x/1.5,
                                          PigIMGSize.y/1.5);
                                }
                                
                                if (boxes[i].x.angle > 0)
                                {
                                    image(PighappyImg,
                                          0 - PigIMGSize.x/3,
                                          0 - PigIMGSize.y/3,
                                          PigIMGSize.x/1.5,
                                          PigIMGSize.y/1.5);
                                }
                            }    
                        }
                        
                    pop();
                }
            }
        }
    pop();
}

//Destroy all Assets...Maybe just the one
function removeAsset(index)
{
    removeFromWorld(boxes[index].x);  //<--This is for the multiple TNT appearances *This may be a little bugged;
    boxes.splice(index,1);
    boxSize.splice(index,1);
    boxSizeAlt.splice(index,1);
    pigs.splice(index,1);
    pigsInjured.splice(index,1);
    boxCracked.splice(index,1);
    colors.splice(index,1);
    r.splice(index,1);
    g.splice(index,1);
    b.splice(index,1);
}


