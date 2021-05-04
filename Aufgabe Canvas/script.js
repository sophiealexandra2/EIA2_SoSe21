"use strict";
window.onload = function () {
    draw();
};
function draw() {
    let canvas = document.querySelector("canvas");
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "green";
    for (let i = 0; i < 20; i++) {
        let x = Math.random() * 500;
        let y = Math.random() * 500;
        ctx.beginPath();
        ctx.arc(x, y, 40, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}
//# sourceMappingURL=script.js.map