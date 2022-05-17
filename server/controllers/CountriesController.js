const {conn} = require('../db/db')

let idControl = []

module.exports = class CountriesController{

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

            await res.send(randomCountry)
        })
    }

    static async countryValidation(req, res){
        console.log(req.body)
        const country = req.body.data.country
        const id = req.body.data.id

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
            console.log(idControl)

            await res.send(result)
        })

    }
}