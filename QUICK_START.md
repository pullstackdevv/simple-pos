# Quick Start Guide - Simple POS

## Prerequisites
- Node.js installed
- MySQL running at `host.docker.internal:3308`
- MySQL credentials: `root` / `password`

---

## Setup (5 minutes)

### 1. Copy Environment File
```bash
cp .env.example .env
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Migrations (Choose One)

#### Option A: Web UI (Recommended)
```bash
npm run dev
# Buka http://localhost:4322/setup
# Click "Run Migrations"
```

#### Option B: Command Line
```bash
npm run migrate
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Open Browser
```
http://localhost:4322
```

---

## How to Use POS System

### Making an Order

1. **Click Product Card**
   - Modal akan terbuka dengan customization options

2. **Customize (Optional)**
   - Pilih Cup Size (S, M, L)
   - Pilih Ice Level (30%, 60%, 100%)
   - Pilih Sugar Level (30%, 60%, 100%)
   - Pilih Topping

3. **Set Quantity**
   - Gunakan +/- buttons
   - Lihat total price update real-time

4. **Add to Cart**
   - Click "Add to Cart" button
   - Item akan muncul di Bill Details (kanan)

5. **Checkout**
   - Masukkan Customer Name
   - Masukkan Table Number (opsional)
   - Pilih Payment Method (Cash/Card)
   - Click "Process Transaction"

6. **Success**
   - Order disimpan ke database
   - Cart akan kosong, siap order baru

---

## Database

### Tables Created
- `products` - Menu items
- `transactions` - Penjualan
- `transaction_items` - Detail items

### Sample Data
8 produk sudah diinsert:
- 4 Coffee items
- 1 Tea item
- 1 Juice item
- 1 Rice item
- 1 Pasta item

---

## Project Structure

```
simple-pos/
├── src/
│   ├── components/
│   │   ├── Sidebar.astro
│   │   ├── ProductCardNew.astro
│   │   ├── ProductModal.astro
│   │   └── BillDetails.astro
│   ├── pages/
│   │   ├── index.astro (Main POS)
│   │   ├── setup.astro (Setup page)
│   │   └── api/
│   │       ├── products.ts
│   │       ├── products/[id].ts
│   │       ├── transactions.ts
│   │       └── migrate.ts
│   ├── lib/
│   │   ├── db.ts (Database connection)
│   │   └── migrations.ts (Migration logic)
│   ├── data/
│   │   └── products.ts (Product data)
│   └── styles/
│       └── globals.css
├── scripts/
│   └── migrate.js (CLI migration)
├── database/
│   └── schema.sql (Database schema)
├── .env.example
├── package.json
└── README.md
```

---

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `GET /api/products/[id]` - Get product by ID
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create transaction

### Database
- `GET /api/migrate` - Check migration status
- `POST /api/migrate` - Run migrations

---

## Troubleshooting

### MySQL Connection Error
```
Error: connect ECONNREFUSED
```
**Solution:**
1. Pastikan MySQL running: `mysql -h host.docker.internal -P 3308 -u root -p`
2. Check .env file
3. Restart MySQL service

### Migration Failed
```
Error: Migration failed
```
**Solution:**
1. Check MySQL connection
2. Check .env credentials
3. Try manual migration: `npm run migrate`
4. Check MySQL logs

### Port Already in Use
```
Error: Port 4322 already in use
```
**Solution:**
```bash
# Kill process on port 4322
lsof -ti:4322 | xargs kill -9
# Or use different port
npm run dev -- --port 4323
```

---

## Next Steps

- ✅ Setup complete
- ✅ Database ready
- ✅ Sample data inserted
- 👉 Start making orders!
- 👉 View transaction history
- 👉 Add more products via API
- 👉 Customize UI as needed

---

## Support

For detailed information, see:
- `MIGRATION_GUIDE.md` - Database migrations
- `DATABASE_INTEGRATION.md` - API integration
- `SETUP_DATABASE.md` - Database setup
