"use strict";
var YufkaSimulator;
(function (YufkaSimulator) {
    let CustomerStatus;
    (function (CustomerStatus) {
        CustomerStatus["ComingIn"] = "comingin";
        CustomerStatus["Waiting"] = "waiting";
        CustomerStatus["Leaving"] = "leaving";
    })(CustomerStatus = YufkaSimulator.CustomerStatus || (YufkaSimulator.CustomerStatus = {}));
})(YufkaSimulator || (YufkaSimulator = {}));
//# sourceMappingURL=CustomerStatus.js.map