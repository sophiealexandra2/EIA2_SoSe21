namespace vegandoenerSimulator {
    export class Workplace extends Entity {
        public food: Food | null = null;
        constructor(workOn: Food | null, initPos: Vector2) {
            super(initPos); 
            this.food = workOn;
        }
    }
}