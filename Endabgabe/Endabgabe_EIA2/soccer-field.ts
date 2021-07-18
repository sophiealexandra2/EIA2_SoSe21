namespace Endabgabe_SoSe21 {
    /**
     * class to handlesoccer field
     */
    export class SoccerField {
        // padding of the field
        private padding: number;

        // width of the field
        private width: number;

        // height of the field
        private height: number;

        // goal width
        private goalWidth: number = 7.32 * scale;

        constructor() {
            this.setWidth(100);
            this.setHeight(75);
            this.setPadding(10);
        }

        /**
         * whether the ball is in bounds or not
         */

        //ball: current ball
        public isOutOfBounds(ball: Ball): boolean {
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
        public isHomeGoal(ball: Ball): boolean {
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
        public isAwayGoal(ball: Ball): boolean {
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
        public draw(): void {
            // default stuff
            ctx.save();
            ctx.fillStyle = "#8cd868";
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.beginPath();
            ctx.moveTo(this.getPadding(), this.getPadding());
            ctx.lineTo(this.getPadding() + this.getWidth(), this.getPadding());
            ctx.lineTo(this.getPadding() + this.getWidth(), this.getPadding() + this.getHeight());
            ctx.lineTo(this.getPadding(), this.getPadding() + this.getHeight());
            ctx.lineTo(this.getPadding(), this.getPadding());

            ctx.moveTo(this.getPadding() + (this.getWidth() / 2), this.getPadding());
            ctx.lineTo(this.getPadding() + (this.getWidth() / 2), this.getPadding() + this.getHeight());
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#ffffff";
            ctx.stroke();

            // left goal
            ctx.moveTo(this.getPadding(), this.getPadding() + (this.getHeight() / 2) - (this.goalWidth / 2));
            ctx.lineTo(this.getPadding() - (5 * scale), this.getPadding() + (this.getHeight() / 2) - (this.goalWidth / 2));
            ctx.lineTo(this.getPadding() - (5 * scale), this.getPadding() + (this.getHeight() / 2) + (this.goalWidth / 2));
            ctx.lineTo(this.getPadding(), this.getPadding() + (this.getHeight() / 2) + (this.goalWidth / 2));
            ctx.stroke();

            // right goal
            ctx.moveTo(this.getPadding() + this.getWidth(), this.getPadding() + (this.getHeight() / 2) - (this.goalWidth / 2));
            ctx.lineTo(this.getPadding() + this.getWidth() + (5 * scale), this.getPadding() + (this.getHeight() / 2) - (this.goalWidth / 2));
            ctx.lineTo(this.getPadding() + this.getWidth() + (5 * scale), this.getPadding() + (this.getHeight() / 2) + (this.goalWidth / 2));
            ctx.lineTo(this.getPadding() + this.getWidth(), this.getPadding() + (this.getHeight() / 2) + (this.goalWidth / 2));
            ctx.stroke();

            // middle circle
            const middleRadius: number = 9.15 * scale;
            ctx.beginPath();
            ctx.arc(this.getPadding() + (this.getWidth() / 2), this.getPadding() + (this.getHeight() / 2), middleRadius, 0, 2 * Math.PI, false);
            ctx.lineWidth = 1;
            ctx.strokeStyle = "white";
            ctx.stroke();


            ctx.restore();

        }

        /**
         * set padding of the field
         */
        public setPadding(padding: number): void {
            this.padding = padding;
        }

        /**
         * get padding of the field
         */
        public getPadding(): number {
            //return number
            return this.padding * scale;
        }

        /**
         * get width of the field
         */
        public getWidth(): number {
            //return a number
            return this.width * scale;
        }

        /**
         * set width of the field
         */
        public setWidth(width: number): void {
            this.width = width;
        }

        /**
         * get height of the field
         */
        public getHeight(): number {
            return this.height * scale;
        }

        /**
         * set height of the field
         */
        public setHeight(height: number): void {
            this.height = height;
        }
    }
}