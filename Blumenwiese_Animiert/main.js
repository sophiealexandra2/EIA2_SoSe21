"use strict";
//Mit Hilfe von und in Zusammenarbeit mit Julia Dajcman
var ClassesBlumenwiese;
(function (ClassesBlumenwiese) {
    class Vector {
    }
    ClassesBlumenwiese.canvas = document.querySelector("canvas");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    ClassesBlumenwiese.canvas.width = windowWidth;
    ClassesBlumenwiese.canvas.height = windowHeight;
    ClassesBlumenwiese.canvas.width = 1300;
    ClassesBlumenwiese.canvas.height = 700;
    let saveBackgroundData;
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        if (!ClassesBlumenwiese.canvas)
            return;
        ClassesBlumenwiese.ctx = ClassesBlumenwiese.canvas.getContext("2d");
        drawBackground();
    }
    function drawBackground() {
        let gradient = ClassesBlumenwiese.ctx.createLinearGradient(0, 0, 0, ClassesBlumenwiese.ctx.canvas.height);
        gradient.addColorStop(0, "#303461");
        gradient.addColorStop(0.3, "#85536E");
        gradient.addColorStop(0.6, "pink");
        gradient.addColorStop(0.9, "green");
        ClassesBlumenwiese.ctx.fillStyle = gradient;
        ClassesBlumenwiese.ctx.fillRect(0, 0, ClassesBlumenwiese.ctx.canvas.width, ClassesBlumenwiese.ctx.canvas.height);
        let mountainsPosition = { x: 0, y: (ClassesBlumenwiese.ctx.canvas.height * 0.5) };
        drawMountains(mountainsPosition, 75, 200, "grey", "white");
        drawMountains(mountainsPosition, 50, 150, "grey", "lightgrey");
        drawMoon();
        drawFlowers();
        MovingCloud();
    }
    function drawMountains(_position, _min, _max, _colorLow, _colorHigh) {
        let stepMin = 50;
        let stepMax = 30;
        let x = 0;
        ClassesBlumenwiese.ctx.save();
        ClassesBlumenwiese.ctx.translate(_position.x, _position.y);
        ClassesBlumenwiese.ctx.beginPath();
        ClassesBlumenwiese.ctx.moveTo(0, 0);
        ClassesBlumenwiese.ctx.lineTo(0, -_max);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y = -_min - Math.random() * (_max - _min);
            ClassesBlumenwiese.ctx.lineTo(x, y);
        } while (x < ClassesBlumenwiese.ctx.canvas.width);
        ClassesBlumenwiese.ctx.lineTo(x, 0);
        ClassesBlumenwiese.ctx.closePath();
        let gradient = ClassesBlumenwiese.ctx.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);
        ClassesBlumenwiese.ctx.fillStyle = gradient;
        ClassesBlumenwiese.ctx.fill();
        ClassesBlumenwiese.ctx.restore();
    }
    //Anfang Cloud Moving
    function MovingCloud() {
        ClassesBlumenwiese.ctx.beginPath();
        ClassesBlumenwiese.ctx.stroke();
        function drawCircle(x, y) {
            ClassesBlumenwiese.ctx.beginPath();
            ClassesBlumenwiese.ctx.arc(x, 50, y, Math.PI * 0.5, Math.PI * 1.5); //Circle drawing
            ClassesBlumenwiese.ctx.arc(x + 70, 60, 70, Math.PI * 1, Math.PI * 1.85);
            ClassesBlumenwiese.ctx.arc(x + 152, 40 - 45, 50, Math.PI * 1.37, Math.PI * 1.91);
            ClassesBlumenwiese.ctx.arc(x + 200, 30, 60, Math.PI * 1.5, Math.PI * 0.5);
            ClassesBlumenwiese.ctx.moveTo(x + 200, 10 + 60);
            ClassesBlumenwiese.ctx.lineTo(x, y + 60);
            ClassesBlumenwiese.ctx.strokeStyle = "0";
            ClassesBlumenwiese.ctx.stroke();
            ClassesBlumenwiese.ctx.fillStyle = "blue";
            ClassesBlumenwiese.ctx.fill();
        }
        var x = 0;
        setInterval(function () {
            drawCircle(x % 1300, 70);
            x++;
        }, 25);
        console.log(ClassesBlumenwiese.ctx.getImageData(100, 200, 100, 100));
    }
    //Anfang Biene
    ClassesBlumenwiese.ctx.putImageData(saveBackgroundData, 100, 100);
    //Mond - Jirkas Code, abgeändert also random weggemacht :)
    function drawMoon() {
        let r1 = 30;
        let r2 = 180;
        let gradientSun = ClassesBlumenwiese.ctx.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradientSun.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradientSun.addColorStop(0.1, "HSLA(60, 100%, 90%, 0.5)");
        gradientSun.addColorStop(1, "HSLA(60, 100%, 80%, 0)");
        let X = ClassesBlumenwiese.ctx.canvas.width;
        let Y = ClassesBlumenwiese.ctx.canvas.height / 2 - 100;
        ClassesBlumenwiese.ctx.save();
        if (X > 700) {
            X = 700;
        }
        if (Y < 20) {
            Y = 20;
        }
        else if (Y > 100) {
            Y = 100;
        }
        ClassesBlumenwiese.ctx.translate(X, Y);
        ClassesBlumenwiese.ctx.fillStyle = gradientSun;
        ClassesBlumenwiese.ctx.arc(0, 0, r2, 0, 2 * Math.PI);
        ClassesBlumenwiese.ctx.fill();
        ClassesBlumenwiese.ctx.restore();
    }
    //Ende Mond
    //Anfang Blumen - in Zusammenarbeit mit Julia Dajcman
    function drawDaisy() {
        let x = (Math.random() * ClassesBlumenwiese.canvas.width - 10);
        let y = (Math.random() * (ClassesBlumenwiese.canvas.height - ClassesBlumenwiese.canvas.height * 0.5) + ClassesBlumenwiese.canvas.height * 0.5);
        ClassesBlumenwiese.ctx.save();
        ClassesBlumenwiese.ctx.beginPath();
        ClassesBlumenwiese.ctx.moveTo(x, y);
        ClassesBlumenwiese.ctx.translate(x, y);
        ClassesBlumenwiese.ctx.quadraticCurveTo(10, 5, 10, 30);
        ClassesBlumenwiese.ctx.strokeStyle = "green"; //Stängel
        ClassesBlumenwiese.ctx.stroke();
        ClassesBlumenwiese.ctx.beginPath();
        moveTo(10, 20);
        ClassesBlumenwiese.ctx.arc(0, 0, 6, 0, 2 * Math.PI);
        ClassesBlumenwiese.ctx.fillStyle = "pink";
        ClassesBlumenwiese.ctx.strokeStyle = "red";
        ClassesBlumenwiese.ctx.fill();
        ClassesBlumenwiese.ctx.stroke();
        ClassesBlumenwiese.ctx.closePath();
        for (let blossoms = 50; blossoms > 5; blossoms -= 5) {
            ClassesBlumenwiese.ctx.beginPath();
            moveTo(10, 20);
            ClassesBlumenwiese.ctx.rotate(45 * Math.PI / 20);
            ClassesBlumenwiese.ctx.arc(10, 0, 5, 0, 2 * Math.PI);
            ClassesBlumenwiese.ctx.fillStyle = "orange";
            ClassesBlumenwiese.ctx.strokeStyle = "orange";
            ClassesBlumenwiese.ctx.fill();
            ClassesBlumenwiese.ctx.stroke();
        }
        ClassesBlumenwiese.ctx.restore();
    }
    function drawTulip() {
        let x = (Math.random() * ClassesBlumenwiese.canvas.width - 10);
        let y = (Math.random() * (ClassesBlumenwiese.canvas.height - ClassesBlumenwiese.canvas.height * 0.5) + ClassesBlumenwiese.canvas.height * 0.5);
        ClassesBlumenwiese.ctx.save();
        ClassesBlumenwiese.ctx.beginPath();
        ClassesBlumenwiese.ctx.moveTo(x, y);
        ClassesBlumenwiese.ctx.translate(x, y);
        ClassesBlumenwiese.ctx.lineTo(0, 30);
        ClassesBlumenwiese.ctx.strokeStyle = "#358443";
        ClassesBlumenwiese.ctx.stroke();
        ClassesBlumenwiese.ctx.beginPath();
        moveTo(10, 20);
        ClassesBlumenwiese.ctx.arc(0, 0, 9, 0, 1 * Math.PI);
        ClassesBlumenwiese.ctx.fillStyle = "#AD407D";
        ClassesBlumenwiese.ctx.strokeStyle = "#AD407D";
        ClassesBlumenwiese.ctx.fill();
        ClassesBlumenwiese.ctx.stroke();
        moveTo(0, 20);
        ClassesBlumenwiese.ctx.lineTo(-10, -10);
        ClassesBlumenwiese.ctx.lineTo(-3, 2);
        ClassesBlumenwiese.ctx.lineTo(1, -10);
        ClassesBlumenwiese.ctx.lineTo(4, 2);
        ClassesBlumenwiese.ctx.lineTo(9, -10);
        ClassesBlumenwiese.ctx.lineTo(9, 3);
        ClassesBlumenwiese.ctx.closePath();
        ClassesBlumenwiese.ctx.fillStyle = "#AD407D";
        ClassesBlumenwiese.ctx.fill();
        ClassesBlumenwiese.ctx.stroke();
        ClassesBlumenwiese.ctx.closePath();
        ClassesBlumenwiese.ctx.restore();
    }
    function drawFlowers() {
        for (let i = 0; i < 10; i++) {
            drawDaisy(), drawTulip();
        }
    }
})(ClassesBlumenwiese || (ClassesBlumenwiese = {}));
//# sourceMappingURL=main.js.map