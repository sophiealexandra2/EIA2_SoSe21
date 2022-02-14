namespace YufkaSimulator {
    //game width
    const WIDTH = 1200;
    //game height
    const HEIGHT = 800;
    //maximum waiting time for customers
    const CUSTOMER_WAITING_TIME_MAX = 10;

    export class Game {
        //canvas element
        private readonly canvas: HTMLCanvasElement;
        //canvas 2d context
        private readonly map: CanvasRenderingContext2D | null = null;
        //maximum storage amount
        private storageMax: number | null = null;
        //employee amount
        private employees: number | null = null;
        //spawn interval for customers
        private customerSecond: number | null = null;
        //employees will be tired after:
        private tiredSeconds: number | null = null;
        //entity list
        private entities: Entity[] = [];
        //map to store images
        private imageMap: Map<string, HTMLImageElement> = new Map();
        //current selected entity. null means nothing selected
        private selected: Entity | null = null;
        //customer spawn interval
        private custInt: number | null = null;

        //customer spawn location (static)
        private customerSpawn: Vector2 = new Vector2(20,345);
        //most left coordinate of customer spawn target walk
        private customerTargetX: number = 270;
        //x and y borders
        private customerFromY: number = 111;
        private customerToY: number = 670;

        private customerCount: number = 0;
        private customerSuccessCount: number = 0;

        constructor() {
            console.log("Game loaded..");
            //init canvas from HTML
            this.canvas = document.getElementById("main") as HTMLCanvasElement;
            console.log(this.canvas);
            //init context from canvas
            this.map = this.canvas.getContext("2d");
            console.log(this.map);
            //set WIDTH and HEIGHT
            this.canvas.width = WIDTH;
            this.canvas.height = HEIGHT;
            //initialize simulation
            this.init();
        }

        private init() {
            console.log("init UI..");
            //initialize images
            this.initImages();
            //initialize UI
            this.initUi();
            //initialize map
            this.initMap();
            //initialize click events
            this.initClick();
        }

        private initClick(){
            //bind left and right click to specific functions
            this.canvas.addEventListener('click', this.leftClick.bind(this));
            this.canvas.addEventListener('contextmenu', this.rightClick.bind(this));
        }

        private getClickEntity(x: number, y: number){
            //find entity that is being clicked on
            let vec = new Vector2(x, y);
            let found = null;
            let distFound = null;
            for(let e of this.entities){
                let dist = vec.distanceTo(e.position);
                //console.log(dist);
                if((!found && dist <= 50) || (found && distFound && dist <= distFound)){
                    found = e;
                    distFound = dist;
                }
            }
            //either return entity or null
            return found;
        }

        private leftClick(evt: MouseEvent){
            evt.preventDefault();
            //get entity that is clicked on
            let ent = this.getClickEntity(evt.offsetX, evt.offsetY);
            //console.log("left", ent, evt);

            //select entity
            if(ent){
                this.selected = ent;
            }
            //unselect entity if nothing is hit
            else{
                this.selected = null;
            }
            //update UI because selection changed
            this.updateUi();
        }

        private rightClick(evt: MouseEvent){
            evt.preventDefault();
            //find entity that is clicked on
            let ent = this.getClickEntity(evt.offsetX, evt.offsetY);
            //console.log("right", ent, evt);
            //nothing was hit, do nothing
            if(!ent){
                return;
            }
            //only dispatch action when selected entity is employee and target is not same entity or not Customer/Storage/Workplace
            if(this.selected instanceof Employee && this.selected !== ent && (ent instanceof Customer || ent instanceof Storage || ent instanceof Workplace)){
                this.actionTo(this.selected, ent);
            }
        }

        private actionTo(from: Employee, to: Customer | Storage | Workplace){
            //employee to customer right click action
            if(to instanceof Customer || to instanceof Storage || to instanceof Workplace){
                this.empToAny(from, to);
            }
        }

        private empToAny(from: Employee, to: Customer | Storage | Workplace){
            if(from.target){
                return;
            }
            //set target property to target element
            from.target = to;
        }

        private initImages() {
            //init images to image map so they can be accessed by string
            for (let a in IngredientNames) {
                let img = new Image();
                img.src = "images/" + (<{ [key: string]: string }>IngredientNames)[a] + ".png"
                this.imageMap.set((<{ [key: string]: string }>IngredientNames)[a], img)
            }
            for (let a in FoodNames) {
                let img = new Image();
                img.src = "images/" + (<{ [key: string]: string }>FoodNames)[a] + ".png"
                this.imageMap.set((<{ [key: string]: string }>FoodNames)[a], img)
            }
            for (let a in Moods) {
                let img = new Image();
                img.src = "images/" + (<{ [key: string]: string }>Moods)[a] + ".png"
                this.imageMap.set((<{ [key: string]: string }>Moods)[a], img)
            }
        }

        private initUi() {
            //initialize UI, so game can be started
            let parent = document.getElementById("start");
            if (!parent) {
                console.error("UI NOT FOUND");
                return;
            }
            //create html fields and set placeholders
            let employeeField = document.createElement("input");
            employeeField.placeholder = "Employee count";
            let customerSpawn = document.createElement("input");
            customerSpawn.placeholder = "Spawn customer every x seconds"
            let tiredSeconds = document.createElement("input");
            tiredSeconds.placeholder = "Employees tired after x seconds without action";
            let storageAmount = document.createElement("input");
            storageAmount.placeholder = "Storage capacity";
            let startBtn = document.createElement("button");

            //create button and connect to listener
            startBtn.innerText = "Start Game";
            startBtn.addEventListener('click', this.startGame.bind(this, employeeField, customerSpawn, tiredSeconds, storageAmount));

            //append all created elements to existing parent element
            parent.appendChild(employeeField);
            parent.appendChild(customerSpawn);
            parent.appendChild(tiredSeconds);
            parent.appendChild(storageAmount);
            parent.appendChild(startBtn);
        }

        private startGame(empField: HTMLInputElement, cusField: HTMLInputElement, tirField: HTMLInputElement, stoField: HTMLInputElement) {
            //get variables from given fields
            let employees = Number(empField.value);
            let customerSecond = Number(cusField.value);
            let tiredSeconds = Number(tirField.value);
            let storageAmount = Number(stoField.value);
            //validate variables
            if (!this.validateNr(employees) || !this.validateNr(customerSecond) || !this.validateNr(tiredSeconds) || !this.validateNr(storageAmount)) {
                console.error("starting game error");
                return;
            }
            //reset variables or initialize
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
            //register employee entities
            this.spawnEmployees();
            //register customer entities
            this.spawnCustomers();
        }

        private spawnEmployees() {
            if(!this.employees){
                return;
            }
            //spawn as many employees as defined
            for(let i = 0; i<this.employees; i++){
                //create initial x with offset
                let x = 350+(i*60);
                let y = 400;
                //create entity
                let emp = new Employee(new Vector2(x, y));
                this.entities.push(emp);
            }
        }

        private spawnCustomers() {
            if(this.customerSecond){
                //spawn first customer
                this.spawnCust();
                //register spawn timer
                this.custInt = setInterval(this.spawnCust.bind(this), this.customerSecond * 1000);
            }
        }

        private rand(from: number, to: number){
            return Math.floor(Math.random() * (to-from) + from);
        }

        private spawnCust(){
            //set customer target location x
            let targetX = this.customerTargetX;
            //set customer random target location y
            let targetY = this.rand(this.customerFromY, this.customerToY)
            //create entity
            let cust = new Customer(this.customerSpawn, new Vector2(targetX, targetY));
            this.entities.push(cust);
            //increase customer count
            this.customerCount++;
        }

        private employeeReachedStorage(emp: Employee, stor: Storage){
            //employee carries wrong item
            if(emp.carries && emp.carries.name !== stor.contains){
                console.error("item doesnt belong in here")
                return;
            }
            //employee brings back item
            if(emp.carries && emp.carries.name === stor.contains){
                stor.amount += 1;
                emp.carries = null;
                return;
            }
            //employee takes item from storage
            if(!emp.carries){
                let success = stor.take();
                if(success){
                    emp.carries = new Ingredient(stor.contains);
                }
                //no success: storage is empty
                else{
                    console.error("nothing in storage anymore");
                }
            }
        }

        private employeeReachedWorkplace(emp: Employee, wp: Workplace){
            //employee takes food from workplace
            if(!emp.carries && wp.food){
                emp.carries = wp.food;
                wp.food = null;
            }
            //employee brings ingredient to workplace
            if(emp.carries && wp.food && emp.carries instanceof Ingredient){
                let success = wp.food.addIngredient(emp.carries);
                //success: ingredient could be added
                if(success){
                    emp.carries = null;
                }
                //no success: do nothing
            }
        }

        private employeeReachedCustomer(emp: Employee, cus: Customer){
            //only allow employee to reach customer when he carries Food
            if(emp.carries && emp.carries instanceof Food){
                //employee brings wrong food to customer: alotangry
                if(emp.carries.name !== cus.wants.name){
                    cus.mood = Moods.AlotAngry;
                    emp.carries = null;
                }
                //employee brings right and finished food to customer: happy
                if(emp.carries && emp.carries.name === cus.wants.name && emp.carries.finished){
                    cus.mood = Moods.Happy;
                    emp.carries = null;
                    //increase score
                    this.customerSuccessCount++;
                }
                //employee brings right food to customer, but food is not finished: alotangry
                if(emp.carries && emp.carries.name === cus.wants.name && !emp.carries.finished){
                    cus.mood = Moods.AlotAngry;
                    emp.carries = null;
                }
                //set customer to leave after he got something
                cus.status = CustomerStatus.Leaving;
                //target position is door again
                cus.targetPos = this.customerSpawn;
            }
        }

        private employeeReachedTarget(emp: Employee){
            //emplyoee reaches Storage
            if(emp.target instanceof Storage){
                this.employeeReachedStorage(emp, emp.target);
            }
            //employee reaches Workplace
            if(emp.target instanceof Workplace){
                this.employeeReachedWorkplace(emp, emp.target);
            }
            //employee reaches Customer
            if(emp.target instanceof Customer){
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
            if(ent.target){
                let dir = ent.position.direction(ent.target.position);
                ent.position.add(dir, ent.speed);
                ent.lastMove = new Date();
                let dist = ent.position.distanceTo(ent.target.position);
                if(dist <= 15){
                    this.employeeReachedTarget(ent);
                }
            }
            //update mood depending on lastMove time
            if(ent.lastMove.getTime() + 10*1000 < new Date().getTime()){
                ent.mood = Moods.Tired;
            }
            else{
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

        private customerReachedTarget(cus: Customer){
            //when customer reached his target, remove targetPos
            cus.targetPos = null;
            //transition from ComingIn to "Waiting"
            if(cus.status === CustomerStatus.ComingIn){
                cus.status = CustomerStatus.Waiting;
                cus.waitingSince = new Date();
            }
            //remove customer when he reaches spawn again when Leaving
            else if(cus.status === CustomerStatus.Leaving){
                let idx = this.entities.findIndex((val: Entity) => val === cus);
                if(idx === -1){
                    return;
                }
                this.entities.splice(idx, 1);
            }
        }

        private updateCustomer(ent: Customer) {
            if (!this.map) {
                return;
            }
            //update position
            if(ent.targetPos){
                let dir = ent.position.direction(ent.targetPos);
                ent.position.add(dir, ent.speed);
                let dist = ent.position.distanceTo(ent.targetPos);
                if(dist <= 3){
                    this.customerReachedTarget(ent);
                }
            }
            //calculate mood depending on waitingSince time
            if(ent.status === CustomerStatus.Waiting && ent.waitingSince && ent.waitingSince.getTime() + (CUSTOMER_WAITING_TIME_MAX*1000)*2 < new Date().getTime()){
                ent.mood = Moods.AlotAngry;
            }
            else if(ent.status === CustomerStatus.Waiting && ent.waitingSince && ent.waitingSince.getTime() + CUSTOMER_WAITING_TIME_MAX*1000 < new Date().getTime()){
                ent.mood = Moods.Angry;
            }

            //draw customer
            this.map.fillStyle = "lightgrey";
            let img = this.imageMap.get(ent.mood);
            if (!img) {
                return;
            }
            this.map.drawImage(img, ent.position.x, ent.position.y, 45, 45);
            //add customer food image
            if (ent.wants) {
                let img = this.imageMap.get(ent.wants.name);
                if (!img) {
                    return;
                }
                this.map.drawImage(img, ent.position.x + 25, ent.position.y, 20, 20);
            }
        }

        private drawScore(){
            //get element to write in
            let elem = document.getElementById("score");
            if(!elem){
                return;
            }
            elem.innerHTML = "";
            //create text for score
            let p = document.createElement("p");
            p.innerText = `Customer count: ${this.customerCount}, Customer success count: ${this.customerSuccessCount}`;
            elem.appendChild(p);
        }

        private update() {
            if (!this.map) {
                return;
            }
            //clear map
            this.map.clearRect(0, 0, WIDTH, HEIGHT);

            //initialize static map
            this.initMap();

            //draw score
            this.drawScore();
            //console.log("render");
            //loop every entity and call specific update function
            for(let ent of this.entities){
                if(ent instanceof Workplace){
                    this.updateWorkplace(ent);
                }
                if(ent instanceof Storage){
                    this.updateStorage(ent);
                }
                if(ent instanceof Employee ){
                    this.updateEmployee(ent);
                }
                if(ent instanceof Customer ){
                    this.updateCustomer(ent);
                }
                //draw rectangle around currently selected entity
                if(this.selected && ent === this.selected){
                    this.drawSelectedRect(ent);
                }
            }
            //update loop recursion
            requestAnimationFrame(this.update.bind(this));
        }

        private drawSelectedRect(ent: Entity){
            if(!this.map){
                return;
            }
            //draws rectangle around current selected entity
            this.map.strokeStyle = "black";
            this.map.lineWidth = 6;
            this.map.beginPath()
            this.map.rect(ent.position.x-5, ent.position.y-5, 55, 55);
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
                let img = this.imageMap.get(ent.food.name);
                if (!img) {
                    return;
                }
                this.map.drawImage(img, ent.position.x + 5, ent.position.y + 5, 30, 30);

                //percent calculation (.arc function)
                let percentEndArc = (ent.food.has.length / ent.food.requires.length) * Math.PI * 2;
                //console.log("arc",percentEndArc);
                this.map.strokeStyle = "darkgreen";
                this.map.lineWidth = 15;
                this.map.beginPath()
                this.map.arc(ent.position.x+25, ent.position.y+25, 15, percentEndArc === 0 ? 0.1: 0, percentEndArc === 0 ? 0.15: percentEndArc);
                this.map.stroke();
            }
        }

        private updateStorage(ent: Storage) {
            if (!this.map) {
                return;
            }
            //draw storage and corresponding food image
            this.map.fillStyle = "brown";
            this.map.strokeStyle = "brown";
            this.map.beginPath();
            this.map.rect(ent.position.x, ent.position.y, 45, 45);
            let img = this.imageMap.get(ent.contains);
            if (!img) {
                return;
            }
            this.map.drawImage(img, ent.position.x + 5, ent.position.y + 5, 30, 30)
            this.map.lineWidth = 5;
            this.map.stroke();
        }

        private updateUi() {
            //update selection window
            let container = document.getElementById("selected") as HTMLDivElement;
            container.innerHTML = "";
            if(!this.selected){
                return;
            }
            let fieldset = document.createElement("fieldset") as HTMLFieldSetElement;
            let legend = document.createElement("legend");
            fieldset.appendChild(legend);
            //update selection window depending on current selected element
            if(this.selected instanceof Customer){
                legend.innerText = "Customer";
                this.updateSelectedCustomerUi(fieldset);
            }
            if(this.selected instanceof Employee){
                legend.innerText = "Employee";
                this.updateSelectedEmployeeUi(fieldset);
            }
            if(this.selected instanceof Workplace){
                legend.innerText = "Workplace";
                this.updateSelectedWorkplaceUi(fieldset);
            }
            if(this.selected instanceof Storage){
                legend.innerText = "Storage";
                this.updateSelectedStorageUi(fieldset);
            }
            container.appendChild(fieldset);
        }

        private updateSelectedCustomerUi(con: HTMLFieldSetElement){
            //set ui when customer is selected
            const p = document.createElement("p");
            const sel = this.selected as Customer;
            p.innerText = `Customer wants: ${sel.wants.name}`;
            const p2 = document.createElement("p");
            p2.innerText = `Customer mood: ${sel.mood}`;
            con.appendChild(p);
            con.appendChild(p2);
        }

        private updateSelectedEmployeeUi(con: HTMLFieldSetElement){
            //set ui when employee is selected
            const sel = this.selected as Employee;
            if(sel.carries){
                const p = document.createElement("p");
                p.innerText = `Employee carries: ${sel.carries.name}`;
                con.appendChild(p);
            }
            const p2 = document.createElement("p");
            p2.innerText = `Employee mood: ${sel.mood}`;
            con.appendChild(p2);
        }

        private updateSelectedWorkplaceUi(con: HTMLFieldSetElement){
            //set ui when workplace is selected
            const sel = this.selected as Workplace;
            //when workplace has no food, generate select element with every Food
            if(!sel.food){
                const select = document.createElement("select");
                for(let a in FoodNames){
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
            if(sel.food){
                const p = document.createElement("p");
                p.innerText = "Requires:" + sel.food.requires.join(",");
                con.appendChild(p);
            }
        }

        private startProduction(workplace: Workplace, elem: HTMLSelectElement, evt: MouseEvent){
            let selected = elem.value;
            //create food depending on selected value in select element
            switch(selected){
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

        private updateSelectedStorageUi(con: HTMLFieldSetElement){
            //set ui when storage is selected
            const sel = this.selected as Storage;
            const p = document.createElement("p");
            const p2 = document.createElement("p");
            p.innerText = `Storage contains: ${sel.contains}`;
            p2.innerText = `Storage amount left: ${sel.amount}`;
            con.appendChild(p);
            con.appendChild(p2);
        }

        //validate number, returns true when number is valid, otherwise false
        private validateNr(nr: number) {
            return !isNaN(nr) && nr > 0;
        }

        private initMap() {
            //draw static map elements
            this.initHouse();
            this.initCustomerArea();
            this.initEmployeeArea();
            //this.initStorage();
        }

        private initHouse() {
            if (!this.map) {
                return;
            }

            //draw house rect
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
            for (let i = 0; i < 13; i++) {
                let x = 355 + (i * 55);
                let y = 100;
                //let workplace = new Workplace(null, new Vector2(x, y));
                let workplace = new Workplace(null, new Vector2(x, y));
                this.entities.push(workplace);
            }
        }

        private initStorage() {
            if (!this.map || !this.storageMax) {
                return;
            }
            //create storage for every possible Ingredient
            this.map.fillStyle = "brown";
            let i = 0;
            for (let a in IngredientNames) {
                let x = 355 + (i * 55);
                let y = 650;
                i++;
                let stor = new Storage((<{ [key: string]: IngredientNames }>IngredientNames)[a], this.storageMax, new Vector2(x, y));
                this.entities.push(stor);
            }
        }
    }
}


