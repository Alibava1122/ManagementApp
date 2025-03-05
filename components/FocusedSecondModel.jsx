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

const FocusedSecondModel = ({
  isFocusedSeondModel,
  setIsFocusedSecondModel,
  DropingFocusedSecondModelTile,
}) => {
  const slideAnim = useRef(new Animated.Value(-width * 0.6)).current;
  const panRefs = useRef({});

  const [availableTiles] = useState([
    {
      id: 1,
      title: "One Asset",
      title2: "Management",
      colorCode: "#cfe2fe",
      image: require("../assets/images/cryptograph.png"),
      
    },
    {
      id: 2,
      title: "One Asset",
      title2: "Management",
      colorCode: "#fcfbca",
      image: require("../assets/images/cryptograph2.png"),
    },
  ]);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isFocusedSeondModel ? 0 : -width * 0.6,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isFocusedSeondModel]);
  useEffect(() => {
    if (isFocusedSeondModel) {
      Object.values(panRefs.current).forEach((pan) => {
        pan.setValue({ x: 0, y: 0 });
      });
    }
  }, [isFocusedSeondModel]);

  return (
    isFocusedSeondModel && (
      <Animated.View
        style={[
          styles.modalContainer,
          { transform: [{ translateX: slideAnim }] },
        ]}
      >
        <View style={styles.modalContent}>
          {availableTiles.map((tile) => {
            if (!panRefs.current[tile.id]) {
              panRefs.current[tile.id] = new Animated.ValueXY();
            }
            const pan = panRefs.current[tile.id];
            const panResponder = PanResponder.create({
              onStartShouldSetPanResponder: () => true,
              onPanResponderMove: Animated.event(
                [null, { dx: pan.x, dy: pan.y }],
                { useNativeDriver: false }
              ),
              onPanResponderRelease: (event, gestureState) => {
                if (gestureState.moveY > 300) {
                  DropingFocusedSecondModelTile({ ...tile, id: Date.now() });
                  setIsFocusedSecondModel(false);
                } else {
                  Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false,
                  }).start();
                }
              },
            });

            return (
              <Animated.View
                key={tile.id}
                {...panResponder.panHandlers}
                style={[
                  styles.tileContainer,
                  { backgroundColor: tile.colorCode },
                  { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
                ]}
              >
                <View>
                  <Text style={styles.Text}>{tile.title} </Text>
                  <Text style={styles.Text}>{tile.title2} </Text>
                  <Text style={styles.TextPounds}>££££</Text>
                </View>
                <View style={styles.imageContainer}>
                  <Image
                    source={tile.image}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </View>
              </Animated.View>
            );
          })}

          <View style={styles.ButtonContainer}>
            <TouchableOpacity
              onPress={() => setIsFocusedSecondModel(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    )
  );
};

export default FocusedSecondModel;

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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
  },

  closeButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  ButtonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Merriweather-Bold",
  },
  tileContainer: {
    height: 120,
    width: "92%",
    borderRadius: 15,
    marginBottom: 10,
    alignItems: "center",
    padding: 5,
    borderWidth: 1,

    borderColor: "grey",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  Text: {
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
