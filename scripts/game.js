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
    ["@", "cible boite"],
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
    $("#compteur").text(`Steps : ${incrMoves}`);
    incrMoves++;
}

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
    if (dir && fin) {
        newPosition.x += dir.dx;
        newPosition.y += dir.dy;
        secondPosition.x += 2 * dir.dx;
        secondPosition.y += 2 * dir.dy;
        if (checkSiVide(newPosition)) {
            getSquareAt(newPosition)
                .addClass("joueur");
            getSquareAt(position)
                .removeClass("joueur")
                .addClass("sol");
            incMoves();
        } else if (checkBoite(newPosition) && checkSiVide(secondPosition)) {
            getSquareAt(position)
                .removeClass("joueur")
                .addClass("sol");
            getSquareAt(newPosition)
                .removeClass("boite")
                .removeClass("boite-sur-cible")
                .addClass("joueur");
            getSquareAt(secondPosition)
                .addClass("boite");
            incMoves();
        }
    }
    if (allOnTarget() && fin) {
        finishLevel();
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
function checkSiVide(position) {
    return !checkBoite(position) && !checkMur(position);
}

function allOnTarget() {
    let allOnTargetBoolean = true;
    $(".cible").each(function(i) {
        if (!$(this).hasClass("boite")) {
            allOnTargetBoolean = false;
        }
    });
    return allOnTargetBoolean;
}

let fin = true;
/**
 * @param {KeyboardEvent} e
 */
function finishLevel() {
    $("#parag").append("!! Press space to go to the next Level !!");
    if (levelCounter === 6) {
        afficheEnd();
    }
    fin = false;
    window.addEventListener("keydown", (e) => {
        if (allOnTarget()) {
            if (e.keyCode === 32 && levelCounter < 6) {
                levelCounter++;
                initLevel(levelCounter);
            }
        }
    });
}

let levelCounter = 6;

/**
 * @param {any} level
 */
function initLevel(level) {
    incrMoves = 0;
    $("#world").empty();
    $("#parag").empty();
    $("#info").text(`Level : ${level}`);
    incMoves();
    buildLevel(level);
    fin = true;
}

function afficheEnd() {
    $("#parag").empty();
    $("#parag").append("!! CONGRATULATIONS !!! YOU DID IT. YOU HAVE SUCCESSFULLY COMPLETED THE SOKOBAN GAME !!");
    fin = true;
}

buildLevel(levelCounter);
incMoves();
$("#info").text(`Level : ${levelCounter}`);

window.addEventListener("keydown", (e) => {
    move(e);
});
