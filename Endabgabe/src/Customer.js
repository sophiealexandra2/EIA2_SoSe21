"use strict";
var YufkaSimulator;
(function (YufkaSimulator) {
    class Customer extends YufkaSimulator.Entity {
        constructor(initPos, targetPos) {
            super(initPos);
            this.mood = YufkaSimulator.Moods.Hungry;
            this.speed = 0.5;
            this.status = YufkaSimulator.CustomerStatus.ComingIn;
            this.setRandomFood();
            this.targetPos = targetPos;
        }
        //set random food when customer is created
        setRandomFood() {
            let foods = [YufkaSimulator.FoodNames.Lahmacun, YufkaSimulator.FoodNames.Doener, YufkaSimulator.FoodNames.Yufka];
            let idx = Math.floor(Math.random() * 3);
            this.wants = new YufkaSimulator.Food(foods[idx]);
        }
    }
    YufkaSimulator.Customer = Customer;
})(YufkaSimulator || (YufkaSimulator = {}));
//# sourceMappingURL=Customer.js.map