import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

const AssetBox = ({ title, totalValue, imageSource, onPress }) => {
  return (
    <View style={styles.boxContainers}>
      <View style={styles.innerBoxCContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.BoxHeadtitle}>{title}</Text>
          <Text style={styles.Boxtitle}>Total Value:</Text>
          <Text style={styles.Boxtitle}>$ {totalValue}</Text>
        </View>
        
          {
            imageSource ? (<View style={styles.imageContainer}><Image source={imageSource} style={styles.image} /></View>):(null)
          }
        
      </View>
      <View style={styles.innerBoxCContainer2}>
        <TouchableOpacity style={styles.Buttons} onPress={onPress}>
          <Text style={styles.ButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AssetBox;

const styles = StyleSheet.create({
  
      boxContainers: {
        height: 220,
        borderRadius: 20,
        backgroundColor: "#fff",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        paddingVertical:10,
        paddingHorizontal:'30',  
        marginBottom:10
      },
      BoxHeadtitle: {
        fontSize: 22,
        fontWeight: "900",
        color: "#007AFF",
      },
      Boxtitle: {
        fontSize: 15,
        fontWeight: "400",
        color: "black",
      },
      innerBoxCContainer:{
        width:'100%',
        height:'75%',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
       
        borderRadius: 20,
        padding:5
      },
      innerBoxCContainer2:{
        width:'100%',
        height:'20%',
       
      },
      Buttons: {
        width:'40%',
        height:35,
      backgroundColor:'#007AFF',
      borderRadius: 20,
      alignItems:'center',
      justifyContent:'center'
      },
      ButtonText:{
        color:'white',
        fontWeight:'400'
      },
      image: {
        width: 110,
        height: 110,
        
      },
      imageContainer:{
        width:'50%',
        alignItems:'center',
        justifyContent:'center'
       
      },
    
 
});