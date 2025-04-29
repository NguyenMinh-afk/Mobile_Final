const BASE_URL = `http://192.168.1.10:5000/api` // Địa chỉ IP backend của bạn

console.log('Base URL:', BASE_URL); // Kiểm tra URL được tạo

export const sendOTP = async (email) => {
  try {
    console.log("Attempting to send OTP to:", email);
    console.log("Request URL:", `${BASE_URL}/send-otp`);
    
    const requestBody = JSON.stringify({ email });
    console.log("Request body:", requestBody);

    const response = await fetch(`${BASE_URL}/send-otp`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        // Thêm log để kiểm tra headers
        "Accept": "application/json"
      },
      body: requestBody
    });

    console.log("Response headers:", Object.fromEntries(response.headers.entries()));
    console.log("Response status:", response.status);
    
    const data = await response.json();
    console.log("Response data:", data);

    if (!response.ok) {
      console.error("Error response:", data);
      throw new Error(data.error || "Không thể gửi OTP");
    }
    
    return { success: true, message: data.message };
  } catch (error) {
    console.error("Error in sendOTP:", error);
    console.error("Error stack:", error.stack);
    return { success: false, message: error.message };
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    console.log("Verifying OTP for email:", email);
    console.log("Request URL:", `${BASE_URL}/verify-otp`);
    
    const requestBody = JSON.stringify({ email, otp });
    console.log("Request body:", requestBody);

    const response = await fetch(`${BASE_URL}/verify-otp`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: requestBody
    });

    console.log("Response status:", response.status);
    const data = await response.json();
    console.log("Response data:", data);

    if (!response.ok) {
      console.error("Error response:", data);
      throw new Error(data.error || "Không thể xác minh OTP");
    }

    return { success: true, message: data.message };
  } catch (error) {
    console.error("Error in verifyOTP:", error);
    console.error("Error stack:", error.stack);
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
    if (!response.ok) throw new Error(data.error +"(checklogin)" || "Không thể đăng nhập");

    return { success: true, role: data.role };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const resetPassword = async (email, newPassword) => {
  try {
    const response = await fetch(`${BASE_URL}/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Không thể đặt lại mật khẩu");

    return { success: true, message: data.message };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
