namespace vegandoenerSimulator {
    export class Ingredient {
        public readonly name: IngredientNames; 

        constructor (itemName: IngredientNames) {
            this.name = itemName;
        }
    }
}