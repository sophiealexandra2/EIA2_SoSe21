"use strict";
var veganDoenerSimulator;
(function (veganDoenerSimulator) {
    class Doener extends veganDoenerSimulator.Food {
        constructor() {
            super(veganDoenerSimulator.FoodNames.Doener);
            this.requires = [veganDoenerSimulator.IngredientNames.Fladenbrot, veganDoenerSimulator.IngredientNames.Salat, veganDoenerSimulator.IngredientNames.Zwiebel, veganDoenerSimulator.IngredientNames.Fleisch, veganDoenerSimulator.IngredientNames.Sauce];
        }
    }
    veganDoenerSimulator.Doener = Doener;
})(veganDoenerSimulator || (veganDoenerSimulator = {}));
//# sourceMappingURL=Doener.js.map