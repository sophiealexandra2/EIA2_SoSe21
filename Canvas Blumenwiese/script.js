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
        //Source for Gradient: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingctx2D/createRadialGradient
        function drawBackground() {
            let backGround = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
            backGround.addColorStop(0, "#00BFFF");
            backGround.addColorStop(0.5, "white");
            backGround.addColorStop(0.5, "#55DD00");
            backGround.addColorStop(1, "white");
            ctx.fillStyle = backGround;
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
        drawBackground();
        //Ende DrawBackGround
        //Anfang Mountains
        function drawMountains(_position, _min, _max, _colorLow, _colorHigh) {
            console.log("Mountains");
            let stepMin = 50;
            let stepMax = 150;
            let x = 0;
            ctx.save();
            ctx.translate(_position.x, _position.y);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -_max);
            do {
                x += stepMin + Math.random() * (stepMax - stepMin);
                let y = -_min - Math.random() * (_max - _min);
                ctx.lineTo(x, y);
            } while (x < ctx.canvas.width);
            ctx.lineTo(x, 0);
            ctx.closePath();
            let gradient = ctx.createLinearGradient(0, 0, 0, -_max);
            gradient.addColorStop(0, _colorLow);
            gradient.addColorStop(0.7, _colorHigh);
            ctx.fillStyle = gradient;
            ctx.fill();
            ctx.restore();
        }
        drawMountains({ x: 0, y: horizon }, 35, 70, "grey", "white");
        drawMountains({ x: 0, y: horizon }, 20, 60, "grey", "lightgrey");
        //Sonne - Jirkas Code, abgeändert also random weggemacht :)
        function drawSun() {
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
        drawSun();
        //Ende Sonnne
        //Biene Anfang
        var x = 70;
        var y = 50;
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