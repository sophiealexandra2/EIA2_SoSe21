namespace vegandoenerSimulator {
    export class Food {
    readonly name: FoodNames;
    requires: IngredientNames [] = [];
    readonly has: IngredientNames [] = [];
    finished: boolean = false;

    constructor (itemName: FoodNames) {
        this.name = itemName;
    }

    //hier muss ich irgendwie noch die ingredients vergleichen, nach menge die gebraucht wird und das exakte ingredient. 
    //also requires.length == this.length irgendwie?
}}
