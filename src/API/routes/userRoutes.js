const express = require("express");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { sql } = require("../dbConfig");
require("dotenv").config(); // Đưa dotenv ra ngoài để tránh lỗi cấu trúc

const router = express.Router();

// Hàm tạo OTP ngẫu nhiên (6 chữ số)
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

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
    // Tạo mã OTP và thời gian hết hạn
    const otp = generateOTP();
    const expirationTime = new Date(new Date().getTime() + 10 * 60000); // Hết hạn sau 10 phút

    const request = new sql.Request();

    // Lưu OTP và thời gian hết hạn vào cơ sở dữ liệu
    await request.query(`
      UPDATE Users SET otp = '${otp}', otpExpiration = '${expirationTime.toISOString()}'
      WHERE email = '${email}'
    `);

    // Gửi email OTP tới người dùng
    const mailOptions = {
      from: `Your App <${process.env.EMAIL}>`, // Email người gửi
      to: email, // Email người nhận
      subject: "Xác minh tài khoản - OTP",
      text: `Mã OTP của bạn là: ${otp}. Mã này có hiệu lực trong 10 phút.`,
    };

    await transporter.sendMail(mailOptions); // Gửi email

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
    const user = await request.query(`
      SELECT * FROM Users WHERE email = '${email}' AND otp = '${otp}' AND otpExpiration > GETDATE()
    `);

    // Kiểm tra OTP hợp lệ và chưa hết hạn
    if (user.recordset.length === 0) {
      return res.status(400).json({ error: "OTP không hợp lệ hoặc đã hết hạn." });
    }

    // Xác minh tài khoản thành công
    await request.query(`
      UPDATE Users SET isVerified = 1, otp = NULL, otpExpiration = NULL WHERE email = '${email}'
    `);

    res.status(200).json({ message: "Xác minh tài khoản thành công!" });
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

    // Lưu thông tin tài khoản mới vào cơ sở dữ liệu
    await request.query(`
      INSERT INTO Users (username, email, password, isVerified)
      VALUES ('${username}', '${email}', '${hashedPassword}', 0)
    `);

    res.status(200).json({ message: "Tài khoản đã được tạo!" });
  } catch (error) {
    console.error("Lỗi khi tạo tài khoản:", error.message);
    res.status(500).json({ error: "Không thể tạo tài khoản." });
  }
});

module.exports = router;
