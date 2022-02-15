"use strict";
var veganDoenerSimulator;
(function (veganDoenerSimulator) {
    class Storage extends veganDoenerSimulator.Entity {
        constructor(contains, amount, initPos) {
            super(initPos);
            this.amount = amount;
            this.contains = contains;
        }
        //check if taking an element is valid
        take() {
            //if no elements left, return false
            if (this.amount - 1 < 0) {
                return false;
            }
            //otherwise remove one element and return true
            this.amount -= 1;
            return true;
        }
    }
    veganDoenerSimulator.Storage = Storage;
})(veganDoenerSimulator || (veganDoenerSimulator = {}));
//# sourceMappingURL=Storage.js.map