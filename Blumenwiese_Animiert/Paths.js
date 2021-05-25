"use strict";
var ClassesBlumenwiese;
(function (ClassesBlumenwiese) {
    ClassesBlumenwiese.cloudPositions = [
        [
            [200, 50], [50, 160], [250, 150]
        ]
    ];
    function createPaths() {
        ClassesBlumenwiese.beePath = createBeePaths();
        ClassesBlumenwiese.cloudPath = createCloudPath();
    }
    ClassesBlumenwiese.createPaths = createPaths;
    function createBeePaths() {
        console.log("beeeeeee");
        let path = new Path2D();
        let x = (Math.random() * ClassesBlumenwiese.canvas.width - 10);
        let y = (Math.random() * (ClassesBlumenwiese.canvas.height));
        ClassesBlumenwiese.ctx.save();
        ClassesBlumenwiese.ctx.beginPath();
        ClassesBlumenwiese.ctx.moveTo(x, y);
        ClassesBlumenwiese.ctx.translate(x, y);
        ClassesBlumenwiese.ctx.quadraticCurveTo(16, -10, 16, 10);
        ClassesBlumenwiese.ctx.quadraticCurveTo(16, 16, 2, 13);
        ClassesBlumenwiese.ctx.quadraticCurveTo(-8, -1, 2, 0);
        ClassesBlumenwiese.ctx.strokeStyle = "#000000";
        ClassesBlumenwiese.ctx.lineWidth = 2;
        ClassesBlumenwiese.ctx.fillStyle = "yellow";
        ClassesBlumenwiese.ctx.fill();
        ClassesBlumenwiese.ctx.lineTo(0, 8);
        ClassesBlumenwiese.ctx.stroke();
        ClassesBlumenwiese.ctx.moveTo(10, -3);
        ClassesBlumenwiese.ctx.quadraticCurveTo(-1, 14, 13, 13);
        ClassesBlumenwiese.ctx.stroke();
        ClassesBlumenwiese.ctx.closePath();
        ClassesBlumenwiese.ctx.beginPath();
        moveTo(-13, 5);
        ClassesBlumenwiese.ctx.arc(6, -8, 6, 0, 2 * Math.PI);
        ClassesBlumenwiese.ctx.fillStyle = "lightblue";
        ClassesBlumenwiese.ctx.strokeStyle = "#000000";
        ClassesBlumenwiese.ctx.fill();
        ClassesBlumenwiese.ctx.stroke();
        ClassesBlumenwiese.ctx.beginPath();
        moveTo(-13, 5);
        ClassesBlumenwiese.ctx.arc(12, -8, 6, 0, 2 * Math.PI);
        ClassesBlumenwiese.ctx.fillStyle = "lightblue";
        ClassesBlumenwiese.ctx.strokeStyle = "#000000";
        ClassesBlumenwiese.ctx.fill();
        ClassesBlumenwiese.ctx.stroke();
        ClassesBlumenwiese.ctx.closePath();
        ClassesBlumenwiese.ctx.restore();
        return path;
    }
    function createCloudPath() {
        console.log("CLOUD");
        let nParticles = 23;
        let radiusParticle = 15;
        let particle = new Path2D();
        let gradient = ClassesBlumenwiese.ctx.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 50%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 60%, 100%, 0)");
        ClassesBlumenwiese.ctx.save();
        ClassesBlumenwiese.ctx.translate(200, 50);
        ClassesBlumenwiese.ctx.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) {
            ClassesBlumenwiese.ctx.save();
            let x = (Math.random() - 0.5) * 100;
            let y = -(Math.random() * 25);
            ClassesBlumenwiese.ctx.translate(x, y);
            ClassesBlumenwiese.ctx.fill(particle);
            ClassesBlumenwiese.ctx.restore();
        }
        ClassesBlumenwiese.ctx.restore();
        return particle;
    }
})(ClassesBlumenwiese || (ClassesBlumenwiese = {}));
//# sourceMappingURL=Paths.js.map