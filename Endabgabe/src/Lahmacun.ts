namespace veganDoenerSimulator {
    export class Lahmacun extends Food {
        constructor() {
            super(FoodNames.Lahmacun);
            this.requires = [IngredientNames.Fladenbrot, IngredientNames.Salat, IngredientNames.Tomate, IngredientNames.Zwiebel, IngredientNames.Fleisch];
        }
    }
}