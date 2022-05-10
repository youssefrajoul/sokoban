"use strict";

let states = [];
/**
 * This function display map from levels Object in browser console
 * @param {number} level
 */
function buildLevel(level) {
    $("#world").empty();
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
    states.push(getSquareAt(position));
    if (dir && !fin) {
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
            states.push(getSquareAt(newPosition));
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
    if (allOnTarget() && !fin) {
        finishLevel();
    }
}

// /**
//  * @param {KeyboardEvent} e
//  */
//  function playerImage (e) {
//     if (e.keyCode === 38) {
//         return "joueur-up";
//     } else {
//         return "joueur-front";
//     }
// }

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
// arreter le joueur de jouer
let fin = false;
/**
 * @param {KeyboardEvent} e
 */
function finishLevel() {
    $("#parag").append("!! Press space to go to the next Level !!");
    localStorage.setItem(`level ${levelCounter}`, `${incrMoves-1}`);
    $("#score").text(`Your Score : ${localStorage.getItem(`level ${levelCounter}`)}`);
    if (levelCounter === 6) {
        afficheEnd();
    }
    fin = true;
    window.addEventListener("keydown", (e) => {
        if (allOnTarget()) {
            if (e.keyCode === 32 && levelCounter < 6) {
                levelCounter++;
                initLevel(levelCounter);
            }
        }
    });
}

let levelCounter = 0;

/**
 * @param {any} level
 */
function initLevel(level) {
    incrMoves = 0;
    $("#world").empty();
    $("#parag").empty();
    $("#info").text(`Level : ${level + 1}`);
    if (localStorage.getItem(`level ${levelCounter}`) !== null) {
        $("#score").text(`Your Score : ${localStorage.getItem(`level ${levelCounter}`)}`);
    } else {
        $("#score").text("Your Score : --");
    }
    $("#best-score").text(`Best Score : ${levels[levelCounter].best}`);
    incMoves();
    buildLevel(level);
    fin = false;
}

function afficheEnd() {
    $("#parag").empty();
    $("#parag").append("!! CONGRATULATIONS !!! YOU DID IT. YOU HAVE SUCCESSFULLY COMPLETED THE SOKOBAN GAME !!");
    fin = false;
}

buildLevel(levelCounter);
incMoves();
$("#info").text(`Level : ${levelCounter + 1}`);
//$("#score").text(`Your Score : ${localStorage.getItem(`level ${levelCounter}`)}`);
if (localStorage.getItem(`level ${levelCounter}`) !== null) {
    $("#score").text(`Your Score : ${localStorage.getItem(`level ${levelCounter}`)}`);
} else {
    $("#score").text("Your Score : --");
}

if (levels[levelCounter].best === undefined) {
    $("#best-score").text("Best Score : n'existe pas(comming soon)");
} else {
    $("#best-score").text(`Best Score : ${levels[levelCounter].best}`);
}

$("#restart").on("click", function () {
    initLevel(levelCounter);
});

window.addEventListener("keydown", (e) => {
    move(e);
});

const modal = document.querySelector(".modal");
const trigger = document.querySelector("#trigger");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

window.addEventListener("keydown", (e) => {
    if (e.keyCode === 85) {
        console.log("message : cc");
    }
});
