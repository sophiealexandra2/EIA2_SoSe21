"use strict";
var YufkaSimulator;
(function (YufkaSimulator) {
    class Lahmacun extends YufkaSimulator.Food {
        constructor() {
            super(YufkaSimulator.FoodNames.Lahmacun);
            this.requires = [YufkaSimulator.IngredientNames.Fladenbrot, YufkaSimulator.IngredientNames.Salat, YufkaSimulator.IngredientNames.Tomate, YufkaSimulator.IngredientNames.Zwiebel, YufkaSimulator.IngredientNames.Fleisch];
        }
    }
    YufkaSimulator.Lahmacun = Lahmacun;
})(YufkaSimulator || (YufkaSimulator = {}));
//# sourceMappingURL=Lahmacun.js.map