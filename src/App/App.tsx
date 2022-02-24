import React from 'react';

import { Route, Routes, Link } from 'react-router-dom';

import './App.scss';

import SliderPage from '../pages/Slider';

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path='/' element={<SliderPage />} />
                <Route path='/slider' element={<SliderPage />} />
            </Routes>
        </div>
    );
}

export default App;
