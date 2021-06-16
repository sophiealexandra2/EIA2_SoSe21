namespace L11 {
//Mit Julia Dacjman damals zusammen gemacht
    export class Flower {
        public position: vector;
        public baseColor: string;
        public quantity: number;

        constructor(_position: vector, _baseColor: string, _quantity: number) {
            this.position = _position;
            this.baseColor = _baseColor;
            this.quantity = _quantity;
        }

        public draw(): void {
            ctx.save();

            ctx.beginPath();
            ctx.moveTo(this.position.X, this.position.Y);
            ctx.translate(this.position.X, this.position.Y);
            ctx.quadraticCurveTo(10, 5, 10, 30);
            ctx.strokeStyle = "#358443";
            ctx.stroke();

            ctx.beginPath();
            moveTo(10, 20);
            ctx.arc(0, 0, 10, 0, 1 * Math.PI);
            ctx.fillStyle = "#AD407D";
            ctx.strokeStyle = "#AD407D";
            ctx.fill();
            ctx.stroke();
            moveTo(0, 20);
            ctx.lineTo(-10, -10);
            ctx.lineTo(-3, 2);
            ctx.lineTo(1, -10);
            ctx.lineTo(4, 2);
            ctx.lineTo(9, -10);
            ctx.lineTo(9, 3);
            ctx.closePath();
            ctx.fillStyle = "#AD407D";
            ctx.fill();
            ctx.stroke();

            for (var i: number = this.quantity; i > 10 ; i -= 10) {
            ctx.beginPath();
            moveTo(30, 20);
            ctx.rotate(45 * Math.PI / 20);
            ctx.arc(10, 0, 5, 0, 2 * Math.PI);

            ctx.lineWidth = 3;
            ctx.fill();

            ctx.stroke();
        }

            ctx.restore();
        }
    }
}