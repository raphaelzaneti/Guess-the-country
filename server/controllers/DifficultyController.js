const {conn, runQuery} = require('../db/db')
const {calculateDifficulty} = require('../utils/calculateDifficulty')

module.exports = class DifficultyController {
    
    static async updateDifficultyTable(req, res){
        
        const getDataQuery = `SELECT c.country_id, c.country_name, COUNT(a.is_correct) AS total_answers, 
        SUM(a.is_correct) AS corrects, SUM(a.n_of_hints) AS total_hints
        FROM answers a INNER JOIN countries c WHERE c.country_id=a.country_id 
        GROUP BY c.country_id ORDER BY total_answers DESC, corrects DESC, total_hints ASC;`

        conn.query(getDataQuery, async (err, data) =>{
            if(err){
                console.log(err)
            } else{
                await data.map(e =>{
                    const difficultyCalculated = calculateDifficulty(e)

                    const setDifficultyQuery = `INSERT INTO Difficulty(country_id, correct_answers, 
                        wrong_answers, hints_to_guess, difficulty_points, difficulty_level)
                            VALUES(${difficultyCalculated.country_id}, ${difficultyCalculated.corrects}, 
                                ${difficultyCalculated.wrong_answers}, ${difficultyCalculated.hints_to_guess},
                                ${difficultyCalculated.difficulty_points}, ${difficultyCalculated.difficulty_level})
                            ON DUPLICATE KEY UPDATE correct_answers=${difficultyCalculated.corrects}, 
                            wrong_answers=${difficultyCalculated.wrong_answers}, hints_to_guess=${difficultyCalculated.hints_to_guess},
                            difficulty_points=${difficultyCalculated.difficulty_points}, difficulty_level=${difficultyCalculated.difficulty_level}
                    `

                    conn.query(setDifficultyQuery, async (err, data) =>{
                        if(err){
                            console.log(err)
                        } else{
                            //console.log('difficulty levels updated in db')
                        }
                    })
                })
            }
        })

    }
}