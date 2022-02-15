"use strict";
var veganDoenerSimulator;
(function (veganDoenerSimulator) {
    class Entity {
        constructor(initPos) {
            this.position = new veganDoenerSimulator.Vector2(initPos.x, initPos.y);
        }
    }
    veganDoenerSimulator.Entity = Entity;
})(veganDoenerSimulator || (veganDoenerSimulator = {}));
//# sourceMappingURL=Entity.js.map