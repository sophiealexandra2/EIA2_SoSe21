
window.onload = function() {
draw();
};

function draw () {
let canvas: HTMLCanvasElement = document.querySelector("canvas");
let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
ctx.fillStyle = "green";

for (let i: number = 0; i < 20; i++) { 
let x: number = Math.random() * 500;
let y: number = Math.random() * 500;
ctx.beginPath();
ctx.arc(x, y, 40, 0, 2 * Math.PI, false);
ctx.fill();
ctx.stroke();
ctx.closePath();




}



}
























