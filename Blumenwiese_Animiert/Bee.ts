namespace ClassesBlumenwiese {
    //Anfang Biene

  const circle = function (x, y, radius, fillCircle): void {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    if (fillCircle) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
  
  };
  function drawBee (x, y) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "gold";
  
    circle(x, y, 8, true);
    circle(x, y, 8, false);
    circle(x - 5, y - 11, 5, false);
    circle(x + 5, y - 11, 5, false);
    circle(x - 2, y - 1, 2, false);
    circle(x + 2, y - 1, 2, false);
  }
  
  function biene (coordinate) {
    let offset: number = Math.random() * 4 - 2;
    coordinate += offset;
  
    if (coordinate > 400) {
        coordinate = 400;
    }
    if (coordinate < 0) {
        coordinate = 0;
    }
    return coordinate;
  }
  
  
  let x: number = 400;
  let y: number = 700;
  
  setInterval(function (): void {
   
        drawBee(x, y);
        x = biene(x);
        y = biene(y);
  
  },          40);















}
