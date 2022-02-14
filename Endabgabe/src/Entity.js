"use strict";
var YufkaSimulator;
(function (YufkaSimulator) {
    class Entity {
        constructor(initPos) {
            this.position = new YufkaSimulator.Vector2(initPos.x, initPos.y);
        }
    }
    YufkaSimulator.Entity = Entity;
})(YufkaSimulator || (YufkaSimulator = {}));
//# sourceMappingURL=Entity.js.map