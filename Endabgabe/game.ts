/*
Aufgabe: EIA II Endabgabe | Döner Simulation
Spielname: Vegan Döner 
Name: Sophie Heuvels
Matrikel: 266237
Datum: 01.02.2022
*/
namespace vegandoenerSimulator {
    const width: number = 1200; 
    const height: number = 800; 
}


export class Game {
    private canvas: HTMLCanvasElement;
    private map: CanvasRenderingContext2D;
    private storageMax: number | null = null; 
    private employees: number | null = null; 
    private customerSecond: number | null = null; 
    private tiredSeconds: number | null = null; 
    //Array mit allen Entitäten gelistet
    private entities: Entity[] = [];
    //Wenn eine Entity gewählt wird, null für dass nix selektiert wurde, greift aufs Array zu
    private selected: Entity | null = null; 
    private custInt: number | null = null; 
    //Hier pack ich nachher die Bilder rein, bessere alternative als so viele divs reinzupacken und pngs zu laden
    private imageMap: Map <string, HTMLImageElement> = new Map();
    private customerCount: number = 0;
    private customerSuccessCount: number = 0; 
    private customerSpawn: Vector2 = new Vector2 (20, 345);
    private customerTargetX: number = 270;
    private customerFromY: number = 111;
    private customerToY: number = 200;  
    private customerCount: number = 0;

    private customerSuccessCount: number = 0; 

    

}


