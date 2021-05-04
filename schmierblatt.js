"use strict";
//let canvas: HTMLCanvasElement = document.querySelector("canvas");
//let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
//let button = document.getElementById("refresh");
//let refresh = function () {
ctx.clearRect(0, 0, 400, 400);
let a = 0;
for (a = 0; a < 600; a++) {
    let x = Math.floor(Math.random() * 300);
    let y = Math.floor(Math.random() * 300);
    let radius = Math.floor(Math.random() * 20);
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    ctx.beginPath();
    ctx.arc(x, y, radius, Math.PI * 2, 0, false);
    ctx.fillStyle = "rgba(" + r + "," + g + "," + b + ",1)";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.closePath();
}
;
refresh();
button.addEventListener("click", refresh, false);
//Zweite die funktioniert:
window.onload = function () {
    draw();
};
function draw() {
    let canvas = document.querySelector("canvas");
    let ctx = canvas.getContext("2d");
    //color of the circles
    ctx.fillStyle = "green";
    for (let i = 0; i < 20; i++) {
        //randomized X and Y positions
        let x = Math.random() * 500;
        let y = Math.random() * 500;
        ctx.beginPath();
        //actual drawing:
        ctx.arc(x, y, 40, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}
//# sourceMappingURL=schmierblatt.js.map