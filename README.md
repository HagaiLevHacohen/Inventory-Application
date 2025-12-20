# Inventory-Application

Live demo: https://inventory-application-6eqj.onrender.com/

Short description
This is a simple Inventory Management web application built with Express and PostgreSQL. It lets users browse categories and items, and perform full CRUD (Create, Read, Update, Delete) on both entities. Destructive actions are protected by a configurable admin confirmation.

Why this project
This project was built as an exercise to design a small full-stack app with relational data, RESTful routes, server-rendered views, and deployment to Render.

Key features
- Category and item management (full CRUD).
- Server-rendered views for listing, creating, editing and viewing details.
- Admin confirmation required for destructive actions (edit/delete).
- Seed script to populate the database with dummy data for local development and deployment.

Tech stack
- Node.js + Express
- PostgreSQL
- EJS / server-side templates (or whichever templating engine is used in the repo)
- Deployed on Render

Data model
- categories
  - id (PK, integer)
  - name (string, unique, required)
  - description (text, optional)
  - created_at (timestamp)
  - updated_at (timestamp)
- items
  - id (PK, integer)
  - category_id (FK -> categories.id, required)
  - name (string, required)
  - description (text, optional)
  - quantity (integer, default 0)
  - price (decimal, optional)
  - created_at (timestamp)
  - updated_at (timestamp)

Relationships
- Category has many Items.
- Item belongs to one Category.
- When a Category is deleted: the app will first require admin confirmation. The chosen behavior is to cascade delete its items (i.e., deleting a category removes its items). This is documented here and can be adjusted in the DB schema or controller logic.

Routes (high-level)
- GET /                — Home: list categories
- GET /categories/new  — Form: create category
- POST /categories     — Create category
- GET /categories/:id  — View category and its items
- GET /categories/:id/edit — Edit category form
- PUT /categories/:id  — Update category
- DELETE /categories/:id — Delete category (admin confirmation)

- GET /items/new       — Form: create item
- POST /items          — Create item (assign to category)
- GET /items/:id       — View item details
- GET /items/:id/edit  — Edit item form
- PUT /items/:id       — Update item
- DELETE /items/:id    — Delete item (admin confirmation)

Admin protection for destructive actions
- Destructive actions (DELETE, and possibly PUT depending on your security needs) require entering an admin password on the form before the server will perform the action.
- Configure the admin password with an environment variable, e.g. ADMIN_PASSWORD.
- Example behavior: forms include a password input; controllers validate the password before executing the delete/update.

Environment / prerequisites
- Node.js (14+)
- npm or yarn
- PostgreSQL (local or hosted)
- Environment variables:
  - DATABASE_URL (e.g., postgres://user:pass@host:5432/dbname)
  - PORT (optional)
  - ADMIN_PASSWORD (for destructive action confirmation)

Setup (local)
1. Clone the repo
   - git clone <repo-url>
2. Install dependencies
   - npm install
3. Create a PostgreSQL database and set DATABASE_URL
4. Run migrations (if present) or create tables using the schema above
5. Seed the database with dummy data:
   - node scripts/seed.js
   - (or run the provided seed/migration commands)
6. Start the app
   - npm run dev
7. Open http://localhost:PORT

Seeding
- Add a seed script to populate a few categories and items. This makes it easy to test UI and deletion behavior.

Deployment notes
- The app is deployed on Render at the link above.
- Ensure the same environment variables are set in Render (DATABASE_URL, ADMIN_PASSWORD).
- Run the seed script after deploying to populate demo data, if desired.

Testing & QA
- Manually test the CRUD flows for categories and items.
- Verify admin password confirmation works before performing deletes.
- Test cascade-delete behavior if removing categories.

Contributing
- Open an issue or submit a PR. Keep changes focused and include tests where appropriate.

License
- Choose a license (e.g., MIT) or replace with your preferred license.

Contact
- For questions about this repo or the deployment, contact the project owner or maintainer listed in the repository.

Notes for maintainers
- If you want to change the delete strategy (e.g., set item's category_id to NULL instead of cascade delete), update the DB foreign key ON DELETE behavior and controllers accordingly.
- Keep ADMIN_PASSWORD out of source control and use environment management in Render/Heroku/etc.
