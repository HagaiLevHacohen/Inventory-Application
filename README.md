# 📦 Inventory Application

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://inventory-application-6eqj.onrender.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

> Simple inventory management app with categories and items — full CRUD, server-rendered views, and admin-protected destructive actions.

[**🚀 Live Demo**](https://inventory-application-6eqj.onrender.com/)

---

## 📖 Overview

Inventory-Application is a small Express + PostgreSQL web app for managing categories and items. Users can browse categories, view items, and perform create/read/update/delete operations.

## ✨ Features

- Full CRUD for Categories and Items
- Server-rendered views for listing, creating, editing and viewing details
- Simple, extensible data model with clear relations

## 🛠️ Tech Stack

- Node.js (Express)
- PostgreSQL
- EJS (or server-side templating)
- pg (Postgres client)
- Deployed on Render

## 🚀 Installation

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+)
- npm or yarn

### Clone
```bash
git clone <repository-url>
cd Inventory-Application
```

### Install
```bash
npm install
```

### Environment
Create a `.env` in the project root:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/inventory_app
PORT=3000
```

### Seed
```bash
# Run the provided populate script to create tables and insert demo data
node db/populatedb.js

# (Make sure DATABASE_URL is set in your environment, e.g. via .env)
```

### Database
- Create the database in PostgreSQL (e.g. createdb inventory_app) and set DATABASE_URL.
- You can run the populate script to create tables and seed demo data: node db/populatedb.js
- The populate script (db/populatedb.js) connects using DATABASE_URL and is configured to work with Render Postgres (ssl.rejectUnauthorized: false).

## 📊 Database Schema

### categories
- id: INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY
- name: VARCHAR(255) NOT NULL
- color: VARCHAR(7) NOT NULL
  - (hex color code used for UI/category badges)

### products
- id: INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY
- name: VARCHAR(255) NOT NULL
- price: FLOAT NOT NULL
- brand: VARCHAR(255) NOT NULL
- quantity: INTEGER NOT NULL
- emoji: TEXT
- category_id: INTEGER NOT NULL REFERENCES categories(id)
  - Note: the foreign key in db/populatedb.js does not specify ON DELETE CASCADE.

Notes:
- db/populatedb.js creates the above tables and inserts example categories (Fruit, Vegetable, Dairy, Bakery, Beverages) and several products (Banana, Apple, Carrot, Milk, Bread, Coffee, etc.) linked to those categories.
- The populate script is the single-file "seed" mechanism — there is no separate scripts/seed.js in this repo. Use node db/populatedb.js to populate the DB.
- If you prefer a different foreign-key behavior (e.g., cascade deletes), update the SQL in db/populatedb.js or adjust controller logic accordingly.

## 🧭 Routes (high-level)
- GET / — Home (list categories)
- GET /categories/new, POST /categories
- GET /categories/:id, GET /categories/:id/edit, PUT /categories/:id, DELETE /categories/:id
- GET /items/new, POST /items
- GET /items/:id, GET /items/:id/edit, PUT /items/:id, DELETE /items/:id

## 📁 Project Structure (example)
```
Inventory-Application/
├── app.js
├── package.json
├── db/
├── controllers/
├── routes/
├── views/
└── public/
```

## 📝 Scripts
```bash
npm start       # start production server
```

## 🤝 Contributing

Contributions welcome. Please open an issue or a PR with focused changes and a short description.

## 📄 License

Choose a license (e.g., MIT) and add LICENSE file.

## 👨‍💻 Author

Built as part of a learning project. Deployed demo: https://inventory-application-6eqj.onrender.com/

---

<div align="center">
⭐ If this repo helped you, give it a star!
</div>
