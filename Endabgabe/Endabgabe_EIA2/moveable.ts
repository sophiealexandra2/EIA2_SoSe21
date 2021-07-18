namespace Endabgabe_SoSe21 {
    /**
     * Super class to handle movable objects
     */
    export abstract class Movable {
        protected position: Vector;
        protected speed: number;
        protected slowDown: boolean;
        protected speedLevel: number;
        protected target: Vector;
        protected color: string;
        protected radius: number;

        constructor(_position: Vector) {
            this.position = _position;
            this.speed = 1;
            this.speedLevel = 1;
            this.slowDown = false;
            this.radius = 2;
        }

        public setColor(color: string): void {
            this.color = color;
        }

        public getRadius(): number {
            return this.radius * scale;
        }

        public setRadius(radius: number): void {
            this.radius = radius;
        }

        public setTarget(target: Vector): void {
            this.target = target;
        }

        public getTarget(): Vector {
            return this.target;
        }

        public getPosition(): Vector {
            return this.position;
        }

        public setPosition(position: Vector): void {
            this.position = position;
        }


        public getSpeed(): number {
            return this.speed;
        }

        public setSpeed(speed: number): void {
            this.speed = speed;
        }

        /**
         * draws object
         */
        public abstract draw(): void;

        /**
         * moves object to target
         */
        public move(target: Vector): void {
            if (!target) { return; }
            // calc diff vector
            const diffVectr: Vector = new Vector(
                target.X - this.position.X,
                target.Y - this.position.Y
            );

            // calc length of diff vector and return if zero
            const vectorLength: number = Math.sqrt(Math.pow(diffVectr.X, 2) + Math.pow(diffVectr.Y, 2));
            if (vectorLength === 0) { return; }

            // calc speed by movable properties
            const speedLevel: number = this.speedLevel * (this.speed / 100);

            // apply slow down if activated (Ball)
            //Ternary Operator. Arbeitet ähnlich wie if...else. this.slowDown = true. Execute speedLevel...
            //If false, execute speedLevel only.
            const speed: number = this.slowDown ? speedLevel * (vectorLength / 100) : speedLevel;

            // calc scaling
            const scaleFactor: number = speed / vectorLength;

            // apply scaling to diff
            diffVectr.scale(scaleFactor);

            // add diff to current pos
            this.position.add(diffVectr);
        }

    }

}