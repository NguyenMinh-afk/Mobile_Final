const BASE_URL = "http://192.168.1.10:5000/api"; // Địa chỉ IP backend của bạn

export const sendOTP = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Không thể gửi OTP");

    return { success: true, message: data.message };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const response = await fetch(`${BASE_URL}/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Không thể xác minh OTP");

    return { success: true, message: data.message };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const signupComplete = async (username, email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/signup-complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Không thể tạo tài khoản");

    return { success: true, message: data.message };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const checkLogin = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Không thể đăng nhập");

    return { success: true, role: data.role };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
