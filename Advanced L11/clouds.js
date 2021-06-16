"use strict";
var L11;
(function (L11) {
    class Cloud extends L11.Movable {
        constructor(_position, _size, _velocity, _x, _y) {
            super(_position, _velocity);
            this.size = _size;
            this.x = _x;
            this.y = _y;
        }
        draw() {
            //Jirkas Code. Mit meinen alten Wolken hab ich die Bewegung irgendwie nicht hinbekommen. Aber so hat es eeeendlich geklappt
            let particleNumber = 40;
            let particleRadius = 50;
            let particle = new Path2D();
            let gradient = L11.ctx.createRadialGradient(0, 0, 0, 0, 0, particleRadius);
            particle.arc(0, 0, particleRadius, 0, 2 * Math.PI);
            gradient.addColorStop(0, "HSLA(200, 30%, 80%, 0.15)");
            gradient.addColorStop(1, "HSLA(100, 10%, 70%, 0)");
            L11.ctx.save();
            L11.ctx.translate(this.position.X, this.position.Y);
            L11.ctx.fillStyle = gradient;
            for (let i = 0; i < particleNumber; i++) {
                L11.ctx.save();
                L11.ctx.translate(this.x, this.y);
                L11.ctx.fill(particle);
                L11.ctx.restore();
            }
            L11.ctx.restore();
        }
    }
    L11.Cloud = Cloud;
})(L11 || (L11 = {}));
//# sourceMappingURL=clouds.js.map