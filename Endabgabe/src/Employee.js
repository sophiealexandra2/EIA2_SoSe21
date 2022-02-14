"use strict";
var YufkaSimulator;
(function (YufkaSimulator) {
    class Employee extends YufkaSimulator.Entity {
        constructor(initPos) {
            super(initPos);
            this.speed = 2;
            this.carries = null;
            this.mood = YufkaSimulator.Moods.Chef;
            this.target = null;
            this.lastMove = new Date();
        }
    }
    YufkaSimulator.Employee = Employee;
})(YufkaSimulator || (YufkaSimulator = {}));
//# sourceMappingURL=Employee.js.map