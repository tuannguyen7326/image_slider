import React from 'react';

import { Route, Routes, Link } from 'react-router-dom';

import './App.scss';

import HomePage from '../pages/Home';
import SliderPage from '../pages/Slider';

function App() {
    return (
        <div className='App'>
            <div>
                <ul>
                    <li>
                        <Link to='/home'>home</Link>
                    </li>
                    <li>
                        <Link to='/slider'>slider</Link>
                    </li>
                </ul>
            </div>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/home' element={<HomePage />} />
                <Route path='/slider' element={<SliderPage />} />
            </Routes>
        </div>
    );
}

export default App;
