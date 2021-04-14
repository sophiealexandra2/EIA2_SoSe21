namespace Events {
    window.addEventListener("load", handleLoad);
    
    function handleLoad(_event: Event): void {
    
        let body: HTMLElement = <HTMLElement>document.querySelector("body");
        body.addEventListener("mousemove", setInfoBox);
        body.addEventListener("click", logInfo);
        body.addEventListener("keyup", logInfo);
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
        let button: InnerHTML = <HTMLElement>document.querySelector("button");
        document.getElementsByName("button");
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
