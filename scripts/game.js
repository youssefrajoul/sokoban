/**
 * This function display map from levels Object in browser console
 * @param {number} level
 */
 function buildLevel(level) {
    const div = $("<div>");
    
    for (let i = 0; i < levels[level].map.length; i++) {
        for (let j = 0; j < levels[level].map[i].length; j++) {
            if (squaresMap.has(levels[level].map[i][j])) {
                let square = squaresMap.get(levels[level].map[i][j]);
                $("#world").append($("<div>").append($("<div>").addClass(`${square}`)));
            } else {
                $("#world").append($("<div>").append($("<div>").addClass(`mur`)));
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
  ])