const { constTab } = require('../consts');
const { GameElement } = require('./GameElement')

class Player extends GameElement{
    #name;
    #health = constTab.playerHealth;
    // todo: shield and potions
    #plannedDirection = [0,0];
    #isReady = false;
    #slots = (new Array(constTab.playerSlots)).fill(null);
    #selectedSlot = 0;

    constructor (name) {
        super();
        this.#name = name;
    }

    /**
     * @param {string} n
     */
    set name (n) {
        this.#name = n;
    }

    get name () {
        return this.#name;
    }
    
    /**
     * @param {boolean} r
     */
    set isReady (r) {
        this.#isReady = r;
    }

    get isReady() {
        return this.#isReady;
    }

    heal(amount) {
        this.#health = Math.min(constTab.playerHealth, this.#health + amount);
    }

    takeDamage(amount) {
        this.#health = Math.max(0, this.#health - amount);
    }

    /**
     * @param {number[]} direction
     */
    set plannedDirection (direction) {
        
        if (Array.isArray(direction) && direction.length === 2 && (typeof direction[0] === 'number') && (typeof direction[1] === 'number')) {
            this.#plannedDirection = direction.map(d => d*constTab.speed);
            console.log('direction is '+ this.#plannedDirection)
        }
    }

    updatePosition() {
        this.x = Math.max(Math.min(this.x    + this.#plannedDirection[0], constTab.width), 0);
        this.y = Math.max(Math.min(this.y + this.#plannedDirection[1], constTab.height), 0);
    }

    pickup(item) {
        // iterates over every slot and if an empty one is found, put the item in it
        this.#slots.every((s, i) => {
            if (s === null) {
                this.#slots[i] = item;w
                item.owner = this;
                return false;
            }

            return true;
        })
    }

    drop(slot) {
        if (typeof slot !== 'number') return;
        if (slot > (constTab.playerSlots-1) || slot < 0) return;

        this.#slots[slot].owner = null
        this.#slots[slot].x     = this.x;
        this.#slots[slot].y     = this.y;

        this.#slots[slot] = null;
    }

    pickupMag(size) {
        if (typeof slot !== 'number') return false;
        if (slot < 0) return false;

        if (this.#slots[this.#selectedSlot] !== null) {
            this.#slots[this.#selectedSlot].addAmmo(size);
        }
    }

    // todo : shoot(slot)
}

module.exports = {
    Player
}