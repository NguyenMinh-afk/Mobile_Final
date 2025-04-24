const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectDB } = require("./src/API/dbConfig");
const userRoutes = require("./src/API/routes/userRoutes");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Kết nối database MSSQL
connectDB();

// Định nghĩa các API user
app.use("/api", userRoutes);

// Lắng nghe trên cổng 5000 và chấp nhận yêu cầu từ IP công khai
const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server đang chạy tại http://${process.env.IPV4}:${PORT}`);
});
