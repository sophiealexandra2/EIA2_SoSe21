namespace vegandoenerSimulator {
   export class Vector2 {
        public x: number;
        public y: number; 

        constructor (x: number, y: number) {
        this.x = x;
        this.y = y; 
        }

         distanceTo(vec: Vector2) {
        return Math.sqrt(Math.pow(vec.x - this.x, 2) + Math.pow(vec.y - this.y, 2));
        }

         direction(vec: Vector2) {
        let distanceVec = new Vector2(vec.x - this.x, vec.x - this.y);
        let len = Math.sqrt(Math.pow(distanceVec.x, 2) + Math.pow (distanceVec.y, 2));
        return new Vector2(distanceVec.x * (1 / len), distanceVec.y * (1 / len));
        }
        
         add(dir: Vector2, speed: number) {
        this.x += dir.x * speed;
        this.y += dir.x * speed;
        return this;   
        }
   } 

}