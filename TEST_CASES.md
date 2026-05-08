# 🧪 Test Cases - Pharmacy Stock System

## Test Environment
- Backend: FastAPI running on http://127.0.0.1:8000
- Frontend: React running on http://localhost:3000
- Database: Supabase (PostgreSQL)

---

## ✅ Test Case 1 - Add Medicine
| Field | Details |
|-------|---------|
| **Test ID** | TC001 |
| **Feature** | Add New Medicine |
| **Steps** | 1. Click "+ Add Medicine" 2. Fill all fields 3. Click "Add Medicine" |
| **Input** | Name: Metformin 500mg, Batch: BATCH006, Qty: 7 |
| **Expected** | Medicine added successfully with toast notification |
| **Actual** | ✅ Medicine added and visible in table |
| **Status** | PASS |

---

## ✅ Test Case 2 - Search Medicine
| Field | Details |
|-------|---------|
| **Test ID** | TC002 |
| **Feature** | Search/Filter Medicines |
| **Steps** | 1. Type "para" in search box 2. Click Search |
| **Input** | Search query: "para" |
| **Expected** | Only Paracetamol 650mg should appear |
| **Actual** | ✅ Only Paracetamol 650mg shown |
| **Status** | PASS |

---

## ✅ Test Case 3 - Stock IN Movement
| Field | Details |
|-------|---------|
| **Test ID** | TC003 |
| **Feature** | Record Stock IN |
| **Steps** | 1. Go to Stock Movements 2. Click "+ Record Stock Movement" 3. Select medicine, type IN, qty 50 |
| **Input** | Medicine: Pantoprazole 40mg, Type: IN, Qty: 50 |
| **Expected** | Stock recorded, quantity updated from 8 to 58 |
| **Actual** | ✅ Quantity updated to 58, status changed to OK |
| **Status** | PASS |

---

## ✅ Test Case 4 - Low Stock Alert
| Field | Details |
|-------|---------|
| **Test ID** | TC004 |
| **Feature** | Low Stock Alert |
| **Steps** | 1. Click "Low Stock Alerts" in navbar |
| **Input** | None |
| **Expected** | Medicines with quantity below reorder level shown |
| **Actual** | ✅ Oseltamivir (5) and Metformin (7) shown as low stock |
| **Status** | PASS |

---

## ✅ Test Case 5 - Monthly Report
| Field | Details |
|-------|---------|
| **Test ID** | TC005 |
| **Feature** | Monthly Stock Report |
| **Steps** | 1. Click "Monthly Report" in navbar |
| **Input** | None |
| **Expected** | Dashboard with total medicines, stock in/out, low stock count |
| **Actual** | ✅ Shows 6 medicines, 50 stock in, 2 low stock items |
| **Status** | PASS |

---

## ✅ Test Case 6 - Edit Medicine
| Field | Details |
|-------|---------|
| **Test ID** | TC006 |
| **Feature** | Edit Medicine |
| **Steps** | 1. Click "Edit" on any medicine 2. Change quantity 3. Click Update |
| **Input** | Updated quantity value |
| **Expected** | Medicine details updated successfully |
| **Actual** | ✅ Medicine updated with toast notification |
| **Status** | PASS |

---

## ✅ Test Case 7 - Delete Medicine
| Field | Details |
|-------|---------|
| **Test ID** | TC007 |
| **Feature** | Delete Medicine |
| **Steps** | 1. Click "Delete" on any medicine 2. Confirm deletion |
| **Input** | Confirmation: OK |
| **Expected** | Medicine removed from list |
| **Actual** | ✅ Medicine deleted successfully |
| **Status** | PASS |

---

## ✅ Test Case 8 - Insufficient Stock OUT
| Field | Details |
|-------|---------|
| **Test ID** | TC008 |
| **Feature** | Stock OUT Validation |
| **Steps** | 1. Go to Stock Movements 2. Try to take out more than available stock |
| **Input** | Medicine: Oseltamivir (qty 5), OUT qty: 100 |
| **Expected** | Error message "Insufficient stock!" |
| **Actual** | ✅ Error shown, stock not deducted |
| **Status** | PASS |

---

## ✅ Test Case 9 - Expiry Date Alert
| Field | Details |
|-------|---------|
| **Test ID** | TC009 |
| **Feature** | Expiry Date Alert |
| **Steps** | 1. Click "Low Stock Alerts" 2. Check Expiry Date Alerts section |
| **Input** | None |
| **Expected** | Medicines expiring within 90 days shown |
| **Actual** | ✅ Expiry alerts section working correctly |
| **Status** | PASS |

---

## ✅ Test Case 10 - API Validation
| Field | Details |
|-------|---------|
| **Test ID** | TC010 |
| **Feature** | API Endpoints |
| **Steps** | 1. Open http://127.0.0.1:8000/docs 2. Test each endpoint |
| **Input** | Various API inputs |
| **Expected** | All endpoints return correct responses |
| **Actual** | ✅ All 9 endpoints working correctly |
| **Status** | PASS |