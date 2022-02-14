"use strict";
var YufkaSimulator;
(function (YufkaSimulator) {
    class Food {
        constructor(itemName) {
            this.requires = [];
            this.has = [];
            this.finished = false;
            this.name = itemName;
        }
        //add ingredient, returns true if successful, otherwise false
        addIngredient(ing) {
            let idx = this.requires.indexOf(ing.name);
            //ingredient not required
            if (idx === -1) {
                return false;
            }
            //ingredient already existing
            if (this.has.indexOf(ing.name) !== -1) {
                return false;
            }
            //add ingredient: success
            this.has.push(ing.name);
            //if all ingredients are there: food is finished
            if (this.requires.length === this.has.length) {
                this.finished = true;
            }
            return true;
        }
    }
    YufkaSimulator.Food = Food;
})(YufkaSimulator || (YufkaSimulator = {}));
//# sourceMappingURL=Food.js.map