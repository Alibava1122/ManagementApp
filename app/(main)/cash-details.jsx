import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import ModelTextInput from "../../components/ModelTextInput";
import { Feather } from "@expo/vector-icons";
import { useAssets } from "../../context/AssetContext";
import useToast from "../../hooks/useToast";

const CashDetails = () => {
  const { showToast } = useToast();
  const router = useRouter();
  const { updateCashEntry } = useAssets();
  const { description, amount, date, id } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [newEntry, setNewEntry] = useState({
    description: "",
    amount: "",
    date: "",
  });


  const chartData = {
    labels: ["Amount"],
    datasets: [{ data: [parseFloat(amount) || 0] }],
  };

  return (
    <>

      <View style={styles.container}>
        <Text style={styles.title}>Cash Flow</Text>
        <View style={styles.mainChartContainer}>
          <View style={styles.chartContainer}>
            <BarChart
              data={chartData}
              width={Dimensions.get("window").width - 100}
              height={220}
              yAxisLabel="$"
              yAxisSuffix=""
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                style: { borderRadius: 16 },
              }}
              style={{ marginVertical: 8, borderRadius: 16 }}
            />
          </View>
        </View>

        <View style={styles.chartContainer}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.editIcon}
          >
             <Text style={styles.EditText}>Edit</Text>
             <Feather name="edit" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Cash Entry Details</Text>
          <Text style={styles.detail}>📌 Description: {description}</Text>
          <Text style={styles.detail}>💰 Amount: ${amount}</Text>
          <Text style={styles.detail}>📅 Date: {date?.slice(0, 10)}</Text>
        </View>

        {/* <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity> */}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Cash Entry</Text>
            <ModelTextInput
              label="Description"
              placeholder="Enter description"
              value={newEntry.description || description}
              onChangeText={(text) =>
                setNewEntry({ ...newEntry, description: text })
              }
            />

            <ModelTextInput
              label="Amount"
              placeholder="Enter amount"
              value={newEntry.amount || amount}
              onChangeText={(text) =>
                setNewEntry({ ...newEntry, amount: text })
              }
              keyboardType="numeric"
            />

            <ModelTextInput
              label="Date"
              placeholder="YYYY-MM-DD"
              value={newEntry.date || date?.slice(0, 10)}
              onChangeText={(text) => setNewEntry({ ...newEntry, date: text })}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={async () => {
                  const updated = {
                    description: newEntry.description || description,
                    amount: newEntry.amount || amount,
                    date: newEntry.date || date,
                  };
                  await updateCashEntry(id, updated);
                  showToast('Updated');
                  setModalVisible(false);
                  router.back(); 
                }}
              >
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            </View>
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
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "#fff",
    padding: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#007AFF",
  },
  detail: { fontSize: 18, marginBottom: 10 },
  mainChartContainer: {},
  chartContainer: {
    borderRadius: 20,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: "30",
    marginBottom: 10,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    width: "35%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  detailsContainer: {
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    width: "90%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
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
  saveButton: {
    backgroundColor: "#007AFF",
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
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
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

export default CashDetails;
