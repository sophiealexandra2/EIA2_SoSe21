"use strict";
var L11;
(function (L11) {
    class Bee extends L11.Movable {
        constructor(_position, _velocity, _scaleX, _scaleY) {
            super(_position, _velocity);
            this.scaleX = _scaleX;
            this.scaleY = _scaleY;
        }
        draw() {
            L11.ctx.save();
            L11.ctx.lineWidth = 2;
            L11.ctx.beginPath();
            L11.ctx.translate(this.position.X, this.position.Y);
            L11.ctx.scale(this.scaleX, this.scaleY);
            let pattern = document.createElement("canvas").getContext("2d");
            pattern.canvas.width = 20;
            pattern.canvas.height = 20;
            pattern.fillStyle = "gold";
            pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
            L11.ctx.fillStyle = L11.ctx.createPattern(pattern.canvas, "repeat");
            L11.ctx.fill();
            L11.ctx.save();
            L11.ctx.scale(3, 2);
            L11.ctx.lineWidth = 2;
            L11.ctx.strokeStyle = "black";
            L11.ctx.fillStyle = "gold";
            L11.ctx.beginPath();
            L11.ctx.arc(0, 0, 8, 0, Math.PI * 2, false);
            L11.ctx.fill();
            L11.ctx.beginPath();
            L11.ctx.arc(0, 0, 8, 0, Math.PI * 2, false);
            L11.ctx.stroke();
            L11.ctx.beginPath();
            L11.ctx.fillStyle = "white";
            L11.ctx.arc(-5, -11, 5, 0, Math.PI * 2, false);
            L11.ctx.fill();
            L11.ctx.stroke();
            L11.ctx.beginPath();
            L11.ctx.fillStyle = "white";
            L11.ctx.arc(5, -11, 5, 0, Math.PI * 2, false);
            L11.ctx.fill();
            L11.ctx.stroke();
            L11.ctx.closePath();
            L11.ctx.restore();
            L11.ctx.restore();
        }
    }
    L11.Bee = Bee;
})(L11 || (L11 = {}));
//# sourceMappingURL=bees.js.map