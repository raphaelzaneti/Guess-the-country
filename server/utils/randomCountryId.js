function generateRandomId(n) {

    let generatedIds = []

    for(let i = 0; i<n; i++){
        let randomId = Math.floor((Math.random() * (247 - 0) + 1))
        if(generatedIds.some(a => a === randomId)){
            while (generatedIds.some(a => a === randomId)) {
                randomId = Math.floor((Math.random() * (247 - 0) + 1))
            }
        }
        generatedIds.push(randomId)
    }

    return generatedIds

}

module.exports = { generateRandomId }