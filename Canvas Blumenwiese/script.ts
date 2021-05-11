namespace CanvasBlumenwiese {

 window.onload = function(): void {
        draw();
        };


 function draw (): void {
let canvas: HTMLCanvasElement = document.querySelector("canvas");
let ctx: CanvasRenderingContext2D = canvas.getContext("2d");

drawBackground();


//Source for Gradient: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
function drawBackground(): void {
  let backGround: CanvasGradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
  backGround.addColorStop(0, "#00BFFF");
  backGround.addColorStop(0.5, "white");
  backGround.addColorStop(0.5, "#55DD00");
  backGround.addColorStop(1, "white");
  ctx.fillStyle = backGround;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}//Ende DrawBackGround


}

}

  
    













 //Ende namespace