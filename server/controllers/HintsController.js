const {hintsCounter, setHintsCounter, setAllHints, clearAllHints} = require("../utils/hintsCounter")

module.exports = class HintsController {


    static async generateNewHint(req, res) {
        res.send(setHintsCounter())
    }

    static async generateAllHints(req, res){
        
        res.send(setAllHints())
    }

    static async clearHints(req, res) {
        clearAllHints()
        
        const nullHints = req.query.null_hints

        nullHints.map((e, i) => {
            if(e==='null'){
                hintsCounter[i] = null
            }
        })

        res.send(setHintsCounter())
    }

}