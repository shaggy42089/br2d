const { PickupItem } = require("./PickupItem");

class Weapon extends PickupItem {
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

    addAmmo(size) {
        this.#ammoLeft += size;
    }

    reload() {
        let tobeAdded = Math.min(this.#ammoLeft, (this.#magSize - this.#inMag));
        this.#ammoLeft -= tobeAdded;
        this.#inMag += tobeAdded;
    }
}

module.exports = {
    Weapon
}