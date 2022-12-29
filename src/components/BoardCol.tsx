import React, { useEffect, useState } from 'react';
import './BoardCol.scss';
import markerRed from 'assets/images/marker-red.svg';
import markerYellow from 'assets/images/marker-yellow.svg';
import { DiscType } from 'constants/DiscType';
import { debounce } from 'utils/debounce';

type BoardColProp = {
    rowIndex: number;
    onDiscPlaced: Function;
    discTypeTurn: DiscType;
    colData: string[];
};

function BoardCol(props: BoardColProp) {
  const [colData, setColData] = useState(props.colData);
  const [discTypeTurn, setDiscTypeTurn] = useState<DiscType>(props.discTypeTurn);

  useEffect(() => {
    setDiscTypeTurn(props.discTypeTurn);
  }, [props.discTypeTurn]);

  useEffect(() => {
    setColData(props.colData);
  }, [props.colData]);
  
  const getDiscDataClassName = (discData: string) => {
    switch (discData) {
        case DiscType.EMPTY:
            return '';
        case DiscType.RED:
            return 'board-col__disc--red';
        case DiscType.YELLOW:
            return 'board-col__disc--yellow';
    }
  }

  const putDisc = () => {
    const colIndex = colData.lastIndexOf('');
    const colDataCopy = colData

    if (colIndex !== -1) {
        colDataCopy[colIndex] = discTypeTurn;

        props.onDiscPlaced(colDataCopy);
    }
  }

  const getParentTop = (discData: string,index: number) => {
    if (discData === DiscType.EMPTY) return {};

    const discEl = document.getElementById(`rc-${props.rowIndex}${index}`);
    const parentTop = discEl?.parentElement?.offsetTop;

    return {top: `calc(${parentTop}px + 0.2vh )`, opacity: 1};
  }

  return (
    <div className="board-col" onClick={putDisc}>
          <img className='board-col__marker' src={discTypeTurn === DiscType.RED ? markerRed : markerYellow} alt="" />

          {colData.map((col, index) => (
            <div className='board-col__disc-wrapper' key={index}>
                <div id={`rc-${props.rowIndex}${index}`} 
                     style={getParentTop(col,index)} 
                     className={`board-col__disc ${getDiscDataClassName(col)}`}>
                </div>
            </div>
          ))}  
          
    </div>
  );
}

export default BoardCol;
