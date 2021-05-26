"use strict";
var ClassesBlumenwiese;
(function (ClassesBlumenwiese) {
    //Anfang Biene
    const circle = function (x, y, radius, fillCircle) {
        ClassesBlumenwiese.ctx.beginPath();
        ClassesBlumenwiese.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        if (fillCircle) {
            ClassesBlumenwiese.ctx.fill();
        }
        else {
            ClassesBlumenwiese.ctx.stroke();
        }
    };
    function drawBee(x, y) {
        ClassesBlumenwiese.ctx.lineWidth = 2;
        ClassesBlumenwiese.ctx.strokeStyle = "black";
        ClassesBlumenwiese.ctx.fillStyle = "gold";
        circle(x, y, 8, true);
        circle(x, y, 8, false);
        circle(x - 5, y - 11, 5, false);
        circle(x + 5, y - 11, 5, false);
        circle(x - 2, y - 1, 2, false);
        circle(x + 2, y - 1, 2, false);
    }
    function biene(coordinate) {
        let offset = Math.random() * 4 - 2;
        coordinate += offset;
        if (coordinate > 400) {
            coordinate = 400;
        }
        if (coordinate < 0) {
            coordinate = 0;
        }
        return coordinate;
    }
    let x = 400;
    let y = 700;
    setInterval(function () {
        drawBee(x, y);
        x = biene(x);
        y = biene(y);
    }, 40);
})(ClassesBlumenwiese || (ClassesBlumenwiese = {}));
//# sourceMappingURL=Bee.js.map