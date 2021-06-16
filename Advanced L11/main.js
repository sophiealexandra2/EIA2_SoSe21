"use strict";
var L11;
(function (L11) {
    window.addEventListener("load", handleload);
    L11.canvas = document.querySelector("canvas");
    class VectorMountains {
    }
    L11.VectorMountains = VectorMountains;
    let horizon;
    let flowerArray = [];
    let xCloudArray = [];
    let yCloudArray = [];
    let movableArray = [];
    function handleload() {
        L11.canvas.width = window.innerWidth;
        L11.canvas.height = window.innerHeight;
        if (!L11.canvas)
            return;
        L11.ctx = L11.canvas.getContext("2d");
        horizon = window.innerHeight * 0.6;
        drawTulip();
        createBee();
        let cloudSize = new L11.vector(250, 70);
        createCloudxy(20, cloudSize);
        createCloud();
        window.setInterval(drawBackground, 100);
    }
    function drawBackground() {
        let gradient = L11.ctx.createLinearGradient(0, 0, 0, L11.ctx.canvas.height);
        gradient.addColorStop(0, "#303461");
        gradient.addColorStop(0.3, "#85536E");
        gradient.addColorStop(0.6, "pink");
        gradient.addColorStop(0.9, "green");
        L11.ctx.fillStyle = gradient;
        L11.ctx.fillRect(0, 0, L11.ctx.canvas.width, L11.ctx.canvas.height);
        for (let i = 0; i < flowerArray.length; i++) {
            flowerArray[i].draw();
        }
        for (let movable of movableArray) {
            movable.draw();
            if (movable instanceof L11.Bee) {
                movable.move(1 / 20, true);
            }
            if (movable instanceof L11.Cloud) {
                movable.move(1 / 60, false);
            }
        }
        drawMoon();
    }
    function createBee() {
        for (let i = 0; i < 10; i++) {
            let randomXBee = Math.random() * (window.innerWidth);
            let randomYBee = Math.random() * (window.innerHeight * 0.7);
            let beePosition = new L11.vector(randomXBee, randomYBee);
            let velocityBee = new L11.vector(-70, 0);
            let bee = new L11.Bee(beePosition, velocityBee, 0.4, 0.4);
            bee.draw();
            movableArray.push(bee);
        }
    }
    function drawTulip() {
        for (let i = 0; i < 10; i++) {
            let randomX = Math.random() * window.innerWidth;
            let randomY = Math.random() * (window.innerHeight * 0.6 - window.innerHeight) + window.innerHeight;
            let flowerPosition = new L11.vector(randomX, randomY);
            let flowerLeft = new L11.Flower(flowerPosition, "#355233", 10);
            flowerLeft.draw();
            flowerArray.push(flowerLeft);
        }
    }
    function createCloudxy(_particleNumber, _size) {
        for (let i = 0; i < _particleNumber; i++) {
            let x = (Math.random() - 0.5) * _size.X;
            let y = -(Math.random() * _size.Y);
            xCloudArray.push(x);
            yCloudArray.push(y);
        }
    }
    function createCloud() {
        let randomXClouds1 = Math.random() * ((window.innerWidth * 0.7 - window.innerWidth * 0.5) + window.innerWidth * 0.5);
        let randomYClouds1 = Math.random() * (window.innerHeight * 0.4 - window.innerHeight * 0.1) + window.innerHeight * 0.1;
        let randomXClouds2 = Math.random() * ((window.innerWidth * 0.4 - window.innerWidth * 0.3) + window.innerWidth * 0.3);
        let randomYClouds2 = Math.random() * (window.innerHeight * 0.6 - window.innerHeight * 0.4) + window.innerHeight * 0.4;
        let cloud1Position = new L11.vector(randomXClouds1, randomYClouds1);
        let cloud1Position2 = new L11.vector(randomXClouds2, randomYClouds2);
        let cloudSize = new L11.vector(350, 70);
        let velocityClouds1 = new L11.vector(30, 0);
        let velocityClouds2 = new L11.vector(-40, 0);
        for (let i = 0; i < 20; i++) {
            let cloud1 = new L11.Cloud(cloud1Position, cloudSize, velocityClouds1, xCloudArray[i], yCloudArray[i]);
            let cloud2 = new L11.Cloud(cloud1Position2, cloudSize, velocityClouds2, xCloudArray[i], yCloudArray[i]);
            cloud1.draw();
            cloud2.draw();
            movableArray.push(cloud1);
            movableArray.push(cloud2);
        }
    }
    //Mond - Jirkas Code, abgeändert also random weggemacht :)
    function drawMoon() {
        let r1 = 30;
        let r2 = 180;
        let gradientSun = L11.ctx.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradientSun.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradientSun.addColorStop(0.1, "HSLA(60, 100%, 90%, 0.5)");
        gradientSun.addColorStop(1, "HSLA(60, 100%, 80%, 0)");
        let X = L11.ctx.canvas.width;
        let Y = L11.ctx.canvas.height / 2 - 100;
        L11.ctx.save();
        if (X > 700) {
            X = 700;
        }
        if (Y < 20) {
            Y = 20;
        }
        else if (Y > 100) {
            Y = 100;
        }
        L11.ctx.translate(X, Y);
        L11.ctx.fillStyle = gradientSun;
        L11.ctx.arc(0, 0, r2, 0, 2 * Math.PI);
        L11.ctx.fill();
        L11.ctx.restore();
    }
    //Ende Mond
})(L11 || (L11 = {})); //Ende Namespace
//# sourceMappingURL=main.js.map