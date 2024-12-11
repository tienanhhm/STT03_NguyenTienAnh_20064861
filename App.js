import React, { useState } from 'react';
import { Text, View, Image, SafeAreaView, StyleSheet, TextInput, ScrollView, TouchableOpacity, Modal, Button } from 'react-native';

// Dữ liệu sản phẩm cục bộ
const products = [
  { id: 1, title: "Soft Element Jack", price: 57.50, image: require('./assets/4.png') },
  { id: 2, title: "Leget Galant", price: 64.00, image: require('./assets/2.png') },
  { id: 3, title: "Chester Chair", price: 61.00, image: require('./assets/1.png') },
  { id: 4, title: "Avrora Chair", price: 47.50, image: require('./assets/6.png') },
  ];

export default function App() {
  const [items, setItems] = useState(products); // State cho danh sách hiển thị
  const [searchQuery, setSearchQuery] = useState(''); // State cho từ khóa tìm kiếm
  const [modalVisible, setModalVisible] = useState(false); // State điều khiển modal
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    image: require('./assets/4.png'), 
  }); // State cho thông tin sản phẩm mới

  // Hàm xử lý tìm kiếm
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === '') {
      setItems(products); // Hiển thị tất cả sản phẩm khi từ khóa rỗng
    } else {
      const filteredItems = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setItems(filteredItems);
    }
  };

  // Hàm thêm sản phẩm mới
  const addProduct = () => {
    const newId = items.length + 1;
    const newItem = {
      id: newId,
      title: newProduct.title,
      price: parseFloat(newProduct.price),
      image: newProduct.image,
    };
    setItems([...items, newItem]);
    setModalVisible(false); // Đóng modal sau khi thêm sản phẩm
  };

  // Hàm cập nhật thông tin sản phẩm mới
  const handleChange = (field, value) => {
    setNewProduct((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  // Hàm xóa sản phẩm
  const deleteProduct = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image style={styles.img1header} source={require('./assets/star.png')} />
        <Text style={styles.texthead}></Text>
        <Image style={styles.img1header} source={require('./assets/search.png')} />
        <TextInput
          style={styles.timkiem}
          placeholder="Search"
          value={searchQuery}
          onChangeText={handleSearch} // Lắng nghe sự thay đổi từ ô tìm kiếm
        />
        
      </View>

      {/* Mega Sale section */}
      <View style={styles.mega}>
        <Text style={styles.textmega}>
          Discover products
          <Text style={styles.text1mega}></Text>
        </Text>
        
      </View>


      {/* Nút thêm sản phẩm */}
      <View style={styles.addProductButtonContainer}>
        <TouchableOpacity style={styles.addProductButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addProductButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Modal nhập thông tin sản phẩm */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Product</Text>
            
            {/* Tên sản phẩm */}
            <TextInput
              style={styles.input}
              placeholder="Product Name"
              value={newProduct.title}
              onChangeText={(text) => handleChange('title', text)}
            />
            
            {/* Giá sản phẩm */}
            <TextInput
              style={styles.input}
              placeholder="Price"
              keyboardType="numeric"
              value={newProduct.price}
              onChangeText={(text) => handleChange('price', text)}
            />
            
            {/* Chọn ảnh sản phẩm (chọn ảnh mặc định trong thư mục assets) */}
            <TouchableOpacity style={styles.imageSelector}>
              <Text style={styles.imageText}>Select Image</Text>
            </TouchableOpacity>

            {/* Lưu sản phẩm */}
            <TouchableOpacity style={styles.saveButton} onPress={addProduct}>
              <Text style={styles.saveButtonText}>Save Product</Text>
            </TouchableOpacity>

            {/* Đóng modal */}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

<View style={styles.recomend}>
  <Text style={styles.textrcomm}>Sofas</Text>
  <Text style={styles.textrcomm}>Chairs </Text>
  <Text style={styles.textrcomm}>Tables</Text>
  <Text style={styles.textrcomm}>Kitchen</Text>
</View>
{/*Cau 2.a.1*/}
      {/* Loading state */}
      <ScrollView style={styles.itemContainer}>
        <View style={styles.itemList}>
          {items.map((item, index) => (
            <View
              key={item.id}
              style={[styles.itemCard, index % 2 === 0 && styles.itemCardRight]}>
              <Image style={styles.imgItem} source={item.image} />
              <Text style={styles.nameitem}>{item.title}</Text>
              <Text style={styles.priceitem}>${item.price}</Text>
              
              {/* Nút xóa sản phẩm */}
              <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => deleteProduct(item.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
          {items.length === 0 && (
            <Text style={styles.noResultsText}>No products found for "{searchQuery}"</Text>
          )}
        </View>
      </ScrollView>
{/*Cau 2.a.2*/}
      {/* Bottom navigation */}
      <View style={styles.bottom}>
        <Image style={styles.itembutton} source={require('./assets/home.png')} />
        <Image style={styles.itembutton} source={require('./assets/search.png')} />
        <Image style={styles.itembutton} source={require('./assets/heart.png')} />
        <Image style={styles.itembutton} source={require('./assets/profile.png')} />
        
      </View>
    </SafeAreaView>
  );
}
{/*Cau 2.a.3*/}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 8,
  },
  header: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    zIndex: 1,
  },
  img1header: {
    width: 20,
    height: 20,
  },
  texthead: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  timkiem: {
    flex: 1,
    height: 30,
    marginLeft: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  mega: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 60,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  textmega: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    width: '60%',
  },
  text1mega: {
    fontSize: 12,
    color: '#fff',
    marginTop: 5,
  },
 
  addProductButtonContainer: {
    marginTop: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  addProductButton: {
    backgroundColor: '#ddd',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  addProductButtonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  imageSelector: {
    marginBottom: 20,
    paddingVertical: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  imageText: {
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: '#ff5c8d',
  },
  recomend: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: 10,
  marginTop: 20,
},
textrcomm: {
  fontSize: 14,
  fontWeight: 'bold',
  color: '#333',
},
  itemContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  itemList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  imgItem: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  nameitem: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  priceitem: {
    fontSize: 14,
    color: '#ff5c8d',
  },
  deleteButton: {
    backgroundColor: '#ff5c8d',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  noResultsText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 30,
    width: '100%',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  itembutton: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
});
