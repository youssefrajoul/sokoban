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

const directions = new Map([
    ["ArrowUp", {dx: 0, dy: -1}],
    ["ArrowDown", {dx: 0, dy: 1}],
    ["ArrowLeft", {dx: -1, dy: 0}],
    ["ArrowRight", {dx: 1, dy: 0}],
]);

let compteurDebut = 0;

function move(e) {
    const position = {
        x: getPlayerPosition().x,
        y: getPlayerPosition().y,
    };
    const dir = directions.get(e.key);
    const newPosition = {
        x: position.x,
        y: position.y,
    };
    if (dir) {
        newPosition.x += dir.dx;
        newPosition.y += dir.dy;
    }
    if (compteurDebut === 0) {
        getSquareAt(position).removeClass();
        getSquareAt(position).addClass("sol");
        getSquareAt(position).addClass("joueur");
    }
    getSquareAt(position).removeClass("joueur");
    getSquareAt(newPosition).addClass("joueur");
    compteurDebut++;
}
window.addEventListener("keydown", (e) => {
    move(e);
});
