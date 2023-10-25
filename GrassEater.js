const LivingCreature = require("./livingCreature")
const random = require("./random");

module.exports = class GrassEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 8;
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
    mul() {
        var newCell = random([...this.chooseCell(0), ...this.chooseCell(7)]);
        if (newCell) {
            let newGrassE = new GrassEater(newCell[0], newCell[1], this.index);
            grassEaterArr.push(newGrassE);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 8;
        } else if (matrix[newCell[1]][newCell[0]] == 7) {
            this.die();
        }
    }

    eat() {
        let foods = this.chooseCell(1)
        let food = random(foods)
        if (food) {
            this.energy++;
            matrix[this.y][this.x] = 0
            let newX = food[0]
            let newY = food[1]
            matrix[food[1]][food[0]] = 2
            this.x = newX
            this.y = newY
            for (const i in grassArr) {
                if (!(grassArr[i].x == newX && grassArr[i].y == newY)) continue;
                grassArr.splice(i, 1);
            }
            if (this.energy >= 12) {
                this.mul()
            }
        }
        else {
            this.move()
        }
    }

    move() {
        this.energy--;
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = 2
            this.x = newX
            this.y = newY
        }

        if (this.energy <= 0) {
            this.die()
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}