import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import Book from './pages/Book/Book';
import Ongoing from './pages/Ongoing/Ongoing';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth/>} />
          <Route path='/book' element={<Book/>} />
          <Route path='/ongoing' element={<Ongoing/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;




