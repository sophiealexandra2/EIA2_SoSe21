"use strict";
var Endabgabe_SoSe21;
(function (Endabgabe_SoSe21) {
    /**
     * Super class to handle movable objects
     */
    class Movable {
        constructor(_position) {
            this.position = _position;
            this.speed = 1;
            this.speedLevel = 1;
            this.slowDown = false;
            this.radius = 2;
        }
        setColor(color) {
            this.color = color;
        }
        getRadius() {
            return this.radius * Endabgabe_SoSe21.scale;
        }
        setRadius(radius) {
            this.radius = radius;
        }
        setTarget(target) {
            this.target = target;
        }
        getTarget() {
            return this.target;
        }
        getPosition() {
            return this.position;
        }
        setPosition(position) {
            this.position = position;
        }
        getSpeed() {
            return this.speed;
        }
        setSpeed(speed) {
            this.speed = speed;
        }
        /**
         * moves object to target
         */
        move(target) {
            if (!target) {
                return;
            }
            // calc diff vector
            const diffVectr = new Endabgabe_SoSe21.Vector(target.X - this.position.X, target.Y - this.position.Y);
            // calc length of diff vector and return if zero
            const vectorLength = Math.sqrt(Math.pow(diffVectr.X, 2) + Math.pow(diffVectr.Y, 2));
            if (vectorLength === 0) {
                return;
            }
            // calc speed by movable properties
            const speedLevel = this.speedLevel * (this.speed / 100);
            // apply slow down if activated (Ball)
            //Ternary Operator. Arbeitet ähnlich wie if...else. this.slowDown = true. Execute speedLevel...
            //If false, execute speedLevel only.
            const speed = this.slowDown ? speedLevel * (vectorLength / 100) : speedLevel;
            // calc scaling
            const scaleFactor = speed / vectorLength;
            // apply scaling to diff
            diffVectr.scale(scaleFactor);
            // add diff to current pos
            this.position.add(diffVectr);
        }
    }
    Endabgabe_SoSe21.Movable = Movable;
})(Endabgabe_SoSe21 || (Endabgabe_SoSe21 = {}));
//# sourceMappingURL=moveable.js.map