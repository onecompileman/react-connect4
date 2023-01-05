import React from 'react';
import './TurnIndicator.scss';
import turnRedImg from 'assets/images/turn-background-red.svg';
import turnYellowImg from 'assets/images/turn-background-yellow.svg';
import { DiscType } from 'constants/DiscType';

type TurnIndicatorProps = {
    discType: DiscType;
    seconds: number;
    name: string;
}

function TurnIndicator(props: TurnIndicatorProps) {
   
  const turnImg = props.discType === DiscType.RED ? turnRedImg : turnYellowImg;

  return (
        <div  className="turn-indicator">
            <img src={turnImg} alt='turn-img' />
            <div>
                <span>{ props.name }'S TURN</span>
                <b>{props.seconds}s</b>
            </div>
        </div>
  );
}

export default TurnIndicator;
