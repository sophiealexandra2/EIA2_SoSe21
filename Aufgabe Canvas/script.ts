let canvas: HTMLCanvasElement = document.querySelector("canvas");
let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
    
let button = document.getElementById("refresh");
let refresh = function () {

      crc2.clearRect(0, 0, 400, 400);
      let i: number = 0;
      for (i = 0; i < 600; i++) {
        let x: number = Math.floor(Math.random() * 300);
        let y: number = Math.floor(Math.random() * 300);
        let radius: number = Math.floor(Math.random() * 20);
    
        let r: number = Math.floor(Math.random() * 255);
        let g: number = Math.floor(Math.random() * 255);
        let b: number = Math.floor(Math.random() * 255);
    
        crc2.beginPath();
        crc2.arc(x, y, radius, Math.PI * 2, 0, false);
        crc2.fillStyle = "rgba(" + r + "," + g + "," + b + ",1)";
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        crc2.closePath();
      }
    };
    
refresh();
button.addEventListener("click", refresh, false);
    








