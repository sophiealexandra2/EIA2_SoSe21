"use strict";
var Endabgabe_SoSe21;
(function (Endabgabe_SoSe21) {
    // global scaling factor
    Endabgabe_SoSe21.scale = 5;
    /**
     * gets random number between min and max
     */
    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    Endabgabe_SoSe21.randomInteger = randomInteger;
    //Die Funktion erstellt eine UUI (Universally unique identifier), also eine Zeichenkette, die nahezu nie doppelt im Code vorkommen sollte. 
    //Damit kann ich letztlich Klasseninstanzen vom Typ Player auseinanderhalten. Könnte man auch über die Trikotnummer, aber die id macht es leichter
    //"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    //Danach werden alle x und y ersetzt
    //.replace(/[xy]/g
    //Dann berechnet man für jeden zu ersetzenden Character eine zufällige Zahl
    //const r: number = Math.random() * 16 | 0, v: number = c == "x" ? r : (r & 0x3 |
    //und man gibt das Ergebnis als Zeichenkette/String zurück
    function uuidv4() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    Endabgabe_SoSe21.uuidv4 = uuidv4;
    /**
     * Distanz zwischen zwei Spielern - v1 und v2
     * v1 vector1
     * v2 vector2
     * returns number
     */
    function distance(v1, v2) {
        //sqrt = returns the square root of a number
        let d = Math.sqrt(Math.pow(v2.X - v1.X, 2) +
            //Math.pow = Zweite Zahl sagt an, wie viel mal die erste Zahl mit sich selbst mlutpiliziert wird. Hier der Vector v1.Y und v2.Y
            Math.pow(v2.Y - v1.Y, 2));
        return d;
    }
    Endabgabe_SoSe21.distance = distance;
})(Endabgabe_SoSe21 || (Endabgabe_SoSe21 = {}));
//# sourceMappingURL=global.js.map