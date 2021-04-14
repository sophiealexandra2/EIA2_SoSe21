namespace Events {
    window.addEventListener("load", handleLoad);
    
    function handleLoad(_event: Event): void {
    
        document.addEventListener("mousemove", setInfoBox);
        document.addEventListener("click", logInfo);

        document.addEventListener("keyup", logInfo);
        document.body.addEventListener("click", logInfo);

        document.addEventListener("click", setInfoBox);
        document.body.addEventListener("keyup", logInfo);
    }
    
    function setInfoBox(_event: MouseEvent): void {
    let x: number = _event.clientX;
    let y: number = _event.clientY;
    let body: HTMLElement = <HTMLElement>_event.target;
    let mouseCursorSpan: HTMLSpanElement = <HTMLElement>document.querySelector("span");
    

    mouseCursorSpan.style.left = x + "px";
    mouseCursorSpan.style.top = y + "px";
    body.appendChild(mouseCursorSpan);

    }
//Button leider nicht hinbekommen...
    function button (_event: Event): void {
        document.querySelector("button");
        addEventListener("click", logInfo);
        console.log("Du hast den Button geklickt");
        
    }
    function logInfo(_event: Event): void {
        console.log(_event.type);
        console.log(_event.target);
        console.log(_event.currentTarget);
        console.log(_event.composedPath());
        console.log(_event.eventPhase);
        
    }}
