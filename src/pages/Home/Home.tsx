import React from 'react';
import Logo from '../../components/Logo';
import MenuItem from './components/MenuItem';
import './Home.scss';

function Home() {
  return (
    <div className="home">
       <div className="home__menu-container">
            <Logo></Logo>
            <div className="home__menu-items-container">
                <MenuItem path={'/game?type=ai'} className='bg--danger text--white'>
                    PLAY VS CPU
                </MenuItem>
                <MenuItem path={'/game?type=player'} className='bg--warning text--black'>
                    PLAY VS PLAYER (ONLINE)
                </MenuItem>
                <MenuItem path={'/rules'} className='bg--white text--black'>
                    GAME RULES
                </MenuItem>
            </div>
       </div>
    </div>
  );
}

export default Home;
