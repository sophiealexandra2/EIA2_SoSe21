namespace vegandoenerSimulator {
    const width: number = 1200; 
    const height: number = 800; 
}


export class Game {
    canvas: HTMLCanvasElement;
    map: CanvasRenderingContext2D;
    storageMax: number | null = null; 
    employees: number | null = null; 
    customerSecond: number | null = null; 
    tiredSeconds: number | null = null; 
    //Array mit allen Entitäten gelistet
    entities: Entity;
    //Wenn eine Entity gewählt wird, null für dass nix selektiert wurde, greift aufs Array zu
    selected: Entity | null = null; 
    custInt: number | null = null; 

    customerCount: number = 0;
    customerSuccessCount: number = 0; 

// was noch hier fehlt: spawn location (statisch) und bewegungsborders festlegen


}