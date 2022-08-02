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

function setAllHints(){
    hintsCounter = hintsCounter.map(e => e===null ? null : true)
    return hintsCounter
}

function clearAllHints(){
    hintsCounter.fill(false)
}

module.exports = {hintsCounter, setHintsCounter, setAllHints, clearAllHints}