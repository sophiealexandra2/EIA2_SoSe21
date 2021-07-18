namespace Endabgabe_SoSe21 {
    export class Linesman extends Movable {

        //Der Ausdruck einer Pfeilfunktion hat eine kürzere Syntax als ein Funktionsausdruck und hat kein eigenes this, 
        //arguments, super, oder new.target. Solche Funktionsausdrücke sind am besten für Funktionen, die nicht als Methode genutzt werden, 
        //geeignet und können nicht als Konstruktoren verwendet werden.
        
        private targetFn: () => Vector;

        constructor(_position: Vector) {
            super(
                new Vector(_position.X, _position.Y)
            );
            this.target = new Vector(_position.X, _position.Y);
            this.radius = 1.5;


        }
        
        
        public getTargetFn(): Vector {
            return this.targetFn();
        }
        public setTargetFn(cb: () => Vector): void {
            this.targetFn = cb;
        }



       
       

        public draw(): void {
            ctx.save();

            // draw player center
            ctx.beginPath();
            ctx.arc(this.position.X, this.position.Y, this.getRadius() , 0, 2 * Math.PI, false);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#003300";
            ctx.stroke();

            ctx.restore();
        }
    }
}
