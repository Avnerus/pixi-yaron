var pixi = require('pixi');
var GAME_WIDTH = 1280;
var GAME_HEIGHT = 1024;

// You can use either WebGLRenderer or CanvasRenderer 
var renderer = new pixi.WebGLRenderer(GAME_WIDTH, GAME_HEIGHT);

console.log(renderer);
document.body.appendChild(renderer.view);

var stage = new pixi.Stage();

var bg = new pixi.Sprite.fromImage("assets/sky.jpg");
bg.anchor.x = 0.5;
bg.anchor.y = 0.5;
bg.position.x = GAME_WIDTH / 2;
bg.position.y = GAME_HEIGHT /2;
stage.addChild(bg);


var help = new pixi.Text("ברוכים הבאים.\n לחצו על הבית על מנת לקנות אותו", {font:"bold 50pt Arial", fill:"white"});
help.position.y = 10;
help.position.x = 100;
stage.addChild(help);

var help2 = new pixi.Text("קיבלת 1500 שקל להתחלה. איתם תוכל לקנות את הבית", {font:"bold 20pt Arial", fill:"white"});
help2.position.y = 300;
help2.position.x = 500;
stage.addChild(help2);

var buildingTexture = pixi.Texture.fromImage("assets/building.png");
var building = new pixi.Sprite(buildingTexture);
building.interactive = true;
building.buttonMode = true;

building.position.x = 400;
building.position.y = GAME_HEIGHT - 300;
building.scale.x = 0.5;
building.scale.y = 0.5;

building.mouseup = building.mouseupoutside = building.touchend = building.touchendoutside = function(data)
{
   var r = confirm('אתה בטוח שאתה רוצה לקנות את הבית ב-1500 שקל?');
   if (r == true) {
      
   } else {

   }
 };

stage.addChild(building);

var greenValue = 0.0;

var colorFilter = new pixi.ColorMatrixFilter();
//colorFilter.matrix = [1,0,0,0,1,1,1,1,0,0,1,0,0,0,0,1];
colorFilter.matrix = [1,0,0,0,greenValue,1,0,0,0,0,1,0,0,0,0,1];
building.filters = [colorFilter]; // if you comment out that line, the TilingSprite WILL display

requestAnimationFrame(animate);

function animate() {
   
    if (greenValue >= 2.0) {
      addValue = -0.03;
    } else if (greenValue <= 0.0 ) {
      addValue = 0.03;
    }
    greenValue += addValue;
    colorFilter.matrix = [1,0,0,0,greenValue,1,0,0,0,0,1,0,0,0,0,1];

    renderer.render(stage);

    requestAnimationFrame(animate);
}
