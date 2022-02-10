namespace vegandoenerSimulator {
    export class Employee extends Entity {
        public readonly speed: number = 2;
        public carries: Ingredient | Food | null = null; 
        mood: Moods = Moods.Chef;
        target: Customer | Workplace | Storage | null = null;
        lastMove: Date = new Date ();

        constructor(initPos: Vector2) {
            super(initPos);
        }
    }
}
