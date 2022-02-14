namespace veganDoenerSimulator {
    export class Doener extends Food {
        constructor() {
            super(FoodNames.Doener);
            this.requires = [IngredientNames.Fladenbrot, IngredientNames.Salat, IngredientNames.Zwiebel, IngredientNames.Fleisch, IngredientNames.Sauce];
        }
    }
}