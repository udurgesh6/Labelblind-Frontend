import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Timeline from './Timeline';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Timeline />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
