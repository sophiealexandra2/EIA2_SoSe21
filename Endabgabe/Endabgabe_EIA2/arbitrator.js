"use strict";
var Endabgabe_SoSe21;
(function (Endabgabe_SoSe21) {
    /**
     * class für Schiedsrichter
     */
    class Arbitrator extends Endabgabe_SoSe21.Movable {
        constructor(_position) {
            super(new Endabgabe_SoSe21.Vector(_position.X, _position.Y));
            // set default target
            this.target = new Endabgabe_SoSe21.Vector(_position.X, _position.Y);
            // Sein Radius
            this.radius = 1.5;
        }
        /**
         * Schiedsrichter wird gezeichnet
         */
        draw() {
            Endabgabe_SoSe21.ctx.save();
            Endabgabe_SoSe21.ctx.beginPath();
            Endabgabe_SoSe21.ctx.arc(this.position.X, this.position.Y, this.getRadius(), 0, 2 * Math.PI, false);
            Endabgabe_SoSe21.ctx.fillStyle = this.color;
            Endabgabe_SoSe21.ctx.fill();
            Endabgabe_SoSe21.ctx.lineWidth = 1;
            Endabgabe_SoSe21.ctx.strokeStyle = "#003300";
            Endabgabe_SoSe21.ctx.stroke();
            Endabgabe_SoSe21.ctx.restore();
        }
    }
    Endabgabe_SoSe21.Arbitrator = Arbitrator;
})(Endabgabe_SoSe21 || (Endabgabe_SoSe21 = {}));
//# sourceMappingURL=arbitrator.js.map