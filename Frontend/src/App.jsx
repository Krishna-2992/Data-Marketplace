import { useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home';
import List from './pages/List';
import Token from './pages/Token';
import Buy from './pages/Buy';

const App = () => {

    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/list' element={<List />} />
                <Route path='/buy' element={<Buy />} />
                <Route path='/token' element={<Token />} />
            </Routes>
        </div>
    );
};
export default App;