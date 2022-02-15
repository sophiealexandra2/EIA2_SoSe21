"use strict";
var veganDoenerSimulator;
(function (veganDoenerSimulator) {
    let CustomerStatus;
    (function (CustomerStatus) {
        CustomerStatus["ComingIn"] = "comingin";
        CustomerStatus["Waiting"] = "waiting";
        CustomerStatus["Leaving"] = "leaving";
    })(CustomerStatus = veganDoenerSimulator.CustomerStatus || (veganDoenerSimulator.CustomerStatus = {}));
})(veganDoenerSimulator || (veganDoenerSimulator = {}));
//# sourceMappingURL=CustomerStatus.js.map