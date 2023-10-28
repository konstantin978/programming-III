const socket = io();
const side = 15;
const a = 55;
const b = 70;
var weather2;

console.log('Game Created by Konstantin Ghevondyan)');


const grassActStd = document.getElementById('grassActual')
const grassStd = document.getElementById('grass')
const laserStd = document.getElementById('laser')
const spawnBomb = document.getElementById('spawnBomb')
const changeWeatherToWinter = document.getElementById('changeWeatherToWinter')
const changeWeatherToSpring = document.getElementById('changeWeatherToSpring')
const changeWeatherToSummer = document.getElementById('changeWeatherToSummer')
const changeWeatherToAutumn = document.getElementById('changeWeatherToAutumn')




function setup() {
    frameRate(500);
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

socket.on('weather', (weather) => {
    weather2 = weather;
})

function drawGame(matrix) {
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] == 1){
                    if (weather2 == 'winter') {
                        fill("lightgreen")
                    } else if(weather2 == 'spring') {
                        fill('green')
                    } else if(weather2 == 'summer') {
                        fill('#c0ff3e')
                    } else {   
                        fill('#ebcc2f')
                    }
                }
                else if (matrix[y][x] == 0) {
                    fill("#acacac");
                }
                else if (matrix[y][x] == 2) {
                    fill("yellow")
                }
                else if (matrix[y][x] == 3) {
                    fill("blue")
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
        }

    socket.on('grassSt', (grassSt) => {
        grassActStd.innerHTML = `${grassSt} Grasses in Game`;
    })
    socket.on('grassStat', (grassStat) => {
        grassStd.innerHTML = `${grassStat} Grasses from Game start`;
    })
    socket.on('laser', (laser) => {
        if (laser) {
            laserStd.innerHTML = `${laser} Lasers Activated`
        } else {
            laserStd.innerHTML = 'Lasers Deactivated'
        }
    })

}


socket.on('weather', (weather) => {
    if (weather == 'winter') {
        document.getElementById('body').style.backgroundColor = 'white';
    } else if (weather == 'spring') {
        document.getElementById('body').style.backgroundColor = 'green';
    } else if (weather == 'summer') {
        document.getElementById('body').style.backgroundColor = 'yellow';
    } else if (weather == 'autumn') {
        document.getElementById('body').style.backgroundColor = 'orange';
    }
})
socket.on("matrix", drawGame)


var a2 = false;
spawnBomb.addEventListener('click', function() {
    a2 = true
    socket.emit('bomb', a2)
});

var changewinter = false;
var changespring = false;
var changesummer = false;
var changeautumn = false;

changeWeatherToWinter.addEventListener('click', function() {
    socket.emit('changeWeatherToWinter', changewinter)
    changewinter = true;
})

changeWeatherToSpring.addEventListener('click', function() {
    socket.emit('changeWeatherToSpring', changespring)
    changespring = true;
})

changeWeatherToSummer.addEventListener('click', function() {
    socket.emit('changeWeatherToSummer', changesummer)
    changesummer = true;
})

changeWeatherToAutumn.addEventListener('click', function() {
    socket.emit('changeWeatherToAutumn', changeautumn)
    changeautumn = true;
})






