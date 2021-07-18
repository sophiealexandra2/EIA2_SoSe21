"use strict";
// import { GlobalUtils } from "./global";
var Endabgabe_SoSe21;
(function (Endabgabe_SoSe21) {
    // adds event listener which fires on page loaded
    window.addEventListener("load", handleload);
    Endabgabe_SoSe21.canvas = document.querySelector("canvas");
    // default variables
    let ui;
    // whether the animation is executed or not
    let animationIsRunning = false;
    // current time left
    let time = 0;
    let lastTime;
    // Array welches alle beweglichen "movable" objects in der Szene listet, ins leere Array gepushed
    let listOfMoveables = [];
    // instance of field
    let field;
    // instance of ball
    let ball;
    // Maus Position nach Vector
    let mousePos;
    // Array mit Spieler der gerade den Ball hat, wird in das leere Array gepushed
    let currentBallLeaders = [];
    // instance of team-ui
    let teamUi;
    // default configuration how to draw player
    let playerDrawOptions = {
        showActionRadius: false,
        showPlayerOrigin: false
    };
    /**
    * get current mouse position relative to canvas. ev =  Mouseevent
    * Das main-Element hat einen mousemove-EventHandler, der die Position der Maus innerhalb des Divs anzeigt.
    */
    function getMousePosInCanvas(ev) {
        //DOMRect=interface. Beschreibt die Größe und Position eines Rechtecks. 
        /** gibt die Größe eines Elementes und dessen relative Position zum Viewport zurück.
         * Der zurückgegebene Wert ist ein DOMRect Objekt, welches die Vereinigungsmenge aller von getClientRects() zurückgegebenen
         * Rechtecken eines Elementes darstellt, das heißt, der CSS border-boxes, die mit dem Element verknüpft sind.
         * Also dass die Maus/das Spielfeld sich nur innerhalb der 600px klickbar macht und dies dann zum Viewport zurückgibt.
         */
        var rect = Endabgabe_SoSe21.canvas.getBoundingClientRect();
        return new Endabgabe_SoSe21.Vector(
        //ClientX/ClientY: Mauskoordinaten relativ zum Fenster
        (ev.clientX - rect.left) / (rect.right - rect.left) * Endabgabe_SoSe21.canvas.width, (ev.clientY - rect.top) / (rect.bottom - rect.top) * Endabgabe_SoSe21.canvas.height);
    }
    function handleload() {
        // Kreiert einmalig das Spielfeld/Fußballfeld
        field = new Endabgabe_SoSe21.SoccerField();
        // set canvas dimensions handled by scene
        Endabgabe_SoSe21.canvas.width = field.getWidth() + (2 * field.getPadding());
        Endabgabe_SoSe21.canvas.height = field.getHeight() + (2 * field.getPadding());
        if (!Endabgabe_SoSe21.canvas) {
            return;
        }
        // instantiere team-ui 
        teamUi = new Endabgabe_SoSe21.TeamUI();
        // Tastatur Keyboard Event mit Space Taste. Spiel wird dann gestartet.
        //https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
        document.addEventListener("keyup", (e) => {
            // Animationsstart wenn Space gepressed wurde oder der button geklickt wird
            //Für mich: e.code -> e = KeyboardEvent.code
            if (e.code === "Space") {
                startAnimation();
            }
        });
        // toggle player radius
        document.getElementById("toggle-player-radius")?.addEventListener("change", (event) => {
            //
            const el = event.target;
            playerDrawOptions.showActionRadius = el.checked;
        });
        // toggle player origin lines
        //event:Event = Event das im Dom passiert
        document.getElementById("toggle-player-origin")?.addEventListener("change", (event) => {
            //event.target ist nun als typ HTMLInputElement
            const el = event.target;
            playerDrawOptions.showPlayerOrigin = el.checked;
        });
        // catch mousemove events to get current mouse position
        Endabgabe_SoSe21.canvas.addEventListener("mousemove", (e) => {
            mousePos = getMousePosInCanvas(e);
        });
        // ClickEvent im Canvas
        Endabgabe_SoSe21.canvas.addEventListener("click", () => {
            // Nur click handeln wenn ein Spieler am Ball ist/den Ball hat 
            //only handle click if one player has the ball
            if (currentBallLeaders?.length === 0) {
                return;
            }
            // calc new random pos inside precision radius of the player
            //randomInteger = math.random alternative
            //calcPrecisionRadius = funktion weiter unten
            const randomX = Endabgabe_SoSe21.randomInteger(-calcPrecisionRadius(), calcPrecisionRadius());
            const randomY = Endabgabe_SoSe21.randomInteger(-calcPrecisionRadius(), calcPrecisionRadius());
            // update ball speed relative to players shotpower
            ball.setSpeed(currentBallLeaders[0].getShotPower());
            // updates target where the ball should follow
            ball.setTarget(new Endabgabe_SoSe21.Vector(mousePos.X + randomX, mousePos.Y + randomY));
            // restart animation
            startAnimation();
        });
        Endabgabe_SoSe21.ctx = Endabgabe_SoSe21.canvas.getContext("2d");
        // creates instance of general ui:
        //Eine Instanz ist auf der anderen Seite eine Instanz einer Klasse. Diese Instanz ist ein Mitglied der oben genannten Objektmenge. 
        //Zum Beispiel kann Victoria eine Instanz der Employee Klasse sein und somit einen individuellen Mitarbeiter repräsentieren. 
        //Eine Instanz hat genau die selben Eigenschaften wie die Elternklasse (keine mehr und keine weniger).
        ui = new Endabgabe_SoSe21.UI();
        // set default score
        ui.setHomeScore(0);
        ui.setAwayScore(0);
        // starts clock
        startClock();
        // creates game
        createGame();
        // requests frame to update animation
        window.requestAnimationFrame(updateAnimation);
        // handle click on start button to restart animation
        document.getElementById("game-start")?.addEventListener("click", () => {
            startAnimation();
        });
        // redraw team ui
        teamUi.draw(listOfMoveables.filter((l) => l instanceof Endabgabe_SoSe21.Player));
    } //Ende handleLoad
    /**
     * starts independant clock
     */
    function startClock() {
        lastTime = new Date();
        // updates clock every 250 milliseconds
        setInterval(() => {
            if (animationIsRunning) {
                time += new Date().getTime() - (lastTime?.getTime());
            }
            lastTime = new Date();
        }, 250);
    }
    /**
     * resets players and ball to origin or random positions
     * if position of the ball should be randomized
     */
    function reset(randomBallPosition = false) {
        //forEach() method calls a function for each element in the array.
        //https://www.tutorialspoint.com/typescript/typescript_array_foreach.htm
        listOfMoveables.forEach((p) => {
            //p  Object = das zu prüfende Objekt, Player = Gegen die zu testende Funktion. 
            if (p instanceof Endabgabe_SoSe21.Player) {
                if (!randomBallPosition) {
                    // set player position to its origin
                    p.setPosition(new Endabgabe_SoSe21.Vector(p.getOrigin().X, p.getOrigin().Y));
                }
            }
            else if (p instanceof Endabgabe_SoSe21.Ball) {
                // sets ball position
                p.setPosition(new Endabgabe_SoSe21.Vector(randomBallPosition ? Endabgabe_SoSe21.randomInteger(field.getPadding(), field.getPadding() + field.getWidth()) : field.getPadding() + field.getWidth() / 2, randomBallPosition ? Endabgabe_SoSe21.randomInteger(field.getPadding(), field.getPadding() + field.getHeight()) : field.getPadding() + field.getHeight() / 2));
                p.setTarget(new Endabgabe_SoSe21.Vector(p.getPosition().X, p.getPosition().Y));
            }
        });
    }
    /**
     * creates default stuff for the game
     */
    function createGame() {
        listOfMoveables = [];
        // instantiate a ball
        ball = new Endabgabe_SoSe21.Ball(new Endabgabe_SoSe21.Vector(field.getPadding() + (field.getWidth() / 2), field.getPadding() + (field.getHeight() / 2)));
        // creates home
        createHomeTeam();
        // creates away
        createAwayTeam();
        // creates assistance
        createAssistance();
        // add ball to list of movable objects
        listOfMoveables.push(ball);
        // redraw team ui
        teamUi.draw(listOfMoveables.filter((l) => l instanceof Endabgabe_SoSe21.Player));
    }
    /**
     * stops animation by blocking movement and time
     */
    function stopAnimation() {
        animationIsRunning = false;
    }
    //Mit Klick auf Anpfiff oder Leertaste drücken, startet die function
    function startAnimation() {
        animationIsRunning = true;
    }
    /**
     * creates assitance
     */
    function createAssistance() {
        // creates arbitator/Schiedsrichter with random position
        const arbit = new Endabgabe_SoSe21.Arbitrator(new Endabgabe_SoSe21.Vector(Endabgabe_SoSe21.randomInteger(field.getPadding(), field.getPadding() + field.getWidth()), Endabgabe_SoSe21.randomInteger(field.getPadding(), field.getPadding() + field.getHeight())));
        arbit.setColor("black");
        // set low speed of arbitrator
        arbit.setSpeed(60);
        // creates upper linesman
        const linesmanTop = new Endabgabe_SoSe21.Linesman(new Endabgabe_SoSe21.Vector(Endabgabe_SoSe21.randomInteger(field.getPadding(), field.getPadding() + field.getWidth() / 2), field.getPadding()));
        linesmanTop.setColor("pink");
        linesmanTop.setSpeed(80);
        // set target relative to the most left player
        linesmanTop.setTargetFn(() => {
            const x = listOfMoveables.filter((p) => p instanceof Endabgabe_SoSe21.Player && p.isActive()).map((p) => p.getPosition().X);
            return new Endabgabe_SoSe21.Vector(Math.min(...x), linesmanTop.getPosition().Y);
        });
        // creates bootom linesman
        const linesmanBottom = new Endabgabe_SoSe21.Linesman(new Endabgabe_SoSe21.Vector(Endabgabe_SoSe21.randomInteger(field.getPadding() + field.getWidth() / 2, field.getPadding() + field.getWidth()), field.getPadding() + field.getHeight()));
        linesmanBottom.setColor("pink");
        linesmanBottom.setSpeed(80);
        // set target relative to the most right player
        linesmanBottom.setTargetFn(() => {
            const x = listOfMoveables.filter((p) => p instanceof Endabgabe_SoSe21.Player && p.isActive()).map((p) => p.getPosition().X);
            return new Endabgabe_SoSe21.Vector(Math.max(...x), linesmanBottom.getPosition().Y);
        });
        // add assistance to list of movable objects
        listOfMoveables.push(arbit, linesmanBottom, linesmanTop);
    }
    /**
     * creates home team
     * randomize attributes between 30 and 90 as default
     */
    function createHomeTeam() {
        // set team number
        const teamnumber = 1;
        // default player radius
        const defaultPlayerRadius = 2 * Endabgabe_SoSe21.scale;
        // set default team color
        const teamColor = "green";
        // get segements for setting player positions by algorithm
        const segmentY = (field.getHeight() / 4);
        const segmentX = (field.getWidth() / 3);
        // creates goalkeeper
        const tw = new Endabgabe_SoSe21.Player(`Player TW`, new Endabgabe_SoSe21.Vector(field.getPadding(), field.getPadding() + (field.getHeight() / 2)), Endabgabe_SoSe21.randomInteger(30, 90), Endabgabe_SoSe21.randomInteger(30, 90), Endabgabe_SoSe21.randomInteger(30, 90), teamColor, teamnumber, 1);
        // creates defence and midfield
        for (let i = 1; i <= 2; i++) {
            for (let j = 1; j <= 4; j++) {
                const player = new Endabgabe_SoSe21.Player(`Player ${i * j}`, new Endabgabe_SoSe21.Vector(field.getPadding() + ((segmentX * i) - (segmentX / 2)) - defaultPlayerRadius, field.getPadding() + ((segmentY * j) - (segmentY / 2))), Endabgabe_SoSe21.randomInteger(30, 90), Endabgabe_SoSe21.randomInteger(30, 90), Endabgabe_SoSe21.randomInteger(30, 90), teamColor, teamnumber, i * j + 1);
                listOfMoveables.push(player);
            }
        }
        // create offensive players
        const p9 = new Endabgabe_SoSe21.Player(`Player 9`, new Endabgabe_SoSe21.Vector(field.getPadding() + ((segmentX * 3) - (segmentX / 2)), field.getPadding() + ((segmentY * 2) / 2)), Endabgabe_SoSe21.randomInteger(30, 90), Endabgabe_SoSe21.randomInteger(30, 90), Endabgabe_SoSe21.randomInteger(30, 90), teamColor, teamnumber, 10);
        const p10 = new Endabgabe_SoSe21.Player(`Player 10`, new Endabgabe_SoSe21.Vector(field.getPadding() + ((segmentX * 3) - (segmentX / 2)), field.getPadding() + ((segmentY * 4) - (segmentY))), Endabgabe_SoSe21.randomInteger(30, 90), Endabgabe_SoSe21.randomInteger(30, 90), Endabgabe_SoSe21.randomInteger(30, 90), teamColor, teamnumber, 11);
        // creates exaclty six substitutes
        //Der Vorteil von $ ist, dass ich alles an einem Stück schreiben kann und die Konvertierung von Zahlen zu string automatisch passiert.
        for (let i = 0; i < 6; i++) {
            const p = new Endabgabe_SoSe21.Player(`Substitute ${i + 1}`, new Endabgabe_SoSe21.Vector(0, 0), Endabgabe_SoSe21.randomInteger(30, 90), Endabgabe_SoSe21.randomInteger(30, 90), Endabgabe_SoSe21.randomInteger(30, 90), teamColor, teamnumber, 12 + i);
            p.setActive(false);
            listOfMoveables.push(p);
        }
        listOfMoveables.push(tw, p9, p10);
    }
    /**
     * creates away team
     * randomize attributes between 30 and 90 as default
     */
    function createAwayTeam() {
        // set different team number than home
        const teamnumber = 2;
        // default player radius
        const defaultPlayerRadius = 2 * Endabgabe_SoSe21.scale;
        // get segements for setting player positions by algorithm
        const segmentY = (field.getHeight() / 4);
        const segmentX = (field.getWidth() / 3);
        const teamColor = "red";
        // creates goalkeeper
        const tw = new Endabgabe_SoSe21.Player(`Player TW`, new Endabgabe_SoSe21.Vector(field.getPadding() + field.getWidth(), field.getPadding() + (field.getHeight() / 2)), Endabgabe_SoSe21.randomInteger(30, 90), Endabgabe_SoSe21.randomInteger(30, 90), Endabgabe_SoSe21.randomInteger(30, 90), teamColor, teamnumber, 19);
        // creates defensive and midfield players
        for (let i = 1; i <= 2; i++) {
            for (let j = 1; j <= 4; j++) {
                const player = new Endabgabe_SoSe21.Player(`Player ${i * j}`, new Endabgabe_SoSe21.Vector((field.getPadding() + field.getWidth()) - (((segmentX * i) - (segmentX / 2))) + defaultPlayerRadius, (field.getPadding() + field.getHeight()) - (((segmentY * j) - (segmentY / 2)))), Endabgabe_SoSe21.randomInteger(30, 90), Endabgabe_SoSe21.randomInteger(30, 90), Endabgabe_SoSe21.randomInteger(30, 90), teamColor, teamnumber, i * j + 1);
                listOfMoveables.push(player);
            }
        }
        // creates offensive players
        const p9 = new Endabgabe_SoSe21.Player(`Player 9`, new Endabgabe_SoSe21.Vector((field.getPadding() + field.getWidth()) - (((segmentX * 3) - (segmentX / 2))), field.getPadding() + ((segmentY * 2) / 2)), Endabgabe_SoSe21.randomInteger(30, 90), Endabgabe_SoSe21.randomInteger(30, 90), Endabgabe_SoSe21.randomInteger(30, 90), teamColor, teamnumber, 13);
        const p10 = new Endabgabe_SoSe21.Player(`Player 10`, new Endabgabe_SoSe21.Vector((field.getPadding() + field.getWidth()) - (((segmentX * 3) - (segmentX / 2))), field.getPadding() + ((segmentY * 4) - (segmentY))), Endabgabe_SoSe21.randomInteger(30, 90), Endabgabe_SoSe21.randomInteger(30, 90), Endabgabe_SoSe21.randomInteger(30, 90), teamColor, teamnumber, 12);
        // creates exactly six substitutes for players
        for (let i = 0; i < 6; i++) {
            const p = new Endabgabe_SoSe21.Player(`Substitute ${i + 1}`, new Endabgabe_SoSe21.Vector(0, 0), Endabgabe_SoSe21.randomInteger(30, 90), Endabgabe_SoSe21.randomInteger(30, 90), Endabgabe_SoSe21.randomInteger(30, 90), teamColor, teamnumber, 12 + i);
            p.setActive(false);
            listOfMoveables.push(p);
        }
        listOfMoveables.push(tw, p9, p10);
    }
    /**
     * updates animation on each frame
     */
    function updateAnimation() {
        // Malt das Spielfeld nochmal
        field.draw();
        //Nesting if's : https://www.tutorialgateway.org/javascript-nested-if/
        // if no one has the ball clear the players ui
        if (currentBallLeaders.length === 0) {
            Endabgabe_SoSe21.PlayerUI.draw(null);
        }
        // iterates over all moveable objects and animates them. Klasse von der Instanz listofMovables
        for (let movable of listOfMoveables) {
            // if linesman
            if (movable instanceof Endabgabe_SoSe21.Linesman) {
                // move only if animation is running
                if (animationIsRunning) {
                    movable.move(movable.getTargetFn());
                }
                movable.draw();
                // if arbitrator  
            }
            else if (movable instanceof Endabgabe_SoSe21.Arbitrator) {
                // move only if animation is running
                if (animationIsRunning) {
                    if (Endabgabe_SoSe21.randomInteger(0, 100) > 95) {
                        movable.setTarget(new Endabgabe_SoSe21.Vector(Endabgabe_SoSe21.randomInteger(field.getPadding(), field.getPadding() + field.getWidth()), Endabgabe_SoSe21.randomInteger(field.getPadding(), field.getPadding() + field.getHeight())));
                    }
                    movable.move(movable.getTarget());
                }
                movable.draw();
                // if ball
            }
            else if (movable instanceof Endabgabe_SoSe21.Ball) {
                // if ball has a target and animation is running, move ball
                if (ball.getTarget() && animationIsRunning) {
                    // get distance between ball and balls target
                    const d = Endabgabe_SoSe21.distance(movable.getPosition(), ball.getTarget());
                    // if ball is not at target, move it
                    if (d > 0) {
                        movable.move(ball.getTarget());
                        // if ball is in right goal
                        if (field.isAwayGoal(movable)) {
                            // upadte score for home team
                            ui.setHomeScore(ui.getHomeScore() + 1);
                            stopAnimation();
                            // reset positions to default
                            reset();
                            // if ball is in left goal
                        }
                        else if (field.isHomeGoal(movable)) {
                            // update score for away team
                            ui.setAwayScore(ui.getAwayScore() + 1);
                            stopAnimation();
                            // reset positions to default
                            reset();
                            // if ball is out of bounds
                        }
                        else if (field.isOutOfBounds(movable)) {
                            stopAnimation();
                            // reset positions and randomize ball to simulate throw in
                            reset(true);
                        }
                    }
                }
                // draw ball
                movable.draw();
                // if player
            }
            else if (movable instanceof Endabgabe_SoSe21.Player) {
                // calc distance between player and ball (subtract radius of both for real collision detection)
                const d = Endabgabe_SoSe21.distance(movable.getPosition(), ball.getPosition()) - movable.getRadius() - ball.getRadius();
                const p = movable;
                // check if current player is on of the surrounding players 
                //Arrow-Funktionen sind anonyme Funktionen: Ihr Name ist ein leerer String. Nach dem Arrow folgt die expression
                //BEISPIEL let func = (arg1, arg2, ..., argN) => expression
                //ODER: let func = function(arg1, arg2, ..., argN) {
                //return expression;
                //}; ....... https://javascript.info/arrow-functions-basics
                //Die Methode findIndex() gibt den Index des ersten Elements im Array zurück, das die bereitgestellte Testfunktion erfüllt.
                const isBallLeader = currentBallLeaders.findIndex((l) => l.getId() === p.getId());
                // if player is one of the surrounding players remove it from the list so the player can again get the ball
                //D = Distance kleiner als 0 und kleiner gleich 0 bei BallLeader
                if (isBallLeader >= 0 && d > 0) {
                    currentBallLeaders.splice(isBallLeader);
                    // if distance to ball is lesser than 0 and player is not one of the surrounding players, 
                    // now the player will become part of the surrounding players
                }
                if (d <= 0 && isBallLeader === -1) {
                    // check if the current player isn't the ball leading player
                    if (!(currentBallLeaders.length > 0 && movable?.getId() === currentBallLeaders[0].getId())) {
                        // set player as surrounding player
                        currentBallLeaders.push(movable);
                        // redraw player ui
                        Endabgabe_SoSe21.PlayerUI.draw(movable);
                    }
                    // stops animation
                    stopAnimation();
                    // if distance is smaller than action radius, move player to ball
                }
                else if (d <= movable.getActionRadius() && animationIsRunning) {
                    // move player to current ball position
                    movable.move(ball.getPosition());
                }
                else if (animationIsRunning) {
                    // move player to its original position
                    movable.move(movable.getOrigin());
                }
                // draw only if player is on field (isActive()==true) otherwise ignore (isActive()==fale)
                if (movable.isActive()) {
                    movable.draw(playerDrawOptions);
                }
            }
            // draw circle to show precision radius of ball leading player
            if (mousePos && currentBallLeaders?.length > 0) {
                mousePos.draw("red", calcPrecisionRadius());
            }
            // draws little blue dot to mark balls target
            if (ball.getTarget()) {
                ball.getTarget().draw("blue");
            }
        }
        // redraw ui for clock
        ui.draw(time);
        // requests next frame
        window.requestAnimationFrame(updateAnimation);
    }
    /**
     * calculates precision radius
     */
    function calcPrecisionRadius() {
        // calculates precision by deviding distance of ball to mouse
        const additionalPrecision = (Endabgabe_SoSe21.distance(mousePos, ball.getPosition()) / 100);
        // combine precision factors
        return ((10.5 - (currentBallLeaders[0].getPrecision() / 10)) + additionalPrecision) * Endabgabe_SoSe21.scale;
    }
})(Endabgabe_SoSe21 || (Endabgabe_SoSe21 = {})); //End Namespace
//# sourceMappingURL=main.js.map