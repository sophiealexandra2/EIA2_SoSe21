"use strict";
var Events;
(function (Events) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        let body = document.querySelector("body");
        body.addEventListener("mousemove", setInfoBox);
        body.addEventListener("click", logInfo);
        body.addEventListener("keyup", logInfo);
    }
    function setInfoBox(_event) {
        let x = _event.offsetX;
        let y = _event.offsetY;
        let body = _event.target;
        let span = document.querySelector("span");
        body.appendChild(span);
        span.style.left = x + "px";
        span.style.top = y + "px";
    }
    function logInfo(_event) {
        console.log("Event started: " + _event.type);
        console.log("Target: " + _event.target);
        console.log("Current Target: " + _event.currentTarget);
        console.log("Eventphase = " + _event.eventPhase);
        console.log("Path: " + _event.composedPath());
    }
})(Events || (Events = {}));
//# sourceMappingURL=script.js.map