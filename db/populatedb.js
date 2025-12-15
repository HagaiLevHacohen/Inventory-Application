#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  color VARCHAR(7) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  price FLOAT NOT NULL,
  brand VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  emoji TEXT,
  category_id INTEGER NOT NULL REFERENCES categories(id)
);

-- Insert categories
INSERT INTO categories (name, color)
VALUES
  ('Fruit', '#ff0000'),
  ('Vegetable', '#00ff00'),
  ('Dairy', '#ffff00'),
  ('Bakery', '#ff8800'),
  ('Beverages', '#0000ff');

-- Insert products
INSERT INTO products (name, price, brand, quantity, emoji, category_id)
VALUES
  -- Fruit
  ('Banana', 1.50, 'Bakery Dough', 16, '🍌', 1),
  ('Apple', 2.00, 'Salemandra', 6, '🍏', 1),
  ('Orange', 1.20, 'Citrus Co', 12, '🍊', 1),
  ('Strawberry', 3.50, 'BerryFarm', 20, '🍓', 1),

  -- Vegetable
  ('Carrot', 0.80, 'VeggieFresh', 30, '🥕', 2),
  ('Broccoli', 1.50, 'GreenFarm', 18, '🥦', 2),
  ('Tomato', 1.00, 'TomatoKing', 25, '🍅', 2),
  ('Lettuce', 1.20, 'Leafy Greens', 10, '🍁', 2),

  -- Dairy
  ('Milk', 2.50, 'DairyLand', 15, '🥛', 3),
  ('Cheese', 4.00, 'Cheesy', 10, '🧀', 3),
  ('Yogurt', 1.50, 'Yummy', 20, '🍦', 3),

  -- Bakery
  ('Bread', 2.00, 'Bakery Dough', 25, '🍞', 4),
  ('Croissant', 1.80, 'Bakery Dough', 30, '🥐', 4),
  ('Muffin', 2.20, 'Bakery Dough', 15, '🍪', 4),

  -- Beverages
  ('Coffee', 3.00, 'BeanCo', 40, '☕', 5),
  ('Orange Juice', 2.50, 'Juicy', 20, '🥛', 5);

`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
