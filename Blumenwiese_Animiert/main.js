"use strict";
var ClassesBlumenwiese;
(function (ClassesBlumenwiese) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        console.log("Blumenwiese wird jetzt animiert und gestartet");
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        ClassesBlumenwiese.ctx = canvas.getContext("2d");
        ClassesBlumenwiese.ctx.fillStyle = "beige";
        ClassesBlumenwiese.ctx.strokeStyle = "black";
        ClassesBlumenwiese.createPaths();
        console.log("Biene paths: ", ClassesBlumenwiese.beePath);
    }
})(ClassesBlumenwiese || (ClassesBlumenwiese = {}));
//# sourceMappingURL=main.js.map