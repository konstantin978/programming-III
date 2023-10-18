var express = require("express");
var random = require("./random");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("../programming-III"));
app.get("/", function (req, res) {
    res.redirect("./index.html");
});
server.listen(3000, function () {
    console.log("App is running on port 3000");
});


const Antivirus = require('./antivirus');
const Bomb = require('./bomb');
const Grass = require('./class');
const GrassEater = require('./GrassEater');
const Gishatich = require('./gsh');
const Virus = require('./virus');

matrix = [];
a = 55;
b = 70;
grassArr = [];
grassEaterArr = [];
gshArr = [];
virusArr = [];
antivirusArr = [];
bombArr = [];

function kerparner(qanak, kerpar) {
    var p = 0;
    while (p < qanak) {
        const i = Math.floor(random(55));
        const j = Math.floor(random(70));

        if (matrix[i] == 0 && matrix[j] == 0) 
        {
            matrix[i][j] = kerpar
        }
        p++;
    }
}

function createGame() {

    kerparner(300, 1);
    kerparner(30, 2);
    kerparner(40, 3);
    kerparner(40, 4);
    kerparner(25, 5);
    kerparner(10, 6);

    for (let i = 0; i < a; i++) {
        matrix.push([]);
        for (let j = 0; j < b; j++) {
            matrix[i].push(0);

        }
    }
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
    

//     function gamestop() {
//         alert("Game stopped");
//     }
//     function reloadpage() {
//         let f = confirm("Start again?");
//         if (f) {
//             window.location.reload();
//         }
//     }
//     setTimeout(() => {
//         reloadpage();
//     }, 55000);

//     setTimeout(() => {
//         gamestop();
//     }, 25000);
}

function startGame() {
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

createGame();


io.on("connection", function (socket) {
    setInterval(() => {
        startGame();
        socket.emit('matrix', matrix)
    }, 800);
    
});
