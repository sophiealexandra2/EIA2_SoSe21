namespace ClassesBlumenwiese {

        export let beePath: Path2D;
        export let cloudPath: Path2D ;
        
        export let cloudPositions: number[][][] = [
            [
                [200, 50], [50, 160], [250, 150]
            ]
        ];
        
    
        export function createPaths(): void {
            beePath = createBeePaths();
            cloudPath = createCloudPath();
        }
    
        function createBeePaths(): Path2D {
            console.log("beeeeeee");
            
            let path: Path2D = new Path2D();
            
            let x: number = (Math.random() * canvas.width - 10);
            let y: number = (Math.random() * (canvas.height));
    
            ctx.save();
    
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.translate(x, y);
            ctx.quadraticCurveTo(16, -10, 16, 10);
            ctx.quadraticCurveTo(16, 16, 2, 13);
            ctx.quadraticCurveTo(-8, -1, 2 , 0 );
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 2;
            ctx.fillStyle = "yellow";
            ctx.fill();
            ctx.lineTo(0, 8);
            ctx.stroke();
            ctx.moveTo(10, -3);
            ctx.quadraticCurveTo(-1, 14, 13, 13);
            
            ctx.stroke();
            ctx.closePath();
    
            ctx.beginPath();
            moveTo(-13, 5);
            ctx.arc(6, -8, 6, 0, 2 * Math.PI);
            ctx.fillStyle = "lightblue";
            ctx.strokeStyle = "#000000";
            ctx.fill();
            ctx.stroke();
            ctx.beginPath();
            moveTo(-13, 5);
            ctx.arc(12, -8, 6, 0, 2 * Math.PI);
            ctx.fillStyle = "lightblue";
            ctx.strokeStyle = "#000000";
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
            
            return path;
        }
        
        function createCloudPath(): Path2D  {
            console.log("CLOUD");
            let nParticles: number = 23;
            let radiusParticle: number = 15;
            let particle: Path2D = new Path2D();
            let gradient: CanvasGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
    
            particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
            gradient.addColorStop(0, "HSLA(0, 50%, 100%, 0.5)");
            gradient.addColorStop(1, "HSLA(0, 60%, 100%, 0)");
    
            ctx.save();
            ctx.translate(200, 50);
            ctx.fillStyle = gradient;
    
            for (let drawn: number = 0; drawn < nParticles; drawn++) {
                ctx.save();
                let x: number = (Math.random() - 0.5) * 100;
                let y: number = - (Math.random() * 25);
                ctx.translate(x, y);
                ctx.fill(particle);
                ctx.restore();
            }
            ctx.restore();
    
            return particle;
            
        }
    }



