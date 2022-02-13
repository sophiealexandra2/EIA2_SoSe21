"use strict";
var vegandoenerSimulator;
(function (vegandoenerSimulator) {
    class Food {
        constructor(itemName) {
            this.requires = [];
            this.has = [];
            this.finished = false;
            this.name = itemName;
        }
        //add ingredients, returns true if successful, otherwise its false.
        //checks if ingredinet is needed, random ingredient is being added 
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
            //if both fail, add ingredient: success
            this.has.push(ing.name);
            if (this.requires.length === this.has.length) {
                this.finished = true;
            }
            return true;
        }
    }
    vegandoenerSimulator.Food = Food;
})(vegandoenerSimulator || (vegandoenerSimulator = {}));
//# sourceMappingURL=food.js.map