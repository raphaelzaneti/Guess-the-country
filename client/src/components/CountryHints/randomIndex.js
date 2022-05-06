let indexArray = []

export function randomIndex() {
    let number = Math.floor((Math.random()*(246-0)+0))
    while (indexArray.some(a=>a===number)) {
        number = Math.floor((Math.random()*(246-0)+0))
    }

    indexArray.push(number)
    return number
}

export default indexArray