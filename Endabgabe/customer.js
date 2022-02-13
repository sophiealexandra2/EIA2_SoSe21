"use strict";
var vegandoenerSimulator;
(function (vegandoenerSimulator) {
    class Customer extends vegandoenerSimulator.Entity {
        constructor(initPos, targetPos) {
            super(initPos);
            this.mood = vegandoenerSimulator.Moods.Hungry;
            this.speed = 0.5;
            this.status = vegandoenerSimulator.customerStatus.ComingIn;
            this.setRandomFood();
            this.targetPos = targetPos;
        }
        //set random food when customer is created
        setRandomFood() {
            let foods = [vegandoenerSimulator.FoodNames.Lahmacun, vegandoenerSimulator.FoodNames.Doener, vegandoenerSimulator.FoodNames.Yufka];
            let idx = Math.floor(Math.random() * 3);
            //Übergibt an array, array registriert function dass das essen mit math.random auf den constructor übergibt. noch fehler :/
            this.wants = new vegandoenerSimulator.Food(foods[idx]);
        }
    }
    vegandoenerSimulator.Customer = Customer;
})(vegandoenerSimulator || (vegandoenerSimulator = {}));
//# sourceMappingURL=customer.js.map