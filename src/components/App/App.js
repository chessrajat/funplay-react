import React from 'react';
import './App.css';
import {BrowserRouter , Route , Switch } from 'react-router-dom'
import Home from '../Home/Home';
import Header from '../Elements/Header/Header';
import Movie from '../Movie/Movie'
import NotFound from '../Elements/NotFound/NotFound'

const App = () => {
  return (
      // Creating routing to the site 
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <Switch>
            {/* inside a switch we can specify different routes , and decide what component will render on different path */}
            <Route path="/" component={Home} exact />
            <Route path="/movie/:movieId" component={Movie} exact />
            {/* when user can't find anything not found will be called */}
            <Route component={NotFound} />

          </Switch>
        </React.Fragment>
       </BrowserRouter>
  )
}

export default App;
