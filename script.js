const socket = io();
const side = 15;
const a = 55;
const b = 70;

const grassActStd = document.getElementById('grassActual')
const grassStd = document.getElementById('grass')
const button = document.getElementById('btn')

let randomCellX = 0
let randomCellY = 0

function setup() {
    frameRate(10);
    createCanvas(b * side, a * side);
    background('#acacac');

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

function drawGame(matrix) {
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
                fill("darkgreen")
            }
            else if (matrix[y][x] == 4) {
                fill("darkred")
            }
            else if (matrix[y][x] == 5) {
                fill("cyan")
            }
            else if (matrix[y][x] == 6) {
                fill("black")
            }
            else if (matrix[y][x] == 7) {
                fill("red")
            }
            rect(x * side, y * side, side, side);
        }
        socket.on('grassSt', (grassSt) => {
            grassActStd.innerHTML = `${grassSt} Grasses in game`;
        })
        socket.on('grassStat', (grassStat) => {
            grassStd.innerHTML = `${grassStat} Grasses from game start`;
        })
    }
}

function connect() {
    socket.on("bomb", spawnBomb) 
}

button.addEventListener("click", connect)

socket.on("matrix", drawGame)
