"use strict";
var Endabgabe_SoSe21;
(function (Endabgabe_SoSe21) {
    /**
     * class to handle ball
     */
    //Super Klasse um bewegbare Objekte zu handeln und Klasse für Ball- export und extends
    //Beispiel: class KindKlasse extends ElternKlasse { ... }
    class Ball extends Endabgabe_SoSe21.Movable {
        //Die constructor Methode kann mit dem Schlüsselwort super die constructor Methode der Eltern-Klasse aufrufen
        constructor(_origin) {
            //Super Klasse um bewegbare Objekte zu handeln, greift auf Origin/Vector zurück
            super(_origin);
            this.speed = 0;
            this.speedLevel = 10;
            this.slowDown = true;
            this.radius = 1.5;
        }
        //Ball zeichnen
        draw() {
            Endabgabe_SoSe21.ctx.save();
            // wird in der Mitte vom Spielfeld gezeichnet 
            Endabgabe_SoSe21.ctx.beginPath();
            Endabgabe_SoSe21.ctx.arc(this.position.X, this.position.Y, this.getRadius(), 0, 2 * Math.PI, false);
            Endabgabe_SoSe21.ctx.fillStyle = "white";
            Endabgabe_SoSe21.ctx.fill();
            Endabgabe_SoSe21.ctx.lineWidth = 1;
            Endabgabe_SoSe21.ctx.strokeStyle = "black";
            Endabgabe_SoSe21.ctx.stroke();
            Endabgabe_SoSe21.ctx.restore();
        }
    }
    Endabgabe_SoSe21.Ball = Ball;
})(Endabgabe_SoSe21 || (Endabgabe_SoSe21 = {}));
//# sourceMappingURL=ball.js.map