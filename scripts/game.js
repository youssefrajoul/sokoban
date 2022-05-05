"use strict";

/**
 * This function display map from levels Object in browser console
 * @param {number} level
 */
function buildLevel(level) {
    for (let i = 0; i < levels[level].map.length; i++) {
        const div = $("<div>");

        for (let j of levels[level].map[i]) {
            let square = squaresMap.get(j) ?? "mur";
            div.append($("<div>").addClass(square))
                $("#world").append(div);
            //$("#world").append($("<div>").append($("<div>").addClass(`${square}`)));
        }
    }
}

const squaresMap = new Map([
    ["🧍", "joueur"],
    ["x", "cible"],
    ["#", "boite"],
    ["@", "boite-sur-cible"],
    [" ", "sol"],
]);

function getPlayerPosition() {
    const p = $("#world > div > .joueur");
    const x = p.index();
    const y = p.parent().index();
    return {
        x: x,
        y: y,
    };
}

function getSquareAt(pos) {
    const x = pos.x;
    const y = pos.y;
    const squarePos = $(`#world > div:eq(${y}) > :eq(${x})`);
    return squarePos;
}
