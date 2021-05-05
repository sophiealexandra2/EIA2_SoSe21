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
    for (let i = 0; i < 40; i++) {
        //randomized X and Y positions
        let x = Math.random() * 500;
        let y = Math.random() * 500;
        let red = Math.floor(Math.random() * 255);
        let green = Math.floor(Math.random() * 255);
        let blue = Math.floor(Math.random() * 255);
        ctx.beginPath();
        //actual drawing and amount of circles, randomized
        ctx.arc(Math.floor(Math.random() * (700) + 1), Math.floor(Math.random() * (500) + 1), Math.floor(Math.random() * (80) + 1), 0, 3 * Math.PI);
        ctx.stroke();
        ctx.closePath();
        //color of the circles, randomized
        ctx.fillStyle = "rgb(" + red + ", " + green + "," + blue + ")";
        ctx.fill();
    } //End of circle function
}
//# sourceMappingURL=script.js.map