import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const DashboardDesign = () => {
  const droppedTiles = [
    {
      id: 1,
      title: "Custom",
      Amount: "£1000K",
      title2: "Portfolio",
      image: require("../assets/images/graph2.png"),
      Color: "#f3d9fd",
    },
    {
      id: 2,
      title: "Total",
      title2: "Portfolio",
      Amount: "£1000K",
      image: require("../assets/images/circleG.png"),
      Color: "#fcfbca",
    },
    {
      id: 3,
      title: "Custom",
      Amount: "£2000K",
      title2: "Portfolio",
      image: require("../assets/images/salesGraph.webp"),
      Color: "#f3d9fd",
    },

  ];
  return (
    <View style={styles.container}>
      <View style={styles.DropTiles}>
        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={droppedTiles}
          contentContainerStyle={{
            flexGrow: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.tileContainer, { backgroundColor: item.Color }]}
            >
              <View>
                <Text style={styles.headerText}>{item.title}</Text>
                <Text style={styles.headerText}>{item.title2}</Text>
                <Text style={styles.priceText}>{item.Amount}</Text>
              </View>
              <View style={styles.imageContainer}>
                <Image
                  source={item.image}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.smallTilesContainer}>
        <View style={styles.smallTiles1}>
          <Text style={styles.borkerText}>Broker 1</Text>
          <Image
            source={require("../assets/images/brokergraph1.png")}    
            style={styles.image1}
            resizeMode="contain"
          />
        </View>
        <View style={styles.smallTiles2}>
          <Text style={styles.borkerText2}>Broker 2</Text>
          <Image
            source={require("../assets/images/brokerGraph2.png")}
            style={styles.image2}
            resizeMode="contain"
          />
        </View>
        <View style={styles.smallTiles3}>
          <Text style={styles.borkerText3}>Broker 3</Text>
          <Image
            source={require("../assets/images/brokerGraph3.png")}
            style={styles.image3}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* ThirdContainer  */}

      <View style={styles.thirdTilesContainer}>
        <View style={styles.analyticsTiles}>
          <Text style={styles.borkerText2}>Analytics</Text>
          <Image
            source={require("../assets/images/analytics.png")}
            style={styles.imageAnalytics}
            resizeMode="contain"
          />
        </View>
        <View style={styles.riskTiles}>
          <Text style={styles.borkerText2}>Risk Alert</Text>
          <Image
            source={require("../assets/images/risk.png")}
            style={styles.imageAnalytics}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
    
  );
};

export default DashboardDesign;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,

    alignItems: "center",
    justifyContent: "center",
  },
  DropTiles: {
    width: 360,
    height: 205,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
  tileContainer: {
    height: 170,
    width: 350,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderWidth: 1,
    borderColor: "grey",

    // marginLeft:10,
    overflow: "visible",
    marginRight: 7,
  },
  imageContainer: {
    width: 150,
    height: 120,
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  headerText: {
    color: "black",
    fontSize: 20,
    fontFamily: "Merriweather-Bold",
  },
  priceText: {
    color: "black",
    fontSize: 25,
    fontFamily: "Merriweather-Bold",
    marginTop: 13,
  },
  smallTilesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    marginTop:10
  },
  thirdTilesContainer:{
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    
    marginTop:10

    
  },
  smallTiles1: {
    width: 95,
    height: 90,
    backgroundColor: "#c2f7cb",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    
  },
  smallTiles2: {
    width: 130,
    height: 120,
    backgroundColor: "#d1fbfd",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  smallTiles3: {
    width: 95,
    height: 90,
    backgroundColor: "#c2f7cb",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  borkerText: {
    color: "black",
    fontSize: 10,
    fontFamily: "Merriweather-Bold",
  },
  borkerText2: {
    color: "black",
    fontSize: 13,
    fontFamily: "Merriweather-Bold",
  },
  borkerText3: {
    color: "black",
    fontSize: 12,
    fontFamily: "Merriweather-Bold",
  },
  image1: {
    width: 60,
    height: 45,
   
  },
  image2: {
    width: 80,
    height: 70,
  },
  image3: {
    width: 70,
    height: 50,
    
  },
  analyticsTiles:{
    width: 150,
    height: 140,
    backgroundColor: "#cee5ff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  riskTiles:{
    width: 150,
    height: 140,
    backgroundColor: "#fee0e1",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  imageAnalytics:{
    width: 100,
    height: 100,
  }
 
});
