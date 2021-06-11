"use strict";
var L10_2;
(function (L10_2) {
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
    L10_2.vector = vector;
})(L10_2 || (L10_2 = {}));
//# sourceMappingURL=vector.js.map