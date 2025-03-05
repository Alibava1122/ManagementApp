import { StyleSheet, Text, View ,  Animated, TouchableOpacity, Dimensions, } from 'react-native'
import React, { useEffect, useState } from 'react'
import FocusedSecondModel from './FocusedSecondModel';
const { width } = Dimensions.get("window");
const FocusedFirstModel = ({isNamesModel , setIsModelNames , DropingFocusedSecondModelTile}) => {
  const [isFocusedSeondModel, setIsFocusedSecondModel , ] = useState(false);
    
    const FocusedModelNames = [
        "Crypto",
        "Real Estate",
        "Assets",
      ];
    const slideAnim = new Animated.Value(-width * 0.6);

    useEffect(() => {
      if (isNamesModel) {
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(slideAnim, {
          toValue: -width * 0.6,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    }, [isNamesModel]);
  return (
    <>
    {isNamesModel && (
        <Animated.View
    style={[
      styles.modalContainer,
      { transform: [{ translateX: slideAnim }] },
    ]}
  >
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Select an Option</Text>

      <View style={styles.buttonContainer}>
        {FocusedModelNames.map((item, index) => (
          <TouchableOpacity
           onPress={()=>{
            setIsModelNames(false)
            setIsFocusedSecondModel(true)
           }}
            key={index}
            style={styles.modalButton}
          >
            <Text style={styles.buttonText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={() => setIsModelNames(false)}
        style={styles.closeButton}
      >
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </Animated.View>

    )}


<FocusedSecondModel
        isFocusedSeondModel={isFocusedSeondModel}
        setIsFocusedSecondModel={setIsFocusedSecondModel}
        DropingFocusedSecondModelTile={DropingFocusedSecondModelTile}
      />
    
    </>
    
  )
}

export default FocusedFirstModel

const styles = StyleSheet.create({
    modalContainer: {
        position: "absolute",
        top: 41,
        left: 45,
        width: width * 0.7,
        height: "37%",
        backgroundColor: "white",
        borderRadius: 20,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    modalContent: {
      padding: 20,
      alignItems: "center",
    },
    modalTitle: {
      fontSize: 18,
      marginBottom: 15,
      color: "black",
      fontFamily: "Merriweather-Bold",
    },
    buttonContainer: {
      flexDirection: "column",
      justifyContent: "space-between",
      width: "100%",
    },
    modalButton: {
      backgroundColor: "#f2f2f2",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginHorizontal: 5,
      marginBottom: 15,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      fontSize: 16,
      color: "black",
      fontFamily: "Merriweather-Bold",
    },
    closeButton: {
      backgroundColor: "red",
      paddingVertical: 7,
      paddingHorizontal: 15,
      borderRadius: 10,
    },
    closeButtonText: {
      color: "white",
      fontSize: 13,
      fontFamily: "Merriweather-Bold",
    },
    tileContainer: {
      height: 170,
      width: "100%",
      borderRadius: 15,
      marginBottom: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding:10,
      borderWidth:1,
      borderColor:'grey',
      backgroundColor:'#eed5fa'
    },
  
    headerText:{
      fontSize:18,
      fontFamily: "Merriweather-Bold",
      color:'black'
  
    },
    imageContainer:{
      width:100,
      height:100,
      backgroundColor:'white',
      borderRadius:15,
      alignItems:'center',
      justifyContent:'center'
    },
    listContainers:{
        borderRadius:20,
        padding:10,
        width:'100%',
        backgroundColor: "#f2f2f2",
        alignItems:'center',
        justifyContent:'center',
        marginBottom:15
    }
  });
  