import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const TermsOfService = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>📜 Terms of Service</Text>

        <Text style={styles.sectionTitle}>1. Giới thiệu</Text>
        <Text style={styles.text}>
          Chào mừng bạn đến với ứng dụng học tiếng Anh của chúng tôi! Khi sử dụng ứng dụng này, bạn đồng ý với các điều khoản và điều kiện dưới đây. Điều khoản này nhằm đảm bảo quyền lợi của cả bạn và chúng tôi, cũng như tạo ra một môi trường học tập an toàn, minh bạch và hiệu quả.
        </Text>

        <Text style={styles.sectionTitle}>2. Chấp nhận điều khoản</Text>
        <Text style={styles.text}>
          Bằng việc tải xuống, cài đặt và sử dụng ứng dụng, bạn đồng ý với tất cả các quy định được nêu trong điều khoản này. Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng không tiếp tục sử dụng dịch vụ của chúng tôi.{"\n"}
          Chúng tôi có thể cập nhật điều khoản theo thời gian, và phiên bản cập nhật sẽ được thông báo trên ứng dụng hoặc qua email.
        </Text>

        <Text style={styles.sectionTitle}>3. Quy tắc sử dụng</Text>
        <Text style={styles.text}>
          Người dùng cần tuân thủ các nguyên tắc sau để duy trì một môi trường học tập lành mạnh:{"\n"}
          - **Không vi phạm pháp luật:** Không phát tán nội dung độc hại, vi phạm bản quyền, hoặc phân biệt đối xử.{"\n"}
          - **Không gian lận:** Không cố ý thao túng điểm số, giả mạo kết quả kiểm tra.{"\n"}
          - **Không chia sẻ tài khoản trái phép:** Không cung cấp thông tin đăng nhập cho người khác.{"\n"}
          - **Không gây gián đoạn dịch vụ:** Không spam hoặc tấn công hệ thống.
        </Text>

        <Text style={styles.sectionTitle}>4. Quyền sở hữu trí tuệ</Text>
        <Text style={styles.text}>
          Tất cả nội dung trong ứng dụng đều thuộc quyền sở hữu của chúng tôi hoặc đối tác liên kết. Bạn không được sao chép, sửa đổi hoặc xuất bản nội dung mà không có sự cho phép.
        </Text>

        <Text style={styles.sectionTitle}>5. Chính sách thanh toán và hoàn tiền</Text>
        <Text style={styles.text}>
          - **Thanh toán:** Được xử lý qua bên thứ ba an toàn.{"\n"}
          - **Hoàn tiền:** Chỉ áp dụng khi có lỗi kỹ thuật ảnh hưởng đến quyền lợi của bạn. Yêu cầu hoàn tiền phải được gửi đến bộ phận hỗ trợ trong vòng 7 ngày kể từ ngày phát sinh vấn đề.{"\n"}
          - **Gia hạn dịch vụ:** Nếu bạn chọn thanh toán theo gói đăng ký, dịch vụ có thể tự động gia hạn trừ khi bạn tắt tính năng này trước ngày gia hạn tiếp theo.
        </Text>

        <Text style={styles.sectionTitle}>6. Cập nhật và thay đổi điều khoản</Text>
        <Text style={styles.text}>
          Chúng tôi có quyền cập nhật điều khoản để phù hợp với thay đổi về pháp lý, tính năng ứng dụng và nhu cầu của người dùng. Nếu có thay đổi quan trọng, chúng tôi sẽ thông báo ít nhất 7 ngày trước khi áp dụng điều khoản mới.
        </Text>

        <Text style={styles.sectionTitle}>7. Giới hạn trách nhiệm pháp lý</Text>
        <Text style={styles.text}>
          - Ứng dụng cung cấp nội dung "nguyên trạng" và không đảm bảo tất cả thông tin là hoàn toàn chính xác.{"\n"}
          - Chúng tôi không chịu trách nhiệm về tổn thất tài chính, dữ liệu hoặc bất kỳ thiệt hại nào do sử dụng ứng dụng.{"\n"}
          - Nếu bạn vi phạm điều khoản, tài khoản của bạn có thể bị đình chỉ hoặc khóa vĩnh viễn.
        </Text>

        <Text style={styles.sectionTitle}>8. Chính sách bảo mật</Text>
        <Text style={styles.text}>
          Chúng tôi cam kết bảo vệ quyền riêng tư của bạn. Chính sách bảo mật riêng sẽ giải thích chi tiết cách chúng tôi thu thập, xử lý và bảo vệ thông tin cá nhân của bạn.
        </Text>

        <Text style={styles.sectionTitle}>9. Liên hệ và hỗ trợ</Text>
        <Text style={styles.text}>📧 Email: support@yourapp.com</Text>
        <Text style={styles.text}>📞 Số điện thoại hỗ trợ: (+84) XXX-XXX-XXXX</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F3F4F6', 
    padding: 20 
  },
  scrollContainer: { 
    paddingBottom: 40 
  },
  title: { 
    fontSize: 28, 
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

export default TermsOfService;