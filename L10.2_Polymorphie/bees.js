"use strict";
var L10_2;
(function (L10_2) {
    class Bee extends L10_2.Movable {
        constructor(_position, _velocity, _scaleX, _scaleY) {
            super(_position, _velocity);
            this.scaleX = _scaleX;
            this.scaleY = _scaleY;
        }
        draw() {
            L10_2.ctx.save();
            L10_2.ctx.lineWidth = 2;
            L10_2.ctx.beginPath();
            L10_2.ctx.translate(this.position.X, this.position.Y);
            L10_2.ctx.scale(this.scaleX, this.scaleY);
            let pattern = document.createElement("canvas").getContext("2d");
            pattern.canvas.width = 20;
            pattern.canvas.height = 20;
            pattern.fillStyle = "gold";
            pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
            L10_2.ctx.fillStyle = L10_2.ctx.createPattern(pattern.canvas, "repeat");
            L10_2.ctx.fill();
            L10_2.ctx.save();
            L10_2.ctx.scale(3, 2);
            L10_2.ctx.lineWidth = 2;
            L10_2.ctx.strokeStyle = "black";
            L10_2.ctx.fillStyle = "gold";
            L10_2.ctx.beginPath();
            L10_2.ctx.arc(0, 0, 8, 0, Math.PI * 2, false);
            L10_2.ctx.fill();
            L10_2.ctx.beginPath();
            L10_2.ctx.arc(0, 0, 8, 0, Math.PI * 2, false);
            L10_2.ctx.stroke();
            L10_2.ctx.beginPath();
            L10_2.ctx.fillStyle = "white";
            L10_2.ctx.arc(-5, -11, 5, 0, Math.PI * 2, false);
            L10_2.ctx.fill();
            L10_2.ctx.stroke();
            L10_2.ctx.beginPath();
            L10_2.ctx.fillStyle = "white";
            L10_2.ctx.arc(5, -11, 5, 0, Math.PI * 2, false);
            L10_2.ctx.fill();
            L10_2.ctx.stroke();
            L10_2.ctx.closePath();
            L10_2.ctx.restore();
            L10_2.ctx.restore();
        }
    }
    L10_2.Bee = Bee;
})(L10_2 || (L10_2 = {}));
//# sourceMappingURL=bees.js.map