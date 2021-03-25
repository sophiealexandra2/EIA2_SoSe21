namespace randompoem {
let n: string [] = ["Daenerys Targaryen ", "Jon Snow ", "Arya Stark ", "Sansa Stark ", "Eddard Stark ", "Joffrey Baratheon "];
let v: string [] = ["kauft ", "benutzt ", "vergisst ", "sucht ", "liebt ", "hasst "];
let o: string [] = ["Schwerter ", "Tröne ", "Familie Baratheon ", "Kronen ", "Kriege ", "Drachen "];

//console.log(n);

for (let a: number = Array.length ; a >= 0; a--) {
    let x: string = getVerse(n, v, o);
    console.log(x);
}



function getVerse (_n: string[], _v: string[], _o: string[]): string {
    let satzbau: string = "";

    let randomNrn: number = Math.floor(Math.random() * Math.floor(_n.length));
    _n.splice(randomNrn, 1);

    let randomNrv: number = Math.floor(Math.random() * Math.floor(_v.length));
    _n.splice(randomNrv, 1);

    let randomNro: number = Math.floor(Math.random() * Math.floor(_o.length));
    _o.splice(randomNro, 1);
    satzbau = _n[randomNrn] + _v[randomNrv] + _o[randomNro];

    return satzbau;

}   
}



//
//namespace Cows {
//let nums: number[] = [2, 6, 5];
//let results: string[] = [];
//for (let i: number = 0; i < nums.length; i++) {
//let result: string = createCall("m", nums[i]);
//results.push(result);
//}
//console.log(randomNrn;
 //   _Array1.splice(_Array1.indexOf());



 //   return "Alohomora";