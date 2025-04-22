import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const PrivacyPolicy = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>🛡️ Privacy Policy</Text>

        <Text style={styles.sectionTitle}>1. Giới thiệu</Text>
        <Text style={styles.text}>
          Chúng tôi hiểu rằng quyền riêng tư của bạn rất quan trọng. Chính sách này giải thích cách chúng tôi thu thập, sử dụng, bảo vệ thông tin cá nhân của bạn khi bạn sử dụng ứng dụng học tiếng Anh của chúng tôi. Việc truy cập và sử dụng ứng dụng đồng nghĩa với việc bạn đồng ý với chính sách này.
        </Text>

        <Text style={styles.sectionTitle}>2. Thông tin thu thập</Text>
        <Text style={styles.text}>
          Chúng tôi có thể thu thập thông tin từ bạn theo nhiều cách, bao gồm:{"\n"}
          - **Thông tin cá nhân:** Tên, email, thông tin tài khoản và ảnh đại diện (nếu có).{"\n"}
          - **Dữ liệu học tập:** Các bài học đã hoàn thành, điểm số đạt được, thời gian sử dụng ứng dụng.{"\n"}
          - **Dữ liệu thiết bị:** Loại thiết bị, hệ điều hành, địa chỉ IP, thông tin trình duyệt và các thông số kỹ thuật khác.{"\n"}
          - **Thông tin thanh toán:** Nếu bạn mua các dịch vụ cao cấp, chúng tôi có thể thu thập thông tin thanh toán thông qua nhà cung cấp bên thứ ba an toàn.
        </Text>

        <Text style={styles.sectionTitle}>3. Cách sử dụng dữ liệu</Text>
        <Text style={styles.text}>
          - Cung cấp trải nghiệm học tập cá nhân hóa, giúp bạn theo dõi tiến trình học tập.{"\n"}
          - Cải thiện nội dung bài học, tính năng ứng dụng dựa trên phản hồi của người dùng.{"\n"}
          - Gửi thông báo nhắc nhở để hỗ trợ quá trình học tập.{"\n"}
          - Hỗ trợ kỹ thuật và phản hồi các yêu cầu của bạn.
        </Text>

        <Text style={styles.sectionTitle}>4. Chia sẻ dữ liệu</Text>
        <Text style={styles.text}>
          Chúng tôi không bán hoặc chia sẻ thông tin cá nhân của bạn với bên thứ ba, trừ các trường hợp sau:{"\n"}
          - **Nhà cung cấp dịch vụ:** Chúng tôi có thể chia sẻ một số thông tin với đối tác hỗ trợ vận hành ứng dụng như dịch vụ lưu trữ dữ liệu hoặc xử lý thanh toán.{"\n"}
          - **Yêu cầu pháp lý:** Nếu có yêu cầu từ cơ quan pháp luật, chúng tôi sẽ cung cấp dữ liệu theo đúng quy định.
        </Text>

        <Text style={styles.sectionTitle}>5. Quyền của người dùng</Text>
        <Text style={styles.text}>
          - Truy cập và chỉnh sửa thông tin cá nhân bất cứ lúc nào.{"\n"}
          - Yêu cầu xóa tài khoản và các dữ liệu liên quan.{"\n"}
          - Quản lý tùy chọn nhận thông báo từ ứng dụng.
        </Text>

        <Text style={styles.sectionTitle}>6. Bảo vệ dữ liệu</Text>
        <Text style={styles.text}>
          Chúng tôi áp dụng các biện pháp bảo mật cao để bảo vệ dữ liệu người dùng khỏi truy cập trái phép, mất mát hoặc thay đổi.
        </Text>

        <Text style={styles.sectionTitle}>7. Thay đổi chính sách</Text>
        <Text style={styles.text}>
          Chính sách này có thể được cập nhật theo thời gian. Nếu có thay đổi quan trọng, chúng tôi sẽ thông báo trước.
        </Text>

        <Text style={styles.sectionTitle}>8. Liên hệ</Text>
        <Text style={styles.text}>📧 Email: support@yourapp.com</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F9FAFB', 
    padding: 20 
  },
  scrollContainer: { 
    paddingBottom: 40 
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#1F2937', 
    textAlign: 'center', 
    marginBottom: 20 
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#3B82F6', 
    marginTop: 20 
  },
  text: { 
    fontSize: 16, 
    color: '#4B5563', 
    textAlign: 'justify', 
    lineHeight: 24 
  },
});

export default PrivacyPolicy;