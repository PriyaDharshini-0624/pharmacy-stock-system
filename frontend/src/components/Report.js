import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://pharmacy-stock-system-4wh2.onrender.com';

function Report() {
  const [report, setReport] = useState(null);
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetchReport();
    fetchMedicines();
  }, []);

  const fetchReport = async () => {
    const res = await axios.get(`${API}/report`);
    setReport(res.data);
  };

  const fetchMedicines = async () => {
    const res = await axios.get(`${API}/medicines`);
    setMedicines(res.data);
  };

  return (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#1a73e8' }}>📊 Monthly Stock Report</h2>

      {report && (
        <div className="stat-grid">
          <div className="stat-card">
            <h3>{report.total_medicines}</h3>
            <p>Total Medicines</p>
          </div>
          <div className="stat-card">
            <h3 style={{ color: '#43a047' }}>{report.total_stock_in}</h3>
            <p>Total Stock In</p>
          </div>
          <div className="stat-card">
            <h3 style={{ color: '#e53935' }}>{report.total_stock_out}</h3>
            <p>Total Stock Out</p>
          </div>
          <div className="stat-card">
            <h3 style={{ color: '#ff9800' }}>{report.low_stock_count}</h3>
            <p>Low Stock Items</p>
          </div>
        </div>
      )}

      <div className="card">
        <h2>📋 Complete Stock Summary</h2>
        <table>
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Category</th>
              <th>Batch</th>
              <th>Expiry Date</th>
              <th>Current Stock</th>
              <th>Reorder Level</th>
              <th>Unit Price (₹)</th>
              <th>Total Value (₹)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map(med => (
              <tr key={med.id}>
                <td>{med.name}</td>
                <td>{med.categories?.name}</td>
                <td>{med.batch_number}</td>
                <td>{med.expiry_date}</td>
                <td>{med.quantity}</td>
                <td>{med.reorder_level}</td>
                <td>₹{med.unit_price}</td>
                <td>₹{(med.quantity * med.unit_price).toFixed(2)}</td>
                <td>
                  <span className={`badge ${med.quantity <= med.reorder_level ? 'badge-low' : 'badge-ok'}`}>
                    {med.quantity <= med.reorder_level ? '⚠️ Low' : '✅ OK'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Report;