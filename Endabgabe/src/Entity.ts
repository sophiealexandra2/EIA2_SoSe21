namespace veganDoenerSimulator {
    export class Entity {
        public position: Vector2;

        constructor(initPos: Vector2) {
            this.position = new Vector2(initPos.x, initPos.y);
        }
    }
}