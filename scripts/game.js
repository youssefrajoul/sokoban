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
            if (square === "boite" || square === "joueur") {
                div.append($("<div>").addClass(`sol ${square}`))
                $("#world").append(div);
            } else if (square === "boite-sur-cible") {
                div.append($("<div>").addClass(`cible ${square}`))
                $("#world").append(div);
            } else {
                div.append($("<div>").addClass(square))
                $("#world").append(div);
            }
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
        console.log(secondPosition);
    }

    if (getSquareAt(newPosition).hasClass("boite-sur-cible") && getSquareAt(secondPosition).hasClass("cible") && !getSquareAt(secondPosition).hasClass("boite-sur-cible")) {
        getSquareAt(position).removeClass("joueur");
        getSquareAt(newPosition).removeClass("boite-sur-cible");
        getSquareAt(newPosition).addClass("joueur");
        getSquareAt(secondPosition).addClass("boite-sur-cible");
    } else if (getSquareAt(newPosition).hasClass("boite-sur-cible") && getSquareAt(secondPosition).hasClass("sol")) {
        getSquareAt(position).removeClass("joueur");
        getSquareAt(newPosition).addClass("joueur");
        getSquareAt(newPosition).removeClass("boite-sur-cible");
        getSquareAt(secondPosition).addClass("boite");
    } else if (getSquareAt(newPosition).hasClass("boite") && getSquareAt(secondPosition).hasClass("cible") && !getSquareAt(secondPosition).hasClass("boite-sur-cible")) {
        getSquareAt(position).removeClass("joueur");
        getSquareAt(newPosition).removeClass("boite");
        getSquareAt(newPosition).addClass("joueur");
        getSquareAt(secondPosition).addClass("boite-sur-cible");
    } else if (getSquareAt(newPosition).hasClass("boite") && !getSquareAt(secondPosition).hasClass("boite") && !getSquareAt(secondPosition).hasClass("boite-sur-cible") && getSquareAt(secondPosition).hasClass("sol")) {
        getSquareAt(position).removeClass("joueur");
        getSquareAt(newPosition).removeClass("boite");
        getSquareAt(newPosition).addClass("joueur");
        getSquareAt(secondPosition).addClass("boite");
    } else if (getSquareAt(newPosition).hasClass("cible") && !getSquareAt(newPosition).hasClass("boite-sur-cible")) {
        getSquareAt(position).removeClass("joueur");
        getSquareAt(newPosition).addClass("joueur");
    } else if (getSquareAt(newPosition).hasClass("sol") && !getSquareAt(newPosition).hasClass("boite")) {
        getSquareAt(position).removeClass("joueur");
        getSquareAt(newPosition).addClass("joueur");
    }
}
window.addEventListener("keydown", (e) => {
    move(e);
});
