# Database Migration Guide

## Overview

Simple POS memiliki 2 cara untuk menjalankan migrations:

1. **Web UI** - Melalui browser
2. **CLI** - Melalui command line

---

## Method 1: Web UI (Recommended for First Time)

### Step 1: Pastikan MySQL Running
```bash
# MySQL harus berjalan di port 3308
mysql -h host.docker.internal -P 3308 -u root -p
```

### Step 2: Buka Setup Page
```
http://localhost:4322/setup
```

### Step 3: Click "Run Migrations"
- Tunggu proses selesai
- Lihat logs untuk status
- Jika sukses, akan redirect ke POS system

### Apa yang Dibuat:
- ✓ `products` table (8 sample products)
- ✓ `transactions` table
- ✓ `transaction_items` table

---

## Method 2: CLI (Command Line)

### Step 1: Pastikan .env Sudah Benar
```bash
cat .env
```

Output harus:
```
DB_HOST=host.docker.internal
DB_PORT=3308
DB_DATABASE=simple_pos
DB_USERNAME=root
DB_PASSWORD=password
```

### Step 2: Jalankan Migration Script
```bash
npm run migrate
```

### Output Contoh:
```
🚀 Starting database migrations...

📝 Creating products table...
✓ Products table created

📝 Creating transactions table...
✓ Transactions table created

📝 Creating transaction_items table...
✓ Transaction items table created

📝 Checking for existing products...
📝 Inserting sample products...
✓ Sample products inserted

✅ All migrations completed successfully!

Database connection details:
  Host: host.docker.internal
  Port: 3308
  Database: simple_pos
  User: root
```

---

## Database Schema

### products table
```sql
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100) NOT NULL,
  available INT DEFAULT 0,
  sold INT DEFAULT 0,
  customizable BOOLEAN DEFAULT FALSE,
  image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category)
)
```

### transactions table
```sql
CREATE TABLE transactions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_name VARCHAR(255),
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50),
  table_number INT,
  status VARCHAR(50) DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_created_at (created_at),
  INDEX idx_status (status)
)
```

### transaction_items table
```sql
CREATE TABLE transaction_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  transaction_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  customization JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id),
  INDEX idx_transaction_id (transaction_id)
)
```

---

## Sample Products

8 produk akan diinsert otomatis:

| Name | Price | Category | Available | Customizable |
|------|-------|----------|-----------|--------------|
| Caramel Java Frappuccino | 35,000 | Coffee | 24 | Yes |
| Java Chip Frappuccino | 35,000 | Coffee | 0 | Yes |
| Coffee Jelly Frappuccino | 25,250 | Coffee | 24 | Yes |
| Mocha Jelly Frappuccino | 25,500 | Coffee | 24 | Yes |
| Green Tea Latte | 28,000 | Tea | 15 | Yes |
| Orange Juice | 22,000 | Juice | 20 | No |
| Rice Bowl | 45,000 | Rice | 10 | No |
| Pasta Carbonara | 55,000 | Pasta | 8 | No |

---

## Troubleshooting

### Error: "connect ECONNREFUSED"
```
❌ Solusi:
1. Pastikan MySQL running di port 3308
2. Check .env file sudah benar
3. Untuk Docker: gunakan host.docker.internal bukan localhost
```

### Error: "Access denied for user 'root'"
```
❌ Solusi:
1. Check password di .env file
2. Pastikan user 'root' ada di MySQL
3. Jalankan: mysql -h host.docker.internal -P 3308 -u root -p
```

### Error: "Database 'simple_pos' doesn't exist"
```
❌ Solusi:
Database akan dibuat otomatis saat migration
Jika tidak, buat manual:
mysql -h host.docker.internal -P 3308 -u root -p
CREATE DATABASE simple_pos DEFAULT CHARACTER SET utf8mb4;
```

### Tables Sudah Ada, Ingin Reset?
```bash
# Backup data dulu jika perlu
# Kemudian drop tables:
mysql -h host.docker.internal -P 3308 -u root -p simple_pos
DROP TABLE transaction_items;
DROP TABLE transactions;
DROP TABLE products;

# Jalankan migration lagi:
npm run migrate
```

---

## API Endpoints

### Run Migration via API
```bash
curl -X POST http://localhost:4322/api/migrate
```

### Check Migration Status
```bash
curl http://localhost:4322/api/migrate
```

---

## Files Related to Migrations

- `/src/lib/migrations.ts` - Migration logic
- `/src/pages/api/migrate.ts` - Migration API endpoint
- `/src/pages/setup.astro` - Setup UI page
- `/scripts/migrate.js` - CLI migration script
- `package.json` - npm scripts

---

## Next Steps

Setelah migration selesai:

1. ✅ Database tables created
2. ✅ Sample products inserted
3. 👉 Jalankan aplikasi: `npm run dev`
4. 👉 Buka: `http://localhost:4322`
5. 👉 Mulai membuat order!
