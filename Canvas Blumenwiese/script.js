"use strict";
var CanvasBlumenwiese;
(function (CanvasBlumenwiese) {
    window.onload = function () {
        draw();
    };
    function draw() {
        let canvas = document.querySelector("canvas");
        let ctx = canvas.getContext("2d");
        let golden = 0.62;
        let horizon = ctx.canvas.height * golden;
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        canvas.width = windowWidth;
        canvas.height = windowHeight;
        let mountainColors = ["#813945", "#7B3647", "#753146", "#663047"];
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
                let dx = (Math.random() * 20) + 50; // 50-70
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
        //Sonne - Jirkas Code, abgeändert also random weggemacht :)
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
        //Ende Sonnne
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
        //Blume Ende
    } //Ende onload function
})(CanvasBlumenwiese || (CanvasBlumenwiese = {})); //Ende namesapce
//# sourceMappingURL=script.js.map