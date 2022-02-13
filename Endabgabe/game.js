"use strict";
/*
Aufgabe: EIA II Endabgabe | Döner Simulation
Spielname: Vegan Döner
Name: Sophie Heuvels
Matrikel: 266237
Datum: 01.02.2022
*/
var vegandoenerSimulator;
(function (vegandoenerSimulator) {
    const width = 1200;
    const height = 800;
    const CUSTOMER_WAITING_TIME_MAX = 10;
    class Game {
        constructor() {
            this.storageMax = null;
            this.employees = null;
            this.customerSecond = null;
            this.tiredSeconds = null;
            //Array mit allen Entitäten gelistet
            this.entities = [];
            //Wenn eine Entity gewählt wird, null für dass nix selektiert wurde, greift aufs Array zu
            this.selected = null;
            this.custInt = null;
            //Hier pack ich nachher die Bilder rein, bessere alternative als so viele divs reinzupacken und pngs zu laden
            this.imageMap = new Map();
            this.customerCount = 0;
            this.customerSuccessCount = 0;
            this.customerSpawn = new vegandoenerSimulator.Vector2(20, 345);
            this.customerTargetX = 270;
            this.customerFromY = 111;
            this.customerToY = 200;
            console.log("Game loaded");
            //initalise canvas from html
            this.canvas = document.getElementById("main");
            console.log(this.canvas);
            this.map = this.canvas.getContext("2d");
            console.log(this.map);
            this.canvas.width = width;
            this.canvas.height = height;
            this.init();
        }
        //mein grundgerüst für alles
        init() {
            console.log("initalise UI");
            this.initUi();
            //initialize images
            this.initImages();
            //to initialize map (statisch)
            this.initMap();
            //for click event
            this.initClick();
        }
        initClick() {
            //bind left and right click to specific functions
            this.canvas.addEventListener("click", this.leftClick.bind(this));
            this.canvas.addEventListener("contectmenu", this.rightClick.bind(this));
        }
        getClickEntity(x, y) {
            //finde entität die geklickt wurde
            let vec = new vegandoenerSimulator.Vector2(x, y);
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
        leftClick(evt) {
            evt.preventDefault();
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
        rightClick(evt) {
            evt.preventDefault();
            let ent = this.getClickEntity(evt.offsetX, evt.offsetY);
            console.log("left", ent, evt);
            if (!ent) {
                return;
            }
            if (this.selected instanceof vegandoenerSimulator.Employee && this.selected !== ent && (ent instanceof vegandoenerSimulator.Customer || ent instanceof vegandoenerSimulator.Storage || ent instanceof vegandoenerSimulator.Workplace)) {
                this.actionTo(this.selected, ent);
            }
        }
        initUi() {
            let parent = document.getElementById("start");
            if (!parent) {
                console.error("UI not found :(");
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
            startBtn.addEventListener("click", this.startGame.bind(this, employeeField, customerSpawn, tiredSeconds, storageAmount));
            //append kreierte elemente zu den bereits existierenden parent elementen
            parent.appendChild(employeeField);
            parent.appendChild(customerSpawn);
            parent.appendChild(tiredSeconds);
            parent.appendChild(storageAmount);
            parent.appendChild(startBtn);
        }
        startGame(empField, cusField, tirField, stoField) {
            let employees = Number(empField.value);
            let customerSecond = Number(cusField.value);
            let tiredSeconds = Number(tirField.value);
            let storageAmount = Number(stoField.value);
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
            //Funktionen für später, fügt entities zu entity list hinzu
            this.initWorkplace();
            this.initStorage();
            this.spawnPeople();
            //start render loop
            requestAnimationFrame(this.update.bind(this));
        }
        //Spawn funktion für später
        spawnPeople() {
            this.spawnEmployees();
            this.spawnCustomers();
        }
        spawnEmployees() {
            if (!this.employees) {
                return;
            }
            //spawne so viele employees wie vorher defined
            for (let i = 0; i < this.employees; i++) {
                let x = 350 + (i + 60);
                let y = 400;
                //kreiere hier einen neuen Employee also eine Entität
                let emp = new vegandoenerSimulator.Employee(new vegandoenerSimulator.Vector2(x, y));
                this.entities.push(emp);
            }
        }
        spawnCustomers() {
            if (this.customerSecond) {
                this.spawnCust();
                //registriere spawn timer, damit ich später die mood berechnen kann
                this.custInt = setInterval(this.spawnCust.bind(this), this.customerSecond * 1000);
            }
        }
        spawnCust() {
            let targetX = this.customerTargetX;
            let targetY = this.rand(this.customerFromY, this.customerToY);
            let cust = new vegandoenerSimulator.Customer(this.customerSpawn, new vegandoenerSimulator.Vector2(targetX, targetY));
            this.entities.push(cust);
            this.customerCount++;
        }
        //erstellt eine random zahl zwischen den beiden parametern die ich reingebe
        rand(from, to) {
            return Math.floor(Math.random() * (to - from) + from);
        }
        validateNr(nr) {
            return !isNaN(nr) && nr > 0;
        }
        employeeReachedStorage(emp, stor) {
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
                    emp.carries = new vegandoenerSimulator.Ingredient(stor.contains);
                }
                else {
                    console.error("nothing in storage anymore");
                }
            }
        }
        employeeReachedWorkplace(emp, wp) {
            if (!emp.carries && wp.food) {
                emp.carries = wp.food;
                wp.food = null;
            }
            if (emp.carries && wp.food && emp.carries instanceof vegandoenerSimulator.Ingredient) {
                let success = wp.food.addIngredient(emp.carries);
                if (success) {
                    emp.carries = null;
                }
                //no success = do nothing
            }
        }
        employeeReachedCustomer(emp, cus) {
            //erlaube dem employee nur zum customer zu gehen wenn er auch essen dabei hat
            if (emp.carries && emp.carries instanceof vegandoenerSimulator.Food) {
                if (emp.carries.name !== cus.wants.name) {
                    cus.mood = vegandoenerSimulator.Moods.AlotAngry;
                    emp.carries = null;
                }
                //wenn employee das richtige und fertige essen zum customer bringt
                if (emp.carries && emp.carries.name === cus.wants.name && emp.carries.finished) {
                    cus.mood = vegandoenerSimulator.Moods.Happy;
                    emp.carries = null;
                    //increase score stat
                    this.customerSuccessCount++;
                }
                //wenn employee zwar das richtige Essen bring aber es nicht fertig ist
                if (emp.carries && emp.carries.name === cus.wants.name && !emp.carries.finished) {
                    cus.mood = vegandoenerSimulator.Moods.AlotAngry;
                    emp.carries = null;
                }
                //customer geht zurück zur Tür, dort wo er gespawned wurde (statischer Vektor)
                cus.status = vegandoenerSimulator.customerStatus.Leaving;
                cus.targetPos = this.customerSpawn;
            }
        }
        employeeReachedTarget(emp) {
            //wenn employee das Storage erreicht/das Lager war
            if (emp.target instanceof vegandoenerSimulator.Storage) {
                this.employeeReachedStorage(emp, emp.target);
            }
            if (emp.target instanceof vegandoenerSimulator.Workplace) {
                this.employeeReachedWorkplace(emp, emp.target);
            }
            if (emp.target instanceof vegandoenerSimulator.Customer) {
                this.employeeReachedCustomer(emp, emp.target);
            }
            //wenn er irgendwas davon erreicht, remove target
            emp.target = null;
        }
        updateEmployee(ent) {
            if (ent.target) {
                let dir = ent.position.direction(ent.target.position);
                ent.position.add(dir, ent.speed);
                ent.lastMove = new Date();
                let dist = ent.position.distanceTo(ent.target.position);
                if (dist <= 15) {
                    this.employeeReachedTarget(ent);
                }
            }
            if (ent.lastMove.getTime() + 10 * 1000 < new Date().getTime()) {
                ent.mood = vegandoenerSimulator.Moods.Tired;
            }
            else {
                ent.mood = vegandoenerSimulator.Moods.Chef;
            }
            let img = this.imageMap.get(ent.mood);
            this.map.fillStyle = "lightgrey";
            this.map.drawImage(img, ent.position.x, ent.position.y, 45, 45);
            if (ent.carries) {
                let img = this.imageMap.get(ent.carries.name);
                this.map.drawImage(img, ent.position.x + 25, ent.position.y, 20, 20);
            }
        }
        customerReachedTarget(cus) {
            cus.targetPos = null;
            if (cus.status === vegandoenerSimulator.customerStatus.ComingIn) {
                cus.status = vegandoenerSimulator.customerStatus.Waiting;
                cus.waitingSince = new Date();
            }
            else if (cus.status === vegandoenerSimulator.customerStatus.Leaving) {
                let idx = this.entities.findIndex((val) => val === cus);
                if (idx === -1) {
                    return;
                }
                this.entities.splice(idx, 1);
            }
        }
        updateCustomer(ent) {
            if (ent.targetPos) {
                let dir = ent.position.direction(ent.targetPos);
                ent.position.add(dir, ent.speed);
                let dist = ent.position.distanceTo(ent.targetPos);
                if (dist <= 3) {
                    this.customerReachedTarget(ent);
                }
            }
            if (ent.status === vegandoenerSimulator.customerStatus.Waiting && ent.waitingSince && ent.waitingSince.getTime() + (CUSTOMER_WAITING_TIME_MAX * 1000) * 2 < new Date().getTime()) {
                ent.mood = vegandoenerSimulator.Moods.AlotAngry;
            }
            else if (ent.status === vegandoenerSimulator.customerStatus.Waiting && ent.waitingSince && ent.waitingSince.getTime() + CUSTOMER_WAITING_TIME_MAX * 1000 < new Date().getTime()) {
                ent.mood = vegandoenerSimulator.Moods.Angry;
            }
            //draw customer, mood = img
            this.map.fillStyle = "lightgrey";
            let img = this.imageMap.get(ent.mood);
            this.map.drawImage(img, ent.position.x, ent.position.y, 45, 45);
            if (ent.wants) {
                let img = this.imageMap.get(ent.wants.name);
                this.map.drawImage(img, ent.position.x + 25, ent.position.y, 20, 20);
            }
        }
        drawScore() {
            let elem = document.getElementById("score");
            elem.innerHTML = "";
            let p = document.createElement("p");
            p.innerText = `Customer Count: ${this.customerCount}, Customer success count: ${this.customerSuccessCount}`;
            elem.appendChild(p);
        }
        update() {
            if (!this.map) {
                return;
            }
            this.map.clearRect(0, 0, width, height);
            this.initMap();
            this.drawScore();
            for (let ent of this.entities) {
                if (ent instanceof vegandoenerSimulator.Workplace) {
                    this.updateWorkplace(ent);
                }
                if (ent instanceof vegandoenerSimulator.Storage) {
                    this.updateStorage(ent);
                }
                if (ent instanceof vegandoenerSimulator.Employee) {
                    this.updateEmployee(ent);
                }
                if (ent instanceof vegandoenerSimulator.Customer) {
                    this.updateCustomer(ent);
                }
                if (this.selected && ent === this.selected) {
                    this.drawSelectedRect(ent);
                }
            }
            requestAnimationFrame(this.update.bind(this));
        }
        drawSelectedRect(ent) {
            this.map.strokeStyle = "black";
            this.map.lineWidth = 6;
            this.map.beginPath();
            this.map.rect(ent.position.x - 5, ent.position.y - 5, 55, 55);
            this.map.stroke();
        }
        updateWorkplace(ent) {
            this.map.fillStyle = "lightgrey";
            this.map.fillRect(ent.position.x, ent.position.y, 45, 45);
            if (ent.food) {
                let img = this.imageMap.get(ent.food.name);
                if (!img) {
                    return;
                }
                this.map.drawImage(img, ent.position.x + 5, ent.position.y + 5, 30, 30);
                let percentEndArc = (ent.food.has.length / ent.food.requires.length) * Math.PI * 2;
                this.map.strokeStyle = "darkred";
                this.map.lineWidth = 15;
                this.map.beginPath();
                this.map.arc(ent.position.x + 25, ent.position.y + 25, 15, percentEndArc === 0 ? 0.1 : 0, percentEndArc === 0 ? 0.15 : percentEndArc);
                this.map.stroke();
            }
        }
        updateStorage(ent) {
            this.map.fillStyle = "brown";
            this.map.strokeStyle = "brown";
            this.map.beginPath();
            this.map.rect(ent.position.x, ent.position.y, 45, 45);
            let img = this.imageMap.get(ent.contains);
            this.map.drawImage(img, ent.position.x + 5, ent.position.y + 5, 30, 30);
            this.map.lineWidth = 5;
            this.map.stroke();
        }
        updateUi() {
            let container = document.getElementById("selected");
            container.innerHTML = "";
            let fieldset = document.createElement("fieldset");
            let legend = document.createElement("legend");
            fieldset.appendChild(legend);
            if (this.selected instanceof vegandoenerSimulator.Customer) {
                legend.innerText = "Customer";
                this.updatedSelectedCustomerUi(fieldset);
            }
            if (this.selected instanceof vegandoenerSimulator.Employee) {
                legend.innerText = "Employee";
                this.updateSelectedEmployeeUi(fieldset);
            }
            if (this.selected instanceof vegandoenerSimulator.Workplace) {
                legend.innerText = "Workplace";
                this.updateSelectedWorkplaceUi(fieldset);
            }
            if (this.selected instanceof vegandoenerSimulator.Storage) {
                legend.innerText = "Storage";
                this.updateSelectedStorageUi(fieldset);
            }
            container.appendChild(fieldset);
        }
        updatedSelectedCustomerUi(con) {
            const p = document.createElement("p");
            const sel = this.selected;
            p.innerText = `Customer wants: ${sel.wants.name}`;
            const p2 = document.createElement("p");
            p2.innerText = `Customer mood: ${sel.mood}`;
            con.appendChild(p);
            con.appendChild(p2);
        }
        updateSelectedEmployeeUi(con) {
            //on click: show this ui of employee that is selected
            const sel = this.selected;
            if (sel.carries) {
                const p = document.createElement("p");
                p.innerText = `Employee carries: ${sel.carries.name}`;
                con.appendChild(p);
            }
            const p2 = document.createElement("p");
            p2.innerText = `Employee mood: ${sel.mood}`;
            con.appendChild(p2);
        }
        updateSelectedWorkplaceUi(con) {
            const sel = this.selected;
            if (!sel.food) {
                const select = document.createElement("select");
                for (let a in vegandoenerSimulator.FoodNames) {
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
            if (sel.food) {
                const p = document.createElement("p");
                p.innerText = "Requires:" + sel.food.requires.join(",");
                con.appendChild(p);
            }
        }
        updateSelectedStorageUi(con) {
            const sel = this.selected;
            const p = document.createElement("p");
            const p2 = document.createElement("p");
            p.innerText = `Storage contains: ${sel.contains}`;
            p2.innerText = `Storage amount left: ${sel.amount}`;
            con.appendChild(p);
            con.appendChild(p2);
        }
        startProduction(workplace, elem, evt) {
            let selected = elem.value;
            switch (selected) {
                case "Doener":
                    workplace.food = new vegandoenerSimulator.Doener();
                    break;
                case "Yufka":
                    workplace.food = new vegandoenerSimulator.Yufka();
                    break;
                case "Lahmacun":
                    workplace.food = new vegandoenerSimulator.Lahmacun();
                    break;
            }
            this.updateUi();
        }
        actionTo(from, to) {
            if (to instanceof vegandoenerSimulator.Customer || to instanceof vegandoenerSimulator.Storage || to instanceof vegandoenerSimulator.Workplace) {
                this.empToAny(from, to);
            }
        }
        empToAny(from, to) {
            if (from.target) {
                return;
            }
            from.target = to;
        }
        initWorkplace() {
            if (!this.map) {
                return;
            }
            this.map.fillStyle = "lightgrey";
            for (let i = 0; i < 13; i++) {
                let x = 355 + (i * 55);
                let y = 100;
                let workplace = new vegandoenerSimulator.Workplace(null, new vegandoenerSimulator.Vector2(x, y));
                this.entities.push(workplace);
            }
        }
        initStorage() {
            if (!this.map || !this.storageMax) {
                return;
            }
            this.map.fillStyle = "brown";
            let i = 0;
            for (let a in vegandoenerSimulator.IngredientNames) {
                let x = 355 + (i * 55);
                let y = 650;
                i++;
                let stor = new vegandoenerSimulator.Storage(vegandoenerSimulator.IngredientNames[a], this.storageMax, new vegandoenerSimulator.Vector2(x, y));
                this.entities.push(stor);
            }
        }
        initHouse() {
            if (!this.map) {
                return;
            }
            this.map.strokeStyle = "brown";
            this.map.lineWidth = 3;
            this.map.beginPath();
            this.map.rect(50, 100, width - 50 * 2, height - 100 * 2);
            this.map.stroke();
            this.map.fillStyle = "#ffffff";
        }
        initMap() {
            //hier male ich die statischen Dinge/map Elements
            this.initHouse();
            this.initCustomerArea;
            this.initEmployeeArea;
        }
        initImages() {
            for (let a in vegandoenerSimulator.IngredientNames) {
                let img = new Image();
                img.src = "images/" + (vegandoenerSimulator.IngredientNames[a] + ".png");
                this.imageMap.set(vegandoenerSimulator.IngredientNames[a], img);
            }
            for (let a in vegandoenerSimulator.FoodNames) {
                let img = new Image();
                img.src = "images/" + (vegandoenerSimulator.FoodNames[a] + ".png");
                this.imageMap.set(vegandoenerSimulator.FoodNames[a], img);
            }
            for (let a in vegandoenerSimulator.Moods) {
                let img = new Image();
                img.src = "images/" + (vegandoenerSimulator.Moods[a] + ".png");
                this.imageMap.set(vegandoenerSimulator.Moods[a], img);
            }
        }
        initCustomerArea() {
            if (!this.map) {
                return;
            }
            //draw door
            this.map.fillRect(45, height / 2 - 100, 20, 200);
            //theke
            this.map.fillStyle = "pink";
            this.map.fillRect(300, 100, 30, height - 100 * 2);
            //table
            this.map.beginPath();
            this.map.arc(150, 250, 50, 0, 2 * Math.PI);
            this.map.fill();
            //table 2
            this.map.beginPath();
            this.map.arc(130, 600, 50, 0, 2 * Math.PI);
            this.map.fill();
        }
        initEmployeeArea() {
            if (!this.map) {
                return;
            }
            this.map.fillStyle = "grey";
            this.map.fillRect(350, 100, 715, 50);
        }
    }
    vegandoenerSimulator.Game = Game;
})(vegandoenerSimulator || (vegandoenerSimulator = {}));
//# sourceMappingURL=game.js.map