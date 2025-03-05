import React, { useState } from "react";
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
} from "react-native";
import axios from "axios";
import { Dimensions } from "react-native";
import { useAssets } from "../../context/AssetContext";
import { useRouter } from "expo-router";
import ModelTextInput from '../../components/ModelTextInput';


const StocksScreen = () => {
  const { stocks, addStock, deleteStock } = useAssets();
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [newStock, setNewStock] = useState({
    symbol: "",
    quantity: "",
    purchasePrice: "",
    purchaseDate: "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchStockData = async (symbol) => {
    try {
      const response = await axios.get(
        `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1mo`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching stock data:", error);
      return null;
    }
  };

  const handleAddStock = async () => {
    if (
      !newStock.symbol ||
      !newStock.quantity ||
      !newStock.purchasePrice ||
      !newStock.purchaseDate
    ) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setLoading(true);
    const stockData = await fetchStockData(newStock.symbol);
    setLoading(false);
    if (!stockData) {
      Alert.alert("Error", "Invalid stock symbol");
      return;
    }

    addStock({ ...newStock }); // Use context function
    setNewStock({
      symbol: "",
      quantity: "",
      purchasePrice: "",
      purchaseDate: "",
    });
    setModalVisible(false);
  };

  const router = useRouter();

  const confirmDelete = (stock) => {
    setSelectedEntry(stock);
    setConfirmModalVisible(true);
  };

  const handleDelete = () => {
    if (selectedEntry) {
      deleteStock(selectedEntry.id);
      setConfirmModalVisible(false);
      setSelectedEntry(null);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Stocks Portfolio</Text>
      <TouchableOpacity
        style={styles.openModalButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Add New Stock</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.subtitle}>Add New Stock</Text>
            <ModelTextInput
              label="Stock Symbol"
              placeholder="e.g., AAPL"
              value={newStock.symbol}
              onChangeText={(text) =>
                setNewStock({ ...newStock, symbol: text })
              }
            />

            <ModelTextInput
              label="Quantity"
              placeholder="Enter Quantity"
              value={newStock.quantity}
              onChangeText={(text) =>
                setNewStock({ ...newStock, quantity: text })
              }
              keyboardType="numeric"
            />

            <ModelTextInput
              label="Purchase Price"
              placeholder="Enter Purchase Price"
              value={newStock.purchasePrice}
              onChangeText={(text) =>
                setNewStock({ ...newStock, purchasePrice: text })
              }
              keyboardType="numeric"
            />

            <ModelTextInput
              label="Purchase Date"
              placeholder="YYYY-MM-DD"
              value={newStock.purchaseDate}
              onChangeText={(text) =>
                setNewStock({ ...newStock, purchaseDate: text })
              }
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddStock}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Add Stock</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {stocks.length > 0 && (
        <View style={styles.stocksList}>
          <Text style={styles.subtitle}>Your Stocks</Text>
          {stocks.map((stock) => (
            <TouchableOpacity
              key={stock.id}
              style={styles.stockItem}
              onPress={() =>
                router.push({
                  pathname: "/stocks-details",
                  params: {
                    symbol: stock.symbol,
                    quantity: stock.quantity,
                    purchasePrice: stock.purchasePrice,
                    purchaseDate: stock.purchaseDate,
                  },
                })
              }
            >
              <View style={styles.stockInfo}>
                <Text style={styles.stockSymbol}>{stock.symbol}</Text>
                <Text style={styles.stockDetails}>
                  Quantity: {stock.quantity} | Bought: ${stock.purchasePrice}
                </Text>
                <Text style={styles.stockDate}>
                  Purchased: {stock.purchaseDate}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => confirmDelete(stock)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmModalVisible}
        onRequestClose={() => setConfirmModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Deletion</Text>
            <Text style={styles.modalText}>
              Are you sure you want to delete this entry?
            </Text>
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
  container: { flex: 1, backgroundColor: "white", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  openModalButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  subtitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    width: "100%",
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: { color: "#fff", fontWeight: "bold" },
  stocksList: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 16,

    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: "30",
    marginBottom: 10,
  },
  stockItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  stockSymbol: { fontSize: 18, fontWeight: "bold", color: "#007AFF" },
  deleteButton: { backgroundColor: "#FF3B30", padding: 8, borderRadius: 6 },
  deleteButtonText: { color: "#fff", fontSize: 12 },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#FF3B30",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#007AFF",
  },
});

export default StocksScreen;
