CREATE TABLE users 
(
     user_id INT PRIMARY KEY AUTO_INCREMENT,
     email VARCHAR(50) NOT NULL UNIQUE,
     name VARCHAR(50) NOT NULL,
     date_of_birth DATE NOT NULL,
     mobile char(10) NOT NULL,
     password VARCHAR(50) NOT NULL
);

CREATE TABLE address
(
    address_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    area VARCHAR(100) NOT NULL,
    postcode CHAR(5) NOT NULL,
    city VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE categories 
(
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE products
(
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    category_id INT NOT NULL,
    product_desc VARCHAR(200) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE product_variant 
(
    product_variant_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    size INT,
    color VARCHAR(20),
    price INT NOT NULL,
    product_image VARCHAR(100),
    qty INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE cart
(
    cart_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_variant_id INT NOT NULL,
    qty INT NOT NULL,
    CONSTRAINT cartCombinedKey UNIQUE (user_id,product_variant_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_variant_id) REFERENCES product_variant(product_variant_id)
);

CREATE TABLE wishlist
(
    wishlist_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_variant_id INT NOT NULL,
    CONSTRAINT wishlistCombinedKey UNIQUE (user_id,product_variant_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_variant_id) REFERENCES product_variant(product_variant_id)
);

CREATE TABLE orders
(
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    address_id INT NOT NULL,
    order_status VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (address_id) REFERENCES address(address_id)
);

CREATE TABLE order_item
(
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_variant_id INT NOT NULL,
    qty INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_variant_id) REFERENCES product_variant(product_variant_id)
);

CREATE TABLE shipping
(
    shipping_id INT PRIMARY KEY AUTO_INCREMENT,
    shipping_type VARCHAR(50) NOT NULL,
    order_id INT NOT NULL,
    shipping_status VARCHAR(30) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);