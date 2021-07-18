"use strict";
var Endabgabe_SoSe21;
(function (Endabgabe_SoSe21) {
    /**
     * class to handle player ui
     */
    class PlayerUI {
        static draw(player) {
            const playerUi = document.getElementById("current-player");
            if (!playerUi) {
                return;
            }
            playerUi.innerHTML = "";
            if (!player) {
                return;
            }
            // creates table. Ui Helper = Statische Klasse
            const t = Endabgabe_SoSe21.UIHelper.createTable(
            // player name
            Endabgabe_SoSe21.UIHelper.createRow(Endabgabe_SoSe21.UIHelper.createCell(Endabgabe_SoSe21.UIHelper.createSpan("td-player-name-label", "Spielername")), Endabgabe_SoSe21.UIHelper.createCell(Endabgabe_SoSe21.UIHelper.createSpan("td-player-name-value", player.getName()))), 
            // shot power
            Endabgabe_SoSe21.UIHelper.createRow(Endabgabe_SoSe21.UIHelper.createCell(Endabgabe_SoSe21.UIHelper.createSpan("td-shot-strength-label", "Schusskraft")), Endabgabe_SoSe21.UIHelper.createCell(this.createShotStrength(player)), Endabgabe_SoSe21.UIHelper.createCell(Endabgabe_SoSe21.UIHelper.createSpan("td-shot-strength-value", player.getShotPower().toString()))), 
            // precision
            Endabgabe_SoSe21.UIHelper.createRow(Endabgabe_SoSe21.UIHelper.createCell(Endabgabe_SoSe21.UIHelper.createSpan("td-precision-label", "Präzision")), Endabgabe_SoSe21.UIHelper.createCell(this.createPrecision(player)), Endabgabe_SoSe21.UIHelper.createCell(Endabgabe_SoSe21.UIHelper.createSpan("td-precision-value", player.getPrecision().toString()))), 
            // speed
            Endabgabe_SoSe21.UIHelper.createRow(Endabgabe_SoSe21.UIHelper.createCell(Endabgabe_SoSe21.UIHelper.createSpan("td-speed-label", "Geschwindigkeit")), Endabgabe_SoSe21.UIHelper.createCell(this.createSpeed(player)), Endabgabe_SoSe21.UIHelper.createCell(Endabgabe_SoSe21.UIHelper.createSpan("td-speed-value", player.getSpeed().toString()))));
            //Wird ans HTML Table Element angehängt
            playerUi.appendChild(t);
        }
        /**
         * updates ui element by its id
         * id: of the ui element
         * text: displayed string to update
         */
        static updateById(id, text) {
            const el = document.getElementById(id);
            if (!el) {
                return;
            }
            el.innerHTML = text;
        }
        static createRangeInput(min, max, value, cb) {
            const range = document.createElement("input");
            range.setAttribute("type", "range");
            //min and max range of range input
            range.setAttribute("min", min.toString());
            range.setAttribute("max", max.toString());
            //value = current value
            range.setAttribute("value", value);
            // add eventlistener to handle changes to range
            range.addEventListener("change", (event) => {
                const el = event.target;
                //callback to execute on range changes
                cb(el.value);
            });
            //HTMLInputElement
            return range;
        }
        //creates range ui element for shot strength of player
        //player = current player
        static createShotStrength(player) {
            //HTMLInputElement
            return this.createRangeInput(1, 99, player?.getShotPower().toString(), (value) => {
                this.updateById("td-shot-strength-value", value);
                //Die parseInt() Methode liest ein String-Argument ein und gibt eine ganze Zahl im angegebenen Zahlensystem zurück
                player.setShotPower(parseInt(value));
            });
        }
        /**
         * creates range ui element for speed of player
         * player: current player
         * returns a HTMLINputElement
         */
        static createSpeed(player) {
            return this.createRangeInput(1, 99, player?.getSpeed().toString(), (value) => {
                this.updateById("td-speed-value", value);
                player.setSpeed(parseInt(value));
            });
        }
        /**
         * creates range ui element for precision of player
         * player: current player
         * returns HTMLInputElement
         */
        static createPrecision(player) {
            return this.createRangeInput(1, 99, player?.getPrecision().toString(), (value) => {
                this.updateById("td-precision-value", value);
                player.setPrecision(parseInt(value));
            });
        }
    }
    Endabgabe_SoSe21.PlayerUI = PlayerUI;
})(Endabgabe_SoSe21 || (Endabgabe_SoSe21 = {}));
//# sourceMappingURL=player-ui.js.map