import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const settingsOptions = [
  { id: 1, name: "Account Profile", icon: "person-outline" },
  { id: 2, name: "Data & Privacy", icon: "lock-closed-outline" },
  { id: 3, name: "Security", icon: "shield-checkmark-outline" },
];

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      {settingsOptions.map((option) => (
        <TouchableOpacity key={option.id} style={styles.option}>
          <Ionicons name={option.icon} size={24} color="#00a8a9" />
          <Text style={styles.optionText}>{option.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionText: {
    fontSize: 15,
    marginLeft: 15,
    color: "#333",
    fontFamily: "Merriweather-Bold",
  },
});
