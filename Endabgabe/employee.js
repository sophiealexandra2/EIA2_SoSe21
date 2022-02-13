"use strict";
var vegandoenerSimulator;
(function (vegandoenerSimulator) {
    class Employee extends vegandoenerSimulator.Entity {
        constructor(initPos) {
            super(initPos);
            this.speed = 2;
            this.carries = null;
            this.mood = vegandoenerSimulator.Moods.Chef;
            this.target = null;
            this.lastMove = new Date();
        }
    }
    vegandoenerSimulator.Employee = Employee;
})(vegandoenerSimulator || (vegandoenerSimulator = {}));
//# sourceMappingURL=employee.js.map