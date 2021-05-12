namespace CanvasBlumenwiese {
interface Vector {
        x: number;
        y: number;
    }

window.onload = function(): void {
        draw();
        };


function draw (): void {
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
    
    //only draws one mountain range (across the screen);
    function drawMountain(mountainColor): void {
      let x: number = 0;
      let y: number = windowHeight * ((Math.random() * 0.2) + 0.7); // 0.4 - 0.6
      ctx.strokeStyle = mountainColor;
      ctx.beginPath();
      ctx.moveTo(x, y);
      while (x < windowWidth) {
        let dx: number =  20 + 50; // 50-70
        let dy: number = (Math.random() - 0.5) * 100; // -50 - 50
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
    
    function drawMountains (): void {
      for (let i: number = 0; i < mountainColors.length; i++ ) {
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
    

    let circle: any = function( x: number, y: number, radius: number, fillCircle: boolean): void {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  if (fillCircle) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
};

    let drawBee: any = function(x: number, y: number): void {
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

    drawBee (x, y);

    
//Ende Biene



//Blume Anfang

    let petal: any = [[[0, 0], [0.5, -2], [0.7, -1], [ 1, 0], [0.7, 1], [0.3, 1], [0, 0]], [[0, 0], [1, 0]], ];

    function drawPetal(path, width, height) {
  let i: number = 0;
  do { // loop through paths
    let p = path[i];
    let j: number = 0;
    ctx.moveTo(p[j][0] * width, p[j++][1] * height);
    while (j < p.length - 1) {
      ctx.lineTo(p[j][0] * width, p[j++][1] * height);
    }
    if (p[j][0] === p[0][0] && p[j][1] === p[0][1]) { 
      ctx.closePath();
    } else {
      ctx.lineTo(p[j][0] * width, p[j][1] * height);
    }
  } while (++i < path.length);
}

    function drawPetals(x: number, y: number, count, startAt, petal, width, height) {
  const step: number = (Math.PI * 2) / count;
  ctx.setTransform(1, 0, 0, 1, x, y);
  ctx.rotate(startAt);
  for (var i: number = 0; i < count; i += 1) {
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
  ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 1.1 , size * 0.15, 0, Math.PI * 2);
  ctx.fillStyle = col;
  ctx.fill();
}


    drawFlower("pink", 1.4, 0.25, 1);

}//Ende onload function

}//Ende namesapce



  
    












