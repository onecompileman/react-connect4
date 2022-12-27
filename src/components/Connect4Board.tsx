import React from 'react';
import BoardCol from './BoardCol';
import './Connect4Board.scss';

function Connect4Board() {
  return (
    <div className="connect-board">
       {Array(8).fill(1).map((n, index) => {
        return (
          <BoardCol key={index}/>
        )
       })}
    </div>
  );
}

export default Connect4Board;
