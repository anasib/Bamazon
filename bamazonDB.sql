DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products (

  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(50),
  department_name VARCHAR(50),
  price DECIMAL(10),
  stock_quantity INTEGER(10),
  PRIMARY KEY (item_id)
  
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("MacBook Pro", "Technology", 1263.87, 87),
        ("Shampoo", "Home Supplies", 11.43, 65),
        ("Sneakers", "Footwear", 54.18, 4),
        ("Clipboard", "Accessories", 5.79, 18),
        ("Lawn Mower", "Gardening", 258, 7),
        ("Socks", "Footwear", 18.95, 24),
        ("Belt", "Clothing", 12.99, 14),
        ("Advil", "Medicine", 8.73, 5),
        ("Ginger bread", "Food", 4.95, 70),
        ("Milk", "Food", 3.99, 10);
        
--  select * from products