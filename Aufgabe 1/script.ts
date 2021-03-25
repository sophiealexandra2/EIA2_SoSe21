namespace randompoem {
let noun: string [] = ["Daenerys Targaryen ", "Jon Snow ", "Arya Stark ", "Sansa Stark ", "Eddard Stark ", "Joffrey Baratheon "];
let verb: string [] = ["kauft", "benutzt", "vergisst", "sucht", "liebt", "hasst"];
let object: string [] = [" Schwerter", " Tröne", " Riesen", " Kronen", " Kriege", " Drachen"];

for (let i: number = 6 ; i >= 1; i--) {
    let finalsentence: string = getVerse(noun, verb, object);
    console.log(finalsentence);
}
function getVerse (_noun: string[], _verb: string[], _object: string[]): string {

    let randomNumbernoun: number = Math.floor(Math.random() * _noun.length);
    let randomNumberverb: number = Math.floor(Math.random() * _noun.length);
    let randomNumberobject: number = Math.floor(Math.random() * _noun.length);
    let satzbau: string = _noun[randomNumbernoun] + _verb[randomNumberverb] + _object[randomNumberobject];
    _noun.splice(randomNumbernoun, 1);
    _verb.splice(randomNumberverb, 1);
    _object.splice(randomNumberobject, 1);
    return satzbau;
}}

