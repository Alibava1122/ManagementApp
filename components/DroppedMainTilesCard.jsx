import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import DraggableFlatList from "react-native-draggable-flatlist";
import { router } from "expo-router";

const DroppedMainTiles = ({ setDroppedTiles, droppedTiles }) => {
  droppedTiles.forEach((tile) => {
    if (!tile.scaleAnim) tile.scaleAnim = new Animated.Value(1);
    if (!tile.shakeAnim) tile.shakeAnim = new Animated.Value(0);
    if (!tile.expandAnim) tile.expandAnim = new Animated.Value(0);
    if (tile.isExpanded === undefined) tile.isExpanded = false;
  });



  const handleLongPress = (tile) => {
    Animated.spring(tile.scaleAnim, {
      toValue: 1.02,
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
    setDroppedTiles([...droppedTiles]);
  };

  const handlePressOutside = (tile) => {
    if (tile.showDelete) {
      Animated.spring(tile.scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();

      tile.showDelete = false;
      setDroppedTiles([...droppedTiles]);
    } else {
    }
  };

  const toggleExpand = (tile) => {
    tile.isExpanded = !tile.isExpanded;
  

    Animated.timing(tile.expandAnim, {
      toValue: tile.isExpanded ? 170 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setDroppedTiles([...droppedTiles]);
  };

  const handleDeleteTile = (tileId) => {
    setDroppedTiles(droppedTiles.filter((tile) => tile.id !== tileId));
  };

  return (
    <View>
      <DraggableFlatList
        data={droppedTiles}
        keyExtractor={(item) => item.id.toString()}
        onDragEnd={({ data }) => setDroppedTiles(data)}
        renderItem={({ item, drag }) => (
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
                onPress={() => handleDeleteTile(item.id)}
              >
                <AntDesign name="closecircleo" size={24} color="black" />
              </TouchableOpacity>
            )}
            <View>
              <TouchableOpacity
                style={[
                  styles.tileContainer,
                  { backgroundColor: item.colorCode },
                ]}
                onPress={() => {
                  handlePressOutside(item);
                  toggleExpand(item);
                }}
                onLongPress={() => {
                  handleLongPress(item);
                  drag();
                }}
                delayLongPress={200}
                activeOpacity={0.9}
              >
                <View style={styles.textContainer}>
                  <View>
                    <Text style={styles.headerText}>{item.title}</Text>
                    <Text style={styles.headerText}>{item.title2}</Text>
                    <Text style={styles.headerTextAmount}>{item.Amount}</Text>
                  </View>
                </View>
                <View style={styles.imageContainer}>
                  <Image
                    source={item.image}
                    style={styles.image}
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
            <TouchableOpacity onPress={()=>router.navigate('/(main)/assetScreen')} style={styles.expandedMain}>
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
                      outputRange: [0, 8],
                    }),

                    opacity: item.expandAnim.interpolate({
                      inputRange: [0, 100],
                      outputRange: [0, 1],
                    }),
                  },
                ]}
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={item.image}
                    style={styles.imageFocused}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.expandedText}>
                  {item.title} {item.title2}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
          </View>
        )}
      />
    </View>
  );
};

export default DroppedMainTiles;

const styles = StyleSheet.create({
  listContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    // padding: 19,
   paddingHorizontal:20
  },
  deleteButton: {
    position: "absolute",
    top: 8,
    right: 0,
    zIndex: 1,
  },
  tileContainer: {
    marginTop: 10,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    padding: 17,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "grey",
    // marginRight: 7,
    overflow: "visible",
  },
  textContainer: {
    width: "50%",
    height: 130,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 18,
    fontFamily: "Merriweather-Bold",
    color: "black",
  },
  headerTextAmount: {
    fontSize: 18,
    fontFamily: "Merriweather-Bold",
    color: "black",
    marginTop: 6,
  },

  imageContainer: {
    width: "50%",
    height: 130,
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
  },
  expandedMain: {
    paddingHorizontal: 8,
  },
  expandedContainer: {
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "100%",

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
    marginTop: 5,
  },
  imageFocused: {
    width: 110,
    height: 110,
    borderRadius: 100,
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
    bottom: -12,
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

