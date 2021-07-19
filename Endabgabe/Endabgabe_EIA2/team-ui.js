"use strict";
var Endabgabe_SoSe21;
(function (Endabgabe_SoSe21) {
    /**
     * class to handle team ui
     */
    class TeamUI {
        /**
         * redraws team ui
         */
        //Array player: list of all players in scene
        draw(players) {
            const body = document.getElementById("team-body");
            if (!body) {
                return;
            }
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
        createColorRow(players) {
            const row = Endabgabe_SoSe21.UIHelper.createRow(Endabgabe_SoSe21.UIHelper.createCell(Endabgabe_SoSe21.UIHelper.createSpan("l", "Farbe"), { th: true }), 
            // add listener to handle color changes on home team. Sobald Texteingabe
            Endabgabe_SoSe21.UIHelper.createCell(Endabgabe_SoSe21.UIHelper.createInput("color-home", "", (v) => {
                //for each array (m) content
                players.forEach((m) => {
                    if (m instanceof Endabgabe_SoSe21.Player && m.getTeam() === 1) {
                        m.setColor(v);
                        // redraw
                        this.draw(players);
                    }
                });
            })), 
            // add listener to handle color changes on away team
            Endabgabe_SoSe21.UIHelper.createCell(Endabgabe_SoSe21.UIHelper.createInput("color-away", "", (v) => {
                players.forEach((m) => {
                    if (m instanceof Endabgabe_SoSe21.Player && m.getTeam() === 2) {
                        m.setColor(v);
                        // redraw
                        this.draw(players);
                    }
                });
            })));
            return row;
        }
        /**
         * creates rows fot substitutional players in scene
         * {Player[]} players list of all players in scene
         * returns HTMLTableRowElement[]
         */
        createPlayerRows(players) {
            // create lists for home and away players which are not on the field (isActive() == false)
            const awaySubstitutes = players.filter((p) => p.getTeam() === 2 && !p.isActive());
            const homeSubstitutes = players.filter((p) => p.getTeam() === 1 && !p.isActive());
            // get max row count
            const rowCount = Math.max(awaySubstitutes.length, homeSubstitutes.length);
            const rows = [];
            // creates a rows for all players
            for (let i = 0; i < rowCount; i++) {
                const row = Endabgabe_SoSe21.UIHelper.createRow(Endabgabe_SoSe21.UIHelper.createCell(this.createDraggableElement(players.filter((p) => p.getTeam() == 1), homeSubstitutes[i], () => this.draw(players))), Endabgabe_SoSe21.UIHelper.createCell(this.createDraggableElement(players.filter((p) => p.getTeam() == 2), awaySubstitutes[i], () => this.draw(players))));
                rows.push(row);
            }
            // creates title cell and set rowspan to number of max rows
            rows[0].insertBefore(Endabgabe_SoSe21.UIHelper.createCell(Endabgabe_SoSe21.UIHelper.createSpan("l", "Spieler"), {
                rowspan: rowCount,
                th: true
            }), rows[0].children[0]);
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
        createDraggableElement(players, player, cb) {
            const s = document.createElement("span");
            if (!player) {
                return s;
            }
            // enable dragability
            s.setAttribute("draggable", "true");
            // add listener for drag events to highlight hovered players
            s.addEventListener("drag", (e) => {
                players.filter((p) => p.isActive()).forEach((p) => {
                    const v = new Endabgabe_SoSe21.Vector(Endabgabe_SoSe21.canvas.getBoundingClientRect().x + p.getPosition().X, Endabgabe_SoSe21.canvas.getBoundingClientRect().y + p.getPosition().Y);
                    // dehighlight player
                    p.dehighlight();
                    // if player is hovered highlight it
                    //Source for dataTransfer.effectAllowed: https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/effectAllowed
                    if (Endabgabe_SoSe21.distance(v, new Endabgabe_SoSe21.Vector(e.clientX, e.clientY)) - player.getRadius() * 2 <= 0) {
                        if (e.dataTransfer) {
                            //A copy or move operation is permitted = copyMove
                            e.dataTransfer.effectAllowed = "copyMove";
                        }
                        p.highlight();
                    }
                });
            });
            // add listener for dragend to swap players
            s.addEventListener("dragend", (e) => {
                // get player directly under the mouse
                const p = players.filter((p) => p.isActive()).find((p) => {
                    const v = new Endabgabe_SoSe21.Vector(Endabgabe_SoSe21.canvas.getBoundingClientRect().x + p.getPosition().X, Endabgabe_SoSe21.canvas.getBoundingClientRect().y + p.getPosition().Y);
                    return Endabgabe_SoSe21.distance(v, new Endabgabe_SoSe21.Vector(e.clientX, e.clientY)) - player.getRadius() * 2 <= 0;
                });
                // if there was a player on dragend (drag an drop operation has ended) swap both
                if (p) {
                    // set current active player to inactive
                    p.setActive(false);
                    player.setActive(true);
                    // swap subsitutes origin with players origin
                    player.setOrigin(new Endabgabe_SoSe21.Vector(p.getOrigin().X, p.getOrigin().Y));
                    // swap subsitutes position with players position
                    player.setPosition(new Endabgabe_SoSe21.Vector(p.getPosition().X, p.getPosition().Y));
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
    Endabgabe_SoSe21.TeamUI = TeamUI;
})(Endabgabe_SoSe21 || (Endabgabe_SoSe21 = {}));
//# sourceMappingURL=team-ui.js.map