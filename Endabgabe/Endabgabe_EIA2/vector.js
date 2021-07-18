"use strict";
var Endabgabe_SoSe21;
(function (Endabgabe_SoSe21) {
    //Jirkas Code teilweise (Asteroids/vector.ts)
    // tslint:disable-next-line: class-name
    class Vector {
        constructor(_X, _Y) {
            this.X = _X;
            this.Y = _Y;
        }
        scale(_factor) {
            this.X *= _factor;
            this.Y *= _factor;
        }
        add(_added) {
            this.X += _added.X;
            this.Y += _added.Y;
        }
        draw(color = "red", radius = 1) {
            Endabgabe_SoSe21.ctx.beginPath();
            Endabgabe_SoSe21.ctx.arc(this.X, this.Y, radius, 0, 2 * Math.PI, false);
            Endabgabe_SoSe21.ctx.lineWidth = 1;
            Endabgabe_SoSe21.ctx.strokeStyle = color;
            Endabgabe_SoSe21.ctx.stroke();
        }
    }
    Endabgabe_SoSe21.Vector = Vector;
})(Endabgabe_SoSe21 || (Endabgabe_SoSe21 = {}));
//# sourceMappingURL=vector.js.map