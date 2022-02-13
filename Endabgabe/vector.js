"use strict";
var vegandoenerSimulator;
(function (vegandoenerSimulator) {
    class Vector2 {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        distanceTo(vec) {
            return Math.sqrt(Math.pow(vec.x - this.x, 2) + Math.pow(vec.y - this.y, 2));
        }
        direction(vec) {
            let distanceVec = new Vector2(vec.x - this.x, vec.x - this.y);
            let len = Math.sqrt(Math.pow(distanceVec.x, 2) + Math.pow(distanceVec.y, 2));
            return new Vector2(distanceVec.x * (1 / len), distanceVec.y * (1 / len));
        }
        add(dir, speed) {
            this.x += dir.x * speed;
            this.y += dir.x * speed;
            return this;
        }
    }
    vegandoenerSimulator.Vector2 = Vector2;
})(vegandoenerSimulator || (vegandoenerSimulator = {}));
//# sourceMappingURL=vector.js.map