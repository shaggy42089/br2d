class GameElement {
    #x;
    #y;
    #assetPath='';

    constructor() {
        if (new.target === GameElement) {
            throw new Error("GameElement is an Abstract class and thus should not be impemented");
        }
    }

    /**
     * @param {number} nx
     */
    set x (nx) {
        this.#x=nx;
    }

    get x () {
        return this.#x;
    }

    /**
     * @param {number} ny
     */
    set y (ny) {
        this.#y=ny;
    }

    get y () {
        return this.#y;
    }
}

module.exports = {
    GameElement
}