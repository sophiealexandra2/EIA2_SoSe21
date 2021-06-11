"use strict";
var L10_2;
(function (L10_2) {
    //Mit Julia Dacjman damals zusammen gemacht
    class Flower {
        constructor(_position, _baseColor, _quantity) {
            this.position = _position;
            this.baseColor = _baseColor;
            this.quantity = _quantity;
        }
        draw() {
            L10_2.ctx.save();
            L10_2.ctx.beginPath();
            L10_2.ctx.moveTo(this.position.X, this.position.Y);
            L10_2.ctx.translate(this.position.X, this.position.Y);
            L10_2.ctx.quadraticCurveTo(10, 5, 10, 30);
            L10_2.ctx.strokeStyle = "#358443";
            L10_2.ctx.stroke();
            L10_2.ctx.beginPath();
            moveTo(10, 20);
            L10_2.ctx.arc(0, 0, 10, 0, 1 * Math.PI);
            L10_2.ctx.fillStyle = "#AD407D";
            L10_2.ctx.strokeStyle = "#AD407D";
            L10_2.ctx.fill();
            L10_2.ctx.stroke();
            moveTo(0, 20);
            L10_2.ctx.lineTo(-10, -10);
            L10_2.ctx.lineTo(-3, 2);
            L10_2.ctx.lineTo(1, -10);
            L10_2.ctx.lineTo(4, 2);
            L10_2.ctx.lineTo(9, -10);
            L10_2.ctx.lineTo(9, 3);
            L10_2.ctx.closePath();
            L10_2.ctx.fillStyle = "#AD407D";
            L10_2.ctx.fill();
            L10_2.ctx.stroke();
            for (var i = this.quantity; i > 10; i -= 10) {
                L10_2.ctx.beginPath();
                moveTo(30, 20);
                L10_2.ctx.rotate(45 * Math.PI / 20);
                L10_2.ctx.arc(10, 0, 5, 0, 2 * Math.PI);
                L10_2.ctx.lineWidth = 3;
                L10_2.ctx.fill();
                L10_2.ctx.stroke();
            }
            L10_2.ctx.restore();
        }
    }
    L10_2.Flower = Flower;
})(L10_2 || (L10_2 = {}));
//# sourceMappingURL=flowers.js.map