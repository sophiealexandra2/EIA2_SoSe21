"use strict";
var L11;
(function (L11) {
    //Mit Julia Dacjman damals zusammen gemacht
    class Flower {
        constructor(_position, _baseColor, _quantity) {
            this.position = _position;
            this.baseColor = _baseColor;
            this.quantity = _quantity;
        }
        draw2() {
            L11.ctx.save();
            L11.ctx.beginPath();
            L11.ctx.moveTo(this.position.X, this.position.Y);
            L11.ctx.translate(this.position.X, this.position.Y);
            L11.ctx.quadraticCurveTo(10, 5, 10, 30);
            L11.ctx.strokeStyle = "darkgreen";
            L11.ctx.stroke();
            L11.ctx.beginPath();
            moveTo(10, 20);
            L11.ctx.arc(0, 0, 6, 0, 2 * Math.PI);
            L11.ctx.fillStyle = "#CED54A";
            L11.ctx.strokeStyle = "#CED54A";
            L11.ctx.fill();
            L11.ctx.stroke();
            L11.ctx.closePath();
            for (let blossoms = 80; blossoms > 8; blossoms -= 8) {
                L11.ctx.beginPath();
                moveTo(10, 20);
                L11.ctx.rotate(45 * Math.PI / 20);
                L11.ctx.arc(10, 0, 5, 0, 2 * Math.PI);
                L11.ctx.fillStyle = "white";
                L11.ctx.strokeStyle = "purple";
                L11.ctx.fill();
                L11.ctx.stroke();
            }
            L11.ctx.restore();
        }
        draw() {
            L11.ctx.save();
            L11.ctx.beginPath();
            L11.ctx.moveTo(this.position.X, this.position.Y);
            L11.ctx.translate(this.position.X, this.position.Y);
            L11.ctx.quadraticCurveTo(10, 5, 10, 30);
            L11.ctx.strokeStyle = "#358443";
            L11.ctx.stroke();
            L11.ctx.beginPath();
            moveTo(10, 20);
            L11.ctx.arc(0, 0, 10, 0, 1 * Math.PI);
            L11.ctx.fillStyle = "#AD407D";
            L11.ctx.strokeStyle = "#AD407D";
            L11.ctx.fill();
            L11.ctx.stroke();
            moveTo(0, 20);
            L11.ctx.lineTo(-10, -10);
            L11.ctx.lineTo(-3, 2);
            L11.ctx.lineTo(1, -10);
            L11.ctx.lineTo(4, 2);
            L11.ctx.lineTo(9, -10);
            L11.ctx.lineTo(9, 3);
            L11.ctx.closePath();
            L11.ctx.fillStyle = "#AD407D";
            L11.ctx.fill();
            L11.ctx.stroke();
            for (var i = this.quantity; i > 10; i -= 10) {
                L11.ctx.beginPath();
                moveTo(30, 20);
                L11.ctx.rotate(45 * Math.PI / 20);
                L11.ctx.arc(10, 0, 5, 0, 2 * Math.PI);
                L11.ctx.lineWidth = 3;
                L11.ctx.fill();
                L11.ctx.stroke();
            }
            L11.ctx.restore();
        }
    }
    L11.Flower = Flower;
})(L11 || (L11 = {}));
//# sourceMappingURL=flowers.js.map