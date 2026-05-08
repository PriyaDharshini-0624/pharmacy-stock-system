# 💊 Pharmacy Stock System

A full-stack web application to manage pharmacy medicine inventory, track stock movements, monitor low stock alerts, and generate monthly reports.

## 🛠️ Tech Stack
- **Frontend:** React.js
- **Backend:** FastAPI (Python)
- **Database:** Supabase (PostgreSQL)

## ✨ Features
- ➕ Add, Edit, Delete medicines
- 📦 Track Stock IN and Stock OUT
- ⚠️ Low Stock Alerts
- 🔍 Search and Filter medicines
- 📊 Monthly Stock Report
- 🗄️ Expiry date tracking

## 🚀 How to Run

### Backend
```bash
cd Backend
pip install fastapi uvicorn supabase python-dotenv pydantic
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## 📁 Project Structure
```
pharmacy-stock-system/
├── Backend/
│   ├── main.py
│   ├── database.py
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Medicines.js
│   │   │   ├── StockMovements.js
│   │   │   ├── LowStock.js
│   │   │   └── Report.js
│   │   ├── App.js
│   │   └── App.css
└── README.md
```

## 📊 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /medicines | Get all medicines |
| POST | /medicines | Add new medicine |
| PUT | /medicines/{id} | Update medicine |
| DELETE | /medicines/{id} | Delete medicine |
| GET | /stock-movements | Get all movements |
| POST | /stock-movements | Record stock movement |
| GET | /low-stock | Get low stock alerts |
| GET | /search?q= | Search medicines |
| GET | /report | Get monthly report |

## 👩‍💻 Developer
- **Name:** Priyadharshini V
- **Reg No:** 411723106067
- **Department:** ECE
- **College:** PSVPEC