"use strict";
var L11;
(function (L11) {
    //Jirkas Code (Asteroids/vector.ts)
    class vector {
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
    }
    L11.vector = vector;
})(L11 || (L11 = {}));
//# sourceMappingURL=vector.js.map