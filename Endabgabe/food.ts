namespace vegandoenerSimulator {
    export class Food {
    readonly name: FoodNames;
    requires: IngredientNames [] = [];
    readonly has: IngredientNames [] = [];
    finished: boolean = false;
}}
