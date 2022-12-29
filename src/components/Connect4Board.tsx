import { DiscType } from 'constants/DiscType';
import { GameConclusionType } from 'constants/GameConclusionType';
import React, { useEffect, useState } from 'react';
import { createEmptyConnect4Board } from 'utils/createEmptyConnect4Board';
import BoardCol from './BoardCol';
import './Connect4Board.scss';

type Connect4BoardProp = {
  onGameConcluded: Function;
  isAI?: boolean;
  currentPlayerDiscType?: DiscType;
}

function Connect4Board(props: Connect4BoardProp) {

  const [discTypeTurn, setDiscTypeTurn] = useState(DiscType.RED);
  const [board, setBoard] = useState(createEmptyConnect4Board());


  useEffect(() => {

  });

  const onBoardColChangedHandler = (colIndex: number) => {
    return (colData: string[]) => {
      const boardCopy = board;

      colData.forEach((colD, rowIndex) => {
        boardCopy[rowIndex][colIndex] = colD;
      });

      setBoard([...boardCopy]);
    }
  }

  const getColData = (colIndex: number) => {
    const rowCount = 6;
    
    return Array(rowCount).fill(1).map((n,rowIndex) => {
      return board[rowIndex][colIndex];
    });
  }

  const checkWinner = () => {
    if (checkIfTie()) {
      props.onGameConcluded(GameConclusionType.TIE);
    }

    const discTypes = [DiscType.RED, DiscType.YELLOW];
    discTypes.forEach(discType => {
      if (checkRows(discType) || checkCols(discType) || checkDiagonal(discType)) {
        props.onGameConcluded(discType === DiscType.RED ? GameConclusionType.RED_WINS : GameConclusionType.YELLOW_WINS);
      }
    })
  }

  const checkRows = (discType: DiscType) => {
    const maxRowCount  = 6;

    for (let i = 0; i < maxRowCount;i++) {
      if (getRowString(i).includes(discType.toString().repeat(4))) {
        return true;
      }
    }

    return false;
  }

  const checkCols = (discType: DiscType) => {
    const maxColCount  = 7;

    for (let i = 0; i < maxColCount;i++) {
      if (getColString(i).includes(discType.toString().repeat(4))) {
        return true;
      }
    }

    return false;
  }

  const checkDiagonal = (discType: DiscType) => {
    const diagonalIndexes = [[2,0],[1,0],[0,0],[0,1],[2,0],[3,0]];
    const reverseDiagonalIndexes = [[6,2], [6,1], [6,0], [5,0], [4,0], [3,0]];

    for (let i = 0; i < diagonalIndexes.length;i++) {
      const diagonalStr = getDiagonalString(diagonalIndexes[i][0], diagonalIndexes[i][1], false);
      if (diagonalStr.includes(discType.toString().repeat(4))) {
        return true;
      }
    }

    for (let i = 0; i < reverseDiagonalIndexes.length;i++) {
      const diagonalStr = getDiagonalString(reverseDiagonalIndexes[i][0], reverseDiagonalIndexes[i][1], false);
      if (diagonalStr.includes(discType.toString().repeat(4))) {
        return true;
      }
    }

    return false;
  }

  const getRowString = (rowIndex: number) => {
    const colCount  = 7;
    return Array(colCount).fill(1).reduce((rowStr, n, colIndex) => {
      return rowStr + board[rowIndex][colIndex]; 
    }, '');
  }

  const getColString = (colIndex: number) => {
    const colCount  = 6;
    return Array(colCount).fill(1).reduce((rowStr, n, rowIndex) => {
      return rowStr + board[rowIndex][colIndex]; 
    }, '');
  }

  const getDiagonalString = (rowIndex: number, colIndex: number, isReverse: boolean = false) => {
    let diagonalStr = '';

    if (isReverse) {
      while (rowIndex < board.length && colIndex >0) {
        diagonalStr+= board[rowIndex][colIndex];
        rowIndex++;
        colIndex--;
      }
    } else {
      while (rowIndex < board.length && colIndex < board[rowIndex].length) {
        diagonalStr+= board[rowIndex][colIndex];
        rowIndex++;
        colIndex++;
      }
    }

    return diagonalStr;
  }

  const checkIfTie = () => board.every(rowData => rowData.every(colData => colData !== DiscType.EMPTY));

  return (
    <div className="connect-board">
       {board[0].map((n, index) => {
        return (
          <BoardCol key={index} 
                    rowIndex={index} 
                    onDiscPlaced={onBoardColChangedHandler(index)} 
                    colData={getColData(index)}
                    discTypeTurn={discTypeTurn}/>
        )
       })}
    </div>
  );
}

export default Connect4Board;
