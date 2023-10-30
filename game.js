import ItemJs from 'Item.js';
const [Player, Item, Weapon, HealthPack, Mag] = ItemJs;

import constTab from 'consts.js'

let gameloop = true;
let players = []
let items = []

players.push(new Player("toto"))

for (let i=0; i<players.length; ++i) {
    //todo : better shit
    players[i].x= constTab.borderOffset + (i%2)*(constTab.width/2-constTab.borderOffset);
    players[i].y= constTab.borderOffset + Math.floor(i/2)*(constTab.height/2-constTab.borderOffset);
}

let itemCount = constTab.ItemThreshold[0] + Math.floor(Math.random()*(constTab.ItemThreshold[1]-constTab.ItemThreshold[0]))


// for (let i = 0; i < itemCount; i++) {
//     //
// }

class Game {
    #players;
    #items;


    constructor ()

    tick() {
        for (let p of players) {
            p.updatePosition()
        }
    }
}
