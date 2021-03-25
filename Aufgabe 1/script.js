"use strict";
var randompoem;
(function (randompoem) {
    let n = ["Daenerys Targaryen ", "Jon Snow ", "Arya Stark ", "Sansa Stark ", "Eddard Stark ", "Joffrey Baratheon "];
    let v = ["kauft ", "benutzt ", "vergisst ", "sucht ", "liebt ", "hasst "];
    let o = ["Schwerter ", "Tröne ", "Familie Baratheon ", "Kronen ", "Kriege ", "Drachen "];
    //console.log(n);
    for (let a = Array.length; a >= 0; a--) {
        let x = getVerse(n, v, o);
        console.log(x);
    }
    function getVerse(_n, _v, _o) {
        let satzbau = "";
        let randomNrn = Math.floor(Math.random() * Math.floor(_n.length));
        _n.splice(randomNrn, 1);
        let randomNrv = Math.floor(Math.random() * Math.floor(_v.length));
        _n.splice(randomNrv, 1);
        let randomNro = Math.floor(Math.random() * Math.floor(_o.length));
        _o.splice(randomNro, 1);
        satzbau = _n[randomNrn] + _v[randomNrv] + _o[randomNro];
        return satzbau;
    }
})(randompoem || (randompoem = {}));
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
//# sourceMappingURL=script.js.map