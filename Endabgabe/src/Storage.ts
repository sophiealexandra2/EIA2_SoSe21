namespace veganDoenerSimulator {
    export class Storage extends Entity {
        contains: IngredientNames;
        constructor(contains: IngredientNames, public amount: number, initPos: Vector2) {
            super(initPos);
            this.contains = contains;
        }

        //check if taking an element is valid
        take () {
            //if no elements left, return false
            if (this.amount - 1  < 0 ) {
                return false;
            }
            //otherwise remove one element and return true
            this.amount -= 1;
            return true;
        }
    }
}