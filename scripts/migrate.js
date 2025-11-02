#!/usr/bin/env node

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  database: process.env.DB_DATABASE || 'simple_pos',
  user: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function runMigrations() {
  let connection;
  try {
    console.log('🚀 Starting database migrations...\n');

    connection = await pool.getConnection();

    // Create products table
    console.log('📝 Creating products table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS products (
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
    `);
    console.log('✓ Products table created\n');

    // Create transactions table
    console.log('📝 Creating transactions table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS transactions (
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
    `);
    console.log('✓ Transactions table created\n');

    // Create transaction_items table
    console.log('📝 Creating transaction_items table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS transaction_items (
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
    `);
    console.log('✓ Transaction items table created\n');

    // Check if products exist
    console.log('📝 Checking for existing products...');
    const [products] = await connection.execute('SELECT COUNT(*) as count FROM products');
    const count = products[0]?.count || 0;

    if (count === 0) {
      console.log('📝 Inserting sample products...');
      await connection.execute(`
        INSERT INTO products (name, price, category, available, sold, customizable, image) VALUES
        ('Caramel Java Frappuccino', 35000, 'Coffee', 24, 5, TRUE, '☕'),
        ('Java Chip Frappuccino', 35000, 'Coffee', 0, 6, TRUE, '☕'),
        ('Coffee Jelly Frappuccino', 25250, 'Coffee', 24, 5, TRUE, '☕'),
        ('Mocha Jelly Frappuccino', 25500, 'Coffee', 24, 5, TRUE, '☕'),
        ('Green Tea Latte', 28000, 'Tea', 15, 3, TRUE, '🍵'),
        ('Orange Juice', 22000, 'Juice', 20, 8, FALSE, '🧃'),
        ('Rice Bowl', 45000, 'Rice', 10, 2, FALSE, '🍚'),
        ('Pasta Carbonara', 55000, 'Pasta', 8, 1, FALSE, '🍝')
      `);
      console.log('✓ Sample products inserted\n');
    } else {
      console.log(`✓ Database already has ${count} products\n`);
    }

    console.log('✅ All migrations completed successfully!\n');
    console.log('Database connection details:');
    console.log(`  Host: ${process.env.DB_HOST}`);
    console.log(`  Port: ${process.env.DB_PORT}`);
    console.log(`  Database: ${process.env.DB_DATABASE}`);
    console.log(`  User: ${process.env.DB_USERNAME}\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Migration error:', error instanceof Error ? error.message : error);
    process.exit(1);
  } finally {
    if (connection) connection.release();
    await pool.end();
  }
}

runMigrations();
