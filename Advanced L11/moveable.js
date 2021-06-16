"use strict";
var L11;
(function (L11) {
    class Movable {
        constructor(_position, _velocity) {
            this.position = _position;
            this.velocity = _velocity;
        }
        move(_timeslice, _movePattern) {
            let offset = new L11.vector(this.velocity.X, this.velocity.Y);
            offset.scale(_timeslice);
            this.position.add(offset);
            if (_movePattern == false) {
                if (this.position.X < window.innerWidth) {
                    this.position.X += window.innerWidth;
                }
                if (this.position.X > window.innerWidth) {
                    this.position.X -= window.innerWidth;
                }
            }
            if (_movePattern == true) {
                if (this.position.X < window.innerWidth) {
                    this.position.X += window.innerWidth;
                }
                if (this.position.X > window.innerWidth) {
                    this.position.X -= window.innerWidth;
                }
                if (this.position.Y < window.innerHeight) {
                    this.position.Y += window.innerHeight;
                }
                if (this.position.Y > window.innerHeight) {
                    this.position.Y -= window.innerHeight;
                }
                if (this.position.X < window.innerWidth / 2) {
                    this.velocity.Y = 20;
                }
                if (this.position.X > window.innerWidth / 2) {
                    this.velocity.Y = -10;
                }
            }
        }
    }
    L11.Movable = Movable;
})(L11 || (L11 = {}));
//# sourceMappingURL=moveable.js.map