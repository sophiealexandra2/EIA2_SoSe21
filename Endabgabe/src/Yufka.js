"use strict";
var veganDoenerSimulator;
(function (veganDoenerSimulator) {
    class Yufka extends veganDoenerSimulator.Food {
        constructor() {
            super(veganDoenerSimulator.FoodNames.Yufka);
            this.requires = [veganDoenerSimulator.IngredientNames.Brot, veganDoenerSimulator.IngredientNames.Salat, veganDoenerSimulator.IngredientNames.Zwiebel, veganDoenerSimulator.IngredientNames.Fleisch];
        }
    }
    veganDoenerSimulator.Yufka = Yufka;
})(veganDoenerSimulator || (veganDoenerSimulator = {}));
//# sourceMappingURL=Yufka.js.map