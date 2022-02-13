"use strict";
var vegandoenerSimulator;
(function (vegandoenerSimulator) {
    let customerStatus;
    (function (customerStatus) {
        customerStatus["ComingIn"] = "comingin";
        customerStatus["Waiting"] = "waiting";
        customerStatus["Leaving"] = "leaving";
    })(customerStatus = vegandoenerSimulator.customerStatus || (vegandoenerSimulator.customerStatus = {}));
})(vegandoenerSimulator || (vegandoenerSimulator = {}));
//# sourceMappingURL=customerstatus.js.map