const { hasProps, isJson, constTab } = require("./consts");

let items = []

// let itemCount = constTab.ItemThreshold[0] + Math.floor(Math.random()*(constTab.ItemThreshold[1]-constTab.ItemThreshold[0]))

class Game {
    #players = [];
    #items = [];
    #gameLoop = false;

    addPlayer (player) {
        this.#players.push(player)
    }

    removePlayer (player) {
        this.#players.remove(player)
    }

    checkStart() {
        if (this.#players.every(p => p.isReady)) {
            this.initGame();
            this.startGame();
        }
    }

    async startGame() {
        this.#gameLoop = true;
        let delta = 0;
        let oldTime = new Date();
        let newTime = oldTime;
        while(this.#gameLoop) {
            await this.tick(delta);
            oldTime = newTime;
            newTime = new Date();
            delta = newTime - oldTime;
        }
    }

    stopGame() {
        this.#gameLoop = false;
    }

    initGame() {
        this.#players.forEach((p, i) => {
            p.x = constTab.borderOffset + (i%2)*(constTab.width/2-constTab.borderOffset);
            p.y = constTab.borderOffset + Math.floor(i/2)*(constTab.height/2-constTab.borderOffset);
        })
    }

    async tick(delta) {
        this.#players.forEach(p => {
            console.log('player ' + p.name + ' is at ' + p.posX + ',' + p.posY);
            p.updatePosition()
        })
        

        await new Promise(resolve => setTimeout(resolve, Math.max(0, (1000/constTab.tickRate)-delta)));
    }

    get isRunning() {
        return this.#gameLoop;
    }
}

module.exports = {
    Game
};