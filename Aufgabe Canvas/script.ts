
window.onload = function(): void {
draw();
};
var button: HTMLElement = document.querySelector("refresh");
document.querySelector("refresh").addEventListener("click", function draw(): void {
  location.reload();
  });

function draw (): void {
let canvas: HTMLCanvasElement = document.querySelector("canvas");
let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
//color of the circles
ctx.fillStyle = "lightblue";

for (let i: number = 0; i < 20; i++) { 
//randomized X and Y positions
let x: number = Math.random() * 500;
let y: number = Math.random() * 500;
ctx.beginPath();
//actual drawing:
ctx.arc(x, y, 40, 0, 2 * Math.PI, false);
ctx.fill();
ctx.stroke();
ctx.closePath();

}
}
























