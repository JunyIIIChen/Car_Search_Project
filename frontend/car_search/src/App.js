// App.js
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './Component/Navbar/Navbar';
import Search from './Component/Search/Search';
import Result from './Component/Result/Result';
import './App.css';
import { LoginSignup } from './Pages/LoginSignup';
import { Cart } from './Pages/Cart';

function App() {
  const [searchCriteria, setSearchCriteria] = useState({});

  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Search onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<Result searchCriteria={searchCriteria} />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;