const express = require('express')
const app = express()
const cors = require('cors')

const port = 3001

const getCountries = require('./getCountries')
const {rundDB, updateTable} = require('./db/db.js')

app.use(cors())
app.use(express.json())


app.get('/teste', async (req, res) =>{
    
    console.log(req.query.name)
    res.send(await getCountries(req.query.name))
})

rundDB()

app.listen(port, () => console.log("server running on port "+port))