require("dotenv").config(); // Đọc file .env
const sql = require("mssql");

const config = {
  user: process.env.DB_USER, // Lấy giá trị từ .env
  password: process.env.DB_PASSWORD, // Lấy giá trị từ .env
  server: process.env.DB_SERVER, // Lấy giá trị từ .env
  database: process.env.DB_DATABASE, // Lấy giá trị từ .env
  options: {
    encrypt: process.env.DB_ENCRYPT === "true", // Chuyển đổi giá trị string từ .env sang boolean
    enableArithAbort: process.env.DB_ARITHABORT === "true", // Chuyển đổi giá trị string từ .env sang boolean
    trustServerCertificate: process.env.DB_TRUSTCERTIFICATE === "true", // Bỏ qua chứng chỉ tự ký
  },
};

const connectDB = async () => {
  try {
    await sql.connect(config);
    console.log("Đã kết nối tới MSSQL Database!");
  } catch (error) {
    console.error("Lỗi kết nối database:", error.message);
  }
};

module.exports = { sql, connectDB };
