# Setup Database untuk Simple POS

## Prerequisites

- MySQL Server running (port 3308)
- Node.js installed

## Step 1: Setup Environment Variables

Buat file `.env` di root project dengan isi:

```env
DB_HOST=host.docker.internal
DB_PORT=3308
DB_DATABASE=simple_pos
DB_USERNAME=root
DB_PASSWORD=password
```

## Step 2: Create Database

### Option A: Menggunakan MySQL Client

```bash
mysql -h host.docker.internal -P 3308 -u root -p < database/schema.sql
```

### Option B: Menggunakan GUI (MySQL Workbench/DBeaver)

1. Buka MySQL client
2. Connect ke `host.docker.internal:3308` dengan username `root` dan password `password`
3. Copy-paste isi file `database/schema.sql` ke query editor
4. Execute

## Step 3: Install Dependencies

```bash
npm install
```

Ini akan install:
- `mysql2` - MySQL driver
- `dotenv` - Environment variable loader

## Step 4: Run Development Server

```bash
npm run dev
```

Server akan berjalan di `http://localhost:4322`

## Database Schema

### Tables

**products**
- id (INT, Primary Key)
- name (VARCHAR)
- price (DECIMAL)
- category (VARCHAR)
- available (INT)
- sold (INT)
- customizable (BOOLEAN)
- image (VARCHAR)
- created_at, updated_at (TIMESTAMP)

**transactions**
- id (INT, Primary Key)
- customer_name (VARCHAR)
- subtotal (DECIMAL)
- tax (DECIMAL)
- total (DECIMAL)
- payment_method (VARCHAR)
- table_number (INT)
- status (VARCHAR)
- created_at, updated_at (TIMESTAMP)

**transaction_items**
- id (INT, Primary Key)
- transaction_id (INT, Foreign Key)
- product_id (INT, Foreign Key)
- quantity (INT)
- price (DECIMAL)
- customization (JSON)
- created_at (TIMESTAMP)

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

## Testing API

### Get All Products

```bash
curl http://localhost:4322/api/products
```

### Create Product

```bash
curl -X POST http://localhost:4322/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Iced Latte",
    "price": 32000,
    "category": "Coffee",
    "available": 20
  }'
```

### Create Transaction

```bash
curl -X POST http://localhost:4322/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "John Doe",
    "items": [
      {
        "product_id": 1,
        "quantity": 2,
        "price": 35000
      }
    ],
    "subtotal": 70000,
    "tax": 7000,
    "total": 77000,
    "payment_method": "cash"
  }'
```

## Troubleshooting

### Connection Error: "connect ECONNREFUSED"

- Pastikan MySQL server berjalan di port 3308
- Cek environment variables di `.env`
- Untuk Docker: gunakan `host.docker.internal` bukan `localhost`

### Database Not Found

- Jalankan `database/schema.sql` untuk membuat database dan tables
- Pastikan nama database sesuai dengan `DB_DATABASE` di `.env`

### Module Not Found

```bash
npm install
```

## Next Steps

1. Update frontend untuk fetch data dari API instead of localStorage
2. Implement product management UI
3. Add authentication
4. Add transaction history page
