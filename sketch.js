const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground, bridge;
var leftWall, rightWall;
var jointPoint;
var jointLink;
//declare var for zombie object and to loadImages

//Declare var for breakbutton

//Declare var for backgroundImage


var stones = [];

function preload() 
{
  //loadImages of Zombie and background

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(0, height - 10, width * 2, 20);
  leftWall = new Base(100, height - 300, 200, height / 2 + 100);
  rightWall = new Base(width - 100, height - 300, 200, height / 2 + 100);

  bridge = new Bridge(23, { x: 38, y: height / 2 - 44 });
  jointPoint = new Base(width - 250, height / 2 - 60, 40, 20);

  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  for (var i = 0; i <= 8; i++) 
  {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-100, 100);
    var stone = new Stone(x, y, 80, 80);
    stones.push(stone);
  }

  //create sprite for zombie and add animation to it as given in hint 2
  

  //create sprite for button and position it as given in hint 2
  
}

function draw() 
{
  background(backgroundImage);
  Engine.update(engine);

  bridge.show();

  for (var stone of stones) 
  {
    stone.show();
  }

  if (zombie.position.x >= width - 300) 
  {
    zombie.velocityX = -10;
    zombie.changeAnimation("righttoleft");
  }

  if (zombie.position.x <= 300) 
  {
    zombie.velocityX = 10;
    zombie.changeAnimation("lefttoright");
  }

  drawSprites();
}

function handleButtonPress() 
{
  jointLink.dettach();
  setTimeout(() => {bridge.break();}, 1500);
}
