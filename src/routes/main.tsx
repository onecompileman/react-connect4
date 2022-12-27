import Game from 'pages/Game/Game';
import Rules from 'pages/Rules/Rules';
import React from 'react';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import Home from '../pages/Home/Home';
function MainRouting() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/rules" element={<Rules />} />
                <Route path="/game" element={<Game />} />
            </Routes>
        </BrowserRouter>
    );
}

export default MainRouting;