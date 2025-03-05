import React from "react";
import { TextInput, Text, View, StyleSheet } from "react-native";

const CustomTextInput = ({ placeholder, value, onChangeText, onBlur, secureTextEntry, keyboardType, error, touched , Label }) => {
  return (
    <>
    <Text style={styles.Label}>{Label}</Text>
   
    <View style={styles.inputContainer}>
     
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
       
    </View>
    {touched && error && <Text style={styles.error}>{error}</Text>}
   
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 5,
    backgroundColor:'white',
    borderColor: "#00a8a9",
    borderRadius: 17,
    borderWidth: 1.2,

 
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  Label:{
    fontSize:14,
    marginBottom:7,
    fontFamily:'Merriweather-Light',
    color:'black'

  }
});

export default CustomTextInput;
