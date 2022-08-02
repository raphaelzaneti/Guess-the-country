
function calculateDifficulty(obj){
    const wrongAnswers = calcWrongAswers(obj.total_answers, obj.corrects)
    const correctRate = getAvg(obj.corrects, obj.total_answers)
    const AvgHintsPerAnswer = getAvg(obj.total_hints, obj.total_answers)
    
    const difficultyPoints = calcDifficultyPoints(obj.corrects, obj.total_answers, AvgHintsPerAnswer, 15)
    const difficultyLevel = getDifficultyLevel(difficultyPoints)

    const difficultyCalculated = obj
    difficultyCalculated.wrong_answers = wrongAnswers
    difficultyCalculated.hints_to_guess = AvgHintsPerAnswer
    difficultyCalculated.difficulty_points = difficultyPoints
    difficultyCalculated.difficulty_level = difficultyLevel

    return difficultyCalculated

}

function calcWrongAswers(total, corrects){
    return total-corrects
}

function getAvg(n_ref, total){
    return n_ref/total
}

function calcDifficultyPoints(correctAnswers, totalAnswers, hintsPerAnswer, totalHints){
    return (getAvg(correctAnswers, totalAnswers)*2) * (1 - getAvg(hintsPerAnswer, totalHints)).toFixed(2)
}

function getDifficultyLevel(points){
    
    let level

    switch(true){
        case(points < 0.2):
            level = 5
            break;
        case(points < 0.3):
            level = 4
            break;
        case(points < 0.4):
            level = 3
            break;
        case(points < 0.55):
            level = 2
            break;
        default:
            level = 1
    }

    return level
}

module.exports = {calculateDifficulty}