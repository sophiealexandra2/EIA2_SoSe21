namespace CanvasBlumenwiese {
  interface Vector {
    x: number;
    y: number;
  }

  window.onload = function (): void {
    draw();
  };


  function draw(): void {
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    let windowWidth: number = window.innerWidth;
    let windowHeight: number = window.innerHeight;
    let mountainColors: any = ["#813945", "#7B3647", "#753146", "#663047"];


    canvas.width = windowWidth;
    canvas.height = windowHeight;



    function drawBackground(): void {
      let gradient: CanvasGradient = ctx.createLinearGradient(windowWidth / 2, 0, windowWidth / 2, windowHeight);
      gradient.addColorStop(0, "#303461");
      gradient.addColorStop(0.3, "#85536E");
      gradient.addColorStop(0.6, "#D46A4B");
      gradient.addColorStop(0.9, "#EB7337");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, windowWidth, windowHeight);
    }

    //Anfang Mountains
    function drawMountain(mountainColor): void {
      let x: number = 0;
      let y: number = windowHeight * ((Math.random() * 0.2) + 0.7);
      ctx.strokeStyle = mountainColor;
      ctx.beginPath();
      ctx.moveTo(x, y);
      while (x < windowWidth) {
        let dx: number = 20 + 50;
        let dy: number = (Math.random() - 0.5) * 100;
        x = x + dx;
        y = y + dy;
        if (y < 0 || y > windowHeight) {
          y = y - 2 * dy;
        }
        if (x > windowWidth) {
          x = windowWidth;
        }
        ctx.lineTo(x, y);
      }
      ctx.lineTo(windowWidth, y);
      ctx.lineTo(windowWidth, windowHeight);
      ctx.lineTo(0, windowHeight);
      ctx.lineTo(0, windowHeight * 0.4);

      // fill in the colors
      ctx.stroke();
      ctx.fillStyle = mountainColor;
      ctx.fill();
    }

    function drawMountains(): void {
      for (let i: number = 0; i < mountainColors.length; i++) {
        drawMountain(mountainColors[i]);
      }
    }



    function drawScene() {
      drawBackground();
      drawMountains();
    }

    drawScene();


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
    drawMoon();
    //Ende Mond


    //Biene Anfang
    let x: number = 120;
    let y: number = 500;


    let circle: any = function (x: number, y: number, radius: number, fillCircle: boolean): void {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2, false);
      if (fillCircle) {
        ctx.fill();
      } else {
        ctx.stroke();
      }
    };

    let drawBee: any = function (x: number, y: number): void {
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





    //Anfang Tulpe - in Zusammenarbeit mit Julia Dajcman
    function drawTulip(): void {
      let x: number = (Math.random() * canvas.width - 10);
      let y: number = (Math.random() * canvas.width - 10);
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
    }

    function drawDaisy(): void {

      let x: number = (Math.random() * canvas.width - 10);
      let y: number = (Math.random() * canvas.width - 10);

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

      for (let blossoms: number = 80; blossoms > 8; blossoms -= 8) {

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

    for (let i: number = 0; i < 10; i++) {
      drawDaisy(), drawTulip();

    }


  }//Ende onload function

}//Ende namesapce

















