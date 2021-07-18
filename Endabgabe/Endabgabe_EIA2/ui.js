"use strict";
var Endabgabe_SoSe21;
(function (Endabgabe_SoSe21) {
    /**
     * class to handle general ui stuff
     */
    class UI {
        /**
         * gets score of home team
         */
        getHomeScore() {
            return this.homeScore || 0;
        }
        /**
         * set score for home team
         */
        setHomeScore(homeScore) {
            this.homeScore = homeScore;
            this.updateScore();
        }
        /**
         * gets score of away team
         */
        getAwayScore() {
            return this.awayScore || 0;
        }
        /**
         * set score for away team
         */
        setAwayScore(awayScore) {
            this.awayScore = awayScore;
            this.updateScore();
        }
        /**
         * generelles UI wird nochmal gezeichnet
         * time: current time left
         */
        draw(time) {
            // Binärer Operator (|) : wenn entweder das erste oder das zweite nach | true ist, wird if ausgeführt. Sonst macht er nichts.
            const playerUi = document.getElementById("upper-ui");
            if (!playerUi) {
                return;
            }
            // creates clock
            this.createTime(playerUi, time);
        }
        /**
         * updates score
         */
        updateScore() {
            const playerUi = document.getElementById("upper-ui");
            if (!playerUi) {
                return;
            }
            let scoreElement = document.getElementById("score");
            if (!scoreElement) {
                scoreElement = document.createElement("span");
                scoreElement.setAttribute("id", "score");
                playerUi.appendChild(scoreElement);
            }
            scoreElement.innerHTML = `Spielstand: ${this.getHomeScore()} : ${this.getAwayScore()}`;
        }
        /**
         * creates clock
         * playerUi: ui of the player
         * time: current time
         */
        createTime(playerUi, time) {
            let timeElement = document.getElementById("time");
            if (!timeElement) {
                timeElement = document.createElement("span");
                timeElement.setAttribute("id", "time");
                playerUi.appendChild(timeElement);
            }
            if (!time) {
                return;
            }
            // calculates human readable time
            const minutes = Math.floor(time / (1000 * 60));
            const minuteRest = time % (1000 * 60);
            const seconds = Math.floor(minuteRest / 1000);
            //Anpassbarer Teil für Zeitdarstellung
            timeElement.innerHTML = `Zeit: ${minutes.toString().length < 2 ? `0${minutes}` : minutes}:${seconds.toString().length < 2 ? `0${seconds}` : seconds}`;
        }
    }
    Endabgabe_SoSe21.UI = UI;
})(Endabgabe_SoSe21 || (Endabgabe_SoSe21 = {}));
//# sourceMappingURL=ui.js.map