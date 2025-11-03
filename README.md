# ☕ Simple POS - Point of Sale System

A modern, professional Point of Sale (POS) system built with **Astro**, **TypeScript**, **Tailwind CSS**, and **MySQL**.

## 🌟 Features

### ✅ Complete
- **3-Column Professional Layout** - Sidebar, Product Grid, Bill Details
- **Product Catalog** - Browse and search products by category
- **Product Customization** - Cup size, ice level, sugar level, toppings
- **Shopping Cart** - Add/remove items, real-time calculations
- **Checkout System** - Customer info, payment method selection
- **Database Integration** - MySQL backend with CRUD operations
- **Transaction History** - All orders saved to database
- **Responsive Design** - Works on desktop and tablets

### 🚀 Technical
- **Astro Framework** - Fast, modern web framework
- **TypeScript** - Type-safe code
- **Tailwind CSS v4** - Beautiful, utility-first styling
- **MySQL Database** - Reliable data persistence
- **REST API** - Full CRUD endpoints
- **Auto Migrations** - Database setup automation

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MySQL running at `host.docker.internal:3308`
- MySQL credentials: `root` / `password`

### Setup (5 minutes)

```bash
# 1. Clone and navigate
cd simple-pos

# 2. Copy environment file
cp .env.example .env

# 3. Install dependencies
npm install

# 4. Run database migrations
npm run migrate

# 5. Start dev server
npm run dev

# 6. Open browser
http://localhost:4322
```

---

## 📋 How to Use

### Making an Order

1. **Click Product Card** → Customization modal opens
2. **Customize Options** → Select cup size, ice level, sugar level, topping
3. **Set Quantity** → Use +/- buttons
4. **Add to Cart** → Item appears in bill details
5. **Enter Customer Info** → Name and table number
6. **Select Payment** → Cash or Card
7. **Process Transaction** → Order saved to database

---

## 📁 Project Structure

```
simple-pos/
├── src/
│   ├── components/
│   │   ├── Sidebar.astro          # Left navigation
│   │   ├── ProductCardNew.astro   # Product display
│   │   ├── ProductModal.astro     # Customization modal
│   │   └── BillDetails.astro      # Right panel with cart
│   ├── pages/
│   │   ├── index.astro            # Main POS page
│   │   ├── setup.astro            # Database setup
│   │   └── api/
│   │       ├── products.ts        # Product CRUD
│   │       ├── products/[id].ts   # Product detail
│   │       ├── transactions.ts    # Transaction CRUD
│   │       └── migrate.ts         # Migration endpoint
│   ├── lib/
│   │   ├── db.ts                  # Database connection
│   │   └── migrations.ts          # Migration logic
│   ├── data/
│   │   └── products.ts            # Product data
│   └── styles/
│       └── globals.css            # Global styles
├── scripts/
│   └── migrate.js                 # CLI migration
├── database/
│   └── schema.sql                 # Database schema
└── package.json
```

---

## 🛠️ Available Commands

```bash
# Development
npm run dev              # Start dev server at http://localhost:4322

# Database
npm run migrate          # Run database migrations

# Production
npm run build            # Build for production
npm run preview          # Preview production build
```

---

## 📊 Database Schema

### products
- id, name, price, category
- available, sold, customizable
- image, created_at, updated_at

### transactions
- id, customer_name, subtotal, tax, total
- payment_method, table_number, status
- created_at, updated_at

### transaction_items
- id, transaction_id, product_id
- quantity, price, customization (JSON)
- created_at

---

## 🔌 API Endpoints

### Products
```
GET    /api/products              # Get all products
POST   /api/products              # Create product
GET    /api/products/[id]         # Get product by ID
PUT    /api/products/[id]         # Update product
DELETE /api/products/[id]         # Delete product
```

### Transactions
```
GET    /api/transactions          # Get all transactions
POST   /api/transactions          # Create transaction
```

### Database
```
GET    /api/migrate               # Check migration status
POST   /api/migrate               # Run migrations
```

---

## 🎨 UI Components

### Sidebar
- Navigation menu with 6 items
- Order count badge
- Sign out button

### Product Grid
- Responsive grid layout
- Product cards with:
  - Image/emoji
  - Name and price
  - Stock status
  - Add to cart button

### Product Modal
- Full customization interface
- Real-time price calculation
- Quantity controls
- Add to cart functionality

### Bill Details
- Cart items display
- Real-time calculations
- Customer info input
- Payment method selection
- Checkout button

---

## 🎯 Sample Products

8 products pre-loaded:
- Caramel Java Frappuccino (35,000 IDR)
- Java Chip Frappuccino (35,000 IDR)
- Coffee Jelly Frappuccino (25,250 IDR)
- Mocha Jelly Frappuccino (25,500 IDR)
- Green Tea Latte (28,000 IDR)
- Orange Juice (22,000 IDR)
- Rice Bowl (45,000 IDR)
- Pasta Carbonara (55,000 IDR)

---

## 🔧 Configuration

### Environment Variables (.env)
```
DB_HOST=host.docker.internal
DB_PORT=3308
DB_DATABASE=simple_pos
DB_USERNAME=root
DB_PASSWORD=password
```

### Astro Config
```javascript
export default defineConfig({
  output: 'static',
  // API routes work in dev mode
  // For production, install adapter
});
```

---

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Quick setup guide
- **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - Database migrations
- **[DATABASE_INTEGRATION.md](./DATABASE_INTEGRATION.md)** - API documentation
- **[BUILD_FIX.md](./BUILD_FIX.md)** - Build configuration
- **[TEST_CHECKLIST.md](./TEST_CHECKLIST.md)** - Testing checklist

---

## ✅ Status

- ✅ UI fully functional
- ✅ Database connected
- ✅ CRUD operations working
- ✅ Order creation working
- ✅ Real-time calculations
- ✅ Payment selection
- ✅ Transaction saving
- ✅ Sample data loaded

---

## 🚀 Ready to Use!

The application is fully functional and ready for:
- ✅ Development and testing
- ✅ Demo purposes
- ✅ Production (with adapter)

Start with `npm run dev` and begin creating orders!

---

## 📝 License

MIT - Feel free to use and modify

---

## 🤝 Support

For issues or questions, check the documentation files or review the code comments.
