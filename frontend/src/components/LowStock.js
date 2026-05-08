import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://127.0.0.1:8000';

function LowStock() {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchLowStock();
  }, []);

  const fetchLowStock = async () => {
    const res = await axios.get(`${API}/low-stock`);
    setLowStockItems(res.data.medicines);
    setCount(res.data.count);
  };

  return (
    <div>
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
                    <td style={{ color: '#e53935', fontWeight: 'bold' }}>
                      {med.quantity}
                    </td>
                    <td>{med.reorder_level}</td>
                    <td>{med.expiry_date}</td>
                    <td>
                      <span className="badge badge-low">
                        ⚠️ Reorder Now
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default LowStock;