#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255),
  price FLOAT,
  brand VARCHAR(255),
  quantity INTEGER,
  categoryID INTEGER FOREIGN KEY
);

INSERT INTO products (name, price, brand, quantity, category) 
VALUES
  ('Banana', 1.5, 'Bakery Dough', 16, 1),
  ('Apple', 2.0, 'Salemandra', 6, 1);

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255),
  color VARCHAR(255)
);

INSERT INTO categories (name, color) 
VALUES
  ('Fruit', '#ff0000');
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