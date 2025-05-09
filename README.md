
### **1. Cài đặt Node.js và npm/yarn**  
- Kiểm tra xem bạn đã cài **Node.js** chưa:  
  ```sh
  node -v
  ```
  Nếu chưa có, tải về tại: [https://nodejs.org/](https://nodejs.org/)  
- Kiểm tra **npm**:
  ```sh
  npm -v
  ```
  hoặc nếu dùng **Yarn**:
  ```sh
  yarn -v
  ```

---

### **2. Cài đặt các dependencies cần thiết**  
Chạy lần lượt các lệnh sau để cài đặt các gói quan trọng:  
```sh
npm install
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons @react-native-async-storage/async-storage
npm install @react-navigation/stack
npm install react-native-elements react-native-vector-icons
npm install @react-native-async-storage/async-storage
npm install @react-navigation/bottom-tabs
```


```sh
npm install react-native-svg
npm install react-native-svg-transformer
```

- **Lưu ý:** Thêm dòng này vào đầu file **index.js** để tránh lỗi:  
  ```javascript
  import 'react-native-gesture-handler';
  ```

---

### **3. Khởi động dự án React Native**  
- Nếu bạn đã có dự án, vào thư mục dự án và chạy:  
  ```sh
  npm start
  ```
- Nếu chưa có, khởi tạo dự án mới:
  ```sh
  npx react-native init MyApp
  cd MyApp
  npm start
  ```

---

### **4. Chạy dự án trên thiết bị ảo hoặc thật**  
- Nếu chưa cài **React Native CLI**, cài bằng:
  ```sh
  npm install -g react-native-cli
  ```
- Chạy trên **Android Emulator**:
  ```sh
  npx react-native run-android
  ```
- Chạy trên **iOS Simulator** (chỉ MacOS):
  ```sh
  npx react-native run-ios
  ```

---

### **5. Cài đặt các gói bổ sung (nếu cần)**  
- Nếu dùng **Expo**, cài và chạy:
  ```sh
  npm install -g expo-cli
  expo start
  ```
- Nếu dùng **TypeScript**, cài:
  ```sh
  npm install --save-dev typescript @types/react @types/react-native
  ```
- Nếu cần gọi API bằng **Axios**:
  ```sh
  npm install axios
  ```

---

👉 **Sau khi hoàn thành, mở trình duyệt và truy cập `http://localhost:8081/` để kiểm tra Metro Bundler đã chạy hay chưa.** 🚀# Mobile_Final
