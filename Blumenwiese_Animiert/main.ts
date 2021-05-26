//Mit Hilfe von und in Zusammenarbeit mit Julia Dajcman
namespace ClassesBlumenwiese { 
  
  class Vector {
    x: number;
    y: number;
}
  export let ctx: CanvasRenderingContext2D;
  export let canvas: HTMLCanvasElement = document.querySelector("canvas")!;
  let windowWidth: number = window.innerWidth;
  let windowHeight: number = window.innerHeight;
  canvas.width = windowWidth;
  canvas.height = windowHeight;
  canvas.width = 1300;
  canvas.height = 700;
  let saveBackgroundData: ImageData;


  window.addEventListener("load", handleLoad);


  function handleLoad(): void {

    if (!canvas)
        return;
    ctx = canvas.getContext("2d")!;

    drawBackground();

}

  function drawBackground(): void {

    let gradient: CanvasGradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
    gradient.addColorStop(0, "#303461");
    gradient.addColorStop(0.3, "#85536E");
    gradient.addColorStop(0.6, "pink");
    gradient.addColorStop(0.9, "green");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    let mountainsPosition: Vector = { x: 0, y: (ctx.canvas.height * 0.5) };

    drawMountains(mountainsPosition, 75, 200, "grey", "white");
    drawMountains(mountainsPosition, 50, 150, "grey", "lightgrey");
    drawMoon();
    drawFlowers();
    MovingCloud();
}

  function drawMountains(_position: Vector, _min: number, _max: number, _colorLow: string, _colorHigh: string): void {
    let stepMin: number = 50;
    let stepMax: number = 30;
    let x: number = 0;

    ctx.save();
    ctx.translate(_position.x, _position.y);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -_max);

    do {
        x += stepMin + Math.random() * (stepMax - stepMin);
        let y: number = -_min - Math.random() * (_max - _min);

        ctx.lineTo(x, y);
    } while (x < ctx.canvas.width);

    ctx.lineTo(x, 0);
    ctx.closePath();
    let gradient: CanvasGradient = ctx.createLinearGradient(0, 0, 0, -_max);
    gradient.addColorStop(0, _colorLow);
    gradient.addColorStop(0.7, _colorHigh);

    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.restore();
}


//Anfang Cloud Moving

  function MovingCloud (): void {

    ctx.beginPath();
    ctx.stroke();
  
    function drawCircle (x: any, y): void {
    ctx.beginPath();
    ctx.arc(x, 50, y, Math.PI * 0.5, Math.PI * 1.5); //Circle drawing
    ctx.arc(x + 70, 60, 70, Math.PI * 1, Math.PI * 1.85);
    ctx.arc(x + 152, 40 - 45, 50, Math.PI * 1.37, Math.PI * 1.91);
    ctx.arc(x + 200, 30, 60, Math.PI * 1.5, Math.PI * 0.5);
    ctx.moveTo(x + 200, 10 + 60);
    ctx.lineTo(x, y + 60);
    ctx.strokeStyle = "0";
    ctx.stroke();
    ctx.fillStyle = "blue";
    ctx.fill();
  }
    var x: number = 0;
    setInterval(function (): void { 
    drawCircle(x % 1300, 70);
    x++;
  },            25);
    console.log(ctx.getImageData(100, 200, 100, 100));

}


//Anfang Biene






ctx.putImageData(saveBackgroundData, 100, 100);






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

    //Anfang Blumen - in Zusammenarbeit mit Julia Dajcman
  function drawDaisy(): void {
    

    let x: number = (Math.random() * canvas.width - 10);
    let y: number = (Math.random() * (canvas.height - canvas.height * 0.5) + canvas.height * 0.5);

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
    ctx.strokeStyle = "red";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    for (let blossoms: number = 50; blossoms > 5; blossoms -= 5) {

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

  function drawTulip(): void {

    let x: number = (Math.random() * canvas.width - 10);
    let y: number = (Math.random() * (canvas.height - canvas.height * 0.5) + canvas.height * 0.5);

    ctx.save();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.translate(x, y);
    ctx.lineTo(0, 30);
    ctx.strokeStyle = "#358443";

    ctx.stroke();

    ctx.beginPath();
    moveTo(10, 20);
    ctx.arc(0, 0, 9, 0, 1 * Math.PI);

    ctx.fillStyle = "#AD407D";
    ctx.strokeStyle = "#AD407D";
    ctx.fill();
    ctx.stroke();
    moveTo(0, 20);
    ctx.lineTo(-10, -10);
    ctx.lineTo(-3, 2);
    ctx.lineTo(1, -10);
    ctx.lineTo(4, 2);
    ctx.lineTo(9, -10);
    ctx.lineTo(9, 3);
    ctx.closePath();
    ctx.fillStyle = "#AD407D";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.restore();

}

  
  function drawFlowers(): void {

    for (let i: number = 0; i < 10; i++) {
        drawDaisy(), drawTulip();

    }

   



}






}