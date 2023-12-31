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
const Laser = require('./laser')


grassArr = [];
grassEaterArr = [];
gshArr = [];
virusArr = [];
antivirusArr = [];
bombArr = [];
laserArr = [];
grassStat = 0;
days = 0;
weather = "winter";
// grassCount = 10;
// grassEaterCount = 20;
matrix = [];
grassSt = 0;
randomX = 0;
randomY = 0;
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

  kerparner(500, 1);
  kerparner(60, 2);
  kerparner(75, 3);
  kerparner(25, 4);
  kerparner(20, 5);
  kerparner(10, 6);
  kerparner(2, 7);


  for (let y = 0; y < matrix.length; ++y) {
    for (let x = 0; x < matrix[y].length; ++x) {
      if (matrix[y][x] == 1) {
        let gr = new Grass(x, y, 1);
        grassArr.push(gr);
        grassStat++;
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
      else if (matrix[y][x] == 7) {
        let laser = new Laser(x, y, 7)
        laserArr.push(laser)
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
  for (let i in laserArr) {
    laserArr[i].active();
  }
  io.emit("matrix", matrix)
  io.emit("weather", weather)
  randomX = random(matrix.length - 1)
  randomY = random(matrix[0].length - 1)



  days++;

  if (days <= 25) {
    weather = "winter";
  }
  else if (days > 25 && days <= 50) {
    weather = "spring";
  }
  else if (days > 50 && days <= 75) {
    weather = "summer";
  }
  else if (days > 75 && days <= 100) {
    weather = "autumn";
  }
  else if (days == 101) {
    days = 0;
  }
}

createGame()

let intervalID;

function spawnbomb() {
  if (matrix[randomY][randomX] == 6) {
    console.log(1);
  } else{
  let bomb = new Bomb(randomX, randomY, 6)
  bombArr.push(bomb)
}
}

function startGame() {
  clearInterval(intervalID)
  intervalID = setInterval(() => {
    drawGame()
    io.emit('grassSt', grassArr.length)
    io.emit('grassStat', grassStat)
    io.emit('laser', laserArr.length)
  }, 200)
}

io.on("connection", (socket) => {
  socket.emit("matrix", matrix)
  startGame();
  socket.on('bomb', (a2) => {
    if (a2) {
      spawnbomb()
      a2 = false
    }
  })

  socket.on('changeWeatherToWinter', (change) => {
    if (change) {
      weather = 'winter';
      days = 0;
    }
  })

  socket.on('changeWeatherToSpring', (change) => {
    if (change) {
      weather = 'spring';
      days = 26;
    }
  })

  socket.on('changeWeatherToSummer', (change) => {
    if (change) {
      weather = 'summer';
      days = 51;
    }
  })

  socket.on('changeWeatherToAutumn', (change) => {
    if (change) {
      weather = 'autumn';
      days = 76;
    }
  })
})
