const socket = io();
const side = 15;
const a = 55;
const b = 70;


const grassActStd = document.getElementById('grassActual')
const grassStd = document.getElementById('grass')
const laserStd = document.getElementById('laser')
const button = document.getElementById('btn')


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

function drawGame(matrix) {
    socket.on("weather", (weather) => {
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] == 1 && weather == 'winter') {
                    fill('lightgreen')
                }   else if(matrix[y][x] == 1 && weather == 'spring') {
                    fill('yellowgreen')
                }   else if(matrix[y][x] == 1 && weather == 'summer') {
                    fill('green')
                }   else if(matrix[y][x] == 1 && weather == 'autumn') {
                    fill('orange')
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
    })

    socket.on('grassSt', (grassSt) => {
        grassActStd.innerHTML = `${grassSt} Grasses in game`;
    })
    socket.on('grassStat', (grassStat) => {
        grassStd.innerHTML = `${grassStat} Grasses from game start`;
    })
    socket.on('laser', (laser) => {
        if (laser) {
            laserStd.innerHTML = `${laser} Lasers Active`
        } else {
            laserStd.innerHTML = 'Laser Deactive'
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



// =================================================================================================================//
// socket.on('bomb', (hi) => {
//     let bomb = new Bomb(randomX, randomY, 6)
//     bombArr.push(bomb)
// })

// function connect(randomX, randomY, bombArr, Bomb) {

// }


// button.addEventListener('click', connect);
// =================================================================================================================//



