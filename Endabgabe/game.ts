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
    const CUSTOMER_WAITING_TIME_MAX = 10; 

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
            this.initUi();
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
            //finde entität die geklickt wurde
            let vec = new Vector2 (x, y);
            let distFound = null;
            let found = null;

            for (let e of this.entities) {
                let dist = vec.distanceTo(e.position);

                if ((!found && dist <= 50) || (found && distFound && dist <= distFound)) {
                    found = e;
                    distFound = dist;
                }
            }
            //entweder return entitiy oder null
            return found;
        }    

        private leftClick (evt: MouseEvent) {
            evt.preventDefault ();
            let ent = this.getClickEntitiy(evt.offsetX, evt.offsetY);
            console.log("left", ent, evt);
         

            if (evt) {
            this.selected = ent; 
            }

            else {
            this.selected = null;
             }

            this.update();
        }
    
        private rightClick (evt: MouseEvent) {
            evt.preventDefault ();
            let ent = this.getClickEntitiy(evt.offsetX, evt.offsetY);
            console.log("left", ent, evt);
            

            if (!ent) {
            return; 
             }

            if (this.selected instanceof Employee && this.selected !== ent && (ent instanceof Customer || ent instanceof Storage || ent instanceof Workplace )) {
            this.actionTo(this.selected, ent);
            }

        }

        private initUi () {
            let parent = document.getElementById ("start");
            if (!parent) {
                console.error ("UI not found :(");
                return;
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
            startBtn.addEventListener ("click", this.startGame.bind(this, employeeField, customerSpawn, tiredSeconds, storageAmount));

            //append kreierte elemente zu den bereits existierenden parent elementen
            parent.appendChild(employeeField);
            parent.appendChild(customerSpawn);
            parent.appendChild(tiredSeconds);
            parent.appendChild(storageAmount);
            parent.appendChild(startBtn);

        }

        private startGame (empField: HTMLInputElement, cusField: HTMLInputElement, tirField: HTMLInputElement, stoField: HTMLInputElement) {

            let employees = Number (empField.value);
            let customerSecond = Number (cusField.value);
            let tiredSeconds = Number (tirField.value);
            let storageAmount = Number (stoField.value);

            if (!this.validateNr(employees) || !this.validateNr (customerSecond) || !this.validateNr(tiredSeconds) || !this.validateNr(storageAmount)) {
                console.error ("starting game error");
                return;
            }

        

            this.entities = [];
            this.storageMax = storageAmount; 
            this.tiredSeconds = tiredSeconds;
            this.customerSecond = customerSecond;
            this.employees = employees;
            this.customerCount = 0;
            this.customerSuccessCount = 0;

            //Funktionen für später, fügt entities zu entity list hinzu
            this.initWorkplace();
            this.initStorage();
            this.spawnPeople();

            //start render loop
            requestAnimationFrame(this.update.bind(this));
        }

        //Spawn funktion für später
        private spawnPeople () {
            this.spawnEmployees();
            this.spawnCustomers();
        }

        private spawnEmployees () {
            if (!this.employees) {
                return;
            }
            //spawne so viele employees wie vorher defined
            for (let i: number = 0; i < this.employees; i ++) {
                let x: number = 350 + (i + 60);
                let y: number = 400;
                //kreiere hier einen neuen Employee also eine Entität
                let emp = new Employee (new Vector2(x, y));
                this.entities.push(emp);
            }
        }

        private spawnCustomers () {
            if (this.customerSecond) {
                this.spawnCust();
                 //registriere spawn timer, damit ich später die mood berechnen kann
                this.custInt = setInterval (this.spawnCust.bind(this), this.customerSecond * 1000);
            }
        }

        private spawnCust () {
           let targetX = this.customerTargetX;
           let targetY = this.rand (this.customerFromY, this.customerToY);
           let cust = new Customer (this.customerSpawn, new Vector2(targetX, targetY));
           this.entities.push(cust);
           this.customerCount ++;

            }
            //erstellt eine random zahl zwischen den beiden parametern die ich reingebe
        private rand (from: number, to: number) {
            return Math.floor(Math.random() * (to - from) + from);
            }


        private validateNr (nr: number) {
                return !isNaN (nr) && nr > 0;
            }

        private employeeReachedStorage (emp: Employee, stor: Storage) {
            if (emp.carries && emp.carries.name !== stor.contains) {
                console.error("item does not belong here!");
                return;
            }

            if (emp.carries && emp.carries.name == stor.contains) {
                stor.amount += 1;
                emp.carries = null;
                return;
            }

            if (!emp.carries) {
                let success = stor.take();
                if (success) {
                    emp.carries = new Ingredient (stor.contains);
                }

                else {
                    console.error ("nothing in storage anymore");
                }
            }
        }

        private employeeReachedWorkplace (emp: Employee, wp: Workplace) {
            if (!emp.carries && wp.food) {
                emp.carries = wp.food;
                wp.food = null;
            }

            if (emp.carries && wp.food && emp.carries instanceof Ingredient) {
                let success = wp.food.addIngredient(emp.carries);
                if (success) {
                    emp.carries = null;
                }
                //no success = do nothing
            }
        }

        private employeeReachedCustomer (emp: Employee, cus: Customer) {
            //erlaube dem employee nur zum customer zu gehen wenn er auch essen dabei hat
            if (emp.carries && emp.carries instanceof Food) {
                if (emp.carries.name !== cus.wants.name) {
                    cus.mood = Moods.AlotAngry;
                    emp.carries = null;

                }

                if (emp.carries && emp.carries.name == cus.wants.name) {
                     
                }

            }
        }


    }


}

    






