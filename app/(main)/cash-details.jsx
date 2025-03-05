import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { BarChart } from "react-native-chart-kit";

const CashDetails = () => {
  const router = useRouter();
  const { description, amount, date } = useLocalSearchParams();

  const chartData = {
    labels: ["Amount"],
    datasets: [{ data: [parseFloat(amount) || 0] }],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cash Flow</Text>
      <View style={styles.mainChartContainer}>
        <View style={styles.chartContainer}>
          <BarChart
            data={chartData}
            width={Dimensions.get("window").width - 100}
            height={220}
            yAxisLabel="$"
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              style: { borderRadius: 16 },
            }}
            style={{ marginVertical: 8, borderRadius: 16 }}
          />
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>Cash Entry Details</Text>
        <Text style={styles.detail}>📌 Description: {description}</Text>
        <Text style={styles.detail}>💰 Amount: ${amount}</Text>
        <Text style={styles.detail}>📅 Date: {date}</Text>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "#fff",
    padding: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#007AFF",
  },
  detail: { fontSize: 18, marginBottom: 10 },
  mainChartContainer: {},
  chartContainer: {
    borderRadius: 20,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: "30",
    marginBottom: 10,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    width:'35%',
    alignItems:'center',
    justifyContent:'center'
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  detailsContainer: {
    padding: 10,
  },
});

export default CashDetails;
