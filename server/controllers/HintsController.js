

let hintsCounter = Array(15).fill(false)

function generateNewHint(hints){
    let hintIndex = Math.floor(Math.random()*15)
    
    if(hints[hintIndex] === true){
        while(hints[hintIndex] === true){
            hintIndex = Math.floor(Math.random()*15)
        }
        hints[hintIndex] = true
    } else{
        hints[hintIndex] = true
    }
}

function clearHints(hints){
    hints = hints.fill(false)
}

module.exports = {hintsCounter, generateNewHint, clearHints}