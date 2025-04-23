CREATE TABLE Users (
    id INT PRIMARY KEY IDENTITY(1,1),
    username NVARCHAR(50) NOT NULL UNIQUE,
    email NVARCHAR(100) NOT NULL UNIQUE,
    password NVARCHAR(MAX) NOT NULL,
    isVerified BIT DEFAULT 0, -- Trạng thái xác minh (OTP)
    otp NVARCHAR(6), -- Mã OTP
    otpExpiration DATETIME -- Thời gian hết hạn của OTP
);
