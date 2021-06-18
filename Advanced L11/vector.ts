namespace L11 {
//Jirkas Code (Asteroids/vector.ts)
    // tslint:disable-next-line: class-name
    export class vector {
        public X: number;
        public Y: number;

        constructor(_X: number, _Y: number) {
            this.X = _X;
            this.Y = _Y;
        }

        public scale (_factor: number): void {
            this.X *= _factor;
            this.Y *= _factor;
        }

        public add(_added: vector): void {
            this.X += _added.X;
            this.Y += _added.Y;
        }
    }
}