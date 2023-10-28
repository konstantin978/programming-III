const LivingCreature = require("./livingCreature")
const random = require("./random");

module.exports = class Grass extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)

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
    mul() {
        grassSt++;
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (weather == 'winter') {
            if (this.multiply >= 8 && newCell) {
            const newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
            grassStat++;
            }
        }   else if (weather == 'spring' && weather == 'autumn') {
            if (this.multiply >= 4 && newCell) {
            const newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
            grassStat++;
            }
        }   else if (weather == 'summer') {
            if (this.multiply >= 2 && newCell) {
            const newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
            grassStat++;
            }
        }

    }

    // die() {
    //     for (let i in grassArr) {
    //         if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
    //             grassArr.splice(i, 1);
    //             break;
    //         }
    //     }
    // }

}


