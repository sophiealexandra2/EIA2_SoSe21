namespace Endabgabe_SoSe21 {
    /**
     * class to handle general ui stuff
     */
    export class UI {
        // score for home team
        private homeScore: number;

        // score for away team
        private awayScore: number;

        /**
         * gets score of home team
         */
        public getHomeScore(): number {
            return this.homeScore || 0;
        }

        /**
         * set score for home team
         */
        public setHomeScore(homeScore: number): void {
            this.homeScore = homeScore;
            this.updateScore();
        }

        /**
         * gets score of away team
         */
        public getAwayScore(): number {
            return this.awayScore || 0;
        }

        /**
         * set score for away team
         */
        public setAwayScore(awayScore: number): void {
            this.awayScore = awayScore;
            this.updateScore();
        }

        /**
         * generelles UI wird nochmal gezeichnet
         * time: current time left 
         */
        public draw(time: number): void {
            // Binärer Operator (|) : wenn entweder das erste oder das zweite nach | true ist, wird if ausgeführt. Sonst macht er nichts.
            const playerUi: HTMLElement | null = document.getElementById("upper-ui");
            if (!playerUi) { return; }

            // creates clock
            this.createTime(playerUi, time);
        }

        /**
         * updates score
         */
        public updateScore(): void {
            const playerUi: HTMLElement | null = document.getElementById("upper-ui");
            if (!playerUi) { return; }

            let scoreElement: HTMLSpanElement | null = document.getElementById("score");
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
        public createTime(playerUi: HTMLElement, time: number): void {
            let timeElement: HTMLSpanElement | null = document.getElementById("time");
            if (!timeElement) {
                timeElement = document.createElement("span");
                timeElement.setAttribute("id", "time");
                playerUi.appendChild(timeElement);
            }

            if (!time) { return; }
            
            // calculates human readable time
            const minutes: number = Math.floor(time / (1000 * 60));
            const minuteRest: number = time % (1000 * 60);
            const seconds: number = Math.floor(minuteRest / 1000);
            //Anpassbarer Teil für Zeitdarstellung
            timeElement.innerHTML = `Zeit: ${minutes.toString().length < 2 ? `0${minutes}` : minutes}:${seconds.toString().length < 2 ? `0${seconds}` : seconds}`;
        }

    }
}