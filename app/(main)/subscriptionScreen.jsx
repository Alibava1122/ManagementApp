import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const SubscriptionScreen = () => {
  return (

    <LinearGradient colors={["#e0f7fa", "#92dbd9"]} style={{ flex: 1 }} >
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Payment Details</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Card Number</Text>
          <TextInput 
            placeholder="1234 5678 9012 3456"
            keyboardType="numeric"
            style={styles.input}
          />
        </View>
        
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>Expiry Date</Text>
            <TextInput 
              placeholder="MM/YY"
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>CVV</Text>
            <TextInput 
              placeholder="123"
              keyboardType="numeric"
              secureTextEntry
              style={styles.input}
            />
          </View>
        </View>
        
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>Amount: $99.99</Text>
        </View>
        
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#baf4ed",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    height: 40,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfWidth: {
    width: "48%",
  },
  amountContainer: {
    marginTop: 15,
    marginBottom: 15,
  },
  amountText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  payButton: {
    backgroundColor: "#333",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  payButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});



export default SubscriptionScreen;
