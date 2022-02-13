"use strict";
var vegandoenerSimulator;
(function (vegandoenerSimulator) {
    class Storage extends vegandoenerSimulator.Entity {
        constructor(contains, amount, initPos) {
            super(initPos);
            this.amount = amount;
            this.contains = contains;
        }
        //check if taking an element is okay and valid
        take() {
            if (this.amount - 1 < 0) {
                return false;
            }
            //otherwise remove an element and return true
            this.amount -= 1;
            return true;
        }
    }
    vegandoenerSimulator.Storage = Storage;
})(vegandoenerSimulator || (vegandoenerSimulator = {}));
//# sourceMappingURL=storage.js.map