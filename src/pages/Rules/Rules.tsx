import React from 'react';
import { Link } from 'react-router-dom';

import './Rules.scss';

function Rules() {
  return (
    <div className="rules">
       <div className="rules__menu-container">
            <p className="rules__title">
                RULES
            </p>

            <div className="rules__description">
                <b>OBJECTIVE</b>

                <span>
                    Be the first player to connect 4 of the same colored disc in a row (either vertically, horizontally or diagonally)
                </span>

                <b>HOW TO PLAY</b>
                <ol>
                    <li>Red goes first in the first game.</li>
                    <li>Players must alternate turns, and only one disc can only be dropped in each turns.</li>
                    <li>The game ends when there is a 4-in-a-row or stalemate.</li>
                    <li>The starter of the previous game goes second on the next game.</li>
                </ol>

                
            </div>
            <Link to="/" className="rules__close-btn">
                ✔ 
            </Link>
           
       </div>
    </div>
  );
}

export default Rules;
