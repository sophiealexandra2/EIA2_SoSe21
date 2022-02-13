/*
Aufgabe: EIA II Endabgabe | Döner Simulation
Spielname: Vegan Döner 
Name: Sophie Heuvels
Matrikel: 266237
Datum: 01.02.2022
*/


namespace vegandoenerSimulator {
    const width = 1200; 
    const height = 800; 
    const CUSTOMER_WAITING_TIME_MAX: number = 10; 

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

        private getClickEntity(x: number, y: number) {
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
            let ent = this.getClickEntity(evt.offsetX, evt.offsetY);
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
            let ent = this.getClickEntity(evt.offsetX, evt.offsetY);
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

            let employeeField: HTMLInputElement = document.createElement("input");
            employeeField.placeholder = "Employee count";

            let customerSpawn: HTMLInputElement = document.createElement("input");
            customerSpawn.placeholder = "Spawn customer every x seconds";

            let tiredSeconds: HTMLInputElement = document.createElement("input");
            tiredSeconds.placeholder = "Employees tired after x seconds without action";

            let storageAmount: HTMLInputElement = document.createElement("input");
            storageAmount.placeholder = "Storage Capacity";

            let startBtn: HTMLButtonElement = document.createElement("button");

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
                //wenn employee das richtige und fertige essen zum customer bringt
                if (emp.carries && emp.carries.name === cus.wants.name && emp.carries.finished) {
                    cus.mood = Moods.Happy;
                    emp.carries = null;
                    //increase score stat
                    this.customerSuccessCount++;
                }
                //wenn employee zwar das richtige Essen bring aber es nicht fertig ist
                if (emp.carries && emp.carries.name === cus.wants.name && !emp.carries.finished) {
                    cus.mood = Moods.AlotAngry; 
                    emp.carries = null;
                }
                //customer geht zurück zur Tür, dort wo er gespawned wurde (statischer Vektor)
                cus.status = customerStatus.Leaving;
                cus.targetPos = this.customerSpawn;

            }
        }

        private employeeReachedTarget (emp: Employee) {

            //wenn employee das Storage erreicht/das Lager war
            if (emp.target instanceof Storage) {
                this.employeeReachedStorage(emp, emp.target);
            }

            if (emp.target instanceof Workplace) {
                this.employeeReachedWorkplace (emp, emp.target);
            }

            if (emp.target instanceof Customer) {
                this.employeeReachedCustomer (emp, emp.target);
            }
            //wenn er irgendwas davon erreicht, remove target
            emp.target = null;
        }

        private updateEmployee (ent: Employee) {
            if (ent.target) {
                let dir = ent.position.direction (ent.target.position);
                ent.position.add(dir, ent.speed);
                ent.lastMove = new Date();
                let dist = ent.position.distanceTo (ent.target.position);
                if (dist <= 15) {
                    this.employeeReachedTarget(ent);
                }
            }

            if (ent.lastMove.getTime() + 10*1000 < new Date().getTime()) {
                ent.mood  = Moods.Tired;
            }

            else {
                ent.mood = Moods.Chef;
            }

            let img = this.imageMap.get(ent.mood);
            this.map.fillStyle = "lightgrey";
            this.map.drawImage (img, ent.position.x, ent.position.y, 45, 45);
            if (ent.carries) {
                let img = this.imageMap.get (ent.carries.name);
                this.map.drawImage(img, ent.position.x + 25, ent.position.y, 20, 20); 
            }
        }

        private customerReachedTarget (cus: Customer) {
            cus.targetPos = null;
            if (cus.status === customerStatus.ComingIn) {
                cus.status = customerStatus.Waiting;
                cus.waitingSince = new Date();
            }

            else if (cus.status === customerStatus.Leaving) {
                let idx = this.entities.findIndex((val: Entity) => val === cus);

                if (idx === -1) {
                    return;
                }
                this.entities.splice(idx, 1);
            }
        }

        private updateCustomer (ent: Customer) {
            if (ent.targetPos) {
                let dir = ent.position.direction(ent.targetPos);
                ent.position.add (dir, ent.speed);
                let dist = ent.position.distanceTo (ent.targetPos);
                if (dist <= 3) {
                    this.customerReachedTarget(ent);
                }
            }

            if (ent.status === customerStatus.Waiting && ent.waitingSince && ent.waitingSince.getTime() + (CUSTOMER_WAITING_TIME_MAX * 1000) * 2 < new Date().getTime()) {
                ent.mood = Moods.AlotAngry;
            } 

            else if (ent.status === customerStatus.Waiting && ent.waitingSince && ent.waitingSince.getTime() + CUSTOMER_WAITING_TIME_MAX * 1000 < new Date().getTime()) {
                ent.mood = Moods.Angry;
            }
            //draw customer, mood = img
            this.map.fillStyle = "lightgrey";
            let img = this.imageMap.get (ent.mood);
            this.map.drawImage(img, ent.position.x, ent.position.y, 45, 45);
            if (ent.wants) {
                let img = this.imageMap.get (ent.wants.name);
                this.map.drawImage (img, ent.position.x + 25, ent.position.y, 20, 20);
                
            }
        }

        private drawScore() {
            let elem = document.getElementById("score");
            elem.innerHTML = "";
            let p = document.createElement ("p");
            p.innerText = `Customer Count: ${this.customerCount}, Customer success count: ${this.customerSuccessCount}`;
            elem.appendChild(p);
        }


        private update () {

            if (!this.map) {
                return;
            }
            this.map.clearRect(0, 0, width, height);
            this.initMap();
            this.drawScore();
            
            for (let ent of this.entities) {
               if (ent instanceof Workplace) {
                this.updateWorkplace(ent);
            }
        
               if (ent instanceof Storage) {
                this.updateStorage(ent);
            }
            
               if (ent instanceof Employee) {
                this.updateEmployee(ent);
            }

               if (ent instanceof Customer ) {
                    this.updateCustomer(ent);
                    
                }
                
               if (this.selected && ent === this.selected) {
                    this.drawSelectedRect(ent);
                }
           
        }
            requestAnimationFrame (this.update.bind(this));
             }


        private drawSelectedRect (ent: Entity) {
            this.map.strokeStyle = "black";
            this.map.lineWidth = 6;
            this.map.beginPath();
            this.map.rect (ent.position.x - 5, ent.position.y - 5, 55, 55);
            this.map.stroke();

        }

        private updateWorkplace (ent: Workplace) {
            this.map.fillStyle = "lightgrey";
            this.map.fillRect (ent.position.x, ent.position.y, 45, 45);
            if (ent.food) {
                let img = this.imageMap.get (ent.food.name);
                if (!img) {
                    return;
                }
                this.map.drawImage(img, ent.position.x + 5, ent.position.y + 5, 30, 30);
                let percentEndArc = (ent.food.has.length / ent.food.requires.length) * Math.PI * 2; 
                this.map.strokeStyle = "darkred";
                this.map.lineWidth = 15;
                this.map.beginPath ();
                this.map.arc (ent.position.x + 25, ent.position.y + 25, 15, percentEndArc === 0 ? 0.1: 0, percentEndArc === 0 ? 0.15: percentEndArc);
                this.map.stroke();
            }
        }

        private updateStorage (ent: Storage) {
            this.map.fillStyle = "brown";
            this.map.strokeStyle = "brown";
            this.map.beginPath();
            this.map.rect (ent.position.x, ent.position.y, 45, 45);
            let img = this.imageMap.get (ent.contains);
            this.map.drawImage (img, ent.position.x + 5, ent.position.y + 5, 30, 30);
            this.map.lineWidth = 5;
            this.map.stroke();

        }

        private updateUi () {
            let container = document.getElementById ("selected") as HTMLDivElement;
            container.innerHTML = "";
            let fieldset = document.createElement ("fieldset") as HTMLFieldSetElement;
            let legend = document.createElement ("legend");
            fieldset.appendChild (legend);

            if (this.selected instanceof Customer) {
                legend.innerText = "Customer";
                this.updatedSelectedCustomerUi (fieldset);
            }

            if (this.selected instanceof Employee) {
                legend.innerText = "Employee";
                this.updateSelectedEmployeeUi (fieldset);
            }

            if (this.selected instanceof Workplace) {
                legend.innerText = "Workplace";
                this.updateSelectedWorkplaceUi (fieldset);
            }

            if (this.selected instanceof Storage) {
                legend.innerText = "Storage";
                this.updateSelectedStorageUi (fieldset);
            }

            container.appendChild (fieldset);
        }



        private updatedSelectedCustomerUi (con: HTMLFieldSetElement) {
            const p = document.createElement("p");
            const sel = this.selected as Customer;
            p.innerText = `Customer wants: ${sel.wants.name }`;
            const p2 = document.createElement ("p");
            p2.innerText = `Customer mood: ${sel.mood}`;
            con.appendChild(p);
            con.appendChild(p2);
        }

        private updateSelectedEmployeeUi (con: HTMLFieldSetElement) {
            //on click: show this ui of employee that is selected
            const sel = this.selected as Employee;
            if (sel.carries) {
                const p = document.createElement ("p");
                p.innerText = `Employee carries: ${sel.carries.name }`;
                con.appendChild(p);

            }

            const p2 = document.createElement("p");
            p2.innerText = `Employee mood: ${sel.mood }`;
            con.appendChild(p2);
        }

        private updateSelectedWorkplaceUi (con: HTMLFieldSetElement) {
            const sel = this.selected as Workplace;
            if (!sel.food) {
                const select = document.createElement ("select");
                for (let a in FoodNames) {
                    const opt = document.createElement ("option");
                    opt.value = a;
                    opt.innerText = a; 
                    select.appendChild(opt);

                }

                const btn = document.createElement ("button");
                btn.addEventListener ("click", this.startProduction.bind(this, sel, select));
                btn.innerText = "Start production";
                con.appendChild(select);
                con.appendChild (btn);
            }

            if (sel.food) {
                const p = document.createElement ("p");
                p.innerText = "Requires:" + sel.food.requires.join (",");
                con.appendChild(p);
            }
        }

        private updateSelectedStorageUi (con: HTMLFieldSetElement) {
            const sel = this.selected as Storage;
            const p = document.createElement ("p");
            const p2 = document.createElement ("p");
            p.innerText = `Storage contains: ${sel.contains }`; 
            p2.innerText = `Storage amount left: ${sel.amount }`;
            con.appendChild (p);
            con.appendChild (p2);
        }

        private startProduction (workplace: Workplace, elem: HTMLSelectElement, evt: MouseEvent) {
            let selected = elem.value;
            switch (selected) {
                case "Doener":
                    workplace.food = new Doener();
                    break;
                
                case "Yufka":
                    workplace.food = new Yufka();
                    break;

                case "Lahmacun":
                    workplace.food = new Lahmacun();
                    break;
            }
            this.updateUi();
        }

        private actionTo( from: Employee, to: Customer | Storage | Workplace ) { 
            if (to instanceof Customer || to instanceof Storage || to instanceof Workplace) {
                this.empToAny(from, to);
            }

        }

        private empToAny (from: Employee, to: Customer | Storage | Workplace) {
            if (from.target) {
                return;
            }
            from.target = to; 
        }

        private initWorkplace () {
            if (!this.map) {
                return
            }

            this.map.fillStyle = "lightgrey";
            for (let i = 0; i < 13; i ++) {
                let x: number = 355 + (i * 55);
                let y: number = 100;
                let workplace = new Workplace (null, new Vector2 (x,y));
                this.entities.push(workplace);
            }

        }

        private initStorage () {
            if (!this.map || !this.storageMax) {
                return;
            }

            this.map.fillStyle = "brown";
            let i: number = 0; 
            for (let a in IngredientNames) {
                let x: number = 355 + (i * 55);
                let y: number = 650;
                i++;
                let stor = new Storage ((<{[key:string]: IngredientNames}> IngredientNames)[a], this.storageMax, new Vector2(x, y));
                this.entities.push(stor);
            }

            
        }

        private initHouse () {
            if (!this.map) {
                return;
            }

            this.map.strokeStyle = "brown";
            this.map.lineWidth = 3;
            this.map.beginPath();
            this.map.rect (50, 100, width - 50 * 2, height - 100 * 2);
            this.map.stroke();
            this.map.fillStyle = "#ffffff";
    
        }


        private initMap () {
            //hier male ich die statischen Dinge/map Elements
            this.initHouse();
            this.initCustomerArea;
            this.initEmployeeArea
            
        }

        private initImages () {
            for (let a in IngredientNames) {
                let img = new Image ();
                img.src = "images/" + (<{ [key: string]: string }> IngredientNames [a] + ".png");
                this.imageMap.set ((<{ [key: string]: string }> IngredientNames) [a], img);
            }
            for (let a in FoodNames) {
                let img = new Image ();
                img.src = "images/" + (<{ [key: string]: string }> FoodNames [a] + ".png");
                this.imageMap.set ((<{ [key: string]: string }> FoodNames) [a], img);
            }

            for (let a in Moods) {
                let img = new Image ();
                img.src = "images/" + (<{ [key: string]: string }> Moods [a] + ".png");
                this.imageMap.set ((<{ [key: string]: string }> Moods) [a], img);
            }
            
        }

        private initCustomerArea () {
            if (!this.map) {
                return;
            }

            //draw door
            this.map.fillRect (45, height / 2 - 100, 20, 200);
            //theke
            this.map.fillStyle = "pink";
            this.map.fillRect (300, 100, 30, height - 100 * 2);

            //table
            this.map.beginPath ();
            this.map.arc(150, 250, 50, 0, 2 * Math.PI);
            this.map.fill();

            //table 2
            this.map.beginPath ();
            this.map.arc(130, 600, 50, 0, 2 * Math.PI);
            this.map.fill();

            
        }


        private initEmployeeArea () {
            if (!this.map) {
                return;
            }
            this.map.fillStyle = "grey";
            this.map.fillRect (350, 100, 715, 50);

            
        }



    }
}




    






