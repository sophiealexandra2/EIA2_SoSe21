
let namen: string [] = ["Harry", "Hermine", "Hagrid", "Ron", "Name5", "Name6"];
let verben: string [] = ["zaubert", "läuft", "braut", "Name4", "Name5", "Name6"];
let objekte: string [] = ["Name1", "läuft", "braut", "Name4", "Name5", "Name6"];

//console.log(namen);




function schleife (_arrayname: string[]) {
    for (let i: number = _arrayname.length; i >= 1; i--)
{
//console.log(i);
getVerse(namen, verben, objekte);
//console.log(getVerse([], [], []));
}}
schleife (namen);



function getVerse (_Array1: string[], _Array2: string[], _Array3: string[]): string {
    let satzbau: string = "";
    let randomNumber: number = Math.floor (Math.random() * _Array1.length);
    console.log(randomNumber);
    _Array1.splice(_Array1.indexOf());



    return "Alohomora";
}



//
//namespace Cows {
//let nums: number[] = [2, 6, 5];
//let results: string[] = [];
//for (let i: number = 0; i < nums.length; i++) {
//let result: string = createCall("m", nums[i]);
//results.push(result);
//}
