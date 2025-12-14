#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
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

INSERT INTO categories (name, color)
VALUES
  ('Fruit', '#ff0000');

INSERT INTO products (name, price, brand, quantity, emoji, category_id)
VALUES
  ('Banana', 1.50, 'Bakery Dough', 16, '🍌', 1),
  ('Apple', 2.00, 'Salemandra', 6, '🍏', 1);
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