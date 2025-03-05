import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { Dimensions } from 'react-native';
import { useAssets } from '../../context/AssetContext';
import { router } from 'expo-router';
import ModelTextInput from '../../components/ModelTextInput';

const RealEstateScreen = () => {
  const { properties, addProperty, deleteProperty } = useAssets(); 
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [newProperty, setNewProperty] = useState({
    name: '',
    address: '',
    purchasePrice: '',
    purchaseDate: '',
    currentValue: '',
    monthlyRent: '',
  });

  const handleAddProperty = () => {
    if (!newProperty.name || !newProperty.purchasePrice || !newProperty.currentValue) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    addProperty({ ...newProperty, id: Date.now().toString() });

    setNewProperty({
      name: '',
      address: '',
      purchasePrice: '',
      purchaseDate: '',
      currentValue: '',
      monthlyRent: '',
    });

    setModalVisible(false);
  };
  const confirmDelete = (entry) => {
    setSelectedEntry(entry);
    setConfirmModalVisible(true);
  };

  const handleDelete = () => {
    if (selectedEntry) {
      deleteProperty(selectedEntry.id);
      setConfirmModalVisible(false);
      setSelectedEntry(null);
    }
  };


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Real Estate Portfolio</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Add New Property</Text>
      </TouchableOpacity>

   
      
          {properties.length > 0 && (
        <View style={styles.propertiesList}>
          {properties.map((property) => (
            <TouchableOpacity key={property.id} style={styles.propertyItem} onPress={() => router.push({
              pathname: "/realEstate-Detail",
              params: {
                name: property.name,
                address: property.address,
                purchasePrice: property.purchasePrice,
                purchaseDate: property.purchaseDate,
                currentValue: property.currentValue,
                monthlyRent: property.monthlyRent || "N/A",
              },
            })}>
              <View style={styles.propertyInfo}>
                <Text style={styles.propertyName}>{property.name}</Text>
                <Text style={styles.propertyAddress}>{property.address}</Text>
                <Text style={styles.propertyDetails}>Purchase: ${property.purchasePrice}</Text>
                <Text style={styles.propertyDetails}>Current Value: ${property.currentValue}</Text>
                {property.monthlyRent && (
                  <Text style={styles.propertyDetails}>Monthly Rent: ${property.monthlyRent}</Text>
                )}
              </View>
              <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(property)}>
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
            <Text style={styles.modalTitle}>Add New Property</Text>
            <ModelTextInput
              label="Property Name"
              placeholder="Enter property name"
              value={newProperty.name}
              onChangeText={(text) => setNewProperty({ ...newProperty, name: text })}
            />

            <ModelTextInput
              label="Address"
              placeholder="Enter property address"
              value={newProperty.address}
              onChangeText={(text) => setNewProperty({ ...newProperty, address: text })}
            />

            <ModelTextInput
              label="Purchase Price"
              placeholder="Enter purchase price"
              value={newProperty.purchasePrice}
              onChangeText={(text) => setNewProperty({ ...newProperty, purchasePrice: text })}
              keyboardType="numeric"
            />

            <ModelTextInput
              label="Current Value"
              placeholder="Enter current value"
              value={newProperty.currentValue}
              onChangeText={(text) => setNewProperty({ ...newProperty, currentValue: text })}
              keyboardType="numeric"
            />

            <ModelTextInput
              label="Monthly Rent (Optional)"
              placeholder="Enter monthly rent"
              value={newProperty.monthlyRent}
              onChangeText={(text) => setNewProperty({ ...newProperty, monthlyRent: text })}
              keyboardType="numeric"
            />

            <ModelTextInput
              label="Purchase Date"
              placeholder="YYYY-MM-DD"
              value={newProperty.purchaseDate}
              onChangeText={(text) => setNewProperty({ ...newProperty, purchaseDate: text })}
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
                onPress={handleAddProperty}
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
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  chartContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 16,
    marginBottom: 20,
    alignItems: 'center', 
  },
  chartWrapper: {
    width: '100%',
    alignItems: 'center', 
    overflow: 'hidden', 
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  propertiesList: {
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
  propertyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  propertyInfo: {
    flex: 1,
  },
  propertyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  propertyAddress: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  propertyDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 8,
    borderRadius: 6,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
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
    borderRadius: 16,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
});

export default RealEstateScreen; 