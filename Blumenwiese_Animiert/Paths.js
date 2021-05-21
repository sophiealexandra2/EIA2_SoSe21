"use strict";
var ClassesBlumenwiese;
(function (ClassesBlumenwiese) {
    //3 Dimensionales Array
    ClassesBlumenwiese.shapesClouds = [
        [
            [30, 1], [50, 15], [71, 1], [88, 31], [], [], [], [], []
        ],
        [
            [], [], [], [], [], [], [], []
        ],
        [
            [30, 1], [50, 15], [71, 1], [88, 31], [], [], [], [], []
        ],
        [
            [30, 1], [50, 15], [71, 1], [88, 31], [], [], [], [], []
        ]
    ];
    function createPaths() {
        ClassesBlumenwiese.beePath = createBeePaths(shapeBees);
        ClassesBlumenwiese.cloudPath = createCloudPath();
    }
    ClassesBlumenwiese.createPaths = createPaths;
    function createBeePaths(_shapes) {
        let paths = [];
        for (let type of _shapes) {
            let path = new Path2D();
            let first = true;
            for (let coordinates of type) {
                if (first)
                    path.moveTo(coordinates[0], coordinates[1]);
                else
                    path.lineTo(coordinates[0], coordinates[1]);
                first = false;
            }
            path.closePath();
            paths.push(path);
        }
        return paths;
    }
})(ClassesBlumenwiese || (ClassesBlumenwiese = {}));
//# sourceMappingURL=Paths.js.map