"use strict";
window.onload = function () {
    draw();
};
var button = document.querySelector("refresh");
document.querySelector("refresh").addEventListener("click", function draw() {
    location.reload();
});
function draw() {
    let canvas = document.querySelector("canvas");
    let ctx = canvas.getContext("2d");
    //color of the circles
    ctx.fillStyle = "lightblue";
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
//# sourceMappingURL=script.js.map