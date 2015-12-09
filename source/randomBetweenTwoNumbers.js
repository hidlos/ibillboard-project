function Randomize (low, high) { // funkce random v intervalu
    return Math.floor(Math.random() * (high - low + 1) + low);
}
exports.randomize = Randomize;