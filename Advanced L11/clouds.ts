namespace L11 {

    export class Cloud extends Movable {
        //Ersten zwei Attribute rausgenommen, da bereits gegeben
        x: number;
        y: number;
        protected size: vector;
        

        constructor(_position: vector, _size: vector, _velocity: vector, _x: number, _y: number) {
            super(_position, _velocity);

            this.size = _size;

            this.x = _x;
            this.y = _y;
    
        }

        public draw(): void {
//Jirkas Code. Mit meinen alten Wolken hab ich die Bewegung irgendwie nicht hinbekommen. Aber so hat es eeeendlich geklappt
            let particleNumber: number = 40;
            let particleRadius: number = 50;
            let particle: Path2D = new Path2D();
            let gradient: CanvasGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particleRadius);

            particle.arc(0, 0, particleRadius, 0, 2 * Math.PI);
            gradient.addColorStop(0, "HSLA(200, 30%, 80%, 0.15)");
            gradient.addColorStop(1, "HSLA(100, 10%, 70%, 0)");

            ctx.save();
            ctx.translate(this.position.X, this.position.Y);
            ctx.fillStyle = gradient;

            for (let i: number = 0; i < particleNumber; i++) {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.fill(particle);
                ctx.restore();
            }
            ctx.restore();
        }

        
    }
    
}