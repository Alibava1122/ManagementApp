import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import DraggableFlatList from "react-native-draggable-flatlist";
import { router } from "expo-router";

const DroppedAnalyticsCard = ({
  setAnalyticsDroppedTiles,
  droppedAnalyticsTiles,
}) => {
  droppedAnalyticsTiles.forEach((tile) => {
    if (!tile.scaleAnim) tile.scaleAnim = new Animated.Value(1);
    if (!tile.shakeAnim) tile.shakeAnim = new Animated.Value(0);
    if (!tile.expandAnim) tile.expandAnim = new Animated.Value(0);
    if (tile.isExpanded === undefined) tile.isExpanded = false;
  });


  const handleLongPressOnAnalytics = (tile) => {
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
    setAnalyticsDroppedTiles([...droppedAnalyticsTiles]);
  };

  const handlePressOutsideAnalytics = (tile) => {
    if (tile.showDelete) {
      Animated.spring(tile.scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();

      tile.showDelete = false;
      setAnalyticsDroppedTiles([...droppedAnalyticsTiles]);
    }
  };

  const handleDeleteAnalyticsTile = (tileId) => {
    setAnalyticsDroppedTiles(
      droppedAnalyticsTiles.filter((tile) => tile.id !== tileId)
    );
  };

  const toggleExpand = (tile) => {
    tile.isExpanded = !tile.isExpanded;

    Animated.timing(tile.expandAnim, {
      toValue: tile.isExpanded ? 170 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setAnalyticsDroppedTiles([...droppedAnalyticsTiles]);
  };
  return (
    <View >
      <DraggableFlatList
        data={droppedAnalyticsTiles}
        onDragEnd={({ data }) => setAnalyticsDroppedTiles(data)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item , drag }) => {
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
                  onPress={() => handleDeleteAnalyticsTile(item.id)}
                >
                  <AntDesign name="closecircleo" size={24} color="black" />
                </TouchableOpacity>
              )}

             <View>
             <TouchableOpacity
                onPress={() => {
                  handlePressOutsideAnalytics(item);
                  toggleExpand(item);
                }}
                
                onLongPress={() => {
                  handleLongPressOnAnalytics(item);
                  drag();
                }}
                activeOpacity={0.9}
                style={[
                  styles.largeTileSize,
                  // { backgroundColor: item.colorCode },
                ]}
              >
                <View>
                  <Image
                    source={item.image}
                    style={styles.imageAnalytics}
                    resizeMode="contain"
                  />
                </View>
                <View>
                  <Image
                    source={item.image2}
                    style={styles.imageAnalytics}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeIcon} onPress={()=>{toggleExpand(item);}}>
              <View style={styles.iconContainer}>
              {
                item.isExpanded ? (<AntDesign name="upcircleo" size={19} color="black" />) : ( <AntDesign name="downcircleo" size={19} color="black" />)
              }
              </View>
              </TouchableOpacity>
             </View>
             <TouchableOpacity  onPress={()=>router.navigate('/(main)/assetScreen')} >
              <Animated.View
              style={[
                styles.expandedContainer,
                // { backgroundColor: item.colorCode },
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
                 <View>
                <Image
                  source={item.image2}
                  style={styles.imageFocused}
                  resizeMode="contain"
                />
              </View>
            </Animated.View>
            </TouchableOpacity>
            </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default DroppedAnalyticsCard;

const styles = StyleSheet.create({
  listContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    // padding: 19,
   paddingHorizontal:13,
   marginTop:4
  },
  deleteButton: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
  },
  largeTileSize: {
    width: "100%",
    height: 145,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "grey",
    marginBottom:5,
    backgroundColor:'white',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    
  },
  imageAnalytics: {
    width: 140,
    height: 140,
  },
  expandedContainer: {
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 5,
    // width: "100%",
    
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    alignItems:'center',
    justifyContent:'center',  
    elevation: 4,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    borderTopRightRadius:5,
    borderTopLeftRadius:5,
    backgroundColor:'white'
   
    
  },
  imageFocused: {
    width: 200,
    height: 200,
    
  },
  expandedText: {
    marginTop:5,
    fontSize: 15,
    color: "black",
    fontFamily: "Merriweather-Bold",
  },
  closeIcon:{
    width:'100%',
   
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    bottom:-5
  },
  iconContainer:{
    width:27,
    height:27,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:30
    
  }
});
