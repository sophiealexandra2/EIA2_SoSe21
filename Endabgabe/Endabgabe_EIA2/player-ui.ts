namespace Endabgabe_SoSe21 {
    /**
     * class to handle player ui
     */
    export class PlayerUI {
        public static draw(player: Player | null): void {
            const playerUi: HTMLElement | null = document.getElementById("current-player");
            if (!playerUi) { return; }

            playerUi.innerHTML = "";
            if (!player) { return; }

            // creates table. Ui Helper = Statische Klasse
            const t: HTMLTableElement = UIHelper.createTable(
                // player name
                UIHelper.createRow(
                    UIHelper.createCell(UIHelper.createSpan("td-player-name-label", "Spielername")),
                    UIHelper.createCell(UIHelper.createSpan("td-player-name-value", player.getName()))
                ),
                // shot power
                UIHelper.createRow(
                    UIHelper.createCell(UIHelper.createSpan("td-shot-strength-label", "Schusskraft")),
                    UIHelper.createCell(this.createShotStrength(player)),
                    UIHelper.createCell(UIHelper.createSpan("td-shot-strength-value", player.getShotPower().toString()))
                ),
                // precision
                UIHelper.createRow(
                    UIHelper.createCell(UIHelper.createSpan("td-precision-label", "Präzision")),
                    UIHelper.createCell(this.createPrecision(player)),
                    UIHelper.createCell(UIHelper.createSpan("td-precision-value", player.getPrecision().toString()))
                ),
                // speed
                UIHelper.createRow(
                    UIHelper.createCell(UIHelper.createSpan("td-speed-label", "Geschwindigkeit")),
                    UIHelper.createCell(this.createSpeed(player)),
                    UIHelper.createCell(UIHelper.createSpan("td-speed-value", player.getSpeed().toString()))
                )
            );
            //Wird ans HTML Table Element angehängt
            playerUi.appendChild(t);
        }

        /**
         * updates ui element by its id
         * id: of the ui element 
         * text: displayed string to update 
         */
        private static updateById(id: string, text: string): void {
            const el: HTMLElement | null = document.getElementById(id);
            if (!el) { return; }
            el.innerHTML = text;
        }

        
        private static createRangeInput(min: number, max: number, value: string, cb: (val: string) => void): HTMLInputElement {
            const range: HTMLInputElement = document.createElement("input");
            range.setAttribute("type", "range");
            //min and max range of range input
            range.setAttribute("min", min.toString());
            range.setAttribute("max", max.toString());
            //value = current value
            range.setAttribute("value", value);

            // add eventlistener to handle changes to range
            range.addEventListener("change", (event: Event) => {
                const el: HTMLInputElement = event.target as HTMLInputElement;
                //callback to execute on range changes
                cb(el.value);
            });
            //HTMLInputElement
            return range;
        }

        //creates range ui element for shot strength of player
        //player = current player
        private static createShotStrength(player: Player): HTMLInputElement {
            //HTMLInputElement
            return this.createRangeInput(1, 99, player?.getShotPower().toString(), (value: string) => {
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
        private static createSpeed(player: Player): HTMLInputElement {
            return this.createRangeInput(1, 99, player?.getSpeed().toString(), (value: string) => {
                this.updateById("td-speed-value", value);
                player.setSpeed(parseInt(value));
            });
        }

        /**
         * creates range ui element for precision of player
         * player: current player
         * returns HTMLInputElement
         */
        private static createPrecision(player: Player): HTMLInputElement {
            return this.createRangeInput(1, 99, player?.getPrecision().toString(), (value: string) => {
                this.updateById("td-precision-value", value);
                player.setPrecision(parseInt(value));
            });
        }
    }
}