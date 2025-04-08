import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import DraggableFlatList from "react-native-draggable-flatlist";
const { width } = Dimensions.get("window");

const DroppedRiskCard = ({ setDroppedRiskTiles, droppedRiskTiles }) => {
  droppedRiskTiles.forEach((tile) => {
    if (!tile.scaleAnim) tile.scaleAnim = new Animated.Value(1);
    if (!tile.shakeAnim) tile.shakeAnim = new Animated.Value(0);
    if (!tile.expandAnim) tile.expandAnim = new Animated.Value(0);
    if (tile.isExpanded === undefined) tile.isExpanded = false;
  });



  // useEffect(() => {
    
  //   const defaultTile = {  
  //     id: 1,
  //     title: "Risk ",
  //     colorCode: "#d1fbfd",
  //     image: require("../assets/images/loss3.png"),
  //     scaleAnim: new Animated.Value(1),
  //     shakeAnim: new Animated.Value(0),
  //     expandAnim: new Animated.Value(0),
  //     isExpanded: false,
  //     showDelete: false,
  //   };
  
  //   setDroppedRiskTiles([defaultTile]);
  // }, []);

  const handleLongPressOnRisk = (tile) => {
    // Zoom in
    Animated.spring(tile.scaleAnim, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start();

    Animated.sequence([
      Animated.timing(tile.shakeAnim, {
        toValue: -5,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(tile.shakeAnim, {
        toValue: 5,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(tile.shakeAnim, {
        toValue: -5,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(tile.shakeAnim, {
        toValue: 5,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(tile.shakeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();

    tile.showDelete = true;
    setDroppedRiskTiles([...droppedRiskTiles]);
  };

  const handlePressOutsideRisk = (tile) => {
    if (tile.showDelete) {
      Animated.spring(tile.scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();

      tile.showDelete = false;
      setDroppedRiskTiles([...droppedRiskTiles]);
    }
  };

  const handleDeleteRiskTile = (tileId) => {
    setDroppedRiskTiles(droppedRiskTiles.filter((tile) => tile.id !== tileId));
  };

  const toggleExpand = (tile) => {
    tile.isExpanded = !tile.isExpanded;

    Animated.timing(tile.expandAnim, {
      toValue: tile.isExpanded ? 170 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setDroppedRiskTiles([...droppedRiskTiles]);
  };
  return (
    <View  style={{marginTop:-3}}>
      <DraggableFlatList
        data={droppedRiskTiles}
        keyExtractor={(item) => item.id.toString()}
        onDragEnd={({ data }) => setDroppedRiskTiles(data)}
        renderItem={({ item, drop}) => {
          return (
            <View style={styles.listContainer}>
            <Animated.View
              style={[
                {
                  transform: [
                    { scale: item.scaleAnim },
                    { translateX: item.shakeAnim },
                  ],
                },
              ]}
            >
              {item.showDelete && (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteRiskTile(item.id)}
                >
                  <AntDesign name="closecircleo" size={24} color="black" />
                </TouchableOpacity>
              )}

              <View>
                <TouchableOpacity
                  onPress={() => {
                    handlePressOutsideRisk(item);
                    toggleExpand(item);
                  }}
                  // onLongPress={() => handleLongPressOnRisk(item)}
                  onLongPress={() => {
                    handleLongPressOnRisk(item);
                    if (item.length > 1) {
                      drag();
                    }
                    
                  }}
                  activeOpacity={0.9}
                  style={[
                    styles.RiskTilesContainer,
                    { backgroundColor: item.colorCode },
                  ]}
                >
                  <View style={styles.RiskimageContainer}>
                    <Image
                      source={item.image}
                      style={styles.imageRisk}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeIcon}
                  onPress={() => {
                    toggleExpand(item);
                  }}
                >
                  <View style={styles.iconContainer}>
                    {item.isExpanded ? (
                      <AntDesign name="upcircleo" size={19} color="black" />
                    ) : (
                      <AntDesign name="downcircleo" size={19} color="black" />
                    )}
                  </View>
                </TouchableOpacity>
              </View>

              <Animated.View
                style={[
                  styles.expandedContainer,
                  { backgroundColor: item.colorCode },
                  {
                    height: item.expandAnim,
                    marginBottom: item.expandAnim.interpolate({
                      inputRange: [0, 100],
                      outputRange: [0, 10],
                    }),
                    marginTop: item.expandAnim.interpolate({
                      inputRange: [0, 100],
                      outputRange: [0, 4],
                    }),

                    opacity: item.expandAnim.interpolate({
                      inputRange: [0, 100],
                      outputRange: [0, 1],
                    }),
                  },
                ]}
              >
               
                 <View >
                 <Image
                    source={item.image}
                    style={styles.imageFocused}
                    resizeMode="contain"
                  />
              
                {/* <Text style={styles.expandedText}>
                  {item.title} {item.title2}
                </Text> */}
                 </View>
              </Animated.View>
            </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default DroppedRiskCard;

const styles = StyleSheet.create({
  listContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical:7,
  //  paddingHorizontal:20
  },
  deleteButton: {
    position: "absolute",
    top: -4,
    right: 0,
    zIndex: 1,
  },

  RiskTilesContainer: {
    // width: '100%',
    height: 145,
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "grey",
    marginBottom: 9,
  },
  imageRisk: {
    width: 160,
    height: 160,
  },
  RiskimageContainer: {
    width: width * 0.8,
    alignItems: "center",
    justifyContent: "center",
  },
  expandedContainer: {
    overflow: "hidden",
    // paddingHorizontal: 10,
    // paddingVertical: 5,
    // width: "100%",


    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  imageFocused: {
    width: 190,
    height: 190,
    
  },
  expandedText: {
    marginTop: 5,
    fontSize: 15,
    color: "black",
    fontFamily: "Merriweather-Bold",
  },
  closeIcon: {
    width: "100%",

    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: -7,
  },
  iconContainer: {
    width: 27,
    height: 27,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
});
