/**
 * This function display map from levels Object in browser console
 * @param {number} level
 */
 function buildLevel(level) {
    for (let i = 0; i < levels[level].map.length; i++) {
        console.log(levels[level].map[i]);
    }
}