namespace vegandoenerSimulator {
    export class Food {
    public readonly name: FoodNames;
    public requires: IngredientNames [] = [];
    public readonly has: IngredientNames [] = [];
    public finished: boolean = false;

    constructor (itemName: FoodNames) {
        this.name = itemName;
    }

    //add ingredients, returns true if successful, otherwise its false.
    //checks if ingredinet is needed, random ingredient is being added 

    public addIngredient (ing: Ingredient) {
        let idx: number = this.requires.indexOf(ing.name);
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

}
