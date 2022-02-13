"use strict";
var vegandoenerSimulator;
(function (vegandoenerSimulator) {
    class Doener extends vegandoenerSimulator.Food {
        constructor() {
            super(vegandoenerSimulator.FoodNames.Doener);
            this.requires = [vegandoenerSimulator.IngredientNames.Fladenbrot, vegandoenerSimulator.IngredientNames.Salat, vegandoenerSimulator.IngredientNames.Zwiebel, vegandoenerSimulator.IngredientNames.VeganesFleisch, vegandoenerSimulator.IngredientNames.Salat];
        }
    }
    vegandoenerSimulator.Doener = Doener;
})(vegandoenerSimulator || (vegandoenerSimulator = {}));
//# sourceMappingURL=doener.js.map