import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Modal,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { BarChart } from "react-native-chart-kit";
import ModelTextInput from "../../components/ModelTextInput";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useAssets } from "../../context/AssetContext";
import useToast from "../../hooks/useToast";



const CryptoDetailScreen = () => {
  const { showToast } = useToast();
  const params = useLocalSearchParams();
  const { updateCrypto } = useAssets();
  const [modalVisible, setModalVisible] = useState(false);
  const [newCrypto, setNewCrypto] = useState({
    symbol: params.symbol || "",
    quantity: params.quantity || "",
    purchasePrice: params.purchasePrice || "",
    purchaseDate: params.purchaseDate?.slice(0, 10) || "",
  });
 
 

  // Bar Chart Data
  const chartData = {
    labels: ["Price"],
    datasets: [{ data: [parseFloat(params.purchasePrice) || 0] }],
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{params.symbol.toUpperCase()} DETAILS</Text>

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

        {/* Crypto Details */}
        <View style={styles.detailCard}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.editIcon}
          >
             <Text style={styles.EditText}>Edit</Text>
             <Feather name="edit" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.detailText}>Quantity: {params.quantity}</Text>
          <Text style={styles.detailText}>
            Purchase Price: ${params.purchasePrice}
          </Text>
          <Text style={styles.detailText}>
            Purchase Date: {params.purchaseDate.slice(0, 10)}
          </Text>
        </View>
      </ScrollView>
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.subtitle}>Add New Cryptocurrency</Text>
            <ModelTextInput
              label="Crypto Symbol"
              placeholder="e.g., bitcoin"
              value={newCrypto.symbol.toLowerCase()}
              onChangeText={(text) =>
                setNewCrypto({ ...newCrypto, symbol: text })
              }
            />

            <ModelTextInput
              label="Quantity"
              placeholder="Enter quantity"
              value={newCrypto.quantity}
              onChangeText={(text) =>
                setNewCrypto({ ...newCrypto, quantity: text })
              }
              keyboardType="numeric"
            />

            <ModelTextInput
              label="Purchase Price (USD)"
              placeholder="Enter purchase price"
              value={newCrypto.purchasePrice}
              onChangeText={(text) =>
                setNewCrypto({ ...newCrypto, purchasePrice: text })
              }
              keyboardType="numeric"
            />

            <ModelTextInput
              label="Purchase Date"
              placeholder="YYYY-MM-DD"
              value={newCrypto.purchaseDate.slice(0, 10)}
              onChangeText={(text) =>
                setNewCrypto({ ...newCrypto, purchaseDate: text })
              }
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={async () => {
                  await updateCrypto({
                    ...params,
                    ...newCrypto,
                    id: params._id,
                  });
                
                  showToast('Crypto Updated');
                  setModalVisible(false);
                  router.back();
                }}
              >
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#007AFF",
  },
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
  detailText: { fontSize: 16, marginBottom: 10 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: "#007AFF",
  },
  cancelButton: {
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: { textAlign: "center", fontWeight: "bold", color: "white" },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  editIcon: {
    width: "100%",
    flexDirection: "row",
    alignContent: "flex-end",
    justifyContent: "flex-end",
  },
  EditText: {
    marginRight: 5,
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});

export default CryptoDetailScreen;
