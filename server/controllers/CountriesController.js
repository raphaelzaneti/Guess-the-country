const {conn, pool, runQuery} = require('../db/db')
const { CountryModel } = require('../models/Country')
const { HintModel } = require('../models/Hint')
const { fillGeneratedCountires, getAllGeneratedCountries, getCurrentCountry, 
    updateAnsweredCountry, checkCountriesCounter, clearCountriesCounter } = require('../utils/generatedCountries')
const {handleHints} = require('../utils/hintsDictionary')
const {generateRandomId} = require('../utils/randomCountryId')

let idControl = []

module.exports = class CountriesController{

    static async startDb(req, res){

        const testQuery = 'SELECT country_name FROM countries WHERE country_id=1'
        runQuery(testQuery)

        console.log('db is running')
        
    }

    static async getCountriesFromDb(req, res){
        
        console.log(req.body.params)
        const selectedIds = generateRandomId(req.body.params.countries)

        const countriesArr = await CountryModel.getNCountries(selectedIds)

        console.log(countriesArr)
        fillGeneratedCountires(countriesArr)
        res.send(getCurrentCountry())
    }

    static async generateNewCountry(req, res){
        res.send( await getCurrentCountry())
    }

    static async validateCountry(req, res){
        //Convert country response to lower case (before it, just force it to be a string)
        const country = String(req.body.data.country).toLowerCase()
        const id = req.body.data.id
        const currentHint = req.body.data.current_hint
        const hintsList = req.body.data.hints_list
        const correctCountry = getCurrentCountry()
        console.log(req.body.data)
        //When validating the result, convert correct country to lower case, to make sure that response/validation ignore cases
        const result = correctCountry.country_name.toLowerCase() === country ? true : false

        
        const hintsMapped = await handleHints(hintsList, currentHint)
        const answeredCountry = await updateAnsweredCountry(hintsMapped, result)        
        
        if(correctCountry === null || checkCountriesCounter()){
            
            await CountryModel.saveAnswersDb(getAllGeneratedCountries())
            clearCountriesCounter()
            res.send({finished: true})
            return
        }

        await res.send({country: correctCountry.country_name, abbr: correctCountry.abbreviation, result: result, finished: false})
    }

    //old methods


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