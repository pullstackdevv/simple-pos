-- Create database
CREATE DATABASE IF NOT EXISTS simple_pos DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE simple_pos;

-- Products table
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
);

-- Transactions table
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
);

-- Transaction items table
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
);

-- Insert sample products
INSERT INTO products (name, price, category, available, sold, customizable, image) VALUES
('Caramel Java Frappuccino', 35000, 'Coffee', 24, 5, TRUE, '☕'),
('Java Chip Frappuccino', 35000, 'Coffee', 0, 6, TRUE, '☕'),
('Coffee Jelly Frappuccino', 25250, 'Coffee', 24, 5, TRUE, '☕'),
('Mocha Jelly Frappuccino', 25500, 'Coffee', 24, 5, TRUE, '☕'),
('Green Tea Latte', 28000, 'Tea', 15, 3, TRUE, '🍵'),
('Orange Juice', 22000, 'Juice', 20, 8, FALSE, '🧃'),
('Rice Bowl', 45000, 'Rice', 10, 2, FALSE, '🍚'),
('Pasta Carbonara', 55000, 'Pasta', 8, 1, FALSE, '🍝');
