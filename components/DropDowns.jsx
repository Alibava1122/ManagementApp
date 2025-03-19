import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";

const DropDowns = ({ items }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <View style={styles.dropdown}>
      <RNPickerSelect
        onValueChange={(value) => setSelectedValue(value)}
        items={items.map((item) => ({
          ...item,
          color: item.value === selectedValue ? "#3e8c89" : "black",
        }))}
        placeholder={{
          label: "Select an option...",
          value: null,
        }}
        useNativeAndroidPickerStyle={false}
        Icon={() => (
          <Ionicons
            name="chevron-down"
            size={17}
            color="#000000"
            style={pickerSelectStyles.icon}
          />
        )}
        style={{
          ...pickerSelectStyles,
          inputIOS: {
            ...pickerSelectStyles.inputIOS,
            color: selectedValue ? "#3e8c89" : "black", 
          },
          inputAndroid: {
            ...pickerSelectStyles.inputAndroid,
            color: selectedValue ? "#3e8c89" : "black", 
          },
          placeholder:{
            color:'grey'
          }
        }}
      />
    </View>
  );
};

export default DropDowns;

const styles = StyleSheet.create({
  dropdown: {
    width: "80%",
    borderRadius: 20,
  },
});
const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    borderColor: "gray",
    borderRadius: 5,
    color: "black",
  },
  inputAndroid: {
    fontSize: 16,
    borderWidth: 1,
    padding: 14,
    borderColor: "gray",
    borderRadius: 10,
    color: "black",
    backgroundColor: "#f8f8f8",
    overflow: "hidden",
  },
  icon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: 17 }],
  },
};
