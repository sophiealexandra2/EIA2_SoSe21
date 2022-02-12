namespace vegandoenerSimulator {
    export class Customer extends Entity {
        public mood: Moods = Moods.Hungry;
        public wants: Food; 
        public readonly speed: number = 0.5; 
        public status: customerStatus = customerStatus.ComingIn; 
        public targetPos: Vector2 | null;
        public waitingSince: Date | null; 

        constructor (initPos: Vector2, targetPos: Vector2) {
            super(initPos); 
            this.setRandomFood();
            this.targetPos = targetPos;
        }
     //set random food when customer is created
        private setRandomFood () {
            let foods = [FoodNames. Lahmacun, FoodNames.Doener, FoodNames.Yufka];
            let idx: number = Math.floor (Math.random() * 3);
             //Übergibt an array, array registriert function dass das essen mit math.random auf den constructor übergibt. noch fehler :/
            this.wants = new Food (foods[idx]);
        }

    }  
}
