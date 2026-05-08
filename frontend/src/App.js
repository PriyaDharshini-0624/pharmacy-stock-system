import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Medicines from './components/Medicines';
import StockMovements from './components/StockMovements';
import LowStock from './components/LowStock';
import Report from './components/Report';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <h1>💊 Pharmacy Stock System</h1>
          <div className="nav-links">
            <Link to="/">Medicines</Link>
            <Link to="/stock">Stock Movements</Link>
            <Link to="/low-stock">Low Stock Alerts</Link>
            <Link to="/report">Monthly Report</Link>
          </div>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/" element={<Medicines />} />
            <Route path="/stock" element={<StockMovements />} />
            <Route path="/low-stock" element={<LowStock />} />
            <Route path="/report" element={<Report />} />
          </Routes>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;