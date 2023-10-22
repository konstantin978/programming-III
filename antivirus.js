const LivingCreature = require("./livingCreature")
const random = require("./random");

module.exports = class Antivirus extends LivingCreature{
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 20;
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character)
    }

    eat() {
        let foods = this.chooseCell(4)
        let food = random(foods)
        if (food) {
            this.energy++;
            matrix[this.y][this.x] = 0
            let newX = food[0]
            let newY = food[1]
            matrix[food[1]][food[0]] = 5
            this.x = newX
            this.y = newY
            for (let i in virusArr) {
                if (newX == virusArr[i].x && newY == virusArr[i].y) {
                    virusArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy >= 30) {
                // this.mul()
            }
        }
        else {
            this.move()
        }
    }

    move() {
        this.energy--;
        let emptyCells0 = this.chooseCell(0)
        // let emptyCells1 = this.chooseCell(1)
        let newCell0 = random(emptyCells0)
        // let newCell1 = random(emptyCells1)
        if (newCell0) {
            let newX0 = newCell0[0]
            let newY0 = newCell0[1]
            matrix[this.y][this.x] = 0
            matrix[newY0][newX0] = 5
            this.x = newX0
            this.y = newY0
        }
        // if (newCell1) {
        //     let newX1 = newCell1[0]
        //     let newY1 = newCell1[1]
        //     matrix[this.y][this.x] = 1
        //     matrix[newY1][newX1] = 5
        //     this.x = newX1
        //     this.y = newY1
        //     for (const i in grassArr) {
        //         if (!(grassArr[i].x == newX1 && grassArr[i].y == newY1)) continue;
        //         grassArr.splice(i, 1);
        //     }
        // }
    }

    die() {
        // console.log(11);
        matrix[this.y][this.x] = 0;
        for (let i in antivirusArr) {
            if (this.x == antivirusArr[i].x && this.y == antivirusArr[i].y) {
                antivirusArr.splice(i, 1);
                break;
            }
        }
    }
}