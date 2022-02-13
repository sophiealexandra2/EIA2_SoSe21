"use strict";
var vegandoenerSimulator;
(function (vegandoenerSimulator) {
    class Lahmacun extends vegandoenerSimulator.Food {
        constructor() {
            super(vegandoenerSimulator.FoodNames.Lahmacun);
            this.requires = [vegandoenerSimulator.IngredientNames.Fladenbrot, vegandoenerSimulator.IngredientNames.Salat, vegandoenerSimulator.IngredientNames.Tomate, vegandoenerSimulator.IngredientNames.Zwiebel, vegandoenerSimulator.IngredientNames.VeganesFleisch];
        }
    }
    vegandoenerSimulator.Lahmacun = Lahmacun;
})(vegandoenerSimulator || (vegandoenerSimulator = {}));
//# sourceMappingURL=lahmacun.js.map