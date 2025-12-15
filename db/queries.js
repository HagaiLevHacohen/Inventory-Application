const pool = require("./pool");


async function getAllProducts(requestQuery) {
  const values = [];
  let whereClause = '';
  let orderClause = '';
  const categories = Array.isArray(requestQuery.category)
  ? requestQuery.category
  : requestQuery.category
    ? [requestQuery.category]
    : [];
  if (categories.length > 0) {
    const placeholders = categories
      .map((_, i) => `$${i + 1}`)
      .join(', ');

    whereClause = `WHERE categories.name IN (${placeholders})`;
    values.push(...categories);
  }

  const orderParts = [];

  if (requestQuery.price_sort) {
    orderParts.push(`products.price ${requestQuery.price_sort}`);
  }

  if (requestQuery.name_sort) {
    orderParts.push(`products.name ${requestQuery.name_sort}`);
  }

  if (orderParts.length > 0) {
    orderClause = `ORDER BY ${orderParts.join(', ')}`;
  }

  const query = `
    SELECT 
      products.id AS product_id,
      products.name AS product_name,
      products.price,
      products.brand,
      products.quantity,
      products.emoji,
      categories.id AS category_id,
      categories.name AS category_name,
      categories.color
    FROM products
    INNER JOIN categories ON products.category_id = categories.id
    ${whereClause}
    ${orderClause}
  `;

  const { rows } = await pool.query(query, values);
  return rows;
}


async function getAllCategories() {
  const { rows } = await pool.query(`
    SELECT t1.*, COALESCE(t2.product_count, 0) AS product_count
    FROM categories AS t1
    LEFT JOIN (
        SELECT category_id, COUNT(*) AS product_count
        FROM products
        GROUP BY category_id
    ) AS t2
    ON t1.id = t2.category_id
  `);
  return rows;
}

async function getCategoryID(categoryName) {
  const { rows } = await pool.query(`
    SELECT id 
    FROM categories 
    WHERE categories.name = $1
  `, [categoryName]);
  return rows[0] ? rows[0].id : null;
}

async function getProduct(productId) {
  const { rows } = await pool.query(`
    SELECT 
    products.id AS product_id, products.name AS product_name, products.price, products.brand, products.quantity, products.emoji,
    categories.id AS category_id, categories.name AS category_name, categories.color
    FROM products 
    INNER JOIN categories 
    ON (products.category_id = categories.id)
    WHERE products.id = $1
  `, [productId]);
  return rows[0];
}

async function getProductByName(productName) {
  const { rows } = await pool.query(
    `SELECT * FROM products WHERE name = $1`,
    [productName]
  );

  return rows[0] ?? null;
}


async function insertProduct({name, price, brand, quantity, emoji, categoryName}) {
  const categoryId = await getCategoryID(categoryName);
  if (!categoryId) throw new Error(`Category "${categoryName}" not found`);
  await pool.query(
  "INSERT INTO products (name, price, brand, quantity, emoji, category_id) VALUES ($1, $2, $3, $4, $5, $6)",
  [name, price, brand, quantity, emoji, categoryId]);
}

async function updateProduct({ productId, name, price, brand, quantity, emoji, categoryName }) {
  const categoryId = await getCategoryID(categoryName);
  if (!categoryId) throw new Error(`Category "${categoryName}" not found`);
  const query = `
    UPDATE products
    SET name = $1,
        price = $2,
        brand = $3,
        quantity = $4,
        emoji = $5,
        category_id = $6
    WHERE id = $7
    RETURNING *;
  `;
  const values = [name, price, brand, quantity, emoji, categoryId, productId];

  const { rows } = await pool.query(query, values);
  return rows[0]; // Return the updated product
}

async function deleteProduct(productId) {
  await pool.query("DELETE FROM products WHERE products.id = $1", [productId]);
}

async function getCategory(categoryId) {
  const { rows } = await pool.query(`
    SELECT t1.*, t2.product_count
    FROM categories AS t1
    LEFT JOIN (
    SELECT category_id, COUNT(*) AS product_count
    FROM products
    GROUP BY category_id) AS t2
    ON t1.id = t2.category_id
    WHERE t1.id = $1
  `, [categoryId]);
  return rows[0];
}

async function insertCategory({name, color}) {
  await pool.query("INSERT INTO categories (name, color) VALUES ($1, $2)", [name, color]);
}

async function updateCategory({ categoryId, name, color }) {
  const query = `
    UPDATE categories
    SET name = $1,
        color = $2
    WHERE id = $3
    RETURNING *;
  `;
  const values = [name, color, categoryId];

  const { rows } = await pool.query(query, values);
  return rows[0]; // Return the updated category
}

async function deleteCategory(categoryId) {
  await pool.query("DELETE FROM categories WHERE categories.id = $1", [categoryId]);
}

module.exports = {
  getAllProducts,
  getAllCategories,
  getCategoryID,
  getProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  getCategory,
  insertCategory,
  updateCategory,
  deleteCategory,
  getProductByName
};