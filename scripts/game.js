"use strict";

/**
 * This function display map from levels Object in browser console
 * @param {number} level
 */
function buildLevel(level) {
    for (let i = 0; i < levels[level].map.length; i++) {
        const div = $("<div>");

        for (const j of levels[level].map[i]) {
            const square = squaresMap.get(j) ?? "mur";
            div.append($("<div>").addClass(`container ${square}`));
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
    const p = $("#world > div .joueur");
    const x = p.index();
    const y = p.parent().index();
    return {
        x: x,
        y: y,
    };
}

/**
 * @param {any} pos
 */
function getSquareAt(pos) {
    const x = pos.x;
    const y = pos.y;
    const squarePos = $(`#world > div:eq(${y}) > div:eq(${x})`);
    return squarePos;
}

const directions = new Map([
    ["ArrowUp", {dx: 0, dy: -1}],
    ["ArrowDown", {dx: 0, dy: 1}],
    ["ArrowLeft", {dx: -1, dy: 0}],
    ["ArrowRight", {dx: 1, dy: 0}],
]);

let incrMoves = 0;
function incMoves() {
    incrMoves++;
    $("#compteur").text(`Steps : ${incrMoves}`);
}

buildLevel(6);

/**
 * @param {KeyboardEvent} e
 */
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
    const secondPosition = {
        x: position.x,
        y: position.y,
    };
    if (dir) {
        newPosition.x += dir.dx;
        newPosition.y += dir.dy;
        secondPosition.x += 2 * dir.dx;
        secondPosition.y += 2 * dir.dy;
        if (checkVide(newPosition)) {
            getSquareAt(newPosition)
                .addClass("joueur");
            getSquareAt(position)
                .removeClass("joueur")
                .addClass("sol");
            incMoves();
        } else if (checkBoite(newPosition) && checkVide(secondPosition)) {
            getSquareAt(position)
                .removeClass("joueur")
                .addClass("sol");
            getSquareAt(newPosition)
                .removeClass("boite")
                .addClass("joueur");
            getSquareAt(secondPosition)
                .addClass("boite");
            incMoves();
        }
    }
}

/**
 * @param {any} position
 */
function checkMur(position) {
    return getSquareAt(position).hasClass("mur");
}

/**
 * @param {any} position
 */
function checkBoite(position) {
    return getSquareAt(position).hasClass("boite");
}

/**
 * @param {any} position
 */
function checkVide(position) {
    return (!checkBoite(position) && !checkMur(position));
}

window.addEventListener("keydown", (e) => {
    move(e);
});
