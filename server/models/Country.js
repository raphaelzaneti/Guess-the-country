const { getCountriesFromDb } = require('../controllers/CountriesController')
const util = require('util')
const { conn, pool, runQuery } = require('../db/db')
const { fillGeneratedCountires } = require('../utils/generatedCountries')


const CountryModel = {}

CountryModel.getNCountries = async (idArray) => {

    //const query = `SELECT * FROM countries WHERE country_id in (${idArray.join(`, `)})`

    const query = `SELECT country_id, IFNULL(country_name, "Unknown") AS country_name, IFNULL(capital, "Unknown") AS capital, 
	    IFNULL(continent, "Unknown") AS continent, IFNULL(currency_name, "Unknown") AS currency_name, IFNULL(tld, "Unknown") AS tld,
	    IFNULL(elevation, 0) AS elevation, IFNULL(government, "Unknown") AS government, IFNULL(independence, "Unknown") AS independence,
	    IFNULL(landlocked, "Unknown") AS landlocked, IFNULL(languages, "Unknown") AS languages, IFNULL(expectancy, "Unknown") AS expectancy,
        IFNULL(population, 0) AS population, IFNULL(religion, "Unknown") AS religion, IFNULL(area, 0) AS area, 
        IFNULL(abbreviation, "Unknown") abbreviation, IFNULL(flag, "Unknown") AS flag
		    FROM countries WHERE country_id in (${idArray.join(`, `)});`

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

    console.log(answers)
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