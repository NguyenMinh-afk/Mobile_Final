import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AccountsManagementScreen() {
  // Dữ liệu tĩnh
  const [accounts, setAccounts] = useState([
    { id: '1',avatar: require('../../assets/avatar.png'), name: 'User 1', posts: 10, rating: 4.5, status: 'active' },
    { id: '2',avatar: require('../../assets/avatar.png'), name: 'User 2', posts: 5, rating: 3.8, status: 'banned' },
    { id: '3',avatar: require('../../assets/avatar.png'), name: 'User 3', posts: 8, rating: 4.2, status: 'active' },
    { id: '4',avatar: require('../../assets/avatar.png'), name: 'User 4', posts: 12, rating: 4.9, status: 'banned' },
    { id: '5',avatar: require('../../assets/avatar.png'), name: 'User 5', posts: 7, rating: 4.0, status: 'active' },
  ]);

  const [filter, setFilter] = useState('all'); // Lọc tài khoản: all, active, banned
  const [searchQuery, setSearchQuery] = useState(''); // Tìm kiếm
  const [menuVisible, setMenuVisible] = useState(null); // Quản lý trạng thái menu cho từng tài khoản
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 }); // Vị trí menu

  // Lọc danh sách tài khoản
  const filteredAccounts = accounts.filter((account) => {
    const matchesFilter =
      filter === 'all' || (filter === 'active' && account.status === 'active') || (filter === 'banned' && account.status === 'banned');
    const matchesSearch = account.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Xử lý ban tài khoản
  const handleBan = (id) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.id === id ? { ...account, status: account.status === 'banned' ? 'active' : 'banned' } : account
      )
    );
    setMenuVisible(null); // Ẩn menu sau khi thực hiện hành động
  };

  // Hiển thị menu tại vị trí cụ thể
  const showMenu = (id, x, y) => {
    setMenuVisible(id);
    setMenuPosition({ x, y });
  };

  // Ẩn menu
  const hideMenu = () => {
    setMenuVisible(null);
  };

  // Render từng tài khoản
  const renderAccount = ({ item }) => (
    <View style={[styles.accountCard, item.status === 'banned' && styles.bannedAccount]}>
      <View style={styles.accountInfo}>
        <Image source={item.avatar} style={styles.avatar} />
        <View>
          <Text style={styles.accountName}>{item.name}</Text>
          <Text style={styles.accountDetails}>Số bài đăng: {item.posts}</Text>
          <Text style={styles.accountDetails}>Đánh giá: {item.rating}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={(event) => {
          const { pageY } = event.nativeEvent;
          setMenuPosition({ x: 20, y: pageY });
          setMenuVisible(menuVisible === item.id ? null : item.id);
        }}
      >
        <MaterialIcons name="more-vert" size={24} color="black" />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={menuVisible === item.id}
        animationType="fade"
        onRequestClose={() => setMenuVisible(null)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(null)}
        >
          <View 
            style={[
              styles.dropdownMenu,
              {
                position: 'absolute',
                top: menuPosition.y,
                right: 20,
              }
            ]}
          >
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => {
                console.log('View', item.id);
                setMenuVisible(null);
              }}
            >
              <MaterialIcons name="visibility" size={20} color="#333" />
              <Text style={styles.menuItemText}>View</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleBan(item.id)}
            >
              <MaterialIcons 
                name={item.status === 'banned' ? "lock-open" : "lock"} 
                size={20} 
                color={item.status === 'banned' ? "#4CAF50" : "#FF5252"} 
              />
              <Text style={[
                styles.menuItemText, 
                item.status === 'banned' ? styles.unbanText : styles.banText
              ]}>
                {item.status === 'banned' ? 'Unban' : 'Ban'}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Thanh tìm kiếm và lọc */}
      <View style={styles.searchFilterContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.filterButtons}>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
            onPress={() => setFilter('all')}
          >
            <Text style={styles.filterText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'active' && styles.activeFilter]}
            onPress={() => setFilter('active')}
          >
            <Text style={styles.filterText}>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'banned' && styles.activeFilter]}
            onPress={() => setFilter('banned')}
          >
            <Text style={styles.filterText}>Banned</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Danh sách tài khoản */}
      <FlatList
        data={filteredAccounts}
        keyExtractor={(item) => item.id}
        renderItem={renderAccount}
        contentContainerStyle={styles.listContainer}
      />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  searchFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  filterButtons: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  filterButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginLeft: 5,
    backgroundColor: '#fff',
  },
  activeFilter: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  filterText: {
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    position: 'relative', // Để menu hiển thị đúng vị trí
  },
  bannedAccount: {
    backgroundColor: '#FFCDD2',
  },
  accountInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10, // Đẩy thông tin tài khoản sang phải để chừa chỗ cho nút menu
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25, // Bo tròn ảnh
    marginRight: 15,
  },
  accountName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  accountDetails: {
    fontSize: 14,
    color: '#555',
  },
  menuButton: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10, // Đặt nút menu ở góc phải
  },
  menu: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Đảm bảo menu nằm trên các thẻ khác (Android)
    zIndex: 10, // Đảm bảo menu nằm trên các thẻ khác (iOS và Web)
    padding: 10,
    width: 140, // Đặt chiều rộng cố định để tránh tràn ra ngoài màn hình
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemText: {
    fontSize: 14,
    marginLeft: 8,
    color: '#333',
  },
  banButton: {
    backgroundColor: '#FFCDD2',
    marginTop: 5,
    borderRadius: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 150,
  },
  unbanText: {
    color: '#4CAF50',
  },
  banText: {
    color: '#FF5252',
  },
});