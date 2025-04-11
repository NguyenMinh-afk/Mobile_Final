const express = require("express");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { sql } = require("../dbConfig");
require("dotenv").config(); // Đưa dotenv ra ngoài để tránh lỗi cấu trúc

const router = express.Router();

// Hàm tạo OTP ngẫu nhiên (6 chữ số)
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);
// Lấy giờ hiện tại từ thiết bị
const currentTime = new Date(); // Thời gian hiện tại trên thiết bị



// Cấu hình gửi email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Lấy email từ biến môi trường
    pass: process.env.PASSWORD, // Lấy mật khẩu từ biến môi trường
  },
});

// API Gửi OTP
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  try {
    const otp = generateOTP();
    const expirationTimeUTC = new Date(new Date().getTime() + 10 * 60000); // Thời gian hết hạn (UTC)

    const request = new sql.Request();

    // Lưu OTP vào bảng OTP
    await request.query(`
      INSERT INTO OTP (email, otp, otpExpiration)
      VALUES ('${email}', '${otp}', '${expirationTimeUTC.toISOString()}')
    `);

    // Gửi email OTP tới người dùng
    const mailOptions = {
      from: `Your App <${process.env.EMAIL}>`,
      to: email,
      subject: "Xác minh tài khoản - OTP",
      text: `Mã OTP của bạn là: ${otp}. Mã này có hiệu lực trong 10 phút.`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP đã được gửi tới email của bạn!" });
  } catch (error) {
    console.error("Lỗi gửi OTP:", error.message);
    res.status(500).json({ error: "Không thể gửi OTP." });
  }
});

// API Xác minh OTP
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const request = new sql.Request();
    const result = await request.query(`
      SELECT * FROM OTP WHERE email = '${email}' AND otp = '${otp}' AND otpExpiration > GETUTCDATE()
    `);

    // Kiểm tra OTP hợp lệ và chưa hết hạn
    if (result.recordset.length === 0) {
      return res.status(400).json({ error: "OTP không hợp lệ hoặc đã hết hạn." });
    }

    // Xóa OTP sau khi xác minh thành công
    await request.query(`DELETE FROM OTP WHERE email = '${email}'`);

    res.status(200).json({ message: "Xác minh OTP thành công!" });
  } catch (error) {
    console.error("Lỗi khi xác minh OTP:", error.message);
    res.status(500).json({ error: "Lỗi khi xác minh OTP." });
  }
});

// API Đăng ký tài khoản
router.post("/signup-complete", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const request = new sql.Request();
    const checkEmail = await request.query(`SELECT * FROM Users WHERE email = '${email}'`);

    // Kiểm tra email đã tồn tại hay chưa
    if (checkEmail.recordset.length > 0) {
      return res.status(400).json({ error: "Email đã tồn tại!" });
    }

    // Lưu thông tin tài khoản mới vào bảng Users
    await request.query(`
      INSERT INTO Users (username, email, password, isVerified)
      VALUES ('${username}', '${email}', '${hashedPassword}', 1)
    `);

    res.status(200).json({ message: "Tài khoản đã được tạo!" });
  } catch (error) {
    console.error("Lỗi khi tạo tài khoản:", error.message);
    res.status(500).json({ error: "Không thể tạo tài khoản." });
  }
});

// API Đăng nhập
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const request = new sql.Request();

    // Kiểm tra thông tin tài khoản trong bảng Users
    const result = await request.query(`
      SELECT * FROM Users WHERE username = '${username}'
    `);

    if (result.recordset.length === 0) {
      return res.status(400).json({ error: "Tài khoản không tồn tại!" });
    }

    const user = result.recordset[0];

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Mật khẩu không chính xác!" });
    }

    // Trả về thông tin đăng nhập thành công
    res.status(200).json({ message: "Đăng nhập thành công!", role: user.isVerified ? "user" : "guest" });
  } catch (error) {
    console.error("Lỗi khi đăng nhập:", error.message);
    res.status(500).json({ error: "Không thể đăng nhập." });
  }
});

module.exports = router;
