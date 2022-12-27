import Connect4Board from 'components/Connect4Board';
import Logo from 'components/Logo';
import { PlayerType } from 'constants/PlayerType';
import React from 'react';
import PlayerTag from './components/PlayerTag';
import './Game.scss';

function Game() {
  return (
    <div className="game">
        <Logo />
        <div className="game__container">
           <PlayerTag playerScore={0} playerType={PlayerType.PLAYER_1} />
           <Connect4Board />
           <PlayerTag playerScore={0} playerType={PlayerType.CPU} />
        </div>
    </div>
  );
}

export default Game;
