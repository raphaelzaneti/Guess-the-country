const mysql = require('mysql')
require('dotenv').config()

const dbPassword = process.env.DB_PASSWORD

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: dbPassword,
    database: 'guess_the_country'
})


function connectDB(){}
module.exports = {conn, connectDB}