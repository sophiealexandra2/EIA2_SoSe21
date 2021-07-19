namespace Endabgabe_SoSe21 {
    //optionale Anzeige von Radien um den Spieler herum und die Original Position des Spielers
    export interface IPlayerDrawOptions {
        showActionRadius: boolean;
        showPlayerOrigin: boolean;
    }


    //Player: Kindklasse Movable: Elternklasse. Klasse to handle player
    export class Player extends Movable {
        // default speed level welches mit speed skaliert wird
        protected speedLevel: number = 2;

        // color
        protected color: string;

        // speed 1 to 99
        protected speed: number = 80;

        // precision 1 to 99
        protected precision: number = 20;
        // Starplatz bzw. origin von einem Spieler
        private origin: Vector = new Vector(0, 0);

        // Id für einen Spieler für die Identifikation
        private id: string = uuidv4();

        // Action radius
        private actionRadius: number = 30;

        // tricot number
        private tricotNumber: number;

        // team number
        private team: number;

        // name of the player
        private name: string;

        // Ob der Spieler active auf dem Spielfeld ist oder in substitution
        private active: boolean;

        // shot power
        private shotPower: number = 100;

        // Ob der Spieler gehighlighted ist oder nicht
        private highlighted: boolean;

        //constructor für meine Spieler und alles was sie benötigen, um ordentlich zu spielen
        constructor(name: string, _position: Vector, shotPower: number = 70, precision: number = 70, speed: number = 80, color: string = "red", team: number = 0, trikotNumer: number = 0) {
            super(
                new Vector(_position.X, _position.Y)
            );
            this.shotPower = shotPower;
            this.precision = precision;
            this.speed = speed;
            this.color = color;
            this.team = team;
            this.active = true;
            this.tricotNumber = trikotNumer;
            this.radius = 2;


            this.setName(name);
            //neue Instanz
            this.origin = new Vector(_position.X, _position.Y);
        }
            //getters -> access properties in an object. A getter is also called an accessor.
            //setters -> change them, updates the property’s value. A setter is also known as a mutator.
        /**
         * get tricot number
         * Reminder für mich: this referenziert das globale Objekt, in diesem fall window da wir kein 
         */
        public getTricotNumber(): number {
            return this.tricotNumber;
        
        }

        /**
         * set tricot number
         */
        public setTricotNumber(tricotNumber: number): void {
            this.tricotNumber = tricotNumber;
        }

        /**
         * Ob der Spieler auf dem Feld ist oder nicht bzw. active oder nicht
         */
        public isActive(): boolean {
            return this.active;
        }

        /**
         * spieler als active
         * active: true or false
         */
        public setActive(active: boolean): void {
            this.active = active;
        }
        //Erinnerung für mich: getTeam hat Parameter von number und returned this.team (teamnumber), 

        public getTeam(): number {
            return this.team;
        }

        public setTeam(team: number): void {
            this.team = team;
        }

        public getColor(): string {
            return this.color;
        }

        public setColor(color: string): void {
            this.color = color;
        }

        public setShotPower(power: number): void {
            this.shotPower = power;
        }

        public setPrecision(prec: number): void {
            this.precision = prec;
        }

        public getPrecision(): number {
            return this.precision;
        }

        public getShotPower(): number {
            return this.shotPower;
        }

        public getId(): string {
            return this.id;
        }

        public getName(): string {
            return this.name;
        }

        public setName(name: string): void {
            this.name = name;
        }

        public getActionRadius(): number {
            return this.actionRadius * scale;
        }

        public getOrigin(): Vector {
            return this.origin;
        }

        public setOrigin(origin: Vector): void {
            this.origin = origin;
        }

        public highlight(): void {
            this.highlighted = true;
        }

        public dehighlight(): void {
            this.highlighted = false;
        }

        public isHighlighted(): boolean {
            return this.highlighted;
        }

        //Optionale Sache: Ob man den ActionRadius oder die Distanz zum Ausgangspunkt anzeigen lässt.
        public draw(options: IPlayerDrawOptions = {
            showActionRadius: true,
            showPlayerOrigin: true
        }): void {
            ctx.save();

            // Player center wird gemalt
            ctx.beginPath();
            ctx.arc(this.position.X, this.position.Y, this.isHighlighted() ? this.getRadius() * 1.5 : this.getRadius(), 0, 2 * Math.PI, false);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.lineWidth = this.isHighlighted() ? 2 : 1;
            ctx.strokeStyle = "#003300";
            ctx.stroke();
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillStyle = "white";  
            ctx.fillText(this.getTricotNumber().toString(), this.position.X, this.position.Y);


            // Action Radius wird gemalt
            //!== Ungleichheit: Liefert den Wert true, wenn die Werte auf der linken und rechten Seite unterschiedlich sind.
            if (typeof options.showActionRadius !== "boolean" || options.showActionRadius) {
                //Returns true/false with typeof. Der typeof Operator gibt einen String zurück, der den Typ des unausgewerteten Operanden beschreibt.
                ctx.beginPath();
                ctx.arc(this.position.X, this.position.Y, this.getActionRadius(), 0, 2 * Math.PI, false);
                ctx.lineWidth = 1;
                ctx.strokeStyle = "#6D6D6D";
                ctx.stroke();
            }

            // Line zur Original/Startstelle
            if (typeof options.showPlayerOrigin !== "boolean" || options.showPlayerOrigin) {
                //https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/typeof
                ctx.beginPath();
                ctx.moveTo(this.position.X, this.position.Y);
                ctx.lineTo(this.getOrigin().X, this.getOrigin().Y);
                ctx.lineWidth = 1;
                ctx.strokeStyle = "#green";
                ctx.stroke();
            }

            ctx.restore();
        }

        getPosition(): Vector {
            return this.position;
        }
    
    }
}
console.log(this);
