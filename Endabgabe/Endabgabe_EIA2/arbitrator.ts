namespace Endabgabe_SoSe21 {
    /**
     * class für Schiedsrichter
     */
    export class Arbitrator extends Movable {
        constructor(_position: Vector) {
            super(
                new Vector(_position.X, _position.Y)
            );
            // set default target
            this.target = new Vector(_position.X, _position.Y);
            // Sein Radius
            this.radius = 1.5;
        }

        /**
         * Schiedsrichter wird gezeichnet
         */
        public draw(): void {
            ctx.save();

            
            ctx.beginPath();
            ctx.arc(this.position.X, this.position.Y, this.getRadius(), 0, 2 * Math.PI, false);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#003300";
            ctx.stroke();
            ctx.restore();
        }
    }
}
