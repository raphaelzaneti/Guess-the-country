const hintsDictionary = {
    0: 'capital',
    1: 'continent',
    2: 'currency_name',
    3: 'tld',
    4: 'elevation',
    5: 'government',
    6: 'independence',
    7: 'landlocked',
    8: 'languages',
    9: 'expectancy',
    10: 'population',
    11: 'religion',
    12: 'area',
    13: 'abbreviation',
    14: 'flag'
}

function mapHintsDictionary(arr) {
    let trueHints = []
    let falseHints = []
    let nullHints = []

    arr.map((hint, i) =>{
        if(hint === true){
            trueHints.push(hintsDictionary[i])
        } else if(hint === false){
            falseHints.push(hintsDictionary[i])
        } else{
            nullHints.push(hintsDictionary[i])
        }
    })

    const usedHints = {
        true: trueHints,
        false: falseHints,
        null: nullHints
    }

    return usedHints

}

async function handleHints(arr, hint){
    const usedHints = mapHintsDictionary(arr)

    const hintsGenerated = usedHints.true
    const nOfHints = usedHints.true.length
    const hintToAnswer = hintsDictionary[hint]

    return {hints_generated: hintsGenerated, n_of_hints: nOfHints, hint_to_answer: hintToAnswer}
}

module.exports = {handleHints}