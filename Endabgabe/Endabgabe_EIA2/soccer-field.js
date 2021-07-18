"use strict";
var Endabgabe_SoSe21;
(function (Endabgabe_SoSe21) {
    /**
     * class to handlesoccer field
     */
    class SoccerField {
        constructor() {
            // goal width
            this.goalWidth = 7.32 * Endabgabe_SoSe21.scale;
            this.setWidth(100);
            this.setHeight(75);
            this.setPadding(10);
        }
        /**
         * whether the ball is in bounds or not
         */
        //ball: current ball
        isOutOfBounds(ball) {
            if (ball.getPosition().X < this.getPadding()) {
                return true;
            }
            if (ball.getPosition().X > this.getPadding() + this.getWidth()) {
                return true;
            }
            if (ball.getPosition().Y < this.getPadding()) {
                return true;
            }
            if (ball.getPosition().Y > this.getPadding() + this.getHeight()) {
                return true;
            }
            return false;
        }
        /**
         * whether the ball is in home goal or not
         */
        isHomeGoal(ball) {
            if (ball.getPosition().X < this.getPadding() &&
                ball.getPosition().Y > this.getPadding() + (this.getHeight() / 2) - (this.goalWidth / 2) &&
                ball.getPosition().Y < this.getPadding() + (this.getHeight() / 2) + (this.goalWidth / 2)) {
                return true;
            }
            return false;
        }
        /**
         * whether the ball is in away goal or no
         */
        isAwayGoal(ball) {
            if (ball.getPosition().X > this.getPadding() + this.getWidth() &&
                ball.getPosition().Y > this.getPadding() + (this.getHeight() / 2) - (this.goalWidth / 2) &&
                ball.getPosition().Y < this.getPadding() + (this.getHeight() / 2) + (this.goalWidth / 2)) {
                return true;
            }
            return false;
        }
        /**
         * Spielfeld wird gezeichnet
         */
        draw() {
            // default stuff
            Endabgabe_SoSe21.ctx.save();
            Endabgabe_SoSe21.ctx.fillStyle = "#8cd868";
            Endabgabe_SoSe21.ctx.fillRect(0, 0, Endabgabe_SoSe21.ctx.canvas.width, Endabgabe_SoSe21.ctx.canvas.height);
            Endabgabe_SoSe21.ctx.beginPath();
            Endabgabe_SoSe21.ctx.moveTo(this.getPadding(), this.getPadding());
            Endabgabe_SoSe21.ctx.lineTo(this.getPadding() + this.getWidth(), this.getPadding());
            Endabgabe_SoSe21.ctx.lineTo(this.getPadding() + this.getWidth(), this.getPadding() + this.getHeight());
            Endabgabe_SoSe21.ctx.lineTo(this.getPadding(), this.getPadding() + this.getHeight());
            Endabgabe_SoSe21.ctx.lineTo(this.getPadding(), this.getPadding());
            Endabgabe_SoSe21.ctx.moveTo(this.getPadding() + (this.getWidth() / 2), this.getPadding());
            Endabgabe_SoSe21.ctx.lineTo(this.getPadding() + (this.getWidth() / 2), this.getPadding() + this.getHeight());
            Endabgabe_SoSe21.ctx.lineWidth = 1;
            Endabgabe_SoSe21.ctx.strokeStyle = "#ffffff";
            Endabgabe_SoSe21.ctx.stroke();
            // left goal
            Endabgabe_SoSe21.ctx.moveTo(this.getPadding(), this.getPadding() + (this.getHeight() / 2) - (this.goalWidth / 2));
            Endabgabe_SoSe21.ctx.lineTo(this.getPadding() - (5 * Endabgabe_SoSe21.scale), this.getPadding() + (this.getHeight() / 2) - (this.goalWidth / 2));
            Endabgabe_SoSe21.ctx.lineTo(this.getPadding() - (5 * Endabgabe_SoSe21.scale), this.getPadding() + (this.getHeight() / 2) + (this.goalWidth / 2));
            Endabgabe_SoSe21.ctx.lineTo(this.getPadding(), this.getPadding() + (this.getHeight() / 2) + (this.goalWidth / 2));
            Endabgabe_SoSe21.ctx.stroke();
            // right goal
            Endabgabe_SoSe21.ctx.moveTo(this.getPadding() + this.getWidth(), this.getPadding() + (this.getHeight() / 2) - (this.goalWidth / 2));
            Endabgabe_SoSe21.ctx.lineTo(this.getPadding() + this.getWidth() + (5 * Endabgabe_SoSe21.scale), this.getPadding() + (this.getHeight() / 2) - (this.goalWidth / 2));
            Endabgabe_SoSe21.ctx.lineTo(this.getPadding() + this.getWidth() + (5 * Endabgabe_SoSe21.scale), this.getPadding() + (this.getHeight() / 2) + (this.goalWidth / 2));
            Endabgabe_SoSe21.ctx.lineTo(this.getPadding() + this.getWidth(), this.getPadding() + (this.getHeight() / 2) + (this.goalWidth / 2));
            Endabgabe_SoSe21.ctx.stroke();
            // middle circle
            const middleRadius = 9.15 * Endabgabe_SoSe21.scale;
            Endabgabe_SoSe21.ctx.beginPath();
            Endabgabe_SoSe21.ctx.arc(this.getPadding() + (this.getWidth() / 2), this.getPadding() + (this.getHeight() / 2), middleRadius, 0, 2 * Math.PI, false);
            Endabgabe_SoSe21.ctx.lineWidth = 1;
            Endabgabe_SoSe21.ctx.strokeStyle = "white";
            Endabgabe_SoSe21.ctx.stroke();
            Endabgabe_SoSe21.ctx.restore();
        }
        /**
         * set padding of the field
         */
        setPadding(padding) {
            this.padding = padding;
        }
        /**
         * get padding of the field
         */
        getPadding() {
            //return number
            return this.padding * Endabgabe_SoSe21.scale;
        }
        /**
         * get width of the field
         */
        getWidth() {
            //return a number
            return this.width * Endabgabe_SoSe21.scale;
        }
        /**
         * set width of the field
         */
        setWidth(width) {
            this.width = width;
        }
        /**
         * get height of the field
         */
        getHeight() {
            return this.height * Endabgabe_SoSe21.scale;
        }
        /**
         * set height of the field
         */
        setHeight(height) {
            this.height = height;
        }
    }
    Endabgabe_SoSe21.SoccerField = SoccerField;
})(Endabgabe_SoSe21 || (Endabgabe_SoSe21 = {}));
//# sourceMappingURL=soccer-field.js.map