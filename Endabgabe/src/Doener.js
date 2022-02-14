"use strict";
var YufkaSimulator;
(function (YufkaSimulator) {
    class Doener extends YufkaSimulator.Food {
        constructor() {
            super(YufkaSimulator.FoodNames.Doener);
            this.requires = [YufkaSimulator.IngredientNames.Fladenbrot, YufkaSimulator.IngredientNames.Salat, YufkaSimulator.IngredientNames.Zwiebel, YufkaSimulator.IngredientNames.Fleisch, YufkaSimulator.IngredientNames.Sauce];
        }
    }
    YufkaSimulator.Doener = Doener;
})(YufkaSimulator || (YufkaSimulator = {}));
//# sourceMappingURL=Doener.js.map