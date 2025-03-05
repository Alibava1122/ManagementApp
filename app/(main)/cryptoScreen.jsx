import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { useAssets } from '../../context/AssetContext';  
import { router } from 'expo-router';
import ModelTextInput from '../../components/ModelTextInput';
const CryptoScreen = () => {
  const { cryptos, addCrypto, deleteCrypto } = useAssets(); 
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [newCrypto, setNewCrypto] = useState({
    symbol: '',
    quantity: '',
    purchasePrice: '',
    purchaseDate: '',
  });
  const [loading, setLoading] = useState(false);

  const fetchCryptoData = async (symbol) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${symbol}/market_chart?vs_currency=usd&days=30&interval=daily`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      return null;
    }
  };

  const handleAddCrypto = async () => {
    if (!newCrypto.symbol || !newCrypto.quantity || !newCrypto.purchasePrice || !newCrypto.purchaseDate) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);
    const data = await fetchCryptoData(newCrypto.symbol.toLowerCase());
    setLoading(false);

    if (!data) {
      Alert.alert('Error', 'Invalid cryptocurrency symbol');
      return;
    }

    addCrypto({ ...newCrypto }); // Use context method
    setNewCrypto({ symbol: '', quantity: '', purchasePrice: '', purchaseDate: '' });
    setModalVisible(false);
  };
  const confirmDelete = (crypto) => {
    setSelectedEntry(crypto);
    setConfirmModalVisible(true);
  };

  const handleDelete = () => {
    if (selectedEntry) {
      deleteCrypto(selectedEntry.id);
      setConfirmModalVisible(false);
      setSelectedEntry(null);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Crypto Portfolio</Text>

      <TouchableOpacity style={styles.addAssetButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Add Crypto Asset</Text>
      </TouchableOpacity>

      {cryptos.length > 0 && (
        <View style={styles.cryptosList}>
          <Text style={styles.subtitle}>Your Cryptocurrencies</Text>
          {cryptos.map((crypto) => (
            <TouchableOpacity 
              key={crypto.id} 
              style={styles.cryptoItem} 
              onPress={() => router.push({ pathname: '/crypto-details', params: crypto })}
            >
              <View style={styles.cryptoInfo}>
                <Text style={styles.cryptoSymbol}>{crypto.symbol.toUpperCase()}</Text>
                <Text style={styles.cryptoDetails}>
                  Quantity: {crypto.quantity} | Bought: ${crypto.purchasePrice}
                </Text>
                <Text style={styles.cryptoDate}>Purchased: {crypto.purchaseDate}</Text>
              </View>
              <TouchableOpacity style={styles.deleteButton}  onPress={() => confirmDelete(crypto)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </TouchableOpacity>
            
          ))}
        </View>
      )}

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.subtitle}>Add New Cryptocurrency</Text>
            <ModelTextInput
        label="Crypto Symbol"
        placeholder="e.g., bitcoin"
        value={newCrypto.symbol}
        onChangeText={(text) => setNewCrypto({ ...newCrypto, symbol: text })}
      />
      
      <ModelTextInput
        label="Quantity"
        placeholder="Enter quantity"
        value={newCrypto.quantity}
        onChangeText={(text) => setNewCrypto({ ...newCrypto, quantity: text })}
        keyboardType="numeric"
      />
      
      <ModelTextInput
        label="Purchase Price (USD)"
        placeholder="Enter purchase price"
        value={newCrypto.purchasePrice}
        onChangeText={(text) => setNewCrypto({ ...newCrypto, purchasePrice: text })}
        keyboardType="numeric"
      />
      
      <ModelTextInput
        label="Purchase Date"
        placeholder="YYYY-MM-DD"
        value={newCrypto.purchaseDate}
        onChangeText={(text) => setNewCrypto({ ...newCrypto, purchaseDate: text })}
      />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.addButton} onPress={handleAddCrypto} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Add</Text>}
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmModalVisible}
        onRequestClose={() => setConfirmModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Deletion</Text>
            <Text style={styles.modalText}>Are you sure you want to delete this entry?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setConfirmModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleDelete}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20 , backgroundColor:'white'},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  addAssetButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {color: '#fff', textAlign: 'center', fontWeight: 'bold'},
  cryptosList: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    paddingVertical:10,
    paddingHorizontal:'30',  
    marginBottom:10
    
  },
  cryptoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cryptoSymbol: {fontSize: 18, fontWeight: 'bold'},
  deleteButton: {backgroundColor: '#FF3B30', padding: 8, borderRadius: 6},
  deleteButtonText: {color: '#fff', fontSize: 12},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems:'center',
    justifyContent:'center'
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
    alignItems:'center',
    justifyContent:'center'
  },
  cancelButtonText: {textAlign: 'center', fontWeight: 'bold' , color:'white'},
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    width:'100%'
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor:'#007AFF'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle:{
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  }
});

export default CryptoScreen;
