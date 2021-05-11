namespace CanvasBlumenwiese {
interface Vector {
        x: number;
        y: number;
    }

window.onload = function(): void {
        draw();
        };


function draw (): void {
let canvas: HTMLCanvasElement = document.querySelector("canvas");
let ctx: CanvasRenderingContext2D = canvas.getContext("2d");


drawBackground();


//Source for Gradient: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingctx2D/createRadialGradient
function drawBackground(): void {
  let backGround: CanvasGradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
  backGround.addColorStop(0, "#00BFFF");
  backGround.addColorStop(0.5, "white");
  backGround.addColorStop(0.5, "#55DD00");
  backGround.addColorStop(1, "white");
  ctx.fillStyle = backGround;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}//Ende DrawBackGround


//Sonne - Jirkas Code, abgeändert also random weggemacht :)
function drawSun(): void {
    let r1: number = 30;
    let r2: number = 180;
    let gradientSun: CanvasGradient = ctx.createRadialGradient(0, 0, r1, 0, 0, r2);
    gradientSun.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
    gradientSun.addColorStop(0.1, "HSLA(60, 100%, 90%, 0.5)");
    gradientSun.addColorStop(1, "HSLA(60, 100%, 80%, 0)");

    let X: number = ctx.canvas.width;
    let Y: number = ctx.canvas.height / 2 - 100;
    
    ctx.save();
    if (X > 700) {
        X = 700;
    }
    if (Y < 20) {
        Y = 20;
    } else if (Y > 100) {
        Y = 100;
    }
    ctx.translate(X, Y);

    ctx.fillStyle = gradientSun;
    ctx.arc(0, 0, r2, 0, 2 * Math.PI);
    ctx.fill();

    ctx.restore();
}
drawSun();
//Ende Sonnne


//Biene Anfang
var x: number = 70;
var y: number = 50;


let circle = function(x, y, radius, fillCircle) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  if (fillCircle) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
};

let drawBee = function(x, y): void {
  ctx.lineWidth = 2;
  ctx.strokeStyle = "Black";
  ctx.fillStyle = "Gold";
  
  circle(x, y, 8, true);
  circle(x, y, 8, false);
  circle(x - 5, y - 11, 5, false);
  circle(x + 5, y - 11, 5, false);
  circle(x - 2, y - 1, 2, false);
  circle(x + 2, y - 1, 2, false);

 
};

drawBee (x, y);

//Ende Biene




//Blume Anfang
//Blume Ende

}//Ende onload function

}//Ende namesapce



  
    












