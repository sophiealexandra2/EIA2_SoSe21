namespace Endabgabe_SoSe21 {
    // global scaling factor
    export const scale: number = 5;

    /**
     * gets random number between min and max
     */
    export function randomInteger(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    //Die Funktion erstellt eine UUI (Universally unique identifier), also eine Zeichenkette, die nahezu nie doppelt im Code vorkommen sollte. 
    //Damit kann ich letztlich Klasseninstanzen vom Typ Player auseinanderhalten. Könnte man auch über die Trikotnummer, aber die id macht es leichter
    //"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    //Danach werden alle x und y ersetzt
    //.replace(/[xy]/g
    //Dann berechnet man für jeden zu ersetzenden Character eine zufällige Zahl
    //const r: number = Math.random() * 16 | 0, v: number = c == "x" ? r : (r & 0x3 |
    //und man gibt das Ergebnis als Zeichenkette/String zurück

    export function uuidv4(): string {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
            const r: number = Math.random() * 16 | 0, v: number = c == "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Distanz zwischen zwei Spielern - v1 und v2 
     * v1 vector1
     * v2 vector2
     * returns number
     */
    export function distance(v1: Vector, v2: Vector): number {
        //sqrt = returns the square root of a number
        let d: number = Math.sqrt(Math.pow(v2.X - v1.X, 2) +
        //Math.pow = Zweite Zahl sagt an, wie viel mal die erste Zahl mit sich selbst mlutpiliziert wird. Hier der Vector v1.Y und v2.Y
            Math.pow(v2.Y - v1.Y, 2));
        return d;
    }
}