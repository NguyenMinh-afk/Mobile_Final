// CheckAccount.js
const accounts = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "user1", password: "user123", role: "user" },
    { username: "user2", password: "password456", role: "user" },
  ];
  
  export const checkLogin = (username, password) => {
    const account = accounts.find(acc => acc.username === username && acc.password === password);
    return account ? account.role : null; // Trả về role nếu đúng, null nếu sai
  };
  
  export default accounts;
  