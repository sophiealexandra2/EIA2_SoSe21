"use strict";
var Endabgabe_SoSe21;
(function (Endabgabe_SoSe21) {
    class Linesman extends Endabgabe_SoSe21.Movable {
        constructor(_position) {
            super(new Endabgabe_SoSe21.Vector(_position.X, _position.Y));
            this.target = new Endabgabe_SoSe21.Vector(_position.X, _position.Y);
            this.radius = 1.5;
        }
        getTargetFn() {
            return this.targetFn();
        }
        setTargetFn(cb) {
            this.targetFn = cb;
        }
        draw() {
            Endabgabe_SoSe21.ctx.save();
            // draw player center
            Endabgabe_SoSe21.ctx.beginPath();
            Endabgabe_SoSe21.ctx.arc(this.position.X, this.position.Y, this.getRadius(), 0, 2 * Math.PI, false);
            Endabgabe_SoSe21.ctx.fillStyle = this.color;
            Endabgabe_SoSe21.ctx.fill();
            Endabgabe_SoSe21.ctx.lineWidth = 1;
            Endabgabe_SoSe21.ctx.strokeStyle = "#003300";
            Endabgabe_SoSe21.ctx.stroke();
            Endabgabe_SoSe21.ctx.restore();
        }
    }
    Endabgabe_SoSe21.Linesman = Linesman;
})(Endabgabe_SoSe21 || (Endabgabe_SoSe21 = {}));
//# sourceMappingURL=linesman.js.map