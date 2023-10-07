const matrix = [];
var a = 55;
var b = 70;
const grassCount = 10;
const grassEaterCount = 20;

function kerparner(qanak, kerpar) {
    var p = 0;
    while (p < qanak) {
        const k = Math.floor(random(0, a))
        const l = Math.floor(random(0, b))
        if (matrix[k][l] == 0) {
            matrix[k][l] = kerpar
        }
        p++;
    }
}
const side = 15;
const grassArr = [];
const grassEaterArr = [];
const gshArr = [];
const virusArr = [];
const antivirusArr = [];
const bombArr = [];
function setup() {

    for (let i = 0; i < a; i++) {
        matrix.push([]);
        for (let j = 0; j < b; j++) {
            matrix[i].push(0);

        }
    }
    kerparner(30, 2);
    kerparner(300, 1);
    kerparner(40, 3);
    kerparner(40, 4);
    kerparner(25, 5);
    kerparner(10, 6);

    frameRate(10);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                let gre = new GrassEater(x, y, 2)
                grassEaterArr.push(gre)
            }
            else if (matrix[y][x] == 3) {
                let gsh = new Gishatich(x, y, 3)
                gshArr.push(gsh)
            }
            else if (matrix[y][x] == 4) {
                let virus = new Virus(x, y, 4)
                virusArr.push(virus)
            }
            else if (matrix[y][x] == 5) {
                let antivirus = new Antivirus(x, y, 5)
                antivirusArr.push(antivirus)
            }
            else if (matrix[y][x] == 6) {
                let bomb = new Bomb(x, y, 6)
                bombArr.push(bomb)
            }
            else if (matrix[y][x] == 8) {
            }
        }
    }
    function gamestop() {
        alert("Game stopped");
    }
    function reloadpage() {
        let f = confirm("Start again?");
        if (f) {
            window.location.reload();
        }
    }
    setTimeout(() => {
        reloadpage();
    }, 55000);

    setTimeout(() => {
        gamestop();
    }, 25000);
}

function draw() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow")
            }
            else if (matrix[y][x] == 3) {
                fill("brown")
            }
            else if (matrix[y][x] == 4) {
                fill("red")
            }
            else if (matrix[y][x] == 5) {
                fill("cyan")
            }
            else if (matrix[y][x] == 6) {
                fill("black")
            }
            rect(x * side, y * side, side, side);
        }
    }
    for (let i in grassArr) {
        grassArr[i].mul();
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (let i in gshArr) {
        gshArr[i].eat();
    }
    for (let i in virusArr) {
        virusArr[i].eat();
    }
    for (let i in antivirusArr) {
        antivirusArr[i].eat();
    }
    for (let i in bombArr) {
        bombArr[i].start();
    }
}
