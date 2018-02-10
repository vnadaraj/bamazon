CREATE DATABASE bamazon;
USE bamazon;

-- Create the table products.
CREATE TABLE products
(
-- (unique id for each product)
item_id int NOT NULL AUTO_INCREMENT,
-- Name of product
product_name varchar(255) NOT NULL,
department_name varchar(255),
-- Cost to customer
price decimal(10,2),
-- How much of the product is available in stores
stock_quantity int,
PRIMARY KEY (item_id)
);

-- Insert a set of records.
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Toothpaste", "Bath", 1.55, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Soap", "Bath", 2.15, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Rice", "Cooking", 5.55, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Peanut Butter", "Breakfast", 4.25, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Bottled Water", "Beverages", 3.55, 300);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Mock Product 1", "Hardware", 4.55, 400);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Mock Product 2", "Auto", 7.99, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Mock Product 3", "Garden", 9.75, 220);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Mock Product 4", "Bakery", 3.99, 99);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Mock Product 5", "Jewelry", 59.55, 155);
