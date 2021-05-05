
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

for (let i: number = 0; i < 40; i++) { 
//randomized X and Y positions
let x: number = Math.random() * 500;
let y: number = Math.random() * 500;

let red: number = Math.floor(Math.random() * 255);
let green: number = Math.floor(Math.random() * 255);
let blue: number = Math.floor(Math.random() * 255);

ctx.beginPath();
//actual drawing:
ctx.arc(Math.floor (Math.random() * (700) + 1), Math.floor(Math.random() * (500) + 1), Math.floor(Math.random() * (80) + 1), 0 , 3 * Math.PI);
ctx.stroke();
ctx.closePath();
//color of the circles
ctx.fillStyle = "rgb(" + red + ", " + green + "," + blue + ")";
ctx.fill();

} //End of circle function







}
























