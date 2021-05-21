namespace ClassesBlumenwiese {

export let beePath: Path2D[];
export let cloudPath: Path2D[];

//3 Dimensionales Array
export let shapesClouds: number [][][] = [
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
export function createPaths(): void {
beePath = createBeePaths(shapeBees);
cloudPath = createCloudPath();
}

function createBeePaths (_shapes: number[][][]): Path2D[] {
let paths: Path2D[] = [];
for (let type of _shapes) {
    let path: Path2D = new Path2D();
    let first: boolean = true;
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








} 