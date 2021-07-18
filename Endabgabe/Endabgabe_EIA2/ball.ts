namespace Endabgabe_SoSe21 {
    /**
     * class to handle ball
     */
    //Super Klasse um bewegbare Objekte zu handeln und Klasse für Ball- export und extends
    //Beispiel: class KindKlasse extends ElternKlasse { ... }
    export class Ball extends Movable {
        protected speed: number = 0;
        protected speedLevel: number = 10;

        //Die constructor Methode kann mit dem Schlüsselwort super die constructor Methode der Eltern-Klasse aufrufen
        constructor(_origin: Vector) {
            //Super Klasse um bewegbare Objekte zu handeln, greift auf Origin/Vector zurück
            super(_origin);
            this.slowDown = true;
            this.radius = 1.5;
        }

//Ball zeichnen
        public draw(): void {
            ctx.save();

            // wird in der Mitte vom Spielfeld gezeichnet 
            ctx.beginPath();
            ctx.arc(this.position.X, this.position.Y, this.getRadius(), 0, 2 * Math.PI, false);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            ctx.stroke();


            ctx.restore();
        }
    }
}