const {conn, pool, runQuery} = require('../db/db')
const {handleHints} = require('../utils/hintsDictionary')

let idControl = []

module.exports = class CountriesController{

    static async startDb(req, res){

        const testQuery = 'SELECT country_name FROM countries WHERE country_id=1'
        runQuery(testQuery)

        console.log('db is running')
        
    }

    static async generateRandomCountry(req, res){


        let randomId = Math.floor((Math.random()*(247-0)+0))
        while (idControl.some(a=>a===randomId)) {
            randomId = Math.floor((Math.random()*(247-0)+0))
        }

        const query = `SELECT * FROM countries WHERE country_id=${randomId}`

        conn.query(query, async (err, data) =>{
            if(err){
                console.log({
                    query: err.sql,
                    mesage: err.sqlMessage,
                    code: err.code,
                })
            }

            const randomCountry = await data[0]

            console.log(randomId+` generated: `+ randomCountry)
            await res.send(randomCountry)
        })
    }

    static async countryValidation(req, res){
        const country = req.body.data.country
        const id = req.body.data.id
        const currentHint = req.body.data.current_hint
        const hintsList = req.body.data.hints_list

        console.log('id: '+ id, ' - ', country)
        const query = `SELECT * FROM countries WHERE country_id=${id}`

        conn.query(query, async (err, data) =>{
            if(err){
                console.log({
                    query: err.sql,
                    mesage: err.sqlMessage,
                    code: err.code
                })
            }

            const dbCheck = await data[0]

            const result = dbCheck.country_name === country ? true : false

            idControl.push(id)

            const hintsMapped = await handleHints(hintsList, currentHint)
            const answerQuery = `INSERT INTO 
                                    answers(country_id, is_correct, user_id, n_of_hints, hint_to_answer, hints_generated) 
                                        VALUES(${id}, ${result ? 1 : 0}, 1, ${hintsMapped.n_of_hints}, '${hintsMapped.hint_to_answer}', '${hintsMapped.hints_generated}');
                                `

            runQuery(answerQuery, 'answer added to the db')
            await res.send({country: dbCheck.country_name, abbr: dbCheck.abbreviation, result: result})
        })

    }
} 