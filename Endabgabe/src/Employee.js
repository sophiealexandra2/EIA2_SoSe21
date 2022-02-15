"use strict";
var veganDoenerSimulator;
(function (veganDoenerSimulator) {
    class Employee extends veganDoenerSimulator.Entity {
        constructor(initPos) {
            super(initPos);
            this.speed = 2;
            this.carries = null;
            this.mood = veganDoenerSimulator.Moods.Chef;
            this.target = null;
            this.lastMove = new Date();
        }
    }
    veganDoenerSimulator.Employee = Employee;
})(veganDoenerSimulator || (veganDoenerSimulator = {}));
//# sourceMappingURL=Employee.js.map