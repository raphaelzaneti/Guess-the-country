const express = require('express')
const app = express()
const cors = require('cors')

const port = 3001

const {conn, connectDB} = require('./db/db')
const {rundDB, updateTable} = require('./db/generateCountriesDB.js')
const {hintsCounter, generateNewHint, clearHints} = require('./controllers/HintsController')

app.use(cors())
app.use(express.json())

const countriesRoutes = require('./routes/countriesRoutes')
app.use('/countries', countriesRoutes)

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