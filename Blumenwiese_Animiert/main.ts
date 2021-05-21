namespace ClassesBlumenwiese {
    window.addEventListener("load", handleLoad);
    export let ctx: CanvasRenderingContext2D;

    function handleLoad (_event: Event): void {
console.log("Blumenwiese wird jetzt animiert und gestartet");
let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
if (!canvas)
        return;
ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
ctx.fillStyle = "beige";
ctx.strokeStyle  = "black";

createPaths();
console.log("Biene paths: ", beePath);



    }



























}