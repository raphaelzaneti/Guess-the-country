const mysql = require('mysql')
require('dotenv').config()

const countriesJSON = require('../assets/json/countries.json')
const continentsJSON = require('../assets/json/country-by-continent.json')
const currencyJSON = require('../assets/json/country-by-currency-name.json')
const tldJSON = require('../assets/json/country-by-domain-tld.json')
const elevationJSON = require('../assets/json/country-by-elevation.json')
const governmentJSON = require('../assets/json/country-by-government-type.json')
const independenceJSON = require('../assets/json/country-by-independence-date.json')
const landlockedJSON = require('../assets/json/country-by-landlocked.json')
const languageJSON = require('../assets/json/country-by-languages.json')
const expectancyJSON = require('../assets/json/country-by-life-expectancy.json')
const populationJSON = require('../assets/json/country-by-population.json')
const religionJSON = require('../assets/json/country-by-religion.json')
const areaJSON = require('../assets/json/country-by-surface-area.json')
const abbreviationJSON = require('../assets/json/country-by-abbreviation.json')

const {conn} = require('./db')

const dbPassword = process.env.DB_PASSWORD

conn.connect(function(err){

    const createSchema = `CREATE DATABASE IF NOT EXISTS guess_the_country`

    conn.query(createSchema, err =>{
        if(err){
            console.log(err)
        } else{
            console.log('schema ok')
            dbSetup()
        }
    })

    if(err){
        console.log(err)
    } else{
        console.log('connected to mysql')
    }

})

function dbSetup(){

    const createTable = `CREATE TABLE IF NOT EXISTS Countries(
        country_id INT AUTO_INCREMENT PRIMARY KEY,
        country_name VARCHAR(255) NOT NULL,
        capital VARCHAR(255) NOT NULL,
        continent VARCHAR(255),
        currency_name VARCHAR(255),
        tld VARCHAR(255),
        elevation INT,
        government VARCHAR(255),
        independence SMALLINT,
        landlocked VARCHAR(1),
        languages VARCHAR(255),
        expectancy SMALLINT,
        population INT,
        religion VARCHAR(255),
        area INT,
        abbreviation VARCHAR(255),
        flag VARCHAR(255),
        UNIQUE(country_name)
    )`

    conn.query(createTable, err =>{
        if(err){
            console.log(err)
        } else{
            console.log('setup ok')
            //generateCountriesDB()
            createSecondaryTables()
        }
    })
}

function updateTable(query){
    conn.query(query, err =>{
        if(err){
            console.log({
                query: err.sql,
                mesage: err.sqlMessage,
                code: err.code
            })
        }
    })  
}

function generateCountriesDB(){
    const countriesArr = Array.from(countriesJSON)
    countriesArr.map(e => {
        const query = `INSERT IGNORE INTO Countries(country_name, capital) VALUES ("${e.name}", "${e.capital}")`
        updateTable(query)
    })
    updateColumnDB(continentsJSON, 'continent')
    updateColumnDB(currencyJSON, 'currency_name')
    updateColumnDB(tldJSON, 'tld')
    updateColumnDB(elevationJSON, 'elevation')
    updateColumnDB(governmentJSON, 'government')
    updateColumnDB(independenceJSON, 'independence')
    updateColumnDB(landlockedJSON, 'landlocked')
    updateColumnDB(languageJSON, 'languages')
    updateColumnDB(expectancyJSON, 'expectancy')
    updateColumnDB(populationJSON, 'population')
    updateColumnDB(religionJSON, 'religion')
    updateColumnDB(areaJSON, 'area')
    updateColumnDB(abbreviationJSON, 'abbreviation')
    updateFlagDB()
}

function updateColumnDB(json, column){
    const dataArr = Array.from(json)
    
    if(column==='languages'){
        dataArr.map(e =>{
            const query = `UPDATE Countries SET ${column}="${e[column] === "null" ? null : e[column].join(', ')}" WHERE country_name="${e.country}"`
            updateTable(query) 
        })
    }else{
        dataArr.map(e =>{
            const query = `UPDATE Countries SET ${column}="${e[column] === "null" ? null : e[column]}" WHERE country_name="${e.country}"`
            updateTable(query) 
        })
    }
}

function updateFlagDB(){
    const countriesArr = Array.from(countriesJSON)
    countriesArr.map(e =>{
        const query = `UPDATE Countries SET flag="https://countryflagsapi.com/png/${e.name}" WHERE country_name="${e.name}"`
        updateTable(query) 
    })
    console.log('flag ok')
}

function createSecondaryTables(){
    
    const userQuery = `CREATE TABLE IF NOT EXISTS Users(
        user_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        login VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    )`

    const answersQuery = `CREATE TABLE IF NOT EXISTS Answers(
        answer_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        country_id INT NOT NULL,
        is_correct SMALLINT NOT NULL,
        user_id INT NOT NULL,
        n_of_hints INT NOT NULL,
        hint_to_answer VARCHAR(255) NOT NULL,
        hints_generated VARCHAR(255) NOT NULL,

        FOREIGN KEY(country_id)
            REFERENCES Countries(country_id),
        FOREIGN KEY(user_id)
            REFERENCES Users(user_id)
    )`

    const guestUserQuery = `INSERT IGNORE INTO Users(first_name, last_name, login, password) 
                                    VALUES('Guest', 'Player', 'guest', 'guest')`

    const difficultyQuery = `CREATE TABLE IF NOT EXISTS Difficulty(
        country_id INT NOT NULL,
        correct_answers INT NOT NULL,
        wrong_answers INT NOT NULL,
        hints_to_guess INT NOT NULL,
        difficulty_points FLOAT(4, 3) NOT NULL,
        difficulty_level INT NOT NULL,

        FOREIGN KEY(country_id)
            REFERENCES Countries(country_id),
        PRIMARY KEY(country_id)
    )`

    updateTable(userQuery)
    updateTable(answersQuery)
    updateTable(difficultyQuery)
    //updateTable(guestUserQuery)

    console.log('secondary tables ok')

}

function rundDB(){}

module.exports = {rundDB}