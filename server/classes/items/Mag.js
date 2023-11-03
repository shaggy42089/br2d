const { PickupItem } = require("./PickupItem");

class Mag extends PickupItem {
    #assetPath='mag.png';
    #size;

    pickup(player) {
        if (! player.pickupMag(this.#size)) return;
        this.pick();
    }
}

module.exports = {
    Mag
}