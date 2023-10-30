import consts from 'consts.js';

class Item {    
    #name;
    #posX;
    #posY;
    constructor (name, x, y) {
        this.name = name,
        this.pos = x;
        this.posY = y
    }
}

class Weapon extends Item {
    #fireRate;
    #magSize;
    #assetPath;
    #range;
    #ammoLeft;
    #inMag;

    constructor (fireRate, magSize, assetPath, name, x, y) {
        super(name, x, y);
        this.fireRate = fireRate;
        this.magSize = magSize;
        this.#ammoLeft = magSize;
        this.inMag = magSize;
        this.assetPath = assetPath;
        this.range = range;
    }
}

class HealthPack extends Item {

}

class Mag extends Item {
    
}

class Player {
    #name;
    #health = 100;
    // todo: shield and potions
    #posX;
    #posY;
    #plannedDirection = [0,0];
    #slots = {
        1:null,
        2:null,
        3:null
    };

    constructor (name) {
        this.name = name;
    }

    /**
     * @param {number} nx
     */
    set x (nx) {
        this.#x=nx
    }

    /**
     * @param {number} ny
     */
    set y (ny) {
        this.#y=ny
    }

    /**
     * @param {number[]} direction
     */
    set plannedDirection (direction) {
        if (Array.isArray(direction) && direction.length === 2 && (typeof direction[0] === 'number') && (typeof direction[1] === 'number')) {
            this.#plannedDirection = direction;
        }
    }

    updatePosition() {
        this.#x = Math.max(Math.min(this.#x + this.plannedDirection, consts.width), 0);
        this.#y = Math.max(Math.min(this.#y + this.plannedDirection, consts.height), 0);
    }
}

class Bush {
    #x;
    #y;

    constructor (x,y) {
        this.x=x;
        this.y=y;
    }
}

export default [Player, Item, Weapon, HealthPack, Mag, Bush];