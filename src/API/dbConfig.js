const sql = require("mssql");

const config = {
  user: "sa", // Tên đăng nhập của MSSQL
  password: "123456", // Mật khẩu của MSSQL
  server: "DESKTOP-FKLCNTQ/MLANHEM", // Địa chỉ IP cục bộ hoặc tên server
  database: "Mobile", // Tên database
  options: {
    encrypt: true, // Để true nếu dùng Azure
    enableArithAbort: true,
    trustServerCertificate: true, // Bỏ qua xác thực chứng chỉ
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
