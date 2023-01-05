import React, { useEffect } from 'react';
import useState from 'react-usestateref';
import './BoardCol.scss';
import markerRed from 'assets/images/marker-red.svg';
import markerYellow from 'assets/images/marker-yellow.svg';
import { DiscType } from 'constants/DiscType';
import { debounce } from 'utils/debounce';

type BoardColProp = {
    colIndex: number;
    onDiscPlaced: Function;
    discTypeTurn: DiscType;
    colData: string[];
    disabled: boolean;
};

function BoardCol(props: BoardColProp) {
  const [colData, setColData, colDataRef] = useState(props.colData);
  const [discTypeTurn, setDiscTypeTurn] = useState<DiscType>(props.discTypeTurn);
  const [disabled, setDisabled] = useState(props.disabled);

  useEffect(() => {
    setDisabled(props.disabled);
  }, [props.disabled]);

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
    if (!disabled) {
      const colIndex = colDataRef.current.lastIndexOf('');
      const colDataCopy = colDataRef.current;

      if (colIndex !== -1) {
          colDataCopy[colIndex] = discTypeTurn;
          console.log(colDataCopy)
          props.onDiscPlaced(colDataCopy);
      }
    }
  }

  const getParentTop = (discData: string,index: number) => {
    if (discData === DiscType.EMPTY) return {};

    const discEl = document.getElementById(`rc-${props.colIndex}${index}`);
    const parentTop = discEl?.parentElement?.offsetTop;

    return {top: `calc(${parentTop}px + 0.2vh )`, opacity: 1};
  }

  return (
    <div className="board-col" id={`col-` + props.colIndex } onClick={putDisc}>
          { disabled ? '' : <img className='board-col__marker' src={discTypeTurn === DiscType.RED ? markerRed : markerYellow} alt="" />}
          {colData.map((col, index) => (
            <div className='board-col__disc-wrapper' key={index}>
                <div id={`rc-${props.colIndex}${index}`} 
                     style={getParentTop(col,index)} 
                     className={`board-col__disc ${getDiscDataClassName(col)}`}>
                </div>
            </div>
          ))}  
          
    </div>
  );
}

export default BoardCol;
