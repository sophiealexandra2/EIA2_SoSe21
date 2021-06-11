"use strict";
var L10_2;
(function (L10_2) {
    class Cloud extends L10_2.Movable {
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
            let gradient = L10_2.ctx.createRadialGradient(0, 0, 0, 0, 0, particleRadius);
            particle.arc(0, 0, particleRadius, 0, 2 * Math.PI);
            gradient.addColorStop(0, "HSLA(200, 30%, 80%, 0.15)");
            gradient.addColorStop(1, "HSLA(100, 10%, 70%, 0)");
            L10_2.ctx.save();
            L10_2.ctx.translate(this.position.X, this.position.Y);
            L10_2.ctx.fillStyle = gradient;
            for (let i = 0; i < particleNumber; i++) {
                L10_2.ctx.save();
                L10_2.ctx.translate(this.x, this.y);
                L10_2.ctx.fill(particle);
                L10_2.ctx.restore();
            }
            L10_2.ctx.restore();
        }
    }
    L10_2.Cloud = Cloud;
})(L10_2 || (L10_2 = {}));
//# sourceMappingURL=clouds.js.map