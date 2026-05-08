import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const API = 'http://127.0.0.1:8000';

function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({
    name: '', category_id: '', batch_number: '',
    expiry_date: '', quantity: '', reorder_level: '', unit_price: ''
  });

  useEffect(() => {
    fetchMedicines();
    fetchCategories();
  }, []);

  const fetchMedicines = async () => {
    const res = await axios.get(`${API}/medicines`);
    setMedicines(res.data);
  };

  const fetchCategories = async () => {
    const res = await axios.get(`${API}/categories`);
    setCategories(res.data);
  };

  const handleSearch = async () => {
    if (!search) return fetchMedicines();
    const res = await axios.get(`${API}/search?q=${search}`);
    setMedicines(res.data);
  };

  const handleSubmit = async () => {
    try {
      const data = {
        ...form,
        category_id: parseInt(form.category_id),
        quantity: parseInt(form.quantity),
        reorder_level: parseInt(form.reorder_level),
        unit_price: parseFloat(form.unit_price),
      };
      if (editItem) {
        await axios.put(`${API}/medicines/${editItem.id}`, data);
        toast.success('Medicine updated!');
      } else {
        await axios.post(`${API}/medicines`, data);
        toast.success('Medicine added!');
      }
      setShowForm(false);
      setEditItem(null);
      setForm({ name: '', category_id: '', batch_number: '', expiry_date: '', quantity: '', reorder_level: '', unit_price: '' });
      fetchMedicines();
    } catch (err) {
      toast.error('Something went wrong!');
    }
  };

  const handleEdit = (med) => {
    setEditItem(med);
    setForm({
      name: med.name,
      category_id: med.category_id,
      batch_number: med.batch_number,
      expiry_date: med.expiry_date,
      quantity: med.quantity,
      reorder_level: med.reorder_level,
      unit_price: med.unit_price,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      await axios.delete(`${API}/medicines/${id}`);
      toast.success('Medicine deleted!');
      fetchMedicines();
    }
  };

  return (
    <div>
      <div className="card">
        <h2>💊 Medicine List</h2>
        <div className="search-bar">
          <input
            placeholder="Search medicines..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSearch()}
          />
          <button className="btn btn-primary" onClick={handleSearch}>Search</button>
          <button className="btn btn-success" onClick={() => { setShowForm(!showForm); setEditItem(null); setForm({ name: '', category_id: '', batch_number: '', expiry_date: '', quantity: '', reorder_level: '', unit_price: '' }); }}>
            + Add Medicine
          </button>
        </div>

        {showForm && (
          <div className="card" style={{ background: '#f5f9ff' }}>
            <h2>{editItem ? '✏️ Edit Medicine' : '➕ Add New Medicine'}</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Medicine Name</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Paracetamol 500mg" />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select value={form.category_id} onChange={e => setForm({ ...form, category_id: e.target.value })}>
                  <option value="">Select Category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Batch Number</label>
                <input value={form.batch_number} onChange={e => setForm({ ...form, batch_number: e.target.value })} placeholder="e.g. BATCH001" />
              </div>
              <div className="form-group">
                <label>Expiry Date</label>
                <input type="date" value={form.expiry_date} onChange={e => setForm({ ...form, expiry_date: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Quantity</label>
                <input type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} placeholder="e.g. 100" />
              </div>
              <div className="form-group">
                <label>Reorder Level</label>
                <input type="number" value={form.reorder_level} onChange={e => setForm({ ...form, reorder_level: e.target.value })} placeholder="e.g. 20" />
              </div>
              <div className="form-group">
                <label>Unit Price (₹)</label>
                <input type="number" value={form.unit_price} onChange={e => setForm({ ...form, unit_price: e.target.value })} placeholder="e.g. 25.50" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button className="btn btn-primary" onClick={handleSubmit}>{editItem ? 'Update' : 'Add Medicine'}</button>
              <button className="btn btn-danger" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Batch</th>
              <th>Expiry</th>
              <th>Quantity</th>
              <th>Reorder Level</th>
              <th>Price (₹)</th>
              <th>Status</th>
              <th>Actions</th>
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
                <td>
                  <span className={`badge ${med.quantity <= med.reorder_level ? 'badge-low' : 'badge-ok'}`}>
                    {med.quantity <= med.reorder_level ? '⚠️ Low' : '✅ OK'}
                  </span>
                </td>
                <td style={{ display: 'flex', gap: '5px' }}>
                  <button className="btn btn-primary" onClick={() => handleEdit(med)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(med.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Medicines;