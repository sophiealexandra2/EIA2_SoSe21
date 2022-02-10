namespace vegandoenerSimulator {
    export class Storage extends Entity {
        contains: IngredientNames;
        constructor (contains: IngredientNames, public amount: number, initPos: Vector2) {
            super (initPos);
            this.contains = contains;
        }
    }
    //Hier muss noch rein, dass überprüft wird ob der genommene Gegenstand bzw Zutat ok ist zunehmen (Ingredient == neededIngredient)
}