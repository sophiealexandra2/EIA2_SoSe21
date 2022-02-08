namespace vegandoenerSimulator {
    export class Doener extends Food {
        constructor() {
            super (FoodNames.Doener);
            this.requires = [IngredientNames.Fladenbrot, IngredientNames.Salat, IngredientNames.Zwiebel, IngredientNames.VeganesFleisch, IngredientNames.Salat];
        }
    }
}
