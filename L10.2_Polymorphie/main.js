"use strict";
var L10_2;
(function (L10_2) {
    window.addEventListener("load", handleload);
    L10_2.canvas = document.querySelector("canvas");
    class VectorMountains {
    }
    L10_2.VectorMountains = VectorMountains;
    let horizon;
    let flowerArray = [];
    let xCloudArray = [];
    let yCloudArray = [];
    let movableArray = [];
    function handleload() {
        L10_2.canvas.width = window.innerWidth;
        L10_2.canvas.height = window.innerHeight;
        if (!L10_2.canvas)
            return;
        L10_2.ctx = L10_2.canvas.getContext("2d");
        horizon = window.innerHeight * 0.6;
        drawTulip();
        createBee();
        let cloudSize = new L10_2.vector(250, 70);
        createCloudxy(20, cloudSize);
        createCloud();
        window.setInterval(drawBackground, 100);
    }
    function drawBackground() {
        let gradient = L10_2.ctx.createLinearGradient(0, 0, 0, L10_2.ctx.canvas.height);
        gradient.addColorStop(0, "#303461");
        gradient.addColorStop(0.3, "#85536E");
        gradient.addColorStop(0.6, "pink");
        gradient.addColorStop(0.9, "green");
        L10_2.ctx.fillStyle = gradient;
        L10_2.ctx.fillRect(0, 0, L10_2.ctx.canvas.width, L10_2.ctx.canvas.height);
        for (let i = 0; i < flowerArray.length; i++) {
            flowerArray[i].draw();
        }
        for (let movable of movableArray) {
            movable.draw();
            if (movable instanceof L10_2.Bee) {
                movable.move(1 / 20, true);
            }
            if (movable instanceof L10_2.Cloud) {
                movable.move(1 / 60, false);
            }
        }
        drawMoon();
    }
    function createBee() {
        for (let i = 0; i < 10; i++) {
            let randomXBee = Math.random() * (window.innerWidth);
            let randomYBee = Math.random() * (window.innerHeight * 0.7);
            let beePosition = new L10_2.vector(randomXBee, randomYBee);
            let velocityBee = new L10_2.vector(-70, 0);
            let bee = new L10_2.Bee(beePosition, velocityBee, 0.4, 0.4);
            bee.draw();
            movableArray.push(bee);
        }
    }
    function drawTulip() {
        for (let i = 0; i < 10; i++) {
            let randomX = Math.random() * window.innerWidth;
            let randomY = Math.random() * (window.innerHeight * 0.6 - window.innerHeight) + window.innerHeight;
            let flowerPosition = new L10_2.vector(randomX, randomY);
            let flowerLeft = new L10_2.Flower(flowerPosition, "#355233", 10);
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
        let cloud1Position = new L10_2.vector(randomXClouds1, randomYClouds1);
        let cloud1Position2 = new L10_2.vector(randomXClouds2, randomYClouds2);
        let cloudSize = new L10_2.vector(350, 70);
        let velocityClouds1 = new L10_2.vector(30, 0);
        let velocityClouds2 = new L10_2.vector(-40, 0);
        for (let i = 0; i < 20; i++) {
            let cloud1 = new L10_2.Cloud(cloud1Position, cloudSize, velocityClouds1, xCloudArray[i], yCloudArray[i]);
            let cloud2 = new L10_2.Cloud(cloud1Position2, cloudSize, velocityClouds2, xCloudArray[i], yCloudArray[i]);
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
        let gradientSun = L10_2.ctx.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradientSun.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradientSun.addColorStop(0.1, "HSLA(60, 100%, 90%, 0.5)");
        gradientSun.addColorStop(1, "HSLA(60, 100%, 80%, 0)");
        let X = L10_2.ctx.canvas.width;
        let Y = L10_2.ctx.canvas.height / 2 - 100;
        L10_2.ctx.save();
        if (X > 700) {
            X = 700;
        }
        if (Y < 20) {
            Y = 20;
        }
        else if (Y > 100) {
            Y = 100;
        }
        L10_2.ctx.translate(X, Y);
        L10_2.ctx.fillStyle = gradientSun;
        L10_2.ctx.arc(0, 0, r2, 0, 2 * Math.PI);
        L10_2.ctx.fill();
        L10_2.ctx.restore();
    }
    //Ende Mond
})(L10_2 || (L10_2 = {})); //Ende Namespace
//# sourceMappingURL=main.js.map