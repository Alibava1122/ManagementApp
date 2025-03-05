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
} from "react-native";
import { useAssets } from "../../context/AssetContext";
import { router } from "expo-router";
import ModelTextInput from "../../components/ModelTextInput";

const cashScreen = () => {
  const { cashEntries, addCashEntry, deleteCashEntry } = useAssets();
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [newEntry, setNewEntry] = useState({
    description: "",
    amount: "",
    date: "",
  });

  const addEntry = () => {
    if (!newEntry.description || !newEntry.amount || !newEntry.date) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    addCashEntry(newEntry);
    setNewEntry({ description: "", amount: "", date: "" });
    setModalVisible(false);
  };

  const renderCashChart = () => {
    if (cashEntries.length === 0) return null;

    const chartData = {
      labels: cashEntries.map((entry) => entry.date.substring(5)),
      datasets: [
        {
          data: cashEntries.map((entry) => parseFloat(entry.amount)),
        },
      ],
    };
  };
  const confirmDelete = (entry) => {
    setSelectedEntry(entry);
    setConfirmModalVisible(true);
  };

  const handleDelete = () => {
    if (selectedEntry) {
      deleteCashEntry(selectedEntry.id);
      setConfirmModalVisible(false);
      setSelectedEntry(null);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cash Portfolio</Text>
      {renderCashChart()}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Add New Entry</Text>
      </TouchableOpacity>
      {cashEntries.length > 0 && (
        <View style={styles.propertiesList}>
          <Text style={styles.subtitle}>Cash Entries</Text>
          {cashEntries.map((entry) => (
            <TouchableOpacity
              key={entry.id}
              style={styles.propertyItem}
              onPress={() =>
                router.push({
                  pathname: "/cash-details",
                  params: {
                    description: entry.description,
                    amount: entry.amount,
                    date: entry.date,
                  },
                })
              }
            >
              <View style={styles.propertyInfo}>
                <Text style={styles.propertyName}>{entry.description}</Text>
                <Text style={styles.propertyDetails}>
                  Amount: ${entry.amount}
                </Text>
                <Text style={styles.propertyDetails}>Date: {entry.date}</Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => confirmDelete(entry)}
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
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Cash Entry</Text>
            <ModelTextInput
              label="Description"
              placeholder="Enter description"
              value={newEntry.description}
              onChangeText={(text) =>
                setNewEntry({ ...newEntry, description: text })
              }
              
            />

            <ModelTextInput
              label="Amount"
              placeholder="Enter amount"
              value={newEntry.amount}
              onChangeText={(text) =>
                setNewEntry({ ...newEntry, amount: text })
              }
              keyboardType="numeric"
            />

            <ModelTextInput
              label="Date"
              placeholder="YYYY-MM-DD"
              value={newEntry.date}
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
                onPress={addEntry}
              >
                <Text style={styles.buttonText}>Save</Text>
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
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  chartContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 16,
    marginBottom: 20,
    alignItems: "center",
  },
  chartWrapper: {
    width: "100%",
    alignItems: "center",
    overflow: "hidden",
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  propertiesList: {
    backgroundColor: "#fff",
    padding: 22,
    borderRadius: 16,
    backgroundColor: "white",

    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: "30",
    marginBottom: 10,
  },
  propertyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  propertyInfo: {
    flex: 1,
  },
  propertyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
  propertyAddress: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  propertyDetails: {
    fontSize: 14,
    color: "#666",
    marginTop: 3,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    padding: "10",
    borderRadius: 10,
    marginTop: 10,
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 12,
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
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
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
});

export default cashScreen;
