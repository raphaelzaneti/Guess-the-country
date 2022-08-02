const mysql = require('mysql')
require('dotenv').config()


const dbPassword = process.env.DB_PASSWORD
const dbPort = process.env.DB_PORT

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: dbPort,
    password: dbPassword,
    database: 'guess_the_country'
})

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: dbPassword,
    database: 'guess_the_country'
})

function runQuery(query, description) {
    conn.query(query, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log(description)
        }
    })
}

function connectDB(){}
module.exports = {conn, pool, connectDB, runQuery}