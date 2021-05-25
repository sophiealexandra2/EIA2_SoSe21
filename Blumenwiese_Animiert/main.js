"use strict";
//Mit Hilfe von und in Zusammenarbeit mit Julia Dajcman
var ClassesBlumenwiese;
(function (ClassesBlumenwiese) {
    class Vector {
    }
    ClassesBlumenwiese.canvas = document.querySelector("canvas");
    let mountainColors = ["#813945", "#7B3647", "#753146", "#663047"];
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    ClassesBlumenwiese.canvas.width = windowWidth;
    ClassesBlumenwiese.canvas.height = windowHeight;
    ClassesBlumenwiese.canvas.width = 1300;
    ClassesBlumenwiese.canvas.height = 700;
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        if (!ClassesBlumenwiese.canvas)
            return;
        ClassesBlumenwiese.ctx = ClassesBlumenwiese.canvas.getContext("2d");
        drawBackground();
    }
    function drawBackground() {
        console.log("Background");
        let gradient = ClassesBlumenwiese.ctx.createLinearGradient(0, 0, 0, ClassesBlumenwiese.ctx.canvas.height);
        gradient.addColorStop(0, "#303461");
        gradient.addColorStop(0.3, "#85536E");
        gradient.addColorStop(0.6, "darkgreen");
        gradient.addColorStop(0.9, "green");
        ClassesBlumenwiese.ctx.fillStyle = gradient;
        ClassesBlumenwiese.ctx.fillRect(0, 0, ClassesBlumenwiese.ctx.canvas.width, ClassesBlumenwiese.ctx.canvas.height);
        let mountainsPosition = { x: 0, y: (ClassesBlumenwiese.ctx.canvas.height * 0.5) };
        drawMountains();
        drawMoon();
        drawFlowers();
        MovingCloud();
    }
    function drawMountain(mountainColor) {
        let x = 0;
        let y = windowHeight * ((Math.random() * -0.3) + 0.7);
        ClassesBlumenwiese.ctx.strokeStyle = mountainColor;
        ClassesBlumenwiese.ctx.beginPath();
        ClassesBlumenwiese.ctx.moveTo(x, y);
        while (x < windowWidth) {
            let dx = 20 + 50;
            let dy = (Math.random() - 0.5) * 100;
            x = x + dx;
            y = y + dy;
            if (y < 0 || y > windowHeight) {
                y = y - 2 * dy;
            }
            if (x > windowWidth) {
                x = windowWidth;
            }
            ClassesBlumenwiese.ctx.lineTo(x, y);
        }
        ClassesBlumenwiese.ctx.lineTo(windowWidth, y);
        ClassesBlumenwiese.ctx.lineTo(windowWidth, windowHeight);
        ClassesBlumenwiese.ctx.lineTo(0, windowHeight);
        ClassesBlumenwiese.ctx.lineTo(0, windowHeight * 0.4);
        // fill in the colors
        ClassesBlumenwiese.ctx.stroke();
        ClassesBlumenwiese.ctx.fillStyle = mountainColor;
        ClassesBlumenwiese.ctx.fill();
    }
    function drawMountains() {
        for (let i = 0; i < mountainColors.length; i++) {
            drawMountain(mountainColors[i]);
        }
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
    }
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