import React, { useState } from 'react'
import axios from 'axios';

import './hello.css'
import Button from '../../components/Button'
import Rules from '../../components/Rules'
import Game from '../Game'
import Header from '../Header/Header'

const Hello = () => {

    const [renderGame, setRenderGame] = useState(false)

    function backendTest(){
        console.log('entrou')
        axios.get('http://localhost:3001/teste', {params: {name: "Brazil"}})
            .then(res => console.log(res.data))
    }

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
                                class="text-center btn btn-dark"
                                onClick={()=>setRenderGame(true)}
                                />

                            <Rules />

                            <button type="button" onClick={backendTest}>teste</button>
                        </div>
                    </main>

                }


            </section>
        </>
    )
}

export default Hello