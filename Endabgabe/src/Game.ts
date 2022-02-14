namespace veganDoenerSimulator {
    const WIDTH: number = 1200;
    const HEIGHT: number = 800;
    const CUSTOMER_WAITING_TIME_MAX: number = 10;

    export class Game {
        //readonly = kann außerhalb der Klasse gelesen und verwendet werden, aber nicht geändert
        private readonly canvas: HTMLCanvasElement;
        //finde map als name hier greifbarer :) 
        private readonly map: CanvasRenderingContext2D | null = null;
        private storageMax: number | null = null;
        private employees: number | null = null;
        private customerSecond: number | null = null;
        private tiredSeconds: number | null = null;
        private entities: Entity[] = [];
        private imageMap: Map<string, HTMLImageElement> = new Map();
        private selected: Entity | null = null;
        private custInt: number | null = null;

        private customerSpawn: Vector2 = new Vector2(20, 345);
        private customerTargetX: number = 270;
        //x and y borders
        private customerFromY: number = 111;
        private customerToY: number = 670;

        private customerCount: number = 0;
        private customerSuccessCount: number = 0;

        constructor() {
            console.log("Game loaded..");
            this.canvas = document.getElementById("main") as HTMLCanvasElement;
            console.log(this.canvas);
            this.map = this.canvas.getContext("2d");
            console.log(this.map);
            this.canvas.width = WIDTH;
            this.canvas.height = HEIGHT;
            this.init();
        }

        private init() {
            console.log("init UI..");
            this.initImages();
            this.initUi();
            this.initMap();
            this.initClick();
        }

        private initClick() {
            //bind left and right click to specific functions, 
            //bind = bind an object to a function und ich reference diese mit "this"
            this.canvas.addEventListener("click", this.leftClick.bind(this));
            this.canvas.addEventListener("contextmenu", this.rightClick.bind(this));
        }

        private getClickEntity (x: number, y: number ) {
            let vec = new Vector2 (x, y);
            let found = null;
            let distFound = null;
            //geht hier jede Entität durch und schaut, welche am nähesten dran ist an x und y
            //wenn entität da ist = gibt entitiy zurück oder null wenn nichts da ist
            //Heißt = irgendwo im spielfeld rumklicken geht nicht, da passiert nichts
            for (let e of this.entities) {
                let dist = vec.distanceTo (e.position);
                //console.log(dist);
                if ((!found && dist <= 50) || (found && distFound && dist <= distFound)) {
                    found = e;
                    distFound = dist;
                }
            }
            return found;
        }

        //left click = selektiert etwas
        private leftClick (evt: MouseEvent) {
            //preventDefault habe ich hier benutzt, da normalerweise der leftclick eine normale Auswahl funktion hat. 
            //Ich will die hier ja aber überschreiben = verhindert die ursprüngliche Verhaltensweise, return false
            evt.preventDefault();
            //get entity that is clicked on
            let ent = this.getClickEntity(evt.offsetX, evt.offsetY);
            //console.log("left", ent, evt);

            //wenn es was gibt, dann ist die selektierte Entität = entität die wir gefunden haben
            if (ent) {
                this.selected = ent;
            }
            //wenn nichts getroffen wurde, deselect
            else {
                this.selected = null;
            }
            //update UI weil es sich etwas geändert hat, es weiß es nicht wenn wir ihm das nicht explizit sagen
            this.updateUi();
        }
        //left click = wählt etwas aus
        private rightClick (evt: MouseEvent) {
            evt.preventDefault();
            let ent = this.getClickEntity(evt.offsetX, evt.offsetY);
            if (!ent) {
                return;
            }
            //only dispatch action when selected entity is employee and target is not same entity or not Customer/Storage/Workplace
            if (this.selected instanceof Employee && this.selected !== ent && (ent instanceof Customer || ent instanceof Storage || ent instanceof Workplace)) {
                //wenn alles passt ,rufe diese funktion auf
                this.actionTo(this.selected, ent);
            }
        }

        private actionTo (from: Employee, to: Customer | Storage | Workplace) {
            //employee to customer, or Storage or Worklplace, right click action
            if (to instanceof Customer || to instanceof Storage || to instanceof Workplace) {
                this.empToAny(from, to);
            }
        }
        //funktion hier eigentlich redundant, da ich das oben ja schon alles definiert hab
        private empToAny (from: Employee, to: Customer | Storage | Workplace) {
            if (from.target) {
                return;
            }
            from.target = to;
        }

        private initImages() {
            //init images to image map so they can be accessed by string and go through all IngredientNames
            //a for key then --> Typecast, da wir mehr wissen als "er"
            for (let a in IngredientNames) {
                let img = new Image();
                img.src = "images/" + (<{ [key: string]: string }>IngredientNames)[a] + ".png";
                this.imageMap.set((<{ [key: string]: string }>IngredientNames)[a], img);
            }
            for (let a in FoodNames) {
                let img = new Image();
                img.src = "images/" + (<{ [key: string]: string }>FoodNames)[a] + ".png";
            }
            for (let a in Moods) {
                let img = new Image();
                img.src = "images/" + (<{ [key: string]: string }>Moods)[a] + ".png";
                this.imageMap.set((<{ [key: string]: string }>Moods)[a], img);
            }
        }
        
        private initUi() {
            let parent: HTMLElement = document.getElementById("start");
            if (!parent) {
                console.error("UI NOT FOUND");
                return;
            }
            let employeeField: HTMLInputElement = document.createElement("input");
            employeeField.placeholder = "Employee count";
            let customerSpawn: HTMLInputElement = document.createElement("input");
            customerSpawn.placeholder = "Spawn customer every x seconds";
            let tiredSeconds: HTMLInputElement = document.createElement("input");
            tiredSeconds.placeholder = "Employees tired after x seconds without action";
            let storageAmount: HTMLInputElement = document.createElement("input");
            storageAmount.placeholder = "Storage capacity";
            let startBtn: HTMLButtonElement = document.createElement("button");

            startBtn.innerText = "Start Game";
            startBtn.addEventListener("click", this.startGame.bind(this, employeeField, customerSpawn, tiredSeconds, storageAmount));

            parent.appendChild(employeeField);
            parent.appendChild(customerSpawn);
            parent.appendChild(tiredSeconds);
            parent.appendChild(storageAmount);
            parent.appendChild(startBtn);
        }

        private startGame(empField: HTMLInputElement, cusField: HTMLInputElement, tirField: HTMLInputElement, stoField: HTMLInputElement) {
            let employees: number = Number(empField.value);
            let customerSecond: number = Number(cusField.value);
            let tiredSeconds: number = Number(tirField.value);
            let storageAmount: number = Number(stoField.value);
            if (!this.validateNr(employees) || !this.validateNr(customerSecond) || !this.validateNr(tiredSeconds) || !this.validateNr(storageAmount)) {
                console.error("starting game error");
                return;
            }
            this.entities = [];
            this.storageMax = storageAmount;
            this.tiredSeconds = tiredSeconds;
            this.customerSecond = customerSecond;
            this.employees = employees;
            this.customerCount = 0;
            this.customerSuccessCount = 0;

            //add entities to entity list
            this.initWorkplaces();
            this.initStorage();
            this.spawnPeople();

            //start render loop
            requestAnimationFrame(this.update.bind(this));
        }

        private spawnPeople() {
            this.spawnEmployees();
            this.spawnCustomers();
        }

        private spawnEmployees() {
            if (!this.employees) {
                return;
            }
            //spawn as many employees as defined
            for (let i: number = 0; i  < this.employees; i++) {
                let x: number = 350 + (i * 60);
                let y: number = 400;
                //create entity
                let emp = new Employee(new Vector2(x, y));
                this.entities.push(emp);
            }
        }

        private spawnCustomers () {
            if (this.customerSecond) {
                this.spawnCust();
                this.custInt = setInterval(this.spawnCust.bind(this), this.customerSecond * 1000);
            }
        }
        private randomNumber (from: number, to: number) {
            return Math.floor(Math.random() * (to - from) + from);
        }

        private spawnCust() {
            //set customer target location x
            let targetX: number = this.customerTargetX;
            //set customer random target location y
            let targetY: number = this.randomNumber(this.customerFromY, this.customerToY);
            //create entity
            let cust = new Customer(this.customerSpawn, new Vector2(targetX, targetY));
            this.entities.push(cust);
            //increase customer count
            this.customerCount++;
        }

        private employeeReachedStorage (emp: Employee, stor: Storage) {
            if (emp.carries && emp.carries.name !== stor.contains) {
                console.error("item doesnt belong in here");
                return;
            }
            if (emp.carries && emp.carries.name === stor.contains) {
                stor.amount += 1;
                emp.carries = null;
                return;
            }
            if (!emp.carries) {
                let success: boolean = stor.take();
                if (success) {
                    emp.carries = new Ingredient(stor.contains);
                }
                //no success: storage is empty
                else {
                    console.error("nothing in storage anymore");
                }
            }
        }

        private employeeReachedWorkplace(emp: Employee, wp: Workplace) {
            //employee takes food from workplace
            if (!emp.carries && wp.food ) {
                emp.carries = wp.food;
                wp.food = null;
            }
            //employee brings ingredient to workplace
            if (emp.carries && wp.food && emp.carries instanceof Ingredient) {
                let success: boolean = wp.food.addIngredient(emp.carries);
                if (success) {
                    emp.carries = null;
                }
            }
        }

        private employeeReachedCustomer(emp: Employee, cus: Customer) {
            if (emp.carries && emp.carries instanceof Food) {
                if (emp.carries.name !== cus.wants.name) {
                    cus.mood = Moods.AlotAngry;
                    emp.carries = null;
                }
                if (emp.carries && emp.carries.name === cus.wants.name && emp.carries.finished) {
                    cus.mood = Moods.Happy;
                    emp.carries = null;
                    //increase score
                    this.customerSuccessCount++;
                }
                if (emp.carries && emp.carries.name === cus.wants.name && !emp.carries.finished) {
                    cus.mood = Moods.AlotAngry;
                    emp.carries = null;
                }
                cus.status = CustomerStatus.Leaving;
                cus.targetPos = this.customerSpawn;
            }
        }

        private employeeReachedTarget(emp: Employee) {
            if (emp.target instanceof Storage) {
                this.employeeReachedStorage(emp, emp.target);
            }
            if (emp.target instanceof Workplace) {
                this.employeeReachedWorkplace(emp, emp.target);
            }
            if (emp.target instanceof Customer ) {
                this.employeeReachedCustomer(emp, emp.target);
            }
            //when employee reached something, remove target
            emp.target = null;
        }

        private updateEmployee(ent: Employee) {
            if (!this.map) {
                return;
            }
            //update position by target position
            if (ent.target) {
                let dir = ent.position.direction(ent.target.position);
                ent.position.add(dir, ent.speed);
                ent.lastMove = new Date();
                let dist = ent.position.distanceTo(ent.target.position);
                if (dist <= 15) {
                    this.employeeReachedTarget(ent);
                }
            }
            //update mood depending on lastMove time
            if (ent.lastMove.getTime() + 10 * 1000 < new Date().getTime() ) {
                ent.mood = Moods.Tired;
            }
            else {
                ent.mood = Moods.Chef;
            }
            //get image by current mood
            let img = this.imageMap.get(ent.mood);
            if (!img) {
                return;
            }
            //draw image by mood
            this.map.fillStyle = "lightgrey";
            this.map.drawImage(img, ent.position.x, ent.position.y, 45, 45);
            //when employee carries something, add another image of item
            if (ent.carries) {
                let img = this.imageMap.get(ent.carries.name);
                if (!img) {
                    return;
                }
                this.map.drawImage(img, ent.position.x + 25, ent.position.y, 20, 20);
            }
        }

        private customerReachedTarget(cus: Customer) {
            cus.targetPos = null;
            if (cus.status === CustomerStatus.ComingIn) {
                cus.status = CustomerStatus.Waiting;
                cus.waitingSince = new Date();
            }
            else if (cus.status === CustomerStatus.Leaving) {
                let idx: number = this.entities.findIndex((val: Entity) => val === cus);
                if (idx === -1) {
                    return;
                }
                this.entities.splice(idx, 1);
            }
        }

        private updateCustomer (ent: Customer) {
            if (!this.map) {
                return;
            }
            if (ent.targetPos) {
                let dir = ent.position.direction(ent.targetPos);
                ent.position.add(dir, ent.speed);
                let dist = ent.position.distanceTo(ent.targetPos);
                if (dist <= 3) {
                    this.customerReachedTarget(ent);
                }
            }
            if (ent.status === CustomerStatus.Waiting && ent.waitingSince && ent.waitingSince.getTime() + (CUSTOMER_WAITING_TIME_MAX * 1000) * 2 < new Date().getTime()) {
                ent.mood = Moods.AlotAngry;
            }
            else if (ent.status === CustomerStatus.Waiting && ent.waitingSince && ent.waitingSince.getTime() + CUSTOMER_WAITING_TIME_MAX * 1000 < new Date().getTime()) {
                ent.mood = Moods.Angry;
            }

            //draw customer
            this.map.fillStyle = "lightgrey";
            let img: HTMLImageElement = this.imageMap.get(ent.mood);
            if (!img) {
                return;
            }
            this.map.drawImage(img, ent.position.x, ent.position.y, 45, 45);
            if (ent.wants) {
                let img: HTMLImageElement = this.imageMap.get(ent.wants.name);
                if (!img) {
                    return;
                }
                this.map.drawImage(img, ent.position.x + 25, ent.position.y, 20, 20);
            }
        }

        private drawScore() {
            let elem: HTMLElement = document.getElementById("score");
            if (!elem)  {
                return;
            }
            elem.innerHTML = "";
            let p: HTMLParagraphElement = document.createElement("p");
            p.innerText = `Customer count: ${this.customerCount}, Customer success count: ${this.customerSuccessCount}`;
            elem.appendChild(p);
        }

        private update() {
            if (!this.map) {
                return;
            }
            this.map.clearRect(0, 0, WIDTH, HEIGHT);

            this.initMap();

            this.drawScore();
            for (let ent of this.entities) {
                if (ent instanceof Workplace) {
                    this.updateWorkplace(ent);
                }
                if (ent instanceof Storage ) {
                    this.updateStorage(ent);
                }
                if (ent instanceof Employee ) {
                    this.updateEmployee(ent);
                }
                if (ent instanceof Customer ) {
                    this.updateCustomer(ent);
                }
                //draw rectangle around currently selected entity
                if (this.selected && ent === this.selected) {
                    this.drawSelectedRect(ent );
                }
            }
            //update loop recursion
            requestAnimationFrame(this.update.bind(this));
        }

        private drawSelectedRect (ent: Entity ) {
            if (!this.map) {
                return;
            }
            this.map.strokeStyle = "black";
            this.map.lineWidth = 6;
            this.map.beginPath();
            this.map.rect(ent.position.x - 5, ent.position.y - 5, 55, 55);
            this.map.stroke();
        }

        private updateWorkplace(ent: Workplace) {
            if (!this.map) {
                return;
            }
            //draw workplace
            this.map.fillStyle = "lightgrey";
            this.map.fillRect(ent.position.x, ent.position.y, 45, 45);
            //when workplace has food in progress, add image and percent status
            if (ent.food) {
                let img: HTMLImageElement = this.imageMap.get(ent.food.name);
                if (!img) {
                    return;
                }
                this.map.drawImage(img, ent.position.x + 5, ent.position.y + 5, 30, 30);

                let percentEndArc: number = (ent.food.has.length / ent.food.requires.length) * Math.PI * 2;
                this.map.strokeStyle = "darkgreen";
                this.map.lineWidth = 15;
                this.map.beginPath();
                this.map.arc(ent.position.x + 25, ent.position.y + 25, 15, percentEndArc === 0 ? 0.1 : 0, percentEndArc === 0 ? 0.15 : percentEndArc);
                this.map.stroke();
            }
        }

        private updateStorage(ent: Storage) {
            if (!this.map) {
                return;
            }
            this.map.fillStyle = "brown";
            this.map.strokeStyle = "brown";
            this.map.beginPath();
            this.map.rect(ent.position.x, ent.position.y, 45, 45);
            let img: HTMLImageElement = this.imageMap.get(ent.contains);
            if (!img) {
                return;
            }
            this.map.drawImage(img, ent.position.x + 5, ent.position.y + 5, 30, 30);
            this.map.lineWidth = 5;
            this.map.stroke();
        }

        private updateUi() {
            let container: HTMLDivElement = document.getElementById("selected") as HTMLDivElement;
            container.innerHTML = "";
            if (!this.selected) {
                return;
            }
            let fieldset: HTMLFieldSetElement = document.createElement("fieldset") as HTMLFieldSetElement;
            let legend: HTMLLegendElement = document.createElement("legend");
            fieldset.appendChild(legend);
            if (this.selected instanceof Customer ) {
                legend.innerText = "Customer";
                this.updateSelectedCustomerUi(fieldset);
            }
            if (this.selected instanceof Employee) {
                legend.innerText = "Employee";
                this.updateSelectedEmployeeUi(fieldset);
            }
            if (this.selected instanceof Workplace ) {
                legend.innerText = "Workplace";
                this.updateSelectedWorkplaceUi(fieldset);
            }
            if (this.selected instanceof Storage) {
                legend.innerText = "Storage";
                this.updateSelectedStorageUi(fieldset);
            }
            container.appendChild(fieldset);
        }

        private updateSelectedCustomerUi(con: HTMLFieldSetElement) {
            //set ui when customer is selected
            const p: HTMLParagraphElement = document.createElement("p");
            const sel = this.selected as Customer;
            p.innerText = `Customer wants: ${sel.wants.name}`;
            const p2: HTMLParagraphElement = document.createElement("p");
            p2.innerText = `Customer mood: ${sel.mood}`;
            con.appendChild(p);
            con.appendChild(p2);
        }

        private updateSelectedEmployeeUi(con: HTMLFieldSetElement) {
            //set ui when employee is selected
            const sel = this.selected as Employee;
            if (sel.carries) {
                const p: HTMLParagraphElement = document.createElement("p");
                p.innerText = `Employee carries: ${sel.carries.name}`;
                con.appendChild(p);
            }
            const p2: HTMLParagraphElement = document.createElement("p");
            p2.innerText = `Employee mood: ${sel.mood}`;
            con.appendChild(p2);
        }

        private updateSelectedWorkplaceUi(con: HTMLFieldSetElement) {
            const sel = this.selected as Workplace;
            //when workplace has no food, generate select element with every Food
            if (!sel.food) {
                const select: HTMLSelectElement = document.createElement("select");
                for (let a in FoodNames) {
                    //console.log("a");
                    const opt = document.createElement("option");
                    opt.value = a;
                    opt.innerText = a;
                    select.appendChild(opt);
                }
                const btn = document.createElement("button");
                btn.addEventListener("click", this.startProduction.bind(this, sel, select));
                btn.innerText = "Start production";
                con.appendChild(select);
                con.appendChild(btn);
            }
            //if production is running, just display required ingredients
            if (sel.food) {
                const p: HTMLParagraphElement = document.createElement("p");
                p.innerText = "Requires:" + sel.food.requires.join(",");
                con.appendChild(p);
            }
        }

        private startProduction(workplace: Workplace, elem: HTMLSelectElement, evt: MouseEvent) {
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
            //update UI, because something changed
            this.updateUi();
        }

        private updateSelectedStorageUi(con: HTMLFieldSetElement ) {
            const sel = this.selected as Storage;
            const p: HTMLParagraphElement = document.createElement("p");
            const p2: HTMLParagraphElement = document.createElement("p");
            p.innerText = `Storage contains: ${sel.contains}`;
            p2.innerText = `Storage amount left: ${sel.amount}`;
            con.appendChild(p);
            con.appendChild(p2);
        }

        //validate number, returns true when number is valid, otherwise false
        private validateNr (nr: number) {
            return !isNaN(nr) && nr > 0;
        }

        private initMap() {
            //draw static map elements
            this.initHouse();
            this.initCustomerArea();
            this.initEmployeeArea();
        }

        private initHouse() {
            if (!this.map) {
                return;
            }
            this.map.strokeStyle = "brown";
            this.map.lineWidth = 3;
            this.map.beginPath();

            this.map.rect(50, 100, WIDTH - 50 * 2, HEIGHT - 100 * 2);
            this.map.stroke();
            this.map.fillStyle = "#ffffff";


        }

        private initCustomerArea() {
            if (!this.map) {
                return;
            }
            //door
            this.map.fillRect(45, HEIGHT / 2 - 100, 20, 100);
            //theke
            this.map.fillStyle = "#f28241";
            this.map.fillRect(300, 100, 30, HEIGHT - 100 * 2);
            //table
            this.map.beginPath();
            this.map.arc(150, 250, 50, 0, 2 * Math.PI);
            this.map.fill();
            //table 2
            this.map.beginPath();
            this.map.arc(130, 600, 50, 0, 2 * Math.PI);
            this.map.fill();
        }

        private initEmployeeArea() {
            //kitchen
            if (!this.map) {
                return;
            }
            this.map.fillStyle = "grey";
            this.map.fillRect(350, 100, 715, 50);
        }

        private initWorkplaces() {
            if (!this.map) {
                return;
            }
            //create 13 workspaces in kitchen
            this.map.fillStyle = "lightgrey";
            for (let i: number = 0; i < 13; i++) {
                let x: number = 355 + (i * 55);
                let y: number = 100;
                //let workplace = new Workplace(null, new Vector2(x, y));
                let workplace = new Workplace (null, new Vector2 (x, y));
                this.entities.push(workplace);
            }
        }

        private initStorage() {
            if (!this.map || !this.storageMax) {
                return;
            }
            //create storage for every possible Ingredient
            this.map.fillStyle = "brown";
            let i: number = 0;
            for (let a in IngredientNames) {
                let x: number = 355 + (i * 55);
                let y: number = 650;
                i++;
                let stor: Storage = new Storage((<{ [key: string]: IngredientNames }>IngredientNames)[a], this.storageMax, new Vector2(x, y));
                this.entities.push(stor);
            }
        }
    }
}


