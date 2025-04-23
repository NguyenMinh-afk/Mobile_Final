require("dotenv").config(); // Đọc file .env
const sql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: process.env.DB_ENCRYPT === "true",
    enableArithAbort: process.env.DB_ARITHABORT === "true",
    trustServerCertificate: process.env.DB_TRUSTCERTIFICATE === "true",
  },
};

const connectDB = async () => {
  try {
    const pool = await sql.connect(config); // Kết nối MSSQL
    console.log("Đã kết nối tới MSSQL Database!");

    // Kiểm tra và tạo bảng Users
    const createUsersTable = `
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Users' AND xtype='U')
      BEGIN
        CREATE TABLE Users (
          id INT PRIMARY KEY IDENTITY(1,1),
          username NVARCHAR(50) NOT NULL UNIQUE,
          email NVARCHAR(100) NOT NULL UNIQUE,
          password NVARCHAR(MAX) NOT NULL,
          isVerified BIT DEFAULT 0,
          role NVARCHAR(20) DEFAULT 'user' NOT NULL
        )
      END
    `;
    await pool.request().query(createUsersTable);

    // Kiểm tra và tạo bảng OTP
    const createOtpTable = `
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='OTP' AND xtype='U')
      BEGIN
        CREATE TABLE OTP (
          id INT PRIMARY KEY IDENTITY(1,1),
          email NVARCHAR(100) NOT NULL,
          otp NVARCHAR(6) NOT NULL,
          otpExpiration DATETIME NOT NULL
        )
      END
    `;
    await pool.request().query(createOtpTable);

    console.log("Đã kiểm tra và tạo bảng Users và OTP nếu chưa tồn tại!");
  } catch (error) {
    console.error("Lỗi kết nối database:", error.message);
  }
};

module.exports = { sql, connectDB };
