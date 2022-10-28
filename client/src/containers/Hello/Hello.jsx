import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './hello.css'
import Button from '../../components/Button'
import Rules from '../../components/Rules/Rules'
import Game from '../Game'
import Header from '../Header/Header'
import Statistics from '../../components/Statistics/Statistics';
import Settings from '../../components/Settings/Settings';
import { usePlayerSettings } from '../../hooks/usePlayerSettings';

const Hello = () => {

    const [renderGame, setRenderGame] = useState(false)

    const {numberOfCountries, setNumberOfCountries} = usePlayerSettings()

    useEffect(() =>{
        if(numberOfCountries < 0){
            setRenderGame(false)
        }
    }, [numberOfCountries])

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
                            <Settings />
                            <Rules />
                            <Statistics />
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