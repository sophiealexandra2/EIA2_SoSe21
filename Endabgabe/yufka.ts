namespace vegandoenerSimulator {
    export class Yufka extends Food {
        constructor() {
            super (FoodNames.Yufka);
            this.requires = [IngredientNames.Brot, IngredientNames.Salat, IngredientNames.Zwiebel, IngredientNames.VeganesFleisch];
        }
    }
}