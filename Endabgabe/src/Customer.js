"use strict";
var veganDoenerSimulator;
(function (veganDoenerSimulator) {
    class Customer extends veganDoenerSimulator.Entity {
        constructor(initPos, targetPos) {
            super(initPos);
            this.mood = veganDoenerSimulator.Moods.Hungry;
            this.speed = 0.5;
            this.status = veganDoenerSimulator.CustomerStatus.ComingIn;
            this.setRandomFood();
            this.targetPos = targetPos;
        }
        //set random food when customer is created
        setRandomFood() {
            let foods = [veganDoenerSimulator.FoodNames.Lahmacun, veganDoenerSimulator.FoodNames.Doener, veganDoenerSimulator.FoodNames.Yufka];
            let idx = Math.floor(Math.random() * 3);
            this.wants = new veganDoenerSimulator.Food(foods[idx]);
        }
    }
    veganDoenerSimulator.Customer = Customer;
})(veganDoenerSimulator || (veganDoenerSimulator = {}));
//# sourceMappingURL=Customer.js.map