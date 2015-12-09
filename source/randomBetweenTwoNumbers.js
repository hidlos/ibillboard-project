function Randomize (low, high) { 
    return Math.floor(Math.random() * (high - low + 1) + low);
}
exports.randomize = Randomize;