const mysql = require('mysql2/promise');
let pool;

async function connectDB() {
  if (pool) return pool;
  pool = await mysql.createPool({
    host: process.env.DB_HOST, // Host DB (thường là 'localhost')
    port: process.env.DB_PORT, // Cổng (mặc định 3306)
    user: process.env.DB_USER, // Tài khoản (vd: root)
    password: process.env.DB_PASSWORD, // Mật khẩu
    database: process.env.DB_NAME, // Tên database
    waitForConnections: true,
    connectionLimit: 10, // Giới hạn 10 kết nối
  });
  await pool.query('SELECT 1'); // Test kết nối
  console.log('✅ MySQL connected');
  return pool;
}

function getPool() {
  if (!pool) throw new Error('Pool not initialized. Call connectDB() first.');
  return pool;
}

module.exports = { connectDB, getPool };
