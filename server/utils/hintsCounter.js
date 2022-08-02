let hintsCounter = Array(15).fill(false)

function setHintsCounter() {
    let hintIndex = Math.floor(Math.random() * 15)

    if (hintsCounter[hintIndex] === true || hintsCounter[hintIndex] === null) {
        while (hintsCounter[hintIndex] === true || hintsCounter[hintIndex] === null) {
            hintIndex = Math.floor(Math.random() * 15)
        }
        hintsCounter[hintIndex] = true
    } else {
        hintsCounter[hintIndex] = true
    }
    
    return hintsCounter

}

module.exports = {hintsCounter, setHintsCounter}