"use strict";
var vegandoenerSimulator;
(function (vegandoenerSimulator) {
    class Workplace extends vegandoenerSimulator.Entity {
        constructor(workOn, initPos) {
            super(initPos);
            this.food = null;
            this.food = workOn;
        }
    }
    vegandoenerSimulator.Workplace = Workplace;
})(vegandoenerSimulator || (vegandoenerSimulator = {}));
//# sourceMappingURL=workplace.js.map