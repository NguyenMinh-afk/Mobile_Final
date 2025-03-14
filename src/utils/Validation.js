const validateSignIn = (password = '') => {
  if (password.length < 6) {
      return "Password must be at least 6 characters long.";
  }
  return null; // Không có lỗi
};

const validateSignUp = (username = '', email = '', password = '', confirmPassword = '') => {
  // Kiểm tra không để trống trường nào
  if (username.trim() === '') {
      return "Username cannot be empty.";
  }
  if (email.trim() === '') {
      return "Email cannot be empty.";
  }
  if (password.trim() === '') {
      return "Password cannot be empty.";
  }
  if (confirmPassword.trim() === '') {
      return "Confirm Password cannot be empty.";
  }

  // Kiểm tra định dạng email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      return "Invalid email format.";
  }

  // Kiểm tra độ dài mật khẩu
  if (password.length < 6) {
      return "Password must be at least 6 characters long.";
  }

  // Kiểm tra mật khẩu và xác nhận mật khẩu có khớp nhau không
  if (password !== confirmPassword) {
      return "Passwords do not match.";
  }

  return null; // Không có lỗi
};

export { validateSignIn, validateSignUp };
