const {hintsCounter, setHintsCounter} = require("../utils/hintsCounter")

module.exports = class HintsController {


    static async generateNewHint(req, res) {
        
        res.send(setHintsCounter())
    }

    static async clearHints(req, res) {
        hintsCounter.fill(false)
        
        const nullHints = req.query.null_hints
        
        nullHints.map((e, i) => {
            if(e==='null'){
                hintsCounter[i] = null
            }
        })

        res.send(setHintsCounter())
    }

}