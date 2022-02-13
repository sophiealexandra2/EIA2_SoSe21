"use strict";
var vegandoenerSimulator;
(function (vegandoenerSimulator) {
    class Yufka extends vegandoenerSimulator.Food {
        constructor() {
            super(vegandoenerSimulator.FoodNames.Yufka);
            this.requires = [vegandoenerSimulator.IngredientNames.Brot, vegandoenerSimulator.IngredientNames.Salat, vegandoenerSimulator.IngredientNames.Zwiebel, vegandoenerSimulator.IngredientNames.VeganesFleisch];
        }
    }
    vegandoenerSimulator.Yufka = Yufka;
})(vegandoenerSimulator || (vegandoenerSimulator = {}));
//# sourceMappingURL=yufka.js.map