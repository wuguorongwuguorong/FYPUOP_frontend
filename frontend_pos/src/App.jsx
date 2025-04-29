import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Navbar from './Navbar';
import HomePage from './HomePage';
import { Route, Switch } from 'wouter';
import './styles.css';


function App() {

  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>

  
      <footer className="bg-dark text-white text-center py-3">
        <div className="container">
          <p>&copy; 2025 Hungry Panda. All rights reserved.</p>
        </div>
      </footer>

    </>
  )
}

export default App
