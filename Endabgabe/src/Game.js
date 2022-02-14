"use strict";
var YufkaSimulator;
(function (YufkaSimulator) {
    //game width
    const WIDTH = 1200;
    //game height
    const HEIGHT = 800;
    //maximum waiting time for customers
    const CUSTOMER_WAITING_TIME_MAX = 10;
    class Game {
        constructor() {
            //canvas 2d context
            this.map = null;
            //maximum storage amount
            this.storageMax = null;
            //employee amount
            this.employees = null;
            //spawn interval for customers
            this.customerSecond = null;
            //employees will be tired after:
            this.tiredSeconds = null;
            //entity list
            this.entities = [];
            //map to store images
            this.imageMap = new Map();
            //current selected entity. null means nothing selected
            this.selected = null;
            //customer spawn interval
            this.custInt = null;
            //customer spawn location (static)
            this.customerSpawn = new YufkaSimulator.Vector2(20, 345);
            //most left coordinate of customer spawn target walk
            this.customerTargetX = 270;
            //x and y borders
            this.customerFromY = 111;
            this.customerToY = 670;
            this.customerCount = 0;
            this.customerSuccessCount = 0;
            console.log("Game loaded..");
            //init canvas from HTML
            this.canvas = document.getElementById("main");
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
        init() {
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
        initClick() {
            //bind left and right click to specific functions
            this.canvas.addEventListener('click', this.leftClick.bind(this));
            this.canvas.addEventListener('contextmenu', this.rightClick.bind(this));
        }
        getClickEntity(x, y) {
            //find entity that is being clicked on
            let vec = new YufkaSimulator.Vector2(x, y);
            let found = null;
            let distFound = null;
            for (let e of this.entities) {
                let dist = vec.distanceTo(e.position);
                //console.log(dist);
                if ((!found && dist <= 50) || (found && distFound && dist <= distFound)) {
                    found = e;
                    distFound = dist;
                }
            }
            //either return entity or null
            return found;
        }
        leftClick(evt) {
            evt.preventDefault();
            //get entity that is clicked on
            let ent = this.getClickEntity(evt.offsetX, evt.offsetY);
            //console.log("left", ent, evt);
            //select entity
            if (ent) {
                this.selected = ent;
            }
            //unselect entity if nothing is hit
            else {
                this.selected = null;
            }
            //update UI because selection changed
            this.updateUi();
        }
        rightClick(evt) {
            evt.preventDefault();
            //find entity that is clicked on
            let ent = this.getClickEntity(evt.offsetX, evt.offsetY);
            //console.log("right", ent, evt);
            //nothing was hit, do nothing
            if (!ent) {
                return;
            }
            //only dispatch action when selected entity is employee and target is not same entity or not Customer/Storage/Workplace
            if (this.selected instanceof YufkaSimulator.Employee && this.selected !== ent && (ent instanceof YufkaSimulator.Customer || ent instanceof YufkaSimulator.Storage || ent instanceof YufkaSimulator.Workplace)) {
                this.actionTo(this.selected, ent);
            }
        }
        actionTo(from, to) {
            //employee to customer right click action
            if (to instanceof YufkaSimulator.Customer || to instanceof YufkaSimulator.Storage || to instanceof YufkaSimulator.Workplace) {
                this.empToAny(from, to);
            }
        }
        empToAny(from, to) {
            if (from.target) {
                return;
            }
            //set target property to target element
            from.target = to;
        }
        initImages() {
            //init images to image map so they can be accessed by string
            for (let a in YufkaSimulator.IngredientNames) {
                let img = new Image();
                img.src = "images/" + YufkaSimulator.IngredientNames[a] + ".png";
                this.imageMap.set(YufkaSimulator.IngredientNames[a], img);
            }
            for (let a in YufkaSimulator.FoodNames) {
                let img = new Image();
                img.src = "images/" + YufkaSimulator.FoodNames[a] + ".png";
                this.imageMap.set(YufkaSimulator.FoodNames[a], img);
            }
            for (let a in YufkaSimulator.Moods) {
                let img = new Image();
                img.src = "images/" + YufkaSimulator.Moods[a] + ".png";
                this.imageMap.set(YufkaSimulator.Moods[a], img);
            }
        }
        initUi() {
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
            customerSpawn.placeholder = "Spawn customer every x seconds";
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
        startGame(empField, cusField, tirField, stoField) {
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
        spawnPeople() {
            //register employee entities
            this.spawnEmployees();
            //register customer entities
            this.spawnCustomers();
        }
        spawnEmployees() {
            if (!this.employees) {
                return;
            }
            //spawn as many employees as defined
            for (let i = 0; i < this.employees; i++) {
                //create initial x with offset
                let x = 350 + (i * 60);
                let y = 400;
                //create entity
                let emp = new YufkaSimulator.Employee(new YufkaSimulator.Vector2(x, y));
                this.entities.push(emp);
            }
        }
        spawnCustomers() {
            if (this.customerSecond) {
                //spawn first customer
                this.spawnCust();
                //register spawn timer
                this.custInt = setInterval(this.spawnCust.bind(this), this.customerSecond * 1000);
            }
        }
        rand(from, to) {
            return Math.floor(Math.random() * (to - from) + from);
        }
        spawnCust() {
            //set customer target location x
            let targetX = this.customerTargetX;
            //set customer random target location y
            let targetY = this.rand(this.customerFromY, this.customerToY);
            //create entity
            let cust = new YufkaSimulator.Customer(this.customerSpawn, new YufkaSimulator.Vector2(targetX, targetY));
            this.entities.push(cust);
            //increase customer count
            this.customerCount++;
        }
        employeeReachedStorage(emp, stor) {
            //employee carries wrong item
            if (emp.carries && emp.carries.name !== stor.contains) {
                console.error("item doesnt belong in here");
                return;
            }
            //employee brings back item
            if (emp.carries && emp.carries.name === stor.contains) {
                stor.amount += 1;
                emp.carries = null;
                return;
            }
            //employee takes item from storage
            if (!emp.carries) {
                let success = stor.take();
                if (success) {
                    emp.carries = new YufkaSimulator.Ingredient(stor.contains);
                }
                //no success: storage is empty
                else {
                    console.error("nothing in storage anymore");
                }
            }
        }
        employeeReachedWorkplace(emp, wp) {
            //employee takes food from workplace
            if (!emp.carries && wp.food) {
                emp.carries = wp.food;
                wp.food = null;
            }
            //employee brings ingredient to workplace
            if (emp.carries && wp.food && emp.carries instanceof YufkaSimulator.Ingredient) {
                let success = wp.food.addIngredient(emp.carries);
                //success: ingredient could be added
                if (success) {
                    emp.carries = null;
                }
                //no success: do nothing
            }
        }
        employeeReachedCustomer(emp, cus) {
            //only allow employee to reach customer when he carries Food
            if (emp.carries && emp.carries instanceof YufkaSimulator.Food) {
                //employee brings wrong food to customer: alotangry
                if (emp.carries.name !== cus.wants.name) {
                    cus.mood = YufkaSimulator.Moods.AlotAngry;
                    emp.carries = null;
                }
                //employee brings right and finished food to customer: happy
                if (emp.carries && emp.carries.name === cus.wants.name && emp.carries.finished) {
                    cus.mood = YufkaSimulator.Moods.Happy;
                    emp.carries = null;
                    //increase score
                    this.customerSuccessCount++;
                }
                //employee brings right food to customer, but food is not finished: alotangry
                if (emp.carries && emp.carries.name === cus.wants.name && !emp.carries.finished) {
                    cus.mood = YufkaSimulator.Moods.AlotAngry;
                    emp.carries = null;
                }
                //set customer to leave after he got something
                cus.status = YufkaSimulator.CustomerStatus.Leaving;
                //target position is door again
                cus.targetPos = this.customerSpawn;
            }
        }
        employeeReachedTarget(emp) {
            //emplyoee reaches Storage
            if (emp.target instanceof YufkaSimulator.Storage) {
                this.employeeReachedStorage(emp, emp.target);
            }
            //employee reaches Workplace
            if (emp.target instanceof YufkaSimulator.Workplace) {
                this.employeeReachedWorkplace(emp, emp.target);
            }
            //employee reaches Customer
            if (emp.target instanceof YufkaSimulator.Customer) {
                this.employeeReachedCustomer(emp, emp.target);
            }
            //when employee reached something, remove target
            emp.target = null;
        }
        updateEmployee(ent) {
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
            if (ent.lastMove.getTime() + 10 * 1000 < new Date().getTime()) {
                ent.mood = YufkaSimulator.Moods.Tired;
            }
            else {
                ent.mood = YufkaSimulator.Moods.Chef;
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
        customerReachedTarget(cus) {
            //when customer reached his target, remove targetPos
            cus.targetPos = null;
            //transition from ComingIn to "Waiting"
            if (cus.status === YufkaSimulator.CustomerStatus.ComingIn) {
                cus.status = YufkaSimulator.CustomerStatus.Waiting;
                cus.waitingSince = new Date();
            }
            //remove customer when he reaches spawn again when Leaving
            else if (cus.status === YufkaSimulator.CustomerStatus.Leaving) {
                let idx = this.entities.findIndex((val) => val === cus);
                if (idx === -1) {
                    return;
                }
                this.entities.splice(idx, 1);
            }
        }
        updateCustomer(ent) {
            if (!this.map) {
                return;
            }
            //update position
            if (ent.targetPos) {
                let dir = ent.position.direction(ent.targetPos);
                ent.position.add(dir, ent.speed);
                let dist = ent.position.distanceTo(ent.targetPos);
                if (dist <= 3) {
                    this.customerReachedTarget(ent);
                }
            }
            //calculate mood depending on waitingSince time
            if (ent.status === YufkaSimulator.CustomerStatus.Waiting && ent.waitingSince && ent.waitingSince.getTime() + (CUSTOMER_WAITING_TIME_MAX * 1000) * 2 < new Date().getTime()) {
                ent.mood = YufkaSimulator.Moods.AlotAngry;
            }
            else if (ent.status === YufkaSimulator.CustomerStatus.Waiting && ent.waitingSince && ent.waitingSince.getTime() + CUSTOMER_WAITING_TIME_MAX * 1000 < new Date().getTime()) {
                ent.mood = YufkaSimulator.Moods.Angry;
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
        drawScore() {
            //get element to write in
            let elem = document.getElementById("score");
            if (!elem) {
                return;
            }
            elem.innerHTML = "";
            //create text for score
            let p = document.createElement("p");
            p.innerText = `Customer count: ${this.customerCount}, Customer success count: ${this.customerSuccessCount}`;
            elem.appendChild(p);
        }
        update() {
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
            for (let ent of this.entities) {
                if (ent instanceof YufkaSimulator.Workplace) {
                    this.updateWorkplace(ent);
                }
                if (ent instanceof YufkaSimulator.Storage) {
                    this.updateStorage(ent);
                }
                if (ent instanceof YufkaSimulator.Employee) {
                    this.updateEmployee(ent);
                }
                if (ent instanceof YufkaSimulator.Customer) {
                    this.updateCustomer(ent);
                }
                //draw rectangle around currently selected entity
                if (this.selected && ent === this.selected) {
                    this.drawSelectedRect(ent);
                }
            }
            //update loop recursion
            requestAnimationFrame(this.update.bind(this));
        }
        drawSelectedRect(ent) {
            if (!this.map) {
                return;
            }
            //draws rectangle around current selected entity
            this.map.strokeStyle = "black";
            this.map.lineWidth = 6;
            this.map.beginPath();
            this.map.rect(ent.position.x - 5, ent.position.y - 5, 55, 55);
            this.map.stroke();
        }
        updateWorkplace(ent) {
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
                this.map.beginPath();
                this.map.arc(ent.position.x + 25, ent.position.y + 25, 15, percentEndArc === 0 ? 0.1 : 0, percentEndArc === 0 ? 0.15 : percentEndArc);
                this.map.stroke();
            }
        }
        updateStorage(ent) {
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
            this.map.drawImage(img, ent.position.x + 5, ent.position.y + 5, 30, 30);
            this.map.lineWidth = 5;
            this.map.stroke();
        }
        updateUi() {
            //update selection window
            let container = document.getElementById("selected");
            container.innerHTML = "";
            if (!this.selected) {
                return;
            }
            let fieldset = document.createElement("fieldset");
            let legend = document.createElement("legend");
            fieldset.appendChild(legend);
            //update selection window depending on current selected element
            if (this.selected instanceof YufkaSimulator.Customer) {
                legend.innerText = "Customer";
                this.updateSelectedCustomerUi(fieldset);
            }
            if (this.selected instanceof YufkaSimulator.Employee) {
                legend.innerText = "Employee";
                this.updateSelectedEmployeeUi(fieldset);
            }
            if (this.selected instanceof YufkaSimulator.Workplace) {
                legend.innerText = "Workplace";
                this.updateSelectedWorkplaceUi(fieldset);
            }
            if (this.selected instanceof YufkaSimulator.Storage) {
                legend.innerText = "Storage";
                this.updateSelectedStorageUi(fieldset);
            }
            container.appendChild(fieldset);
        }
        updateSelectedCustomerUi(con) {
            //set ui when customer is selected
            const p = document.createElement("p");
            const sel = this.selected;
            p.innerText = `Customer wants: ${sel.wants.name}`;
            const p2 = document.createElement("p");
            p2.innerText = `Customer mood: ${sel.mood}`;
            con.appendChild(p);
            con.appendChild(p2);
        }
        updateSelectedEmployeeUi(con) {
            //set ui when employee is selected
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
            //set ui when workplace is selected
            const sel = this.selected;
            //when workplace has no food, generate select element with every Food
            if (!sel.food) {
                const select = document.createElement("select");
                for (let a in YufkaSimulator.FoodNames) {
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
                const p = document.createElement("p");
                p.innerText = "Requires:" + sel.food.requires.join(",");
                con.appendChild(p);
            }
        }
        startProduction(workplace, elem, evt) {
            let selected = elem.value;
            //create food depending on selected value in select element
            switch (selected) {
                case "Doener":
                    workplace.food = new YufkaSimulator.Doener();
                    break;
                case "Yufka":
                    workplace.food = new YufkaSimulator.Yufka();
                    break;
                case "Lahmacun":
                    workplace.food = new YufkaSimulator.Lahmacun();
                    break;
            }
            //update UI, because something changed
            this.updateUi();
        }
        updateSelectedStorageUi(con) {
            //set ui when storage is selected
            const sel = this.selected;
            const p = document.createElement("p");
            const p2 = document.createElement("p");
            p.innerText = `Storage contains: ${sel.contains}`;
            p2.innerText = `Storage amount left: ${sel.amount}`;
            con.appendChild(p);
            con.appendChild(p2);
        }
        //validate number, returns true when number is valid, otherwise false
        validateNr(nr) {
            return !isNaN(nr) && nr > 0;
        }
        initMap() {
            //draw static map elements
            this.initHouse();
            this.initCustomerArea();
            this.initEmployeeArea();
            //this.initStorage();
        }
        initHouse() {
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
        initCustomerArea() {
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
        initEmployeeArea() {
            //kitchen
            if (!this.map) {
                return;
            }
            this.map.fillStyle = "grey";
            this.map.fillRect(350, 100, 715, 50);
        }
        initWorkplaces() {
            if (!this.map) {
                return;
            }
            //create 13 workspaces in kitchen
            this.map.fillStyle = "lightgrey";
            for (let i = 0; i < 13; i++) {
                let x = 355 + (i * 55);
                let y = 100;
                //let workplace = new Workplace(null, new Vector2(x, y));
                let workplace = new YufkaSimulator.Workplace(null, new YufkaSimulator.Vector2(x, y));
                this.entities.push(workplace);
            }
        }
        initStorage() {
            if (!this.map || !this.storageMax) {
                return;
            }
            //create storage for every possible Ingredient
            this.map.fillStyle = "brown";
            let i = 0;
            for (let a in YufkaSimulator.IngredientNames) {
                let x = 355 + (i * 55);
                let y = 650;
                i++;
                let stor = new YufkaSimulator.Storage(YufkaSimulator.IngredientNames[a], this.storageMax, new YufkaSimulator.Vector2(x, y));
                this.entities.push(stor);
            }
        }
    }
    YufkaSimulator.Game = Game;
})(YufkaSimulator || (YufkaSimulator = {}));
//# sourceMappingURL=Game.js.map