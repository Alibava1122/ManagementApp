import { View, Text, StyleSheet, ScrollView, Dimensions, Modal , TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { BarChart } from "react-native-chart-kit";
import ModelTextInput from '../../components/ModelTextInput'; 
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useAssets } from "../../context/AssetContext";
import useToast from "../../hooks/useToast";

const StockDetailScreen = () => {
  const { showToast } = useToast();
  const params = useLocalSearchParams(); 
  const { updateStock } = useAssets();
  const [newStock, setNewStock] = useState({
    symbol: "",
    quantity: "",
    purchasePrice: "",
    purchaseDate: "",
  });
  const [modalVisible, setModalVisible] = useState(false);

  const chartData = {
    labels: ["Price"],
    datasets: [{ data: [parseFloat(params.purchasePrice) || 0] }],
  };

  const handleUpdateStock = async () => {
    const updatedStock = {
      symbol: newStock.symbol || params.symbol,
      quantity: newStock.quantity || params.quantity,
      purchasePrice: newStock.purchasePrice || params.purchasePrice,
      purchaseDate: newStock.purchaseDate || params.purchaseDate,
    };
  
    await updateStock(params.id, updatedStock);
    showToast('Updated');
    router.back()
  
    setModalVisible(false);
  };
  useEffect(() => {
    if (modalVisible) {
      setNewStock({
        symbol: params.symbol,
        quantity: params.quantity,
        purchasePrice: params.purchasePrice,
        purchaseDate: params.purchaseDate.slice(0,10),
      });
    }
  }, [modalVisible]);

  return (
    <>
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{params.symbol.toUpperCase()} STOCK DETAIL</Text>

      {/* Bar Chart */}
      <View style={styles.chartContainer}>
        <BarChart
          data={chartData}
          width={Dimensions.get("window").width - 50}
          height={220}
          yAxisLabel="$"
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            style: { borderRadius: 16 },
          }}
          style={{ marginVertical: 10, borderRadius: 16 }}
        />
      </View>

      {/* Stock Details */}
      <View style={styles.detailCard}>
      <TouchableOpacity onPress={()=>setModalVisible(true)} style={styles.editIcon}>
      <Text style={styles.EditText}>Edit</Text>
      <Feather name="edit" size={20} color="black" />
          </TouchableOpacity>
        <Text style={styles.detailText}>Quantity: {params.quantity}</Text>
        <Text style={styles.detailText}>
          Purchase Price: ${params.purchasePrice}
        </Text>
        <Text style={styles.detailText}>Purchase Date: {params.purchaseDate.slice(0,10)}</Text>
      </View>
    </ScrollView>

    <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.subtitle}>Update Stock</Text>
            <ModelTextInput
              label="Stock Symbol"
              placeholder="e.g., AAPL"
              value={newStock.symbol || params.symbol}
              onChangeText={(text) =>
                setNewStock({ ...newStock, symbol: text })
              }
            />

            <ModelTextInput
              label="Quantity"
              placeholder="Enter Quantity"
              value={newStock.quantity || params.quantity}
              onChangeText={(text) =>
                setNewStock({ ...newStock, quantity: text })
              }
              keyboardType="numeric"
            />

            <ModelTextInput
              label="Purchase Price"
              placeholder="Enter Purchase Price"
              value={newStock.purchasePrice ||params.purchasePrice}
              onChangeText={(text) =>
                setNewStock({ ...newStock, purchasePrice: text })
              }
              keyboardType="numeric"
            />

            <ModelTextInput
              label="Purchase Date"
              placeholder="YYYY-MM-DD"
              value={newStock.purchaseDate.slice(0,10) || params.purchaseDate.slice(0,10)}
              onChangeText={(text) =>
                setNewStock({ ...newStock, purchaseDate: text })
              }
            />
            <TouchableOpacity
            onPress={handleUpdateStock}
              style={styles.addButton}
              
             
            >
              <Text style={styles.buttonText}>Update</Text>
             
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
      <View  style={styles.floatingContainer}>
    <TouchableOpacity onPress={()=>router.navigate("/chat")} style={styles.floatingContainer}>
      <View style={styles.floatingText}>
        <Text style={styles.floatText}>ANDORSE AI</Text>
      </View>
    </TouchableOpacity>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" ,color:'#007AFF' },
  chartContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  detailCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  detailText: { fontSize: 16, marginBottom: 10 , color:'black' },
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
  addButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: { color: "#fff", fontWeight: "bold" },
  editIcon: {
    width: "100%",
    flexDirection: "row",
    alignContent: "flex-end",
    justifyContent: "flex-end",
  },
  EditText: {
    marginRight: 5,
  },
  floatingContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingVertical: 5,
  },
  floatingText: {
    width: "80%",
    height: 55,
    backgroundColor: "#baf4ed",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  floatText: {
    color: "black",
    fontSize: 17,
    fontFamily: "Merriweather-Bold",
  },
});

export default StockDetailScreen;
