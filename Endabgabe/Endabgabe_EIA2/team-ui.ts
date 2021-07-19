namespace Endabgabe_SoSe21 {
    /**
     * class to handle team ui
     */
    export class TeamUI {
        /**
         * redraws team ui
         */

        //Array player: list of all players in scene
        public draw(players: Player[]): void {
            const body: HTMLElement | null = document.getElementById("team-body");
            if (!body) { return; }

            body.innerHTML = "";
            body.appendChild(this.createColorRow(players));

            // creates row in table for players
            this.createPlayerRows(players).forEach((r) => {
                body.appendChild(r);
            });

        }

        /**
         * creates row to adjust colors of teams
         */
        private createColorRow(players: Player[]): HTMLTableRowElement {
            const row: HTMLTableRowElement = UIHelper.createRow(
                UIHelper.createCell(UIHelper.createSpan("l", "Farbe"), { th: true }),

                // add listener to handle color changes on home team. Sobald Texteingabe
                UIHelper.createCell(UIHelper.createInput("color-home", "", (v: string) => {
                    //for each array (m) content
                    players.forEach((m) => {
                        if (m instanceof Player && m.getTeam() === 1) {
                            m.setColor(v);
                            // redraw
                            this.draw(players);
                        }
                    });
                })),

                // add listener to handle color changes on away team
                UIHelper.createCell(UIHelper.createInput("color-away", "", (v: string) => {
                    players.forEach((m) => {
                        if (m instanceof Player && m.getTeam() === 2) {
                            m.setColor(v);
                            // redraw
                            this.draw(players);
                        }
                    });
                }))
            );

            return row;
        }

        /**
         * creates rows fot substitutional players in scene
         * {Player[]} players list of all players in scene 
         * returns HTMLTableRowElement[]
         */
        private createPlayerRows(players: Player[]): HTMLTableRowElement[] {
            // create lists for home and away players which are not on the field (isActive() == false)
            const awaySubstitutes: Player[] = players.filter((p) => p.getTeam() === 2 && !p.isActive());
            const homeSubstitutes: Player[] = players.filter((p) => p.getTeam() === 1 && !p.isActive());

            // get max row count
            const rowCount: number = Math.max(awaySubstitutes.length, homeSubstitutes.length);
            const rows: HTMLTableRowElement[] = [];

            // creates a rows for all players
            for (let i: number = 0; i < rowCount; i++) {
                const row: HTMLTableRowElement = UIHelper.createRow(
                    UIHelper.createCell(this.createDraggableElement(players.filter((p) => p.getTeam() == 1), homeSubstitutes[i], () => this.draw(players))),
                    UIHelper.createCell(this.createDraggableElement(players.filter((p) => p.getTeam() == 2), awaySubstitutes[i], () => this.draw(players)))
                );
                rows.push(row);
            }

            // creates title cell and set rowspan to number of max rows
            rows[0].insertBefore(UIHelper.createCell(UIHelper.createSpan("l", "Spieler"), {
                rowspan: rowCount,
                th: true
            }),                  rows[0].children[0]);
            //reminder für mich: return exits the entire function. Alternative wäre Continue aber das continued to the next line/paragraph. 
            //Und gibt ja auch keinen Wert zurück
            return rows;
        }

        /**
         * creates draggable ui element
         * {Player[]} players list of all players in scene 
         * {Player} player current player
         * {() => void} cb callback
         * returns HTMLSpanElement
         */
        private createDraggableElement(players: Player[], player: Player, cb: () => void): HTMLSpanElement {
            const s: HTMLSpanElement = document.createElement("span");
            if (!player) {
                return s;
            }

            // enable dragability
            s.setAttribute("draggable", "true");

            // add listener for drag events to highlight hovered players
            s.addEventListener("drag", (e: DragEvent) => {
                players.filter((p) => p.isActive()).forEach((p) => {
                    const v: Vector = new Vector(
                        canvas.getBoundingClientRect().x + p.getPosition().X,
                        canvas.getBoundingClientRect().y + p.getPosition().Y
                    );
                    // dehighlight player
                    p.dehighlight();

                    // if player is hovered highlight it
                    //Source for dataTransfer.effectAllowed: https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/effectAllowed
                    if (distance(v, new Vector(e.clientX, e.clientY)) - player.getRadius() * 2 <= 0) {
                        if (e.dataTransfer) {
                            //A copy or move operation is permitted = copyMove
                            e.dataTransfer.effectAllowed = "copyMove";
                        }
                        p.highlight();
                    }
                });

            });

            // add listener for dragend to swap players
            s.addEventListener("dragend", (e: DragEvent) => {
                // get player directly under the mouse
                const p: Player = players.filter((p) => p.isActive()).find((p) => {
                    const v: Vector = new Vector(
                        canvas.getBoundingClientRect().x + p.getPosition().X,
                        canvas.getBoundingClientRect().y + p.getPosition().Y
                    );
                    return distance(v, new Vector(e.clientX, e.clientY)) - player.getRadius() * 2 <= 0;
                });

                // if there was a player on dragend (drag an drop operation has ended) swap both
                if (p) {
                    // set current active player to inactive
                    p.setActive(false);
                    player.setActive(true);

                    // swap subsitutes origin with players origin
                    player.setOrigin(new Vector(p.getOrigin().X, p.getOrigin().Y));

                    // swap subsitutes position with players position
                    player.setPosition(new Vector(p.getPosition().X, p.getPosition().Y));

                    // executes callback
                    cb();
                }


            });

            // set some stylings to look better
            s.style.background = player.getColor();
            s.style.border = `1px solid black`;
            s.style.width = `${2 * player.getRadius()}px`;
            s.style.height = `${2 * player.getRadius()}px`;
            s.classList.add("is-draggable");
            s.innerHTML = player?.getTricotNumber().toString();
            return s;
        }
    }
}