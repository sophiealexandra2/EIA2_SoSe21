"use strict";
var YufkaSimulator;
(function (YufkaSimulator) {
    class Workplace extends YufkaSimulator.Entity {
        constructor(workOn, initPos) {
            super(initPos);
            this.food = null;
            this.food = workOn;
        }
    }
    YufkaSimulator.Workplace = Workplace;
})(YufkaSimulator || (YufkaSimulator = {}));
//# sourceMappingURL=WorkPlace.js.map