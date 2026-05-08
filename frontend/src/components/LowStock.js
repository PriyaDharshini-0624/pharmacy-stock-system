import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://127.0.0.1:8000';

function LowStock() {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [expiringItems, setExpiringItems] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchLowStock();
    fetchMedicines();
  }, []);

  const fetchLowStock = async () => {
    const res = await axios.get(`${API}/low-stock`);
    setLowStockItems(res.data.medicines);
    setCount(res.data.count);
  };

  const fetchMedicines = async () => {
    const res = await axios.get(`${API}/medicines`);
    const today = new Date();
    const in90Days = new Date();
    in90Days.setDate(today.getDate() + 90);

    const expiring = res.data.filter(med => {
      const expiry = new Date(med.expiry_date);
      return expiry <= in90Days;
    });
    setExpiringItems(expiring);
  };

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div>
      {/* Low Stock Section */}
      <div className="card">
        <h2>⚠️ Low Stock Alerts</h2>
        {count === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#43a047' }}>
            <h3>✅ All medicines are well stocked!</h3>
          </div>
        ) : (
          <>
            <div className="alert-badge" style={{ marginBottom: '20px' }}>
              ⚠️ <strong>{count} medicine(s)</strong> are running low and need to be restocked!
            </div>
            <table>
              <thead>
                <tr>
                  <th>Medicine Name</th>
                  <th>Category</th>
                  <th>Batch Number</th>
                  <th>Current Stock</th>
                  <th>Reorder Level</th>
                  <th>Expiry Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {lowStockItems.map(med => (
                  <tr key={med.id}>
                    <td>{med.name}</td>
                    <td>{med.categories?.name}</td>
                    <td>{med.batch_number}</td>
                    <td style={{ color: '#e53935', fontWeight: 'bold' }}>{med.quantity}</td>
                    <td>{med.reorder_level}</td>
                    <td>{med.expiry_date}</td>
                    <td><span className="badge badge-low">⚠️ Reorder Now</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      {/* Expiry Alert Section */}
      <div className="card">
        <h2>📅 Expiry Date Alerts</h2>
        {expiringItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#43a047' }}>
            <h3>✅ No medicines expiring in next 90 days!</h3>
          </div>
        ) : (
          <>
            <div className="alert-badge" style={{ marginBottom: '20px', borderColor: '#e53935', background: '#ffebee' }}>
              📅 <strong>{expiringItems.length} medicine(s)</strong> are expiring within 90 days!
            </div>
            <table>
              <thead>
                <tr>
                  <th>Medicine Name</th>
                  <th>Category</th>
                  <th>Batch Number</th>
                  <th>Current Stock</th>
                  <th>Expiry Date</th>
                  <th>Days Left</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {expiringItems.map(med => {
                  const daysLeft = getDaysUntilExpiry(med.expiry_date);
                  return (
                    <tr key={med.id}>
                      <td>{med.name}</td>
                      <td>{med.categories?.name}</td>
                      <td>{med.batch_number}</td>
                      <td>{med.quantity}</td>
                      <td>{med.expiry_date}</td>
                      <td style={{ color: daysLeft < 30 ? '#e53935' : '#ff9800', fontWeight: 'bold' }}>
                        {daysLeft} days
                      </td>
                      <td>
                        <span className="badge" style={{
                          background: daysLeft < 30 ? '#ffebee' : '#fff3e0',
                          color: daysLeft < 30 ? '#c62828' : '#e65100'
                        }}>
                          {daysLeft < 30 ? '🔴 Critical' : '🟡 Expiring Soon'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default LowStock;