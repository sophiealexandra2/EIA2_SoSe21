"use strict";
var Aufgabe3_MemorySettings;
(function (Aufgabe3_MemorySettings) {
    //Reload Button
    document.getElementById("Restart").addEventListener("click", function () {
        location.reload();
    });
    // Start game
    window.addEventListener("load", startGame);
    function startGame() {
        let startMemory = document.querySelector(".start");
        startMemory.addEventListener("click", createGame);
    }
    //Variablen deklarieren
    let numberofPairs;
    let cardContent = ["Typescript", "Javascript", "Variablen", "Objekte", "Interface", "DOM", "CSS", "DIV", "ID's", "For-Schleife", "If Else Schleife", "Footer", "C++", "H1", "H2", "GetElement byID", "Splice", "AppendChild", "Global", "Lokal", "Debugger", "Console", "HTML", "Node.js", "Visual Studio Code"];
    let cardArray = [];
    let cardsOpen = 0;
    let cardsOpenArray = [];
    let checkRest = [];
    let formData;
    let sizeofCards;
    //Wert wird anscheinend nicht gelesen aber Memory funktioniert? Also Schriftfarbe etc. wird gelesen und verändert sich...
    let backgroundColor;
    let backsideColor;
    let fontColor;
    let fontFamily;
    let gewinner = document.createElement("h3"); //Variable um die Gewinner Message zu realisieren, kreiere hier auch direkt dann eine Überschrift
    gewinner.id = "gewinner";
    document.body.appendChild(gewinner);
    gewinner.style.visibility = "hidden"; //Noch hidden, da wir dies erst visible machen möchten, wenn keine Karten mehr auf dem Spielbrett sind und ein Gewinner determiniert werden muss
    function createCard(_cardContent) {
        let card = document.createElement("div");
        card.innerHTML = "<p>" + _cardContent + "</p>";
        card.classList.add("card");
        card.classList.add("hidden");
        cardArray.push(card);
        checkRest.push(card);
        card.addEventListener("click", handleLoad);
        card.style.width = sizeofCards + "px";
        card.style.height = sizeofCards + "px";
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
    function handleLoad(_event) {
        let target = _event.target;
        if (target.classList.contains("card")) {
            cardsOpen++;
            if (!(cardsOpen > 2) && target.classList.contains("hidden") && target != cardsOpenArray[0]) {
                if (target.classList.contains("hidden")) {
                    target.classList.remove("hidden");
                    target.classList.add("open");
                    cardsOpenArray.push(target);
                }
            }
            else {
                cardsOpen--;
            }
            if (cardsOpen == 2) {
                setTimeout(checkForMatch, 2000);
            }
        }
    }
    // Vergleich der Karten
    function checkForMatch() {
        if (cardsOpenArray[0].innerHTML == cardsOpenArray[1].innerHTML) {
            for (let i = 0; i < 2; i++) {
                cardsOpenArray[i].classList.remove("open");
                cardsOpenArray[i].classList.add("taken");
            }
            checkRest.splice(0, 2);
        }
        else {
            for (let i = 0; i < cardsOpenArray.length; i++) {
                cardsOpenArray[i].classList.remove("open");
                cardsOpenArray[i].classList.add("hidden");
            }
        }
        cardsOpenArray = [];
        cardsOpen = 0;
        checkWin();
    }
    function checkWin() {
        if (checkRest.length == 0) {
            setTimeout(function () {
                gewinner.style.visibility = "visible";
                gewinner.innerHTML = "Du hast gewonnen!";
            }, 1000);
        }
    }
    //Selbes Problem wie bei EIA1 Endabgabe: Wie kann ich eine andere Typiserung hier einfügen?
    //Fisher–Yates shuffle
    function shuffleArray(_array) {
        for (let i = _array.length - 1; i > 0; i--) {
            const randomNumber = Math.floor(Math.random() * (i + 1));
            const temp = _array[i];
            _array[i] = _array[randomNumber];
            _array[randomNumber] = temp;
        }
        return _array;
    }
    function createGame(_event) {
        let form = document.querySelector(".formular");
        form.style.visibility = "hidden";
        formData = new FormData(document.forms[0]);
        sizeofCards = Number(formData.get("Slider"));
        backgroundColor = formData.get("BGColor");
        backsideColor = formData.get("BSColor");
        fontColor = formData.get("FColor");
        fontFamily = formData.get("radio");
        let pairOfCards = formData.get("Stepper");
        if (pairOfCards) {
            numberofPairs = Number(pairOfCards);
        }
        else {
            numberofPairs = 5;
        }
        for (let i = 0; i < numberofPairs; i++) {
            createCard(cardContent[i]);
            createCard(cardContent[i]);
        }
        shuffleArray(cardArray);
        for (let i = 0; i < cardArray.length; i++) {
            let playerbox = document.getElementById("playerbox");
            playerbox.appendChild(cardArray[i]);
        }
    }
})(Aufgabe3_MemorySettings || (Aufgabe3_MemorySettings = {}));
//TO DO: Timer, Winner Message verbessern
//# sourceMappingURL=script.js.map