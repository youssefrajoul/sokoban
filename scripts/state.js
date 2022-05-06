"use strict";

class State {
    //@private
    #playerPosition;
    #boxPosition;

    
    /**
     * @param {{ x: number; y: number; }} playerPos
     */
    constructor(playerPos) {
        this.#playerPosition = {
            x : playerPos.x,
            y : playerPos.y,
        };
    }

    get playerPosition() {
        return {
            x : this.#playerPosition.x,
            y : this.#playerPosition.y,
        };
    }

    get boxPosition() {
        return this.#boxPosition;
    }
}

const s = new State({x:1, y:2});
const pos = s.playerPosition;
pos.x = 20;
console.log(s.playerPosition); // réponse correcte { x: 1, y: 2 }

s.playerPosition.y = 50;
console.log(s.playerPosition); // réponse correcte { x: 1, y: 2 }
