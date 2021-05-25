namespace ClassesBlumenwiese {
    export class Bee {
        position: Vector;
        velocity: Vector;
        size: number;

        constructor(_size: number, _position?: Vector) {
            console.log("bee constructor");

            if (_position)
                this.position = _position;
            else
                this.position = new Vector(0, 0);
                
            this.velocity = new Vector(0, 0);
            this.velocity.random(100, 200);

            
            this.size = _size;
        }

        fly(_timeslice: number): void {
            // console.log("Asteroid move");
            let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);

            if (this.position.x < 0)
                this.position.x += ctx.canvas.width;
            if (this.position.y < 0)
                this.position.y += ctx.canvas.height;
            if (this.position.x > ctx.canvas.width)
                this.position.x -= ctx.canvas.width;
            if (this.position.y > ctx.canvas.height)
                this.position.y -= ctx.canvas.height;
        }

        draw(): void {
            console.log("bee draw");
            ctx.save();
            ctx.translate(this.position.x, this.position.y);
            ctx.scale(this.size, this.size);
            ctx.translate(-50, -50);
            ctx.stroke(beePath);
            ctx.restore();
        }

       
    }
}




























