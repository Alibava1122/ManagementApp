import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { BarChart } from "react-native-chart-kit";
import { Feather } from "@expo/vector-icons";
import ModelTextInput from "../../components/ModelTextInput";
import { useAssets } from "../../context/AssetContext";
import useToast from "../../hooks/useToast";

const RealEstateDetail = () => {
  const { showToast } = useToast();
  const router = useRouter();
  const { updateProperty } = useAssets();
  const {
    name,
    address,
    purchasePrice,
    purchaseDate,
    currentValue,
    monthlyRent,
    id,
  } = useLocalSearchParams();
  const [newProperty, setNewProperty] = useState({
    name: "",
    address: "",
    purchasePrice: "",
    purchaseDate: "",
    currentValue: "",
    monthlyRent: "",
  });
  const [modalVisible, setModalVisible] = useState(false);

  const chartData = {
    labels: ["Purchase Price", "Current Value"],
    datasets: [
      {
        data: [parseFloat(purchasePrice), parseFloat(currentValue)],
      },
    ],
  };

  useEffect(() => {
    setNewProperty({
      name: name || '',
      address: address || '',
      purchasePrice: purchasePrice || '',
      purchaseDate: purchaseDate || '',
      currentValue: currentValue || '',
      monthlyRent: monthlyRent || '',
    });
  }, []);

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Property Value Comparison</Text>
          <BarChart
            data={chartData}
            width={Dimensions.get("window").width - 40}
            height={220}
            yAxisLabel="$"
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              style: { borderRadius: 16 },
            }}
            style={{ borderRadius: 16 }}
          />
        </View>
        <View style={styles.detailsContainer}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.editIcon}
          >
             <Text style={styles.EditText}>Edit</Text>
             <Feather name="edit" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.propertyDetails}>📍 Address: {address}</Text>
          <Text style={styles.propertyDetails}>
            💰 Purchase Price: ${purchasePrice}
          </Text>
          <Text style={styles.propertyDetails}>
            📅 Purchase Date: {purchaseDate.slice(0, 10)}
          </Text>
          <Text style={styles.propertyDetails}>
            📈 Current Value: ${currentValue}
          </Text>
          <Text style={styles.propertyDetails}>
            🏠 Monthly Rent: {monthlyRent}
          </Text>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Property</Text>
            <ModelTextInput
              label="Property Name"
              placeholder="Enter property name"
              value={newProperty.name}
              onChangeText={(text) =>
                setNewProperty({ ...newProperty, name: text })
              }
            />

            <ModelTextInput
              label="Address"
              placeholder="Enter property address"
              value={newProperty.address}
              onChangeText={(text) =>
                setNewProperty({ ...newProperty, address: text })
              }
            />

            <ModelTextInput
              label="Purchase Price"
              placeholder="Enter purchase price"
              value={newProperty.purchasePrice}
              onChangeText={(text) =>
                setNewProperty({ ...newProperty, purchasePrice: text })
              }
              keyboardType="numeric"
            />

            <ModelTextInput
              label="Current Value"
              placeholder="Enter current value"
              value={newProperty.currentValue}
              onChangeText={(text) =>
                setNewProperty({ ...newProperty, currentValue: text })
              }
              keyboardType="numeric"
            />

            <ModelTextInput
              label="Monthly Rent (Optional)"
              placeholder="Enter monthly rent"
              value={newProperty.monthlyRent}
              onChangeText={(text) =>
                setNewProperty({ ...newProperty, monthlyRent: text })
              }
              keyboardType="numeric"
            />

            <ModelTextInput
              label="Purchase Date"
              placeholder="YYYY-MM-DD"
              value={newProperty.purchaseDate.slice(0, 10)}
              onChangeText={(text) =>
                setNewProperty({ ...newProperty, purchaseDate: text })
              }
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
                  const updatedData = {
                    ...newProperty,
                    id, 
                  };

                  const result = await updateProperty(updatedData);
                  if (result) {
                    setModalVisible(false);
                    showToast('Updated');
                    router.back()
                  }
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
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 10,
    textAlign: "center",
  },
  propertyDetails: {
    fontSize: 16,
    color: "#333",
    padding: 10,
  },
  chartContainer: {
    marginVertical: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: "white",
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

export default RealEstateDetail;
