# Database Integration Guide

## Status

✅ **Backend API Setup Complete**
✅ **MySQL Connection Ready**
✅ **CRUD Operations Configured**

## What's Been Done

### 1. Environment Configuration
- Created `.env.example` dengan database credentials
- Setup MySQL connection pool di `src/lib/db.ts`

### 2. API Endpoints Created

#### Products API
```
GET    /api/products              - Get all products
POST   /api/products              - Create new product
GET    /api/products/[id]         - Get product by ID
PUT    /api/products/[id]         - Update product
DELETE /api/products/[id]         - Delete product
```

#### Transactions API
```
GET    /api/transactions          - Get all transactions
POST   /api/transactions          - Create transaction
```

### 3. Database Schema
- `products` table - Menyimpan menu items
- `transactions` table - Menyimpan data transaksi
- `transaction_items` table - Detail items per transaksi

### 4. Sample Data
Database sudah include 8 sample products (Coffee, Tea, Juice, Rice, Pasta)

## How to Setup

### Step 1: Copy .env.example ke .env
```bash
cp .env.example .env
```

### Step 2: Create Database
```bash
# Menggunakan MySQL client
mysql -h host.docker.internal -P 3308 -u root -p < database/schema.sql
```

### Step 3: Install Dependencies
```bash
npm install
```

### Step 4: Run Dev Server
```bash
npm run dev
```

## Testing API

### Get All Products
```bash
curl http://localhost:4322/api/products
```

### Create Transaction
```bash
curl -X POST http://localhost:4322/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "John Doe",
    "items": [{"product_id": 1, "quantity": 2, "price": 35000}],
    "subtotal": 70000,
    "tax": 7000,
    "total": 77000,
    "payment_method": "cash"
  }'
```

## Next Steps: Frontend Integration

Untuk menghubungkan frontend dengan API, perlu update:

### 1. Update ProductCardNew.astro
```typescript
// Fetch products dari API instead of static data
const response = await fetch('/api/products');
const products = await response.json();
```

### 2. Update Cart untuk Save ke Database
```typescript
// Instead of localStorage
const response = await fetch('/api/transactions', {
  method: 'POST',
  body: JSON.stringify({
    customer_name,
    items,
    subtotal,
    tax,
    total,
    payment_method
  })
});
```

### 3. Add Transaction History Page
```
/pages/history.astro - Tampilkan semua transactions dari API
```

## File Structure

```
src/
├── lib/
│   └── db.ts                 - Database connection
├── pages/
│   ├── api/
│   │   ├── products.ts       - GET/POST products
│   │   ├── products/[id].ts  - GET/PUT/DELETE product
│   │   └── transactions.ts   - GET/POST transactions
│   └── index.astro           - Main POS page
└── components/
    ├── ProductCardNew.astro
    ├── BillDetails.astro
    └── Sidebar.astro

database/
└── schema.sql               - Database schema & sample data

.env.example                 - Environment template
SETUP_DATABASE.md           - Setup instructions
```

## Database Credentials

```
Host: host.docker.internal
Port: 3308
Database: simple_pos
Username: root
Password: password
```

## Troubleshooting

### Error: "Cannot find module 'mysql2'"
```bash
npm install mysql2 dotenv
```

### Error: "connect ECONNREFUSED"
- Pastikan MySQL running di port 3308
- Check `.env` file sudah benar

### Error: "Database not found"
```bash
mysql -h host.docker.internal -P 3308 -u root -p < database/schema.sql
```

## API Response Examples

### GET /api/products
```json
[
  {
    "id": 1,
    "name": "Caramel Java Frappuccino",
    "price": 35000,
    "category": "Coffee",
    "available": 24,
    "sold": 5,
    "customizable": true,
    "image": "☕"
  }
]
```

### POST /api/transactions
```json
{
  "success": true,
  "transaction_id": 1,
  "message": "Transaction created successfully"
}
```

## Ready for Production?

Sebelum production:
- [ ] Add authentication
- [ ] Add input validation
- [ ] Add error handling
- [ ] Add logging
- [ ] Setup database backups
- [ ] Add rate limiting
- [ ] Add CORS configuration
