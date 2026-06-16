/**
 * Database Pool Connection
 * Manages MySQL connection pooling for Instant Bite application
 */

const mysql = require('mysql2/promise');
const dbConfig = require('./db-config');

let pool = null;

/**
 * Initialize and get the connection pool
 */
async function getPool() {
  if (!pool) {
    try {
      pool = mysql.createPool(dbConfig);
      console.log('📦 Database connection pool created');
    } catch (error) {
      console.error('❌ Failed to create connection pool:', error);
      throw error;
    }
  }
  return pool;
}

/**
 * Get a single connection from the pool
 */
async function getConnection() {
  const pool = await getPool();
  return pool.getConnection();
}

/**
 * Execute a query
 * @param {string} sql - SQL query
 * @param {Array} values - Query parameters
 */
async function query(sql, values = []) {
  const connection = await getConnection();
  try {
    const [results] = await connection.execute(sql, values);
    return results;
  } finally {
    await connection.release();
  }
}

/**
 * Execute a query with single row result
 * @param {string} sql - SQL query
 * @param {Array} values - Query parameters
 */
async function queryOne(sql, values = []) {
  const results = await query(sql, values);
  return results[0] || null;
}

/**
 * Insert a record and return the inserted ID
 * @param {string} table - Table name
 * @param {Object} data - Object with column names as keys
 */
async function insert(table, data) {
  const columns = Object.keys(data);
  const values = Object.values(data);
  const placeholders = columns.map(() => '?').join(',');
  const sql = `INSERT INTO ${table} (${columns.join(',')}) VALUES (${placeholders})`;
  
  const connection = await getConnection();
  try {
    const [result] = await connection.execute(sql, values);
    return result.insertId;
  } finally {
    await connection.release();
  }
}

/**
 * Update records
 * @param {string} table - Table name
 * @param {Object} data - Data to update
 * @param {string} where - WHERE clause (e.g., 'id = ?')
 * @param {Array} whereValues - Values for WHERE clause
 */
async function update(table, data, where, whereValues = []) {
  const setClause = Object.keys(data)
    .map((key) => `${key} = ?`)
    .join(', ');
  const sql = `UPDATE ${table} SET ${setClause} WHERE ${where}`;
  const values = [...Object.values(data), ...whereValues];
  
  return query(sql, values);
}

/**
 * Delete records
 * @param {string} table - Table name
 * @param {string} where - WHERE clause
 * @param {Array} whereValues - Values for WHERE clause
 */
async function deleteRecord(table, where, whereValues = []) {
  const sql = `DELETE FROM ${table} WHERE ${where}`;
  return query(sql, whereValues);
}

/**
 * Close the connection pool
 */
async function closePool() {
  if (pool) {
    await pool.end();
    console.log('📦 Database connection pool closed');
    pool = null;
  }
}

module.exports = {
  getPool,
  getConnection,
  query,
  queryOne,
  insert,
  update,
  deleteRecord,
  closePool,
};
