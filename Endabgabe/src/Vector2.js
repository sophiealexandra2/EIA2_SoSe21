"use strict";
var veganDoenerSimulator;
(function (veganDoenerSimulator) {
    class Vector2 {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        //returns distance to other vector
        distanceTo(vec) {
            return Math.sqrt(Math.pow(vec.x - this.x, 2) + Math.pow(vec.y - this.y, 2));
        }
        //returns normalized direction vector to another vector
        direction(vec) {
            let distanceVec = new Vector2(vec.x - this.x, vec.y - this.y);
            let len = Math.sqrt(Math.pow(distanceVec.x, 2) + Math.pow(distanceVec.y, 2));
            return new Vector2(distanceVec.x * (1 / len), distanceVec.y * (1 / len));
        }
        //adds vector onto current vector (ideally direction vector)
        add(dir, speed) {
            this.x += dir.x * speed;
            this.y += dir.y * speed;
            return this;
        }
    }
    veganDoenerSimulator.Vector2 = Vector2;
})(veganDoenerSimulator || (veganDoenerSimulator = {}));
//# sourceMappingURL=Vector2.js.map