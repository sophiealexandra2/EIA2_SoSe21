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

    export class Game {
        private readonly canvas: HTMLCanvasElement;
        private readonly map: CanvasRenderingContext2D;
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

        constructor () {
            console.log("Game loaded");
            //initalise canvas from html
            this.canvas = document.getElementById ("main") as HTMLCanvasElement;
            console.log(this.canvas);
            this.map = this.canvas.getContext("2d");
            console.log(this.map);
            this.canvas.width = width;
            this.canvas.height = height;
            this.init();
        }
        //mein grundgerüst für alles
        private init() {
            console.log("initalise UI");
            //initialize images
            this.initImages();
            //to initialize map (statisch)
            this.initMap();
            //for click event
            this.initClick();
         }   
        private initClick() {
            //bind left and right click to specific functions
            this.canvas.addEventListener("click", this.leftClick.bind(this));
            this.canvas.addEventListener("contectmenu", this.rightClick.bind(this));
         }

        private getClickEntitiy(x: number, y: number) {
            let vec = new Vector2 (x,y);
            let distFound = null;
        }    

        private leftClick (evt: MouseEvent) {
            evt.preventDefault ();
            let ent = this.getClickEntitiy(evt.offsetX, evt.offsetY);
            console.log("left", ent, evt);
         

            if (evt) {
            this.seletced = ent; 
            }

            else {
            this.selected = null;
             }

            this.update();
        }
    /*  
        private rightClick (evt: MouseEvent) {
        evt.preventDefault ();
        let ent = this.getClickEntitiy(evt.offsetX, evt.offsetY);
        console.log("left", ent, evt);
        }

        if (evt) {
        this.seletced = ent; 
        }

        else {
        this.selected = null;
        }

        this.update();*/


        private initUi () {
            let parent = document.getElementById ("start");
            if (!parent) {
                console.error ("UI not found :(");
                return
            }

            let employeeField = document.createElement("input");
            employeeField.placeholder = "Employee count";

            let customerSpawn = document.createElement("input");
            customerSpawn.placeholder = "Spawn customer every x seconds";

            let tiredSeconds = document.createElement("input");
            tiredSeconds.placeholder = "Employees tired after x seconds without action";

            let storageAmount = document.createElement("input");
            storageAmount.placeholder = "Storage Capacity";

            let startBtn = document.createElement("button");

            //create button and connect to listener
            startBtn.innerText = "Start Game";
            startBtn.addEventListener ("click", this.startGame.bind(this.employeeField, customerSpawn, tiredSeconds, storageAmount));


            parent.appendChild(employeeField);
            parent.appendChild(customerSpawn);
            parent.appendChild(tiredSeconds);
            parent.appendChild(storageAmount);
            parent.appendChild(startBtn);

        }

        private startGame () {

            let employees = Number (empField.value);
            let customerSecond = Number (cusField.value);
            let tiredSeconds = Number (tirField.value);
            let storageAmount = Number (stoField.value);

        

            this.entities = [];
            this.storageMax = storageAmount; 
            this.tiredSeconds = tiredSeconds;
            this.customerSeconds = customerSeconds;
            this.employees = employees;
            this.customerCount = 0;
            this.customerSuccessCount = 0;

            //Funktionen für später
            this.initWorkplace();
            this.initStorage():
            this.spawnPeople();

            setInterval(this.update.bind(this));
        }



    }
}
    






