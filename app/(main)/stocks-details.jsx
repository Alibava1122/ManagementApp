import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { BarChart } from "react-native-chart-kit";

const StockDetailScreen = () => {
  const params = useLocalSearchParams(); 

  const chartData = {
    labels: ["Price"],
    datasets: [{ data: [parseFloat(params.purchasePrice) || 0] }],
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{params.symbol.toUpperCase()} STOCK DETAIL</Text>

      {/* Bar Chart */}
      <View style={styles.chartContainer}>
        <BarChart
          data={chartData}
          width={Dimensions.get("window").width - 50}
          height={220}
          yAxisLabel="$"
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            style: { borderRadius: 16 },
          }}
          style={{ marginVertical: 10, borderRadius: 16 }}
        />
      </View>

      {/* Stock Details */}
      <View style={styles.detailCard}>
        <Text style={styles.detailText}>Quantity: {params.quantity}</Text>
        <Text style={styles.detailText}>
          Purchase Price: ${params.purchasePrice}
        </Text>
        <Text style={styles.detailText}>Purchase Date: {params.purchaseDate.slice(0,10)}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" ,color:'#007AFF' },
  chartContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  detailCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  detailText: { fontSize: 16, marginBottom: 10 , color:'black' },
});

export default StockDetailScreen;
