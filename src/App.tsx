import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Timeline from './Timeline';
import Scrape from './Scrape';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Timeline />}></Route>
        <Route path="/scrape" element={<Scrape />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
