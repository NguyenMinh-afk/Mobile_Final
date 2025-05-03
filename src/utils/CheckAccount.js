const accounts = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "user", password: "user123", role: "user" },
];

export const checkLogin = (username, password) => {
  const account = accounts.find(acc => acc.username === username && acc.password === password);
  return account ? account.role : null; // Trả về vai trò nếu đăng nhập đúng, null nếu sai
};
