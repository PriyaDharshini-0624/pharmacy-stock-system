from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import supabase
from typing import Optional
from datetime import date

app = FastAPI(title="Pharmacy Stock System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Models ───────────────────────────────────────────

class Medicine(BaseModel):
    name: str
    category_id: int
    batch_number: str
    expiry_date: str
    quantity: int
    reorder_level: int
    unit_price: float

class StockMovement(BaseModel):
    medicine_id: int
    movement_type: str
    quantity: int
    notes: Optional[str] = None

# ─── Root ─────────────────────────────────────────────

@app.get("/")
def root():
    return {"message": "Pharmacy Stock System API is running!"}

# ─── Categories ───────────────────────────────────────

@app.get("/categories")
def get_categories():
    response = supabase.table("categories").select("*").execute()
    return response.data

# ─── Medicines ────────────────────────────────────────

@app.get("/medicines")
def get_medicines():
    response = supabase.table("medicines").select("*, categories(name)").execute()
    return response.data

@app.get("/medicines/{medicine_id}")
def get_medicine(medicine_id: int):
    response = supabase.table("medicines").select("*, categories(name)").eq("id", medicine_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Medicine not found")
    return response.data[0]

@app.post("/medicines")
def add_medicine(medicine: Medicine):
    response = supabase.table("medicines").insert(medicine.dict()).execute()
    return {"message": "Medicine added successfully!", "data": response.data}

@app.put("/medicines/{medicine_id}")
def update_medicine(medicine_id: int, medicine: Medicine):
    response = supabase.table("medicines").update(medicine.dict()).eq("id", medicine_id).execute()
    return {"message": "Medicine updated successfully!", "data": response.data}

@app.delete("/medicines/{medicine_id}")
def delete_medicine(medicine_id: int):
    supabase.table("medicines").delete().eq("id", medicine_id).execute()
    return {"message": "Medicine deleted successfully!"}

# ─── Stock Movements ──────────────────────────────────

@app.get("/stock-movements")
def get_stock_movements():
    response = supabase.table("stock_movements").select("*, medicines(name)").execute()
    return response.data

@app.post("/stock-movements")
def add_stock_movement(movement: StockMovement):
    medicine = supabase.table("medicines").select("quantity").eq("id", movement.medicine_id).execute()
    if not medicine.data:
        raise HTTPException(status_code=404, detail="Medicine not found")

    current_qty = medicine.data[0]["quantity"]

    if movement.movement_type == "OUT" and current_qty < movement.quantity:
        raise HTTPException(status_code=400, detail="Insufficient stock!")

    if movement.movement_type == "IN":
        new_qty = current_qty + movement.quantity
    else:
        new_qty = current_qty - movement.quantity

    supabase.table("medicines").update({"quantity": new_qty}).eq("id", movement.medicine_id).execute()
    supabase.table("stock_movements").insert(movement.dict()).execute()

    return {"message": "Stock updated successfully!", "new_quantity": new_qty}

# ─── Low Stock Alert ──────────────────────────────────

@app.get("/low-stock")
def get_low_stock():
    response = supabase.table("medicines").select("*, categories(name)").execute()
    low_stock = [m for m in response.data if m["quantity"] <= m["reorder_level"]]
    return {"count": len(low_stock), "medicines": low_stock}

# ─── Search ───────────────────────────────────────────

@app.get("/search")
def search_medicines(q: str):
    response = supabase.table("medicines").select("*, categories(name)").ilike("name", f"%{q}%").execute()
    return response.data

# ─── Monthly Report ───────────────────────────────────

@app.get("/report")
def monthly_report():
    medicines = supabase.table("medicines").select("*").execute()
    movements = supabase.table("stock_movements").select("*").execute()

    total_medicines = len(medicines.data)
    total_stock_in = sum(m["quantity"] for m in movements.data if m["movement_type"] == "IN")
    total_stock_out = sum(m["quantity"] for m in movements.data if m["movement_type"] == "OUT")
    low_stock_count = len([m for m in medicines.data if m["quantity"] <= m["reorder_level"]])

    return {
        "total_medicines": total_medicines,
        "total_stock_in": total_stock_in,
        "total_stock_out": total_stock_out,
        "low_stock_count": low_stock_count,
    }