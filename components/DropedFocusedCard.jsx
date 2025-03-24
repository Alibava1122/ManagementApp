import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const DropedFocusedCard = ({
  DroppedFocusedSecond,
  setDroppedFocusedSecond,
}) => {
  DroppedFocusedSecond.forEach((tile) => {
    if (!tile.scaleAnim) tile.scaleAnim = new Animated.Value(1);
    if (!tile.shakeAnim) tile.shakeAnim = new Animated.Value(0);
    if (!tile.expandAnim) tile.expandAnim = new Animated.Value(0);
    if (tile.isExpanded === undefined) tile.isExpanded = false;
  });

  const handleLongPressOnFocusedSecond = (tile) => {
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
    setDroppedFocusedSecond([...DroppedFocusedSecond]);
  };

  const handlePressOutsideDroppedSecond = (tile) => {
    if (tile.showDelete) {
      Animated.spring(tile.scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();

      tile.showDelete = false;
      setDroppedFocusedSecond([...DroppedFocusedSecond]);
    }
  };

  const handleDeleteDroopedFocusedTile = (tileId) => {
    setDroppedFocusedSecond(
      DroppedFocusedSecond.filter((tile) => tile.id !== tileId)
    );
  };

  const toggleExpand = (tile) => {
    tile.isExpanded = !tile.isExpanded;

    Animated.timing(tile.expandAnim, {
      toValue: tile.isExpanded ? 170 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setDroppedFocusedSecond([...DroppedFocusedSecond]);
  };

  return (
    <View  style={{marginTop:-16}} >
      <FlatList
        data={DroppedFocusedSecond}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
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
                onPress={() => handleDeleteDroopedFocusedTile(item.id)}
              >
                <AntDesign name="closecircleo" size={24} color="black" />
              </TouchableOpacity>
            )}

           <View>
           <TouchableOpacity
              onPress={() => {
                handlePressOutsideDroppedSecond(item);
                toggleExpand(item);
              }}
              onLongPress={() => handleLongPressOnFocusedSecond(item)}
              activeOpacity={0.9}
              style={[
                styles.FocusedTileContainer,
                { backgroundColor: item.colorCode },
              ]}
            >
              <View>
                <Text style={styles.TextFocused}>{item.title}</Text>
                <Text style={styles.TextFocused}>{item.title2}</Text>
                <Text style={styles.TextPounds}>££££</Text>
              </View>
              <View>
                <Image
                  source={item.image}
                  style={styles.imageFocused}
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
          

            {/* Expandable Section */}

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
                 <View>
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
          </Animated.View>
        )}
      />
    </View>
  );
};

export default DropedFocusedCard;

const styles = StyleSheet.create({
  listContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    padding: 7, 
  },
  FocusedTileContainer: {
    width: "100%",
    borderRadius: 15,
    marginBottom: 4,
    alignItems: "center",
    padding: 18,
    borderWidth: 1,
    borderColor: "grey",
    flexDirection: "row",
    justifyContent: "space-around",
    position:'relative',
    // marginTop:15
  },
  deleteButton: {
    position: "absolute",
    top: -4,
    right: 0,
    zIndex: 1,
  },
  TextFocused: {
    fontSize: 16,
    color: "black",
    fontFamily: "Merriweather-Bold",
  },
  TextPounds: {
    marginTop: 5,
    fontSize: 16,
    color: "black",
    fontFamily: "Merriweather-Bold",
  },
  imageFocused: {
    width: 120,
    height: 120,
    borderRadius: 100,
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
    alignItems:'center',
    justifyContent:'center',  
    elevation: 4,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    borderTopRightRadius:5,
    borderTopLeftRadius:5,
   
   
    
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
    bottom:-7
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
