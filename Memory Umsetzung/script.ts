namespace Aufgabe3_MemorySettings {
    //Reload Button
    document.getElementById("Restart").addEventListener("click", function (): void {
        location.reload();
        });
    // Start game
    window.addEventListener("load", startGame);
    function startGame(): void {
        let startMemory: HTMLElement = <HTMLElement>document.querySelector(".start");
        startMemory.addEventListener("click", createGame);
    }
        //Variablen deklarieren
    let numberofPairs: number;
    let cardContent: string[] = ["Typescript", "Javascript", "Variablen", "Objekte", "Interface", "DOM", "CSS", "DIV", "ID's", "For-Schleife", "If Else Schleife", "Footer", "C++", "H1", "H2", "GetElement byID", "Splice", "AppendChild", "Global", "Lokal", "Debugger", "Console", "HTML", "Node.js", "Visual Studio Code"];
    let cardArray: HTMLElement[] = [];
    let cardsOpen: number = 0;
    let cardsOpenArray: HTMLElement[] = [];
    let checkRest: HTMLElement[] = [];
    let formData: FormData;
    let size: number;
    let backgroundColor: FormDataEntryValue | null; 
    let backsideColor: FormDataEntryValue | null;
    let fontColor: FormDataEntryValue | null;
    let fontFamily: FormDataEntryValue | null;
       
    let gewinner: HTMLElement = document.createElement("h3"); //Variable um die Gewinner Message zu realisieren, kreiere hier auch direkt dann eine Überschrift
    gewinner.id = "gewinner";
    document.body.appendChild(gewinner);
    gewinner.style.visibility = "hidden"; //Noch hidden, da wir dies erst visible machen möchten, wenn keine Karten mehr auf dem Spielbrett sind und ein Gewinner determiniert werden muss
    
    
    function createCard(_cardContent: string): void {
            let card: HTMLElement = document.createElement("div");
    
            card.innerHTML = "<p>" + _cardContent + "</p>";
            card.classList.add("card");
            card.classList.add("hidden");
    
            cardArray.push(card);
            checkRest.push(card);
            card.addEventListener("click", handleLoad);
            card.style.width = size + "px";
            card.style.height = size + "px";
            if (backgroundColor) { 
            card.style.backgroundColor = backgroundColor.toString();
            }
            if (backsideColor) { 
            card.style.background = backsideColor.toString();
            }
            if (fontColor) { 
            card.style.color = fontColor.toString();
            }
            if (fontFamily) { 
            card.style.fontFamily = fontFamily.toString();
            }
        }
    
    function handleLoad (_event: Event): void {
            let target: HTMLElement = <HTMLElement>_event.target;
            if (target.classList.contains("card")) {
                cardsOpen++;
                if (!(cardsOpen > 2) && target.classList.contains("hidden") && target != cardsOpenArray[0]) {
                    if (target.classList.contains("hidden")) {
                        target.classList.remove("hidden");
                        target.classList.add("open");
                        cardsOpenArray.push(target);
                    }
                } else {
                    cardsOpen--;
                }
                if (cardsOpen == 2) {
                    setTimeout(checkForMatch, 2000);
                }
            }
        }
        // Vergleich der Karten
    function checkForMatch(): void {
            if (cardsOpenArray[0].innerHTML == cardsOpenArray[1].innerHTML) {
                for (let i: number = 0; i < 2; i++) {
                    cardsOpenArray[i].classList.remove("open");
                    cardsOpenArray[i].classList.add("taken");
                }
                checkRest.splice(0, 2);
            } else {
                for (let i: number = 0; i < cardsOpenArray.length; i++) {
                    cardsOpenArray[i].classList.remove("open");
                    cardsOpenArray[i].classList.add("hidden");
                }
            }
            cardsOpenArray = [];
            cardsOpen = 0;
            checkWin();
        }
    
    function checkWin(): void {
            if (checkRest.length == 0) {
                setTimeout(function(): void {
                    gewinner.style.visibility = "visible";
                    gewinner.innerHTML = "Du hast gewonnen!";
                    },     1000);            }
        }
    
    //Selbes Problem wie bei EIA1 Endabgabe: Wie kann ich eine andere Typiserung hier einfügen?
    //Fisher–Yates shuffle
    function shuffleArray (_array): void {
            for (let i: number = _array.length - 1; i > 0; i--) {
                const randomNumber: number = Math.floor(Math.random() * (i + 1));
                const temp: number = _array[i];
                _array[i] = _array[randomNumber];
                _array[randomNumber] = temp;
            }
            return _array;
        }
    
    function createGame(_event: Event): void {
    
            let form: HTMLFormElement = <HTMLFormElement>document.querySelector(".formular");
            form.style.visibility = "hidden";

            formData = new FormData(document.forms[0]); 
            size = Number(formData.get("Slider")); 
            backgroundColor = formData.get("BGColor"); 
            backsideColor = formData.get("BSColor"); 
            fontColor = formData.get("FColor"); 
            fontFamily = formData.get("radio"); 
    
            let pairOfCards: FormDataEntryValue | null = formData.get("Stepper"); 
            if (pairOfCards) {
            numberofPairs = Number(pairOfCards);
            }
            else {
                numberofPairs = 5;
            }
            for (let i: number = 0; i < numberofPairs; i++) {
                createCard(cardContent[i]);
                createCard(cardContent[i]);
            }
    
            shuffleArray(cardArray);
    
            for (let i: number = 0; i < cardArray.length; i++) {
                let playerbox: HTMLDivElement = <HTMLDivElement>document.getElementById("playerbox");
                playerbox.appendChild(cardArray[i]);
            }
        }
    }

//TO DO: Timer, Winner Message verbessern