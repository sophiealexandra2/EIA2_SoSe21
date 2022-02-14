"use strict";
var YufkaSimulator;
(function (YufkaSimulator) {
    class Yufka extends YufkaSimulator.Food {
        constructor() {
            super(YufkaSimulator.FoodNames.Yufka);
            this.requires = [YufkaSimulator.IngredientNames.Brot, YufkaSimulator.IngredientNames.Salat, YufkaSimulator.IngredientNames.Zwiebel, YufkaSimulator.IngredientNames.Fleisch];
        }
    }
    YufkaSimulator.Yufka = Yufka;
})(YufkaSimulator || (YufkaSimulator = {}));
//# sourceMappingURL=Yufka.js.map