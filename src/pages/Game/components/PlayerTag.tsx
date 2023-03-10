import { DiscType } from 'constants/DiscType';
import { PlayerType } from 'constants/PlayerType';
import React from 'react';
import './PlayerTag.scss';

type GameProp = {
    playerScore: number;
    playerType: PlayerType;
    discType: DiscType;
};

function PlayerTag(props: GameProp) {
    
  const playerNames = ['CPU', 'PLAYER 1', 'PLAYER 2'];
  const playerName = playerNames[props.playerType];

  const playerClassName = props.discType === DiscType.RED ? 'red': 'yellow';

  return (
    <div className="player-tag">
        <div className={`player-tag__disc player-tag__disc--${playerClassName}`}>

        </div>
        <span>{playerName}</span>
        <b>{props.playerScore || 0}</b>
    </div>
  );
}

export default PlayerTag;
