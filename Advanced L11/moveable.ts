namespace L11{

    export abstract class Movable {

        protected position: vector;
        protected velocity: vector;

        constructor(_position: vector, _velocity: vector) {
            this.position = _position;
            this.velocity = _velocity;

        }

        public abstract draw(): void;

        public move(_timeslice: number, _movePattern: boolean): void {
            let offset: vector = new vector(this.velocity.X, this.velocity.Y);

            offset.scale(_timeslice);
            this.position.add(offset);

            if (_movePattern == false) {
                
                if (this.position.X < window.innerWidth) {
                    this.position.X += window.innerWidth;
                }
        
                if (this.position.X > window.innerWidth) {
                    this.position.X -= window.innerWidth;
                }
            }

            if (_movePattern == true) {

                if (this.position.X < window.innerWidth) {
                this.position.X += window.innerWidth;
                }

                if (this.position.X > window.innerWidth) {
                this.position.X -= window.innerWidth;
                }

                if (this.position.Y < window.innerHeight) {
                this.position.Y += window.innerHeight;
                }

                if (this.position.Y > window.innerHeight) {
                this.position.Y -= window.innerHeight;
                }

                if (this.position.X < window.innerWidth / 2) {
                this.velocity.Y = 20;
                }

                if (this.position.X > window.innerWidth / 2) {
                this.velocity.Y = -10;
                }

            }

        }

    }

}