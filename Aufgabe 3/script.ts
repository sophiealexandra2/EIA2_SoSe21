namespace Events {
    window.addEventListener("load", handleLoad);
    
    function handleLoad(_event: Event): void {
        let body: HTMLElement = <HTMLElement>document.querySelector("body");
        body.addEventListener("mousemove", setInfoBox);
        body.addEventListener("click", logInfo);
        body.addEventListener("keyup", logInfo);
    }
    
    function setInfoBox(_event: MouseEvent): void {
    let x: number = _event.offsetX;
    let y: number = _event.offsetY;
    
    let body: HTMLElement = <HTMLElement>_event.target;
    let span: HTMLSpanElement = <HTMLElement>document.querySelector("span");
    body.appendChild(span);
    span.style.left = x + "px";
    span.style.top = y + "px";
    }
    
    function logInfo(_event: Event): void {
        console.log("Event started: " + _event.type);
        console.log("Target: " + _event.target);
        console.log("Current Target: " + _event.currentTarget);
        console.log("Eventphase = " + _event.eventPhase);
        console.log("Path: " + _event.composedPath());
        }
    }
