const express = require('express')
const app = express()
const cors = require('cors')

const port = 3001

const {conn, connectDB} = require('./db/db')
const {hintsCounter, generateNewHint, clearHints} = require('./controllers/HintsController')

app.use(cors())
app.use(express.json())

const countriesRoutes = require('./routes/countriesRoutes')
app.use('/countries', countriesRoutes)
const hintsRoutes = require('./routes/hintsRoutes')
app.use('/hints', hintsRoutes)

app.listen(port, () => console.log("server running on port "+port))