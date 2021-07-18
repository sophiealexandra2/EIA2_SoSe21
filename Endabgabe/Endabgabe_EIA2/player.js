"use strict";
var Endabgabe_SoSe21;
(function (Endabgabe_SoSe21) {
    //Player: Kindklasse Movable: Elternklasse. Klasse to handle player
    class Player extends Endabgabe_SoSe21.Movable {
        constructor(name, _position, shotPower = 70, precision = 70, speed = 80, color = "red", team = 0, trikotNumer = 0) {
            super(new Endabgabe_SoSe21.Vector(_position.X, _position.Y));
            // default speed level welches mit speed skaliert wird
            this.speedLevel = 2;
            // speed 1 to 99
            this.speed = 80;
            // precision 1 to 99
            this.precision = 20;
            // Starplatz bzw. origin von einem Spieler
            this.origin = new Endabgabe_SoSe21.Vector(0, 0);
            // Id für einen Spieler für die Identifikation
            this.id = Endabgabe_SoSe21.uuidv4();
            // Action radius
            this.actionRadius = 30;
            // shot power
            this.shotPower = 100;
            this.shotPower = shotPower;
            this.precision = precision;
            this.speed = speed;
            this.color = color;
            this.team = team;
            this.active = true;
            this.tricotNumber = trikotNumer;
            this.radius = 2;
            this.setName(name);
            this.origin = new Endabgabe_SoSe21.Vector(_position.X, _position.Y);
        }
        /**
         * get tricot number
         */
        getTricotNumber() {
            return this.tricotNumber;
        }
        /**
         * set tricot number
         */
        setTricotNumber(tricotNumber) {
            this.tricotNumber = tricotNumber;
        }
        /**
         * Ob der Spieler auf dem Feld ist oder nicht bzw. active oder nicht
         */
        isActive() {
            return this.active;
        }
        /**
         * spieler als active
         * active: true or false
         */
        setActive(active) {
            this.active = active;
        }
        //Erinnerung für mich: getTeam hat Parameter von number und returned this.team (teamnumber), 
        //Erinnerung Nr2: Return nur machbar wenn wir in einer Funktion sind. Sonst "illegal"
        getTeam() {
            return this.team;
        }
        setTeam(team) {
            this.team = team;
        }
        getColor() {
            return this.color;
        }
        setColor(color) {
            this.color = color;
        }
        setShotPower(power) {
            this.shotPower = power;
        }
        setPrecision(prec) {
            this.precision = prec;
        }
        getPrecision() {
            return this.precision;
        }
        getShotPower() {
            return this.shotPower;
        }
        getId() {
            return this.id;
        }
        getName() {
            return this.name;
        }
        setName(name) {
            this.name = name;
        }
        getActionRadius() {
            return this.actionRadius * Endabgabe_SoSe21.scale;
        }
        getOrigin() {
            return this.origin;
        }
        setOrigin(origin) {
            this.origin = origin;
        }
        highlight() {
            this.highlighted = true;
        }
        dehighlight() {
            this.highlighted = false;
        }
        isHighlighted() {
            return this.highlighted;
        }
        //Optionale Sache: Ob man den ActionRadius oder den Startplatz anzeigen lässt.
        draw(options = {
            showActionRadius: true,
            showPlayerOrigin: true
        }) {
            Endabgabe_SoSe21.ctx.save();
            // Player center wird gemalt
            Endabgabe_SoSe21.ctx.beginPath();
            Endabgabe_SoSe21.ctx.arc(this.position.X, this.position.Y, this.isHighlighted() ? this.getRadius() * 1.5 : this.getRadius(), 0, 2 * Math.PI, false);
            Endabgabe_SoSe21.ctx.fillStyle = this.color;
            Endabgabe_SoSe21.ctx.fill();
            Endabgabe_SoSe21.ctx.lineWidth = this.isHighlighted() ? 2 : 1;
            Endabgabe_SoSe21.ctx.strokeStyle = "#003300";
            Endabgabe_SoSe21.ctx.stroke();
            Endabgabe_SoSe21.ctx.textBaseline = "middle";
            Endabgabe_SoSe21.ctx.textAlign = "center";
            Endabgabe_SoSe21.ctx.fillStyle = "white";
            Endabgabe_SoSe21.ctx.fillText(this.getTricotNumber().toString(), this.position.X, this.position.Y);
            // Action Radius wird gemalt
            if (typeof options.showActionRadius !== "boolean" || options.showActionRadius) {
                //Returns true/false with typeof. Der typeof Operator gibt einen String zurück, der den Typ des unausgewerteten Operanden beschreibt.
                Endabgabe_SoSe21.ctx.beginPath();
                Endabgabe_SoSe21.ctx.arc(this.position.X, this.position.Y, this.getActionRadius(), 0, 2 * Math.PI, false);
                Endabgabe_SoSe21.ctx.lineWidth = 1;
                Endabgabe_SoSe21.ctx.strokeStyle = "#6D6D6D";
                Endabgabe_SoSe21.ctx.stroke();
            }
            // Line zur Original/Startstelle
            if (typeof options.showPlayerOrigin !== "boolean" || options.showPlayerOrigin) {
                //Returns true/false with typeof. Der typeof Operator gibt einen String zurück, der den Typ des unausgewerteten Operanden beschreibt.
                //https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/typeof
                Endabgabe_SoSe21.ctx.beginPath();
                Endabgabe_SoSe21.ctx.moveTo(this.position.X, this.position.Y);
                Endabgabe_SoSe21.ctx.lineTo(this.getOrigin().X, this.getOrigin().Y);
                Endabgabe_SoSe21.ctx.lineWidth = 1;
                Endabgabe_SoSe21.ctx.strokeStyle = "#green";
                Endabgabe_SoSe21.ctx.stroke();
            }
            Endabgabe_SoSe21.ctx.restore();
        }
        getPosition() {
            return this.position;
        }
    }
    Endabgabe_SoSe21.Player = Player;
})(Endabgabe_SoSe21 || (Endabgabe_SoSe21 = {}));
//# sourceMappingURL=player.js.map