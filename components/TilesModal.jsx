import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Dimensions,
  PanResponder,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
const { width } = Dimensions.get("window");

const TilesModal = ({ isTilesModalVisible, setIsTilesModalVisible, onDropTile, onDragStart }) => {
  const slideAnim = useRef(new Animated.Value(-width * 0.6)).current;
  const panRefs = useRef({});
 
  const [availableTiles] = useState([
    { id: 1, title: "Total", title2: "Portfolio", colorCode:'#f3d9fd',  Amount: "£1000", image: require("../assets/images/graph2.png") },
    { id: 2, title: "Custom", title2: "Portfolio", colorCode:'#fcfbca',  Amount: "£2000", image: require("../assets/images/circleG.png") },
    { id: 3, title: "Total", title2: "Portfolio", colorCode:'#f3d9fd', Amount: "£3000", image: require("../assets/images/salesGraph.webp") },
  ]);

  // Initialize panRefs when component mounts
  useEffect(() => {
    availableTiles.forEach(tile => {
      if (!panRefs.current[tile.id]) {
        panRefs.current[tile.id] = new Animated.ValueXY();
      }
    });
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isTilesModalVisible ? 0 : -width * 0.6,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isTilesModalVisible]);

  const createPanResponder = (tile) => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,

    onPanResponderGrant: () => {
      onDragStart(tile);
      setIsTilesModalVisible(false);
    },

    onPanResponderMove: () => {
      // Remove the Animated.event since we're handling dragging in MainScreen
    },

    onPanResponderRelease: (e, gesture) => {
      if (gesture.moveY > 300) {
        onDropTile({ ...tile, id: Date.now() });
      }
    },
  });

  return (
    isTilesModalVisible && (
      <Animated.View style={[styles.modalContainer, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.modalContent}>
          {availableTiles.map((tile) => (
            <Animated.View
              key={tile.id}
              {...createPanResponder(tile).panHandlers}
              style={[
                styles.tileContainer,
                {backgroundColor: tile.colorCode}
              ]}
            >
              <View style={styles.imageContainerText}>
                <View>
                  <Text style={styles.headerText}>{tile.title}</Text>
                  <Text style={styles.headerText}>{tile.title2}</Text>
                  <Text style={styles.headerTextAmount}>{tile.Amount}</Text>
                </View>
              </View>
              <View style={styles.imageContainer}>
                <Image source={tile.image} style={styles.image} resizeMode="contain" />
              </View>
            </Animated.View>
          ))}

          <TouchableOpacity onPress={() => setIsTilesModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    )
  );
};

export default TilesModal;

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    top: 41,
    left: 45,
    width: width * 0.8,
    // height: "70%",
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
    fontWeight: "bold",
    marginBottom: 15,
    color: "black",
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
    fontWeight: "bold",
    color: "black",
    fontFamily: "Merriweather-Bold",
  },
  closeButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
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
    padding:20,
    borderWidth:1,
    borderColor:'grey',
    backgroundColor:'#eed5fa',
   
  },

  headerText:{
    fontSize:18,
    fontFamily: "Merriweather-Bold",
    color:'black'

  },
  headerTextAmount :{
    fontSize:18,
    fontFamily: "Merriweather-Bold",
    color:'black',
    marginTop:7

  },
  imageContainer:{
    width:'50%',
    height:110,
    backgroundColor:'white',
    borderRadius:15,
    alignItems:'center',
    justifyContent:'center',
    
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 20,
  },
  imageContainerText:{
    width:'50%',
    height:110,
    alignItems:'center',
    justifyContent:'center'
  }
});
