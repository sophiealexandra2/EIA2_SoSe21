namespace L11 {

    window.addEventListener("load", handleload);

    export let canvas: HTMLCanvasElement = document.querySelector("canvas")!;
    export let ctx: CanvasRenderingContext2D;
    export class VectorMountains {
        x: number;
        y: number;
    }
    let horizon: number;
    let flowerArray: Flower [] = [];
    let flowerArray2: Flower [] = [];
    let xCloudArray: number [] = [];
    let yCloudArray: number [] = [];
    let movableArray: Movable [] = [];
    



    function handleload (): void {
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (!canvas)
        return;
        ctx = canvas.getContext("2d")!;
       


        horizon = window.innerHeight * 0.6;
        drawDaisy();
        drawTulip();
        
        createBee();
      
        nectarAmount(), nectarAmount2();
        window.setInterval(nectarAmount, 1500);

        let cloudSize: vector = new vector (250, 70);
        createCloudxy(20, cloudSize);
        createCloud();
        
        
        window.setInterval(updateAnimation, 100);
        

        
    }
    //Nectar Fill Bar
    let fillNumber: number = Math.floor(Math.random() * 100);
    let i: number = 0;
    function nectarAmount(): void {
        
        let chart: HTMLElement = <HTMLElement>document.querySelector(".chart1");
        let nectarNumber: HTMLElement = <HTMLElement>document.querySelector(".fillLevel1");
        i++;
        
        chart.setAttribute("style", "width:" + (fillNumber + i + "%"));
        nectarNumber.innerHTML = "Nectar Level for Daisy: " + (fillNumber + i) + " %";


        
        console.log("1.Nectar Amount funktioniert");
    }


    let fillNumber2: number = Math.floor(Math.random() * 100);
    let x: number = 0;
    function nectarAmount2(): void {
        
        let chart: HTMLElement = <HTMLElement>document.querySelector(".chart2");
        let nectarNumber: HTMLElement = <HTMLElement>document.querySelector(".fillLevel2");
        x++;
        
        chart.setAttribute("style", "width:" + (fillNumber2 + x + "%"));
        nectarNumber.innerHTML = "Nectar Level for Tulips: " + (fillNumber2 + x) + " %";  
        
        console.log("2.Nectar Amount funktioniert");
    }

    //Ende Nectar Fill Bar
    //Funktion umbenannt
    function updateAnimation(): void {
        let gradient: CanvasGradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
        gradient.addColorStop(0, "#303461");
        gradient.addColorStop(0.3, "#85536E");
        gradient.addColorStop(0.6, "pink");
        gradient.addColorStop(0.9, "green");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        for (let movable of movableArray) {
            movable.draw();
            if (movable instanceof Bee) {
            movable.move(1 / 20, true);
            }
            if (movable instanceof Cloud) {
            movable.move(1 / 60, false);   
            }
        }

        for (let i: number = 0; i < flowerArray.length; i++) {
            flowerArray[i].draw();
        }
        for (let o: number = 0; i < flowerArray2.length; o++) {
            flowerArray2[o].draw2();
        }

       
        
        drawMoon();
        
        drawBeehive();
        drawDaisy();
        

    }
    
    function createBee(): void {

        for (let i: number = 0; i < 10; i++) {
        let randomXBee: number = Math.random() * (window.innerWidth);
        let randomYBee: number = Math.random() * (window.innerHeight * 0.7);
        let beePosition: vector = new vector (randomXBee, randomYBee);
        let velocityBee: vector = new vector (-70, 0);
        let bee: Bee = new Bee(beePosition, velocityBee, 0.4, 0.4);
        bee.draw();
        movableArray.push(bee);

        }

    }
    

    function drawTulip(): void {
        for (let i: number = 0; i < 10; i++) {
            let randomX: number = Math.random() * window.innerWidth;
            let randomY: number = Math.random() * (window.innerHeight * 0.6 - window.innerHeight) + window.innerHeight;
            let flowerPosition: vector = new vector (randomX, randomY);
            let flowerLeft: Flower = new Flower(flowerPosition, "#355233", 10);
            flowerLeft.draw();
            flowerArray.push(flowerLeft);
        }
    }

//Mit Julia zusammen gemacht damals
    function drawDaisy(): void {
        
        for (let o: number = 0; o < 10; o++) {
            let randomX: number = Math.random() * window.innerWidth;
            let randomY: number = Math.random() * (window.innerHeight * 0.8 - window.innerHeight) + window.innerHeight;
            let flowerPosition: vector = new vector (randomX, randomY);
            let flowerLeft2: Flower = new Flower(flowerPosition, "#355233", 10);
            flowerLeft2.draw2();
            flowerArray2.push(flowerLeft2);
        }
    }


    function createCloudxy (_particleNumber: number, _size: vector): void {
        for (let i: number = 0; i < _particleNumber; i++) {
            let x: number = (Math.random() - 0.5) * _size.X;
            let y: number = - (Math.random() * _size.Y);

            xCloudArray.push(x);
            yCloudArray.push(y);
        }
    }
    function createCloud(): void {
        let randomXClouds1: number = Math.random() * ((window.innerWidth * 0.7 - window.innerWidth * 0.5) + window.innerWidth * 0.5);
        let randomYClouds1: number = Math.random() * (window.innerHeight * 0.4 - window.innerHeight * 0.1) + window.innerHeight * 0.1;

        let randomXClouds2: number = Math.random() * ((window.innerWidth * 0.4 - window.innerWidth * 0.3) + window.innerWidth * 0.3);
        let randomYClouds2: number = Math.random() * (window.innerHeight * 0.6 - window.innerHeight * 0.4) + window.innerHeight * 0.4;

        let cloud1Position: vector = new vector (randomXClouds1, randomYClouds1);
        let cloud1Position2: vector = new vector (randomXClouds2, randomYClouds2);

        let cloudSize: vector = new vector (350, 70);

        let velocityClouds1: vector = new vector (30, 0);
        let velocityClouds2: vector = new vector (-40, 0);

        for (let i: number = 0; i < 20; i++) {
            let cloud1: Cloud = new Cloud (cloud1Position, cloudSize, velocityClouds1, xCloudArray[i], yCloudArray[i]);
            let cloud2: Cloud = new Cloud (cloud1Position2, cloudSize, velocityClouds2, xCloudArray[i], yCloudArray[i]);
            cloud1.draw();
            cloud2.draw();
            movableArray.push(cloud1);
            movableArray.push(cloud2);
        }


    }

   
  //Mond - Jirkas Code, abgeändert also random weggemacht :)
    function drawMoon(): void {
    let r1: number = 30;
    let r2: number = 180;
    let gradientSun: CanvasGradient = ctx.createRadialGradient(0, 0, r1, 0, 0, r2);
    gradientSun.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
    gradientSun.addColorStop(0.1, "HSLA(60, 100%, 90%, 0.5)");
    gradientSun.addColorStop(1, "HSLA(60, 100%, 80%, 0)");

    let X: number = ctx.canvas.width;
    let Y: number = ctx.canvas.height / 2 - 100;

    ctx.save();
    if (X > 700) {
      X = 700;
    }
    if (Y < 20) {
      Y = 20;
    } else if (Y > 100) {
      Y = 100;
    }
    ctx.translate(X, Y);

    ctx.fillStyle = gradientSun;
    ctx.arc(0, 0, r2, 0, 2 * Math.PI);
    ctx.fill();

    ctx.restore();
   
  }
  //Ende Mond

  //Beehive
    function drawBeehive(): void {
    ctx.save();
    ctx.strokeStyle = "black";
    ctx.fillStyle = "orange";
    ctx.translate(120, 520);
    ctx.scale(0.3, 0.3);
    ctx.lineWidth = 18;
   
    ctx.beginPath();
    ctx.arc (-10, -80, 200, 170, 180);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.rect(-110, 30, 220, 10);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(0, 0, 30, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.restore();

    
   }


} //Ende Namespace