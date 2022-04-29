/**
 * This function display map from levels Object in browser console
 * @param {number} level
 */
 function buildLevel(level) {
    const div = $("<div>");
    
    for (let i = 0; i < levels[level].map.length; i++) {
        $("#world").append($("<div>").append($("<div>").append(levels[level].map[i])));
    }
}