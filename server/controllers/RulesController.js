const fs = require('fs')
const { basename } = require('path')
const path = require('path')

module.exports = class RulesController {
    static async readRules(req, res){
        const rulesTxt = path.join(__dirname+'/rules/game-rules.txt')
        
        let rules = fs.readFileSync(rulesTxt, 'utf-8')

        res.send(rules)
    }
}