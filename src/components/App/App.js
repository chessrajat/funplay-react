import React from 'react';
import './App.css';
import {BrowserRouter , Route , Switch } from 'react-router-dom'
import Home from '../Home/Home';
import Header from '../Elements/Header/Header';

const App = () => {
  return (
    <div>
       <Header />
       <Home />
    </div>
  )
}

export default App;
