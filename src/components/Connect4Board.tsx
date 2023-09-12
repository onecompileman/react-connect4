import { DiscType } from 'constants/DiscType';
import { GameConclusionType } from 'constants/GameConclusionType';
import React, { useEffect } from 'react';
import useState from 'react-usestateref';
import { getBestMoveChatGPT } from 'utils/getBestMoveChatGPT';
import { selectBestMove } from 'utils/selectBestMove';
import BoardCol from './BoardCol';
import './Connect4Board.scss';

type Connect4BoardProp = {
  onGameConcluded: Function;
  onDiscTypeChange: Function;
  isAI: boolean;
  currentPlayerDiscType?: DiscType;
  currentDiscType: DiscType;
  boardData: string[][];
  triggerRandomMove: boolean;
}

function Connect4Board(props: Connect4BoardProp) {
  const [currentPlayerDiscType, setCurrentPlayerDiscType, currentPlayerDiscTypeRef] = useState(props.currentPlayerDiscType);
  const [discTypeTurn, setDiscTypeTurn, discTypeTurnRef] = useState(DiscType.RED);
  const [disableCol, setDisableCol, disableColRef] =  useState(discTypeTurn !== props.currentPlayerDiscType);
  const [board, setBoard, boardRef] = useState([ ...props.boardData ]);

  const aiDiscType = props.currentPlayerDiscType === DiscType.RED ? DiscType.YELLOW : DiscType.RED;
  const aiThinkTimeMs = 2500;

  useEffect(() => {
    setBoard(props.boardData);
    checkWinner();
  }, [props.boardData]);

  useEffect(() => {
    setCurrentPlayerDiscType(props.currentPlayerDiscType);
    setDisableCol(DiscType.RED !== props.currentPlayerDiscType && props.isAI);
    setDiscTypeTurn(DiscType.RED);
    if (props.currentPlayerDiscType === DiscType.YELLOW && props.isAI) {
      aiMove();
    }
  }, [props.currentPlayerDiscType]);

  useEffect(() => {
    return () =>{  randomBestMove(discTypeTurnRef.current) };
  }, [props.triggerRandomMove]);

  const onBoardColChangedHandler = (colIndex: number) => {
    return (colData: string[]) => {
      const boardCopy = boardRef.current;

      colData.forEach((colD, rowIndex) => {
        boardCopy[rowIndex][colIndex] = colD;
      });

      setBoard([...boardCopy]);
      setTimeout(() => {
        checkWinner();
      }, 300)

      nextTurn();

    }
  }

  const nextTurn = () => {
    const nextDiscType = discTypeTurnRef.current === DiscType.RED ? DiscType.YELLOW : DiscType.RED;
    const disabledCol = nextDiscType !== currentPlayerDiscTypeRef.current && props.isAI;

    props.onDiscTypeChange(nextDiscType);
    setDiscTypeTurn(nextDiscType);
    setDisableCol(disabledCol);

    aiMove();
  }

  const aiMove = () => {
    if (currentPlayerDiscTypeRef.current !== discTypeTurnRef.current && props.isAI) {
      setTimeout(() => {
        randomBestMove(aiDiscType);
      }, aiThinkTimeMs);
    }
  }

  const randomBestMove = async (discType: DiscType) => {
    getBestMoveChatGPT(boardRef.current, discType);
    const boardCopy = boardRef.current;
    const aiColMove = await selectBestMove(boardRef.current, discType);

    if (aiColMove !== null) {
      for (let r = 5; r >= 0;r--) {
        if (boardCopy[r][aiColMove] === DiscType.EMPTY) {
            boardCopy[r][aiColMove] = discType;
            setBoard([...boardCopy]);
            setTimeout(() => {
              checkWinner();
            }, 300);
            nextTurn();
            return;
        }
      }
    }
   }

  const getColData = (colIndex: number) => {
    const rowCount = 6;
    
    return Array(rowCount).fill(1).map((n,rowIndex) => {
      return boardRef.current[rowIndex][colIndex];
    });
  }

  const checkWinner = () => {
    if (checkIfTie()) {
      props.onGameConcluded(GameConclusionType.TIE);
    }

    const discTypes = [DiscType.RED, DiscType.YELLOW];
    discTypes.forEach(discType => {
      if (checkRows(discType) || checkCols(discType) || checkDiagonal(discType)) {
        setDisableCol(true);
        setTimeout(() => {
          setDisableCol(false);
        },2000);
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
    const diagonalIndexes = [[2,0],[1,0],[0,0],[0,1],[0,2],[0,3]];
    const reverseDiagonalIndexes = [[2,6], [1,6], [0,6], [0,5], [0,4], [0,3]];

    for (let i = 0; i < diagonalIndexes.length;i++) {
      const diagonalStr = getDiagonalString(diagonalIndexes[i][0], diagonalIndexes[i][1], false);
      if (diagonalStr.includes(discType.toString().repeat(4))) {
        return true;
      }
    }

    for (let i = 0; i < reverseDiagonalIndexes.length;i++) {
      const diagonalStr = getDiagonalString(reverseDiagonalIndexes[i][0], reverseDiagonalIndexes[i][1], true);
      
      if (diagonalStr.includes(discType.toString().repeat(4))) {
        return true;
      }
    }

    return false;
  }

  const getRowString = (rowIndex: number) => {
    const colCount  = 7;
    return Array(colCount).fill(1).reduce((rowStr, n, colIndex) => {
      return rowStr + boardRef.current[rowIndex][colIndex]; 
    }, '');
  }

  const getColString = (colIndex: number) => {
    const colCount  = 6;
    return Array(colCount).fill(1).reduce((rowStr, n, rowIndex) => {
      return rowStr + boardRef.current[rowIndex][colIndex]; 
    }, '');
  }

  const getDiagonalString = (rowIndex: number, colIndex: number, isReverse: boolean = false) => {
    let diagonalStr = '';

    if (isReverse) {
      while (rowIndex < boardRef.current.length && colIndex >= 0) {
        diagonalStr+= boardRef.current[rowIndex][colIndex];
        rowIndex++;
        colIndex--;
      }
    } else {
      while (rowIndex < boardRef.current.length && colIndex < boardRef.current[rowIndex].length) {
        diagonalStr+= boardRef.current[rowIndex][colIndex];
        rowIndex++;
        colIndex++;
      }
    }

    return diagonalStr;
  }

  const checkIfTie = () => boardRef.current.every(rowData => rowData.every(colData => colData !== DiscType.EMPTY));

  return (
    <div className="connect-board">
       {board[0].map((n, index) => {
        return (
          <BoardCol key={index} 
                    colIndex={index} 
                    onDiscPlaced={onBoardColChangedHandler(index)} 
                    colData={getColData(index)}
                    discTypeTurn={discTypeTurn}
                    disabled={disableCol}/>
        )
       })}
    </div>
  );
}

export default Connect4Board;
