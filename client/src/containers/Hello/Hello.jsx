import React, { useState } from 'react'
import axios from 'axios';

import './hello.css'
import Button from '../../components/Button'
import Rules from '../../components/Rules'
import Game from '../Game'
import Header from '../Header/Header'

const Hello = () => {

    const [renderGame, setRenderGame] = useState(false)

    function dbTest(){
        axios.get('http://localhost:3001/countries/test')
    }

    dbTest()

    return (
        <>
            <div className="bg-img" />
            <section className="game-container">
                <Header />
                {renderGame
                    ? <Game />
                    :
                    <main>
                        <div className='hello__button-area'>
                            <Button
                                caption="START GAME"
                                type="button"
                                id="start"
                                className="text-center hello__home-btn"
                                onClick={()=>setRenderGame(true)}
                                />

                            <Rules />
                            <Button 
                                caption="STATISTICS" 
                                className="text-center hello__home-btn" 
                            />
                            <Button 
                                caption="CHANGE COUNTRIES DATA" 
                                className="text-center hello__home-btn" 
                            />
                        </div>
                    </main>

                }


            </section>
        </>
    )
}

export default Hello