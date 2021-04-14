"use strict";
var Events;
(function (Events) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        document.addEventListener("mousemove", setInfoBox);
        document.addEventListener("click", logInfo);
        document.addEventListener("keyup", logInfo);
        document.body.addEventListener("click", logInfo);
        document.addEventListener("click", setInfoBox);
        document.body.addEventListener("keyup", logInfo);
    }
    function setInfoBox(_event) {
        let x = _event.clientX;
        let y = _event.clientY;
        let body = _event.target;
        let mouseCursorSpan = document.querySelector("span");
        mouseCursorSpan.style.left = x + "px";
        mouseCursorSpan.style.top = y + "px";
        body.appendChild(mouseCursorSpan);
    }
    //Button leider nicht hinbekommen...
    function button(_event) {
        document.querySelector("button");
        addEventListener("click", logInfo);
        console.log("Du hast den Button geklickt");
    }
    function logInfo(_event) {
        console.log(_event.type);
        console.log(_event.target);
        console.log(_event.currentTarget);
        console.log(_event.composedPath());
        console.log(_event.eventPhase);
    }
})(Events || (Events = {}));
//# sourceMappingURL=script.js.map