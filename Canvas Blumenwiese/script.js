"use strict";
var CanvasBlumenwiese;
(function (CanvasBlumenwiese) {
    window.onload = function () {
        draw();
    };
    function draw() {
        let canvas = document.querySelector("canvas");
        let ctx = canvas.getContext("2d");
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        let mountainColors = ["#813945", "#7B3647", "#753146", "#663047"];
        canvas.width = windowWidth;
        canvas.height = windowHeight;
        function drawBackground() {
            let gradient = ctx.createLinearGradient(windowWidth / 2, 0, windowWidth / 2, windowHeight);
            gradient.addColorStop(0, "#303461");
            gradient.addColorStop(0.3, "#85536E");
            gradient.addColorStop(0.6, "#D46A4B");
            gradient.addColorStop(0.9, "#EB7337");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, windowWidth, windowHeight);
        }
        //only draws one mountain range (across the screen);
        function drawMountain(mountainColor) {
            let x = 0;
            let y = windowHeight * ((Math.random() * 0.2) + 0.7); // 0.4 - 0.6
            ctx.strokeStyle = mountainColor;
            ctx.beginPath();
            ctx.moveTo(x, y);
            while (x < windowWidth) {
                let dx = 20 + 50; // 50-70
                let dy = (Math.random() - 0.5) * 100; // -50 - 50
                x = x + dx;
                y = y + dy;
                if (y < 0 || y > windowHeight) { // if it goes over the top or under the bottom of the canvas
                    y = y - 2 * dy; // go in the other direction twice the distance (basically like just going the original direction the same amount once);
                }
                if (x > windowWidth) {
                    x = windowWidth;
                }
                ctx.lineTo(x, y);
            }
            // make a box around the bottom of the canvas
            ctx.lineTo(windowWidth, y);
            ctx.lineTo(windowWidth, windowHeight);
            ctx.lineTo(0, windowHeight);
            ctx.lineTo(0, windowHeight * 0.4);
            // fill in the colors
            ctx.stroke();
            ctx.fillStyle = mountainColor;
            ctx.fill();
        }
        function drawMountains() {
            for (let i = 0; i < mountainColors.length; i++) {
                drawMountain(mountainColors[i]);
            }
        }
        function drawScene() {
            drawBackground();
            drawMountains();
        }
        drawScene();
        //Mond - Jirkas Code, abgeändert also random weggemacht :)
        function drawMoon() {
            let r1 = 30;
            let r2 = 180;
            let gradientSun = ctx.createRadialGradient(0, 0, r1, 0, 0, r2);
            gradientSun.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
            gradientSun.addColorStop(0.1, "HSLA(60, 100%, 90%, 0.5)");
            gradientSun.addColorStop(1, "HSLA(60, 100%, 80%, 0)");
            let X = ctx.canvas.width;
            let Y = ctx.canvas.height / 2 - 100;
            ctx.save();
            if (X > 700) {
                X = 700;
            }
            if (Y < 20) {
                Y = 20;
            }
            else if (Y > 100) {
                Y = 100;
            }
            ctx.translate(X, Y);
            ctx.fillStyle = gradientSun;
            ctx.arc(0, 0, r2, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();
        }
        drawMoon();
        //Ende Mond
        //Biene Anfang
        let x = 120;
        let y = 500;
        let circle = function (x, y, radius, fillCircle) {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2, false);
            if (fillCircle) {
                ctx.fill();
            }
            else {
                ctx.stroke();
            }
        };
        let drawBee = function (x, y) {
            ctx.lineWidth = 2;
            ctx.strokeStyle = "Black";
            ctx.fillStyle = "Gold";
            circle(x, y, 7, true);
            circle(x, y, 7, false);
            circle(x - 5, y - 11, 3, false);
            circle(x + 5, y - 11, 3, false);
            circle(x - 2, y - 1, 1, false);
            circle(x + 2, y - 1, 1, false);
        };
        drawBee(x, y);
        //Ende Biene
        //Blume Anfang
        let petal = [[[0, 0], [0.5, -2], [0.7, -1], [1, 0], [0.7, 1], [0.3, 1], [0, 0]], [[0, 0], [1, 0]],];
        function drawPetal(path, width, height) {
            let i = 0;
            do { // loop through paths
                let p = path[i];
                let j = 0;
                ctx.moveTo(p[j][0] * width, p[j++][1] * height);
                while (j < p.length - 1) {
                    ctx.lineTo(p[j][0] * width, p[j++][1] * height);
                }
                if (p[j][0] === p[0][0] && p[j][1] === p[0][1]) {
                    ctx.closePath();
                }
                else {
                    ctx.lineTo(p[j][0] * width, p[j][1] * height);
                }
            } while (++i < path.length);
        }
        function drawPetals(x, y, count, startAt, petal, width, height) {
            const step = (Math.PI * 2) / count;
            ctx.setTransform(1, 0, 0, 1, x, y);
            ctx.rotate(startAt);
            for (var i = 0; i < count; i += 1) {
                drawPetal(petal, width, height);
                ctx.rotate(step);
            }
            ctx.setTransform(1, 0, 0, 1, 0, 0); // restore default
        }
        function drawFlower(col, lineWidth, fitScale, petalCount) {
            ctx.strokeStyle = col;
            ctx.lineWidth = lineWidth;
            let size = Math.min(ctx.canvas.width, ctx.canvas.height) * fitScale * 0.4;
            ctx.beginPath();
            drawPetals(ctx.canvas.width / 2, ctx.canvas.height / 1.1, 5, -Math.PI / 2, petal, size, size * 0.2);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 1.1, size * 0.15, 0, Math.PI * 2);
            ctx.fillStyle = col;
            ctx.fill();
        }
        drawFlower("pink", 1.4, 0.25, 1);
        //Anfang Tulpe - in Zusammenarbeit mit Julia
        function drawTulip() {
            let x = (Math.random() * canvas.width - 10);
            let y = (Math.random() * canvas.width - 10);
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.translate(x, y);
            ctx.lineTo(0, 30);
            ctx.strokeStyle = "green"; //Stängel
            ctx.stroke();
            ctx.beginPath();
            moveTo(10, 20);
            ctx.arc(0, 0, 9, 0, 1 * Math.PI);
            ctx.fillStyle = "pink"; //Blumenkopf
            ctx.strokeStyle = "pink";
            ctx.fill();
            ctx.stroke();
            moveTo(0, 20);
            ctx.lineTo(-10, -8);
            ctx.lineTo(-3, 2);
            ctx.lineTo(1, -8);
            ctx.lineTo(4, 2);
            ctx.lineTo(9, -8);
            ctx.lineTo(9, 3);
            ctx.closePath();
            ctx.fillStyle = "pink";
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        } //Ende neue Blume
        function drawDaisy() {
            let x = (Math.random() * canvas.width - 10);
            let y = (Math.random() * canvas.width - 10);
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.translate(x, y);
            ctx.quadraticCurveTo(10, 5, 10, 30);
            ctx.strokeStyle = "green"; //Stängel
            ctx.stroke();
            ctx.beginPath();
            moveTo(10, 20);
            ctx.arc(0, 0, 6, 0, 2 * Math.PI);
            ctx.fillStyle = "pink";
            ctx.strokeStyle = "orange";
            ctx.fill();
            ctx.stroke();
            for (let blossoms = 80; blossoms > 8; blossoms -= 8) {
                ctx.beginPath();
                moveTo(10, 20);
                ctx.rotate(45 * Math.PI / 20);
                ctx.arc(10, 0, 5, 0, 2 * Math.PI);
                ctx.fillStyle = "orange";
                ctx.strokeStyle = "orange";
                ctx.fill();
                ctx.stroke();
            }
            ctx.restore();
        }
        for (let i = 0; i < 10; i++) {
            drawDaisy(), drawTulip();
        }
    } //Ende onload function
})(CanvasBlumenwiese || (CanvasBlumenwiese = {})); //Ende namesapce
//# sourceMappingURL=script.js.map