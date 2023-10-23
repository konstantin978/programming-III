const LivingCreature = require("./livingCreature")
const random = require("./random");

module.exports = class Laser extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 1;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y],
            [this.x + 1, this.y],
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character)
    }

    active() {
        if (this.energy >= 1) {
            var newCell = random(this.chooseCell(0));
            if (newCell) {
                let newlaser = new Laser(newCell[0], newCell[1], this.index);
                laserArr.push(newlaser);
                matrix[newCell[1]][newCell[0]] = 7;
                this.energy = 10;
            }

            this.energy--;
        } else if (this.energy <= 0) {
            this.die();
        }
    }

die() {
    matrix[this.y][this.x] = 0;
    for (let i in laserArr) {
        if (this.x == laserArr[i].x && this.y == laserArr[i].y) {
            laserArr.splice(i, 1);
            break;
        }
    }
}

}
