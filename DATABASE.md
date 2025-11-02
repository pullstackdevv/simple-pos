# Simple POS - Database Architecture

## Current Database Setup

### **Storage Type: Browser LocalStorage (Client-Side)**

The application currently uses **browser localStorage** for data persistence. This is a lightweight, client-side solution perfect for static POS systems.

---

## Data Structure

### 1. **Products Data** (`src/data/products.ts`)
- **Type**: Static TypeScript array
- **Storage**: In-memory (loaded on app start)
- **Data**:
  ```typescript
  {
    id: string;
    name: string;
    price: number;
    category: string;
    image?: string;
  }
  ```
- **Current Items**: 8 products (Coffee, Food, Beverages)

### 2. **Shopping Cart** (`localStorage: 'pos-cart'`)
- **Type**: JSON array
- **Key**: `pos-cart`
- **Structure**:
  ```json
  [
    {
      "id": "1",
      "name": "Espresso",
      "price": 25000,
      "quantity": 2
    }
  ]
  ```
- **Persistence**: Survives page refresh

### 3. **Receipt/Transaction** (`localStorage: 'pos-receipt'`)
- **Type**: JSON object
- **Key**: `pos-receipt`
- **Structure**:
  ```json
  {
    "items": [...],
    "subtotal": 50000,
    "tax": 5000,
    "total": 55000,
    "timestamp": "2025-11-02T21:45:00Z"
  }
  ```
- **Persistence**: Cleared after "Transaksi Baru"

---

## Advantages of Current Setup

✅ **No Backend Required** - Works offline  
✅ **Fast** - No network latency  
✅ **Simple** - Easy to understand and modify  
✅ **Free Hosting** - Can deploy to Cloudflare Pages  
✅ **Privacy** - Data stays on user's device  

---

## Future Database Options

If you need to scale to a real backend:

### 1. **Supabase (PostgreSQL)**
```typescript
// Example integration
const { data, error } = await supabase
  .from('transactions')
  .insert([{ items, total, timestamp }])
```

### 2. **Firebase (NoSQL)**
```typescript
// Example integration
await db.collection('transactions').add({
  items,
  total,
  timestamp: new Date()
})
```

### 3. **MongoDB (Node.js Backend)**
```typescript
// Example with Express
app.post('/api/transactions', async (req, res) => {
  const transaction = await Transaction.create(req.body)
  res.json(transaction)
})
```

---

## How to Add Backend Database

To integrate a real database:

1. **Create API endpoints** for:
   - `POST /api/transactions` - Save transaction
   - `GET /api/products` - Fetch products
   - `GET /api/transactions` - Get history

2. **Replace localStorage calls** with API calls:
   ```typescript
   // Before (localStorage)
   localStorage.setItem('pos-cart', JSON.stringify(cart))
   
   // After (API)
   await fetch('/api/cart', { method: 'POST', body: JSON.stringify(cart) })
   ```

3. **Add authentication** if needed

---

## Current Data Flow

```
User Interaction
    ↓
ProductCard (click) → addToCart event
    ↓
Cart Component → localStorage ('pos-cart')
    ↓
Checkout → localStorage ('pos-receipt')
    ↓
Receipt Page → Display & Print
    ↓
New Transaction → Clear localStorage
```

---

## Recommendations

- **For Small Cafes**: Keep localStorage (current setup)
- **For Multiple Locations**: Use Supabase or Firebase
- **For Enterprise**: Use MongoDB + Node.js backend
