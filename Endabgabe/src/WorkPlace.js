"use strict";
var veganDoenerSimulator;
(function (veganDoenerSimulator) {
    class Workplace extends veganDoenerSimulator.Entity {
        constructor(workOn, initPos) {
            super(initPos);
            this.food = null;
            this.food = workOn;
        }
    }
    veganDoenerSimulator.Workplace = Workplace;
})(veganDoenerSimulator || (veganDoenerSimulator = {}));
//# sourceMappingURL=WorkPlace.js.map