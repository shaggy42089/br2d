const { constTab } = require("../../consts");
const { PickupItem } = require("./PickupItem");

class HealthPack extends PickupItem {
    pickup(player) {
        if (player.health === constTab.playerHealth) return;
        
        this.pick();
    }
}

module.exports = {
    HealthPack
}