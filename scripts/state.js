"use strict";

class State {
    /**
     * @param {{ (): () => any; x?: number; y?: number; }} playerPosition
     * @param {(() => any) | undefined} [boxPosition]
     * @private
     */
    constructor(playerPosition, boxPosition) {
        this.playerPosition = playerPosition;
        this.boxPosition = boxPosition;
    }

    playerPosition() {
        return this.playerPosition;
    }

    boxPosition() {
        return this.boxPosition;
    }
}

const s = new State({x: 1, y: 2});
const pos = s.playerPosition;
pos.x = 20;
console.log(s.playerPosition); // réponse correcte { x: 1, y: 2 }

s.playerPosition.y = 50;
console.log(s.playerPosition); // réponse correcte { x: 1, y: 2 }
