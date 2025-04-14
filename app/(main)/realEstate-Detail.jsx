import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { BarChart } from "react-native-chart-kit";

const RealEstateDetail= () => {
  const router = useRouter();
  const { name, address, purchasePrice, purchaseDate, currentValue, monthlyRent } = useLocalSearchParams();

  const chartData = {
    labels: ["Purchase Price", "Current Value"],
    datasets: [
      {
        data: [parseFloat(purchasePrice), parseFloat(currentValue)],
      },
    ],
  };

  return (
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
     <Text style={styles.title}>{name}</Text>
      <Text style={styles.propertyDetails}>📍 Address: {address}</Text>
      <Text style={styles.propertyDetails}>💰 Purchase Price: ${purchasePrice}</Text>
      <Text style={styles.propertyDetails}>📅 Purchase Date: {purchaseDate.slice(0,10)}</Text>
      <Text style={styles.propertyDetails}>📈 Current Value: ${currentValue}</Text>
      <Text style={styles.propertyDetails}>🏠 Monthly Rent: {monthlyRent}</Text>

     </View>


    </ScrollView>
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
    detailsContainer:{
        padding:16,
        backgroundColor:'white',
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
    }
  });
  

export default RealEstateDetail;
