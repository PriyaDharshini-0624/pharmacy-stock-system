import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const API = 'https://pharmacy-stock-system-4wh2.onrender.com';

function StockMovements() {
  const [movements, setMovements] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    medicine_id: '',
    movement_type: 'IN',
    quantity: '',
    notes: ''
  });

  useEffect(() => {
    fetchMovements();
    fetchMedicines();
  }, []);

  const fetchMovements = async () => {
    const res = await axios.get(`${API}/stock-movements`);
    setMovements(res.data);
  };

  const fetchMedicines = async () => {
    const res = await axios.get(`${API}/medicines`);
    setMedicines(res.data);
  };

  const handleSubmit = async () => {
    try {
      const data = {
        ...form,
        medicine_id: parseInt(form.medicine_id),
        quantity: parseInt(form.quantity),
      };
      await axios.post(`${API}/stock-movements`, data);
      toast.success(`Stock ${form.movement_type} recorded successfully!`);
      setShowForm(false);
      setForm({ medicine_id: '', movement_type: 'IN', quantity: '', notes: '' });
      fetchMovements();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Something went wrong!');
    }
  };

  return (
    <div>
      <div className="card">
        <h2>📦 Stock Movements</h2>
        <div style={{ marginBottom: '20px' }}>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            + Record Stock Movement
          </button>
        </div>

        {showForm && (
          <div className="card" style={{ background: '#f5f9ff' }}>
            <h2>➕ New Stock Movement</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Medicine</label>
                <select value={form.medicine_id} onChange={e => setForm({ ...form, medicine_id: e.target.value })}>
                  <option value="">Select Medicine</option>
                  {medicines.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Movement Type</label>
                <select value={form.movement_type} onChange={e => setForm({ ...form, movement_type: e.target.value })}>
                  <option value="IN">Stock IN ➕</option>
                  <option value="OUT">Stock OUT ➖</option>
                </select>
              </div>
              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  value={form.quantity}
                  onChange={e => setForm({ ...form, quantity: e.target.value })}
                  placeholder="e.g. 50"
                />
              </div>
              <div className="form-group">
                <label>Notes</label>
                <input
                  value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                  placeholder="e.g. Monthly restock"
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button className="btn btn-primary" onClick={handleSubmit}>Record Movement</button>
              <button className="btn btn-danger" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Notes</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {movements.map(m => (
              <tr key={m.id}>
                <td>{m.medicines?.name}</td>
                <td>
                  <span className={`badge ${m.movement_type === 'IN' ? 'badge-in' : 'badge-out'}`}>
                    {m.movement_type === 'IN' ? '➕ IN' : '➖ OUT'}
                  </span>
                </td>
                <td>{m.quantity}</td>
                <td>{m.notes || '-'}</td>
                <td>{new Date(m.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StockMovements;