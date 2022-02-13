"use strict";
var vegandoenerSimulator;
(function (vegandoenerSimulator) {
    class Entity {
        constructor(initPos) {
            this.position = new vegandoenerSimulator.Vector2(initPos.x, initPos.y);
        }
    }
    vegandoenerSimulator.Entity = Entity;
})(vegandoenerSimulator || (vegandoenerSimulator = {}));
//# sourceMappingURL=entity.js.map