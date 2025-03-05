import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import AssetBox from "../../components/AssetBox";
import { router } from "expo-router";
import { useAssets } from "../../context/AssetContext";

const assetScreen = () => {
  const { calculateTotalAssets } = useAssets(); 
  const { stocksTotal, cryptosTotal, propertiesTotal, cashTotal} = calculateTotalAssets();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.HeadTitleContainer}>
      <Image
                   source={require("../../assets/images/asset.png")}
                  style={styles.Headimage}
                />
      <Text style={styles.headTitle}>Assets</Text>
      </View>
      
      <AssetBox
        title="Cash"
        totalValue={cashTotal}
        imageSource={require("../../assets/images/4.png")}
        onPress={() => router.navigate("/cashScreen")}
      />
       <AssetBox
        title="Stocks"
        totalValue={stocksTotal}
        imageSource={require("../../assets/images/2.png")}
        onPress={() => router.navigate("/stocksScreen")}
      />
       <AssetBox
        title="Real Estate"
        totalValue={propertiesTotal}
        imageSource={require("../../assets/images/3.png")}
        onPress={() => router.navigate("/realEstateScreen")}
      />
       <AssetBox
        title='Cryptocurrency'
        totalValue={cryptosTotal}
        onPress={() => router.navigate("/cryptoScreen")}
      />
      <View style={{marginBottom:30}}>

      </View>
    </ScrollView>
  );
};

export default assetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  headTitle: {
    fontSize: 21,
    color: 'black',
    marginBottom: 10,
    fontWeight: "800",
    marginLeft:10
  },
 
 
  
  Headimage:{
    width: 28,
    height: 28,
  },
  HeadTitleContainer:{
    marginBottom:20,
    flexDirection:'row',
   
  }
});
