const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImage,platform;
var bird, slingshot;
var score;

var gameState = "onSling";

function preload() {
    getBackgroudImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    score = 0;
    


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImage)
        background(backgroundImage);
    Engine.update(engine);

    textSize(25);
    fill("black");
    text("Score: " + score, width-150 , 50);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();   
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
       // slingshot.attach(bird.body);
    }
}

//getTime() is an async (asynchronous) function
async function getBackgroudImg (){
    //API - Application Programming Interface
    /*Javascript executes code synchronously. It means that it executes one line after the other. It
    will not wait for the ‘fetch API call’ to be completed before moving to the next line.
    However, we want it to wait for the API call to be completed. We do this
    by adding await before fetch()*/
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    //We want the info in JSON format (JSON = Javascript Object Notation)
    //Converting response variable in JSON format
    var responseJSON = await response.json();
    var dt = responseJSON.datetime;
    var hour = dt.slice(11,13);
    console.log(hour);

    if(hour >= 06 && hour <= 12){
        backgroundImage = loadImage("sprites/bg.png");
    }
    else if(hour>17 && hour <19){
        backgroundImage = loadImage("sprites/bg3.jpg");
    }
    else if(hour>12 && hour< 17){
        backgroundImage = loadImage("sprites/bg4.webp")
    }
    else if(hour >= 19 && hour <= 6{
        backgroundImage = loadImage("sprites/bg2.jpg");

    }
}