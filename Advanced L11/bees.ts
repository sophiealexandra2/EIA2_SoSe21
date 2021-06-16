namespace L11 {

    export class Bee extends Movable {
        position: vector;
        velocity: vector;
        scaleX: number;
        scaleY: number;

        constructor(_position: vector, _velocity: vector, _scaleX: number, _scaleY: number) {
            super (_position, _velocity);
            this.scaleX = _scaleX;
            this.scaleY = _scaleY;

        }


        draw(): void {

            ctx.save();
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.translate(this.position.X, this.position.Y);
            ctx.scale(this.scaleX, this.scaleY);
        
            let pattern: CanvasRenderingContext2D = document.createElement("canvas").getContext("2d");
            pattern.canvas.width = 20;
            pattern.canvas.height = 20;
            pattern.fillStyle = "gold";
            pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);


            ctx.fillStyle = ctx.createPattern(pattern.canvas, "repeat")!;
            ctx.fill();
            ctx.save();
            ctx.scale(3, 2);

            ctx.lineWidth = 2;
            ctx.strokeStyle = "black";
            ctx.fillStyle = "gold";
            ctx.beginPath();
            ctx.arc(0, 0, 8 , 0, Math.PI * 2, false);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(0, 0, 8 , 0, Math.PI * 2, false);
            ctx.stroke();

            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.arc(-5, -11, 5 , 0, Math.PI * 2, false);
            ctx.fill();
            ctx.stroke();
            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.arc(5, -11, 5 , 0, Math.PI * 2, false);
            ctx.fill();
            ctx.stroke();

           
            ctx.closePath();
            ctx.restore();



            ctx.restore();
        }

    }
    
}