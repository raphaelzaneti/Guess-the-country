const express = require('express')
const app = express()
const cors = require('cors')

const port = 3001

const {conn, connectDB} = require('./db/db')
const {rundDB, updateTable} = require('./db/generateCountriesDB.js')
const {hintsCounter, generateNewHint, clearHints} = require('./controllers/HintsController')

app.use(cors())
app.use(express.json())


app.get('/teste', async (req, res) =>{
    
    console.log(req.query.name)
    
    conn.query(`SELECT * FROM countries WHERE country_name="${req.query.name}"`, async (err, data) =>{

        const result = await data[0]
        console.log(data)

        res.send(result)
    })
    
})

app.get('/hints/clear', async (req, res) =>{
    clearHints(hintsCounter)
    res.send(hintsCounter)
})

app.get('/hints', async (req, res) =>{
    
    generateNewHint(hintsCounter)
    res.send(hintsCounter)
    
})

rundDB()

app.listen(port, () => console.log("server running on port "+port))