import React from 'react';
import './TurnIndicator.scss';
import turnRedImg from 'assets/images/turn-background-red.svg';
import turnYellowImg from 'assets/images/turn-background-yellow.svg';
import { PlayerType } from 'constants/PlayerType';

type TurnIndicatorProps = {
    playerType: PlayerType,
    seconds: number
}

function TurnIndicator(props: TurnIndicatorProps) {
   
  const playerNames = ['CPU', 'PLAYER 1', 'PLAYER 2'];
  const playerName = playerNames[props.playerType];
  const turnImg = props.playerType === PlayerType.PLAYER_1 ? turnRedImg : turnYellowImg;

  return (
        <div  className="turn-indicator">
            <img src={turnImg} />
            <div>
                <span>{ playerName }'S TURN</span>
                <b>{props.seconds}s</b>
            </div>
        </div>
  );
}

export default TurnIndicator;
