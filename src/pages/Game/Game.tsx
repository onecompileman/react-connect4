import Connect4Board from 'components/Connect4Board';
import Logo from 'components/Logo';
import { PlayerType } from 'constants/PlayerType';
import React from 'react';
import PlayerTag from './components/PlayerTag';
import './Game.scss';
import turnRedImg from 'assets/images/turn-background-red.svg';
import TurnIndicator from './components/TurnIndicator';
import { GameConclusionType } from 'constants/GameConclusionType';

function Game() {
  const onGameConcludedHandler = (gameConclusion: GameConclusionType) => {

  }


  return (
    <div className="game">
        <div className="game__header">
        <div className="game__button">
            MENU
         </div>
        <Logo />
        <div className="game__button">
            RESTART
         </div>
        </div>
        
        <div className="game__container">
           <PlayerTag playerScore={0} playerType={PlayerType.PLAYER_1} />
           <Connect4Board onGameConcluded={onGameConcludedHandler}/>
           <PlayerTag playerScore={0} playerType={PlayerType.CPU} />
           <div  className="game__turn-indicator-wrapper">
                <TurnIndicator playerType={PlayerType.PLAYER_1} seconds={15}/>
            </div>
        </div>
    </div>
  );
}

export default Game;
