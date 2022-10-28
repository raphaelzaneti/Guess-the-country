const { getCountriesFromDb } = require('../controllers/CountriesController')
const util = require('util')
const { conn, pool, runQuery } = require('../db/db')
const { fillGeneratedCountires } = require('../utils/generatedCountries')


const CountryModel = {}

CountryModel.getNCountries = async (idArray) => {

    const query = `SELECT * FROM countries WHERE country_id in (${idArray.join(`, `)})`

    let result

    const sqlCall = new Promise((res, rej) => conn.query(query, async (err, data) => {
        if (err) {
            console.log({
                query: err.sql,
                mesage: err.sqlMessage,
                code: err.code,
            })
        }
        result = data
        res(result)
    }))
    
    return sqlCall.then(res => result)

}

CountryModel.saveAnswersDb = async (answers) => {

    //add result and user to query
    const query = `INSERT INTO answers(country_id, is_correct, user_id, n_of_hints, hint_to_answer, hints_generated) 
        VALUES ${answers.map(e => ` (${e.country_id}, ${e.result ? 1 : 0}, 1, ${e.hints.n_of_hints}, '${e.hints.hint_to_answer}', '${e.hints.hints_generated}')`)};
    `
    conn.query(query, async (err, data) => {
        if (err) {
            console.log({
                query: err.sql,
                mesage: err.sqlMessage,
                code: err.code,
            })
        }
        console.log(`answer saved into db`)
    })
}




module.exports = { CountryModel }