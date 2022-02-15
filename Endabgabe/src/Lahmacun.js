"use strict";
var veganDoenerSimulator;
(function (veganDoenerSimulator) {
    class Lahmacun extends veganDoenerSimulator.Food {
        constructor() {
            super(veganDoenerSimulator.FoodNames.Lahmacun);
            this.requires = [veganDoenerSimulator.IngredientNames.Fladenbrot, veganDoenerSimulator.IngredientNames.Salat, veganDoenerSimulator.IngredientNames.Tomate, veganDoenerSimulator.IngredientNames.Zwiebel, veganDoenerSimulator.IngredientNames.Fleisch];
        }
    }
    veganDoenerSimulator.Lahmacun = Lahmacun;
})(veganDoenerSimulator || (veganDoenerSimulator = {}));
//# sourceMappingURL=Lahmacun.js.map