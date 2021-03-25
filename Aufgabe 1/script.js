"use strict";
var GameOfThronesPoem;
(function (GameOfThronesPoem) {
    let noun = ["Daenerys Targaryen ", "Jon Snow ", "Arya Stark ", "Sansa Stark ", "Eddard Stark ", "Joffrey Baratheon "];
    let verb = ["kauft", "benutzt", "vergisst", "sucht", "liebt", "hasst"];
    let object = [" Schwerter", " Tröne", " Riesen", " Kronen", " Kriege", " Drachen"];
    for (let i = 6; i >= 1; i--) {
        let finalsentence = getVerse(noun, verb, object);
        console.log(finalsentence);
    }
    function getVerse(_noun, _verb, _object) {
        let randomNumbernoun = Math.floor(Math.random() * _noun.length);
        let randomNumberverb = Math.floor(Math.random() * _noun.length);
        let randomNumberobject = Math.floor(Math.random() * _noun.length);
        let satzbau = _noun[randomNumbernoun] + _verb[randomNumberverb] + _object[randomNumberobject];
        _noun.splice(randomNumbernoun, 1);
        _verb.splice(randomNumberverb, 1);
        _object.splice(randomNumberobject, 1);
        return satzbau;
    }
})(GameOfThronesPoem || (GameOfThronesPoem = {}));
//# sourceMappingURL=script.js.map