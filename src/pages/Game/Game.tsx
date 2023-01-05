import Connect4Board from 'components/Connect4Board';
import Logo from 'components/Logo';
import { PlayerType } from 'constants/PlayerType';
import React, { useEffect } from 'react';
import useState from 'react-usestateref';
import PlayerTag from './components/PlayerTag';
import './Game.scss';
import TurnIndicator from './components/TurnIndicator';
import { GameConclusionType } from 'constants/GameConclusionType';
import { DiscType } from 'constants/DiscType';
import { createEmptyConnect4Board } from 'utils/createEmptyConnect4Board';
import { useSearchParams } from "react-router-dom";
import { GameType } from 'constants/GameType';
import { Link } from 'react-router-dom';
let timerInterval: any;

function Game() {
  const [searchParams, setSearchParams] = useSearchParams();

  const maxTimer = 15;
  const gameType = searchParams.get('type');

  
  const [isAI, setIsAI, isAIRef] = useState(gameType === GameType.AI);

  const [thisPlayerDiscType, setThisPlayerDiscType, thisPlayerDiscTypeRef] = useState(DiscType.RED);
  const [thisPlayerType, setThisPlayerType] = useState(PlayerType.PLAYER_1);
  const [thisPlayerName, setThisPlayerName, thisPlayerNameRef] = useState('PLAYER 1');
  const [enemyPlayerName, setEnemyPlayerName] = useState(isAIRef.current ? 'CPU' : 'PLAYER 2');
  const [enemyPlayerType, setEnemyPlayerType] = useState(isAIRef.current ? PlayerType.CPU : PlayerType.PLAYER_2);
  const [enemyPlayerDiscType, setEnemyPlayerDiscType, enemyPlayerDiscTypeRef] = useState(DiscType.YELLOW);


  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
 
  
  const [triggerRandomMove, setTriggerRandomMove] = useState(false);
  const [playerTimer, setPlayerTimer, playerTimerRef] = useState(maxTimer);
  const [currentDiscType, setCurrentDiscType, currentDiscTypeRef] = useState(DiscType.RED);
  const [currentPlayerName, setCurrentPlayerName, currentPlayerNameRef] = useState('PLAYER 1');
  const [boardData, setBoardData] = useState(createEmptyConnect4Board());
  const [showWinBanner, setShowWinBanner] = useState(false);
  const [winnerName, setWinnerName] = useState('');

  
  const onGameConcludedHandler = (gameConclusion: GameConclusionType) => {
    switch(gameConclusion) {
      case GameConclusionType.TIE:
        setWinnerName('DRAW');
        break;
      case GameConclusionType.RED_WINS: {
        const isPlayer1 = thisPlayerDiscTypeRef.current === DiscType.RED;
        if (isPlayer1) {
          setPlayer1Score(score => score + 1);
        } else {
          setPlayer2Score(score => score + 1);
        }
        setWinnerName(isPlayer1 ? thisPlayerName : enemyPlayerName);
        break;
      }
      case GameConclusionType.YELLOW_WINS: {
        const isPlayer1 = thisPlayerDiscTypeRef.current === DiscType.YELLOW;
        if (isPlayer1) {
          setPlayer1Score(score => score + 1);
        } else {
          setPlayer2Score(score => score + 1);
        }

        setWinnerName(thisPlayerDiscTypeRef.current === DiscType.YELLOW ? thisPlayerName : enemyPlayerName);
        break;  
      }
    }
    clearInterval(timerInterval);
    setShowWinBanner(true);
    
    setTimeout(() => {
      setShowWinBanner(false);
      startNewGame();
    }, 2000)
  }

  useEffect(() => {
    startTimerInterval();

    return () => {
      clearInterval(timerInterval);
    }
 }, []);

 const startNewGame = () => {
  setCurrentDiscType(DiscType.RED);
  setThisPlayerDiscType(thisPlayerDiscTypeRef.current === DiscType.RED ? DiscType.YELLOW : DiscType.RED);
  setEnemyPlayerDiscType(enemyPlayerDiscTypeRef.current === DiscType.RED ? DiscType.YELLOW : DiscType.RED);
  setCurrentPlayerName(thisPlayerDiscTypeRef.current === DiscType.RED ? thisPlayerName : enemyPlayerName);
  
  restart();
}

 const onDiscTypeChangeHandler = (discType: DiscType) => {
    setCurrentDiscType(discType);
    
    const isPlayer = discType === thisPlayerDiscType;

    setCurrentPlayerName(isPlayer ? thisPlayerName : enemyPlayerName);
    startTimerInterval();
  }

  const restart = () => {
    setBoardData(createEmptyConnect4Board());
    startTimerInterval();
  }

  const startTimerInterval = () => {
    if (timerInterval) { 
      clearInterval(timerInterval);
    }
      setPlayerTimer(maxTimer);

      timerInterval = setInterval(() => {
        setPlayerTimer(currentTime => currentTime - 1);
        
        if (playerTimerRef.current <= 0) {       
          setTriggerRandomMove(triggerRandomMove => !triggerRandomMove);
          setCurrentDiscType(currentDiscTypeRef.current === DiscType.RED ?  DiscType.YELLOW : DiscType.RED);
          setCurrentPlayerName(currentPlayerNameRef.current === thisPlayerName ? enemyPlayerName : thisPlayerName);
          startTimerInterval();
        }
      }, 1000);
    
  }


  return (
    <div className="game">
        <div className="game__header">
        <Link to={'/'}>
          <div className="game__button">
              MENU
          </div>
         </Link>
        <Logo />
        <div onClick={restart} className="game__button">
            RESTART
         </div>
        </div>
        
        <div className="game__container">
           <PlayerTag 
              playerScore={player1Score} 
              playerType={thisPlayerType} 
              discType={thisPlayerDiscType} />
           <Connect4Board 
              onGameConcluded={onGameConcludedHandler} 
              currentPlayerDiscType={thisPlayerDiscType}
              currentDiscType={currentDiscType} 
              boardData={boardData} 
              isAI={isAI}
              onDiscTypeChange={onDiscTypeChangeHandler}
              triggerRandomMove={triggerRandomMove}
              />
           <PlayerTag 
              playerScore={player2Score} 
              playerType={enemyPlayerType} 
              discType={enemyPlayerDiscType} />
           { showWinBanner ? <div className="game__win-banner">
            {winnerName} WINS!
            </div> : ''} 
           <div  className="game__turn-indicator-wrapper">
                <TurnIndicator 
                    discType={currentDiscType} 
                    seconds={playerTimer} 
                    name={currentPlayerName}/>
            </div>
        </div>
    </div>
  );
}

export default Game;
