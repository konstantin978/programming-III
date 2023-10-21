var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('../PROGRAMMING-III'));

app.get("/", function (req, res) {
  res.redirect("index.html");
});

server.listen(3000, function () {
  console.log("App is running on port 3000");
});

const random = require("./random");
const Grass = require('./class')
const GrassEater = require('./GrassEater')
const Gishatich = require('./gsh')
const Antivirus = require('./antivirus')
const Bomb = require('./bomb')
const Virus = require('./virus')




grassArr = [];
grassEaterArr = [];
gshArr = [];
virusArr = [];
antivirusArr = [];
bombArr = [];
grassCount = 10;
grassEaterCount = 20;
matrix = [];
grassSt = 0;
const a = 55;
const b = 70;

for (let i = 0; i < a; i++) {
  matrix.push([]);
  for (let j = 0; j < b; j++) {
    matrix[i].push(0);
  }
}

function createGame() {
  function kerparner(qanak, kerpar) {
    var p = 0;
    while (p < qanak) {
      const k = Math.floor(random(a))
      const l = Math.floor(random(b))
      if (matrix[k][l] == 0) {
        matrix[k][l] = kerpar
      }
      p++;
    }
  }

  kerparner(30, 2);
  kerparner(300, 1);
  kerparner(10, 3);
  kerparner(40, 4);
  kerparner(25, 5);
  kerparner(10, 6);

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
}

function drawGame() {
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
  io.emit("matrix", matrix)
}

// function statistic() {
//   console.log(grassSt, "grass");
//   for (let y = 0; y < matrix.length; ++y) {
//     for (let x = 0; x < matrix[y].length; ++x) {
//       if (matrix[y][x] == 1 && matrix[y][x] != 0) {
//         grassSt++;
//         break;
//       }
//     }
//   }
// }

createGame()

let intervalID;

function startGame() {
  clearInterval(intervalID)
  createGame()
  intervalID = setInterval(() => {
    drawGame()
    io.emit('grassSt', grassArr.length)
  }, 200)
}


io.on("connection", (socket) => {
  socket.emit("matrix", matrix)
  startGame();
})
