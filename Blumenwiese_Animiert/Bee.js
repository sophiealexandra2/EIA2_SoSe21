"use strict";
var ClassesBlumenwiese;
(function (ClassesBlumenwiese) {
    class Bee {
        constructor(_size, _position) {
            console.log("bee constructor");
            if (_position)
                this.position = _position;
            else
                this.position = new ClassesBlumenwiese.Vector(0, 0);
            this.velocity = new ClassesBlumenwiese.Vector(0, 0);
            this.velocity.random(100, 200);
            this.size = _size;
        }
        fly(_timeslice) {
            // console.log("Asteroid move");
            let offset = new ClassesBlumenwiese.Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < 0)
                this.position.x += ClassesBlumenwiese.ctx.canvas.width;
            if (this.position.y < 0)
                this.position.y += ClassesBlumenwiese.ctx.canvas.height;
            if (this.position.x > ClassesBlumenwiese.ctx.canvas.width)
                this.position.x -= ClassesBlumenwiese.ctx.canvas.width;
            if (this.position.y > ClassesBlumenwiese.ctx.canvas.height)
                this.position.y -= ClassesBlumenwiese.ctx.canvas.height;
        }
        draw() {
            console.log("bee draw");
            ClassesBlumenwiese.ctx.save();
            ClassesBlumenwiese.ctx.translate(this.position.x, this.position.y);
            ClassesBlumenwiese.ctx.scale(this.size, this.size);
            ClassesBlumenwiese.ctx.translate(-50, -50);
            ClassesBlumenwiese.ctx.stroke(ClassesBlumenwiese.beePath);
            ClassesBlumenwiese.ctx.restore();
        }
    }
    ClassesBlumenwiese.Bee = Bee;
})(ClassesBlumenwiese || (ClassesBlumenwiese = {}));
//# sourceMappingURL=Bee.js.map