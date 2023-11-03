const { GameElement } = require("../GameElement");

class PickupItem extends GameElement {
    #name;
    #owner = null;
    #pickedUp = false;

    constructor() {
        if (new.target === PickupItem) {
            throw new Error("GameElement is an Abstract class and thus should not be impemented");
        }
    }

    pickup() {
        // nothing
    }

    pick() {
        this.#pickedUp = true;
    }

    set owner (player) {
        this.#owner = player;
    }

    get owner () {
        return this.#owner
    }

    set name (name) {
        this.#name = name;
    }

    get name () {
        return this.#name
    }
}

module.exports = {
    PickupItem
}