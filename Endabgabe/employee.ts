namespace vegandoenerSimulator {
    export class Employee extends Entity {
        public readonly speed: number = 2;
        public carries: Ingredient | Food | null = null; 
        public mood: Moods = Moods.Chef;
        public target: Customer | Workplace | Storage | null = null;
        public lastMove: Date = new Date ();

        constructor(initPos: Vector2) {
            super(initPos);
        }
    }
}
