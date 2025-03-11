import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Vibration,
  FlatList,
  Touchable,
  Dimensions,
  PanResponder,
} from "react-native";
import TilesModal from "../../components/TilesModal";
import { AntDesign, Feather } from "@expo/vector-icons";

import DroppedMainTilesCard from "../../components/DroppedMainTilesCard";

const { width } = Dimensions.get("window");

const MainScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNamesModel, setIsModelNames] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isTilesModalVisible, setIsTilesModalVisible] = useState(false);

  const tilesNames = [
    "Portfolio Tiles",
    "Focused Tiles",
    "Analytics Tiles",
    "Risk Tiles",
  ];

  const slideAnim = new Animated.Value(-width * 0.6);

  useEffect(() => {
    if (isModalVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -width * 0.6,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isModalVisible]);

  // dropTiles States

  const [droppedTiles, setDroppedTiles] = useState([
    {
      id: 2,
      title: "Custom",
      title2: "Portfolio",
      colorCode: "#fcfbca",
      Amount: "£2000",
      image: require("../../assets/images/circleG.png"),

      scaleAnim: new Animated.Value(1),
      shakeAnim: new Animated.Value(0),
      showDelete: false,
      isStatic: true,
    },
  ]);

  const [draggedTile, setDraggedTile] = useState(null);
  const panRefs = useRef(
    new Array(3).fill(0).map(() => new Animated.ValueXY())
  ).current;

  const [availableTiles] = useState([
    {
      id: 1,
      title: "Total",
      title2: "Portfolio",
      colorCode: "#f3d9fd",
      Amount: "£1000",
      image: require("../../assets/images/graph2.png"),
    },
    {
      id: 2,
      title: "Custom",
      title2: "Portfolio",
      colorCode: "#fcfbca",
      Amount: "£2000",
      image: require("../../assets/images/circleG.png"),
    },
    {
      id: 3,
      title: "Total",
      title2: "Portfolio",
      colorCode: "#f3d9fd",
      Amount: "£3000",
      image: require("../../assets/images/salesGraph.webp"),
    },
  ]);

  const dragPosition = useRef(new Animated.ValueXY()).current;
  const [isDragging, setIsDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });

  console.log("dragged position ----->", dragPosition.x, dragPosition.y);

  // Create separate pan responder for modal tiles
  const createModalPanResponder = (tileId) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        const tile = availableTiles.find((t) => t.id === tileId);
        setDraggedTile(tile);
        setIsDragging(true);

        const initialPos = {
          x: 45,
          y: 41 + (tileId - 1) * 180,
        };
        setInitialPosition(initialPos);
        dragPosition.setValue(initialPos);
        panRefs[tileId - 1].setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (_, gesture) => {
        dragPosition.setValue({
          x: initialPosition.x + gesture.dx,
          y: initialPosition.y + gesture.dy,
          
        });

        if (Math.abs(gesture.dy) > 100 || Math.abs(gesture.dx) > 100) {
          // Close the modal with a slight delay to ensure dragging continues
          setTimeout(() => {
            setIsTilesModalVisible(false);
          }, 50);
        }
      },
      onPanResponderRelease: () => {
        // Keep dragging active even after the modal closes
        dragPosition.flattenOffset();
      },
    });
  };

  // Separate pan responder for dragging after modal closes
  const draggedTilePanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        dragPosition.setOffset({
          x: dragPosition.x._value,
          y: dragPosition.y._value,
        });
        dragPosition.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: dragPosition.x, dy: dragPosition.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        setIsDragging(false);
        dragPosition.flattenOffset();
        setDraggedTile(null);
      },
    })
  ).current;

  // Animation Function on Long press

  return (
    <>
      <View style={styles.HeaderContainer}>
        <TouchableOpacity
          disabled={isTilesModalVisible ? true : false}
          style={styles.plusIcon}
          onPress={() => setIsModalVisible(true)}
        >
          <Image
            source={require("../../assets/images/plusIcon.png")}
            style={styles.imagePlus}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.updateContainer}>
          <View style={styles.DataUploadContainer}>
            <Feather name="upload" size={25} color="white" />
          </View>
          <Text style={styles.text}>Data Upload</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profilePic}
          onPress={() => setIsProfileModalVisible(true)}
        >
          <Image
            source={require("../../assets/images/profilepic.png")}
            style={styles.imageProfile}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <>
        <TouchableOpacity style={styles.floatingContainer}>
          <View style={styles.floatingText}>
            <Text style={styles.floatText}>ANDORSE AI</Text>
          </View>
        </TouchableOpacity>
        <ScrollView style={styles.container}>
          {/* first flatList    */}

          <View>
            <DroppedMainTilesCard
              droppedTiles={droppedTiles}
              setDroppedTiles={setDroppedTiles}
            />
          </View>

          <View style={{ marginBottom: 90 }}></View>

          {/* <DashboardDesign/> */}
        </ScrollView>
      </>

      {/* First Model  */}

      {isModalVisible && (
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select an Option</Text>

            <View style={styles.buttonContainer}>
              {tilesNames.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    setIsModalVisible(false);

                    if (item === "Focused Tiles") {
                      setIsModelNames(true);
                    } else if (item === "Analytics Tiles") {
                      setIsAnalyticsTilesModel(true);
                    } else if (item === "Risk Tiles") {
                      setIsRiskTilesModel(true);
                    } else {
                      setIsTilesModalVisible(true);
                    }
                  }}
                  key={index}
                  style={styles.modalButton}
                >
                  <Text style={styles.buttonText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      <>
        {isTilesModalVisible && (
          <Animated.View style={[styles.modalContainer]}>
            <View style={styles.modalContent}>
              {availableTiles.map((tile, index) => (
                <Animated.View
                  key={tile.id}
                  style={[
                    styles.tileContainer,
                    { backgroundColor: tile.colorCode },
                    {
                      transform: panRefs[index].getTranslateTransform(),
                    },
                  ]}
                  {...createModalPanResponder(tile.id).panHandlers}
                >
                  <View style={styles.imageContainerText}>
                    <View>
                      <Text style={styles.headerText}>{tile.title}</Text>
                      <Text style={styles.headerText}>{tile.title2}</Text>
                      <Text style={styles.headerTextAmount}>{tile.Amount}</Text>
                    </View>
                  </View>
                  <View style={styles.imageContainer}>
                    <Image
                      source={tile.image}
                      style={styles.image}
                      resizeMode="contain"
                    />
                  </View>
                </Animated.View>
              ))}

              <TouchableOpacity
                onPress={() => setIsTilesModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </>

      {/* Update the dragged tile overlay */}
      {draggedTile && (
        <Animated.View
          style={[
            styles.draggedTile,
            {
              transform: dragPosition.getTranslateTransform(),
              position: "absolute",
              width: width * 0.8,
              left: 0,
              top: 0,
            },
          ]}
          {...draggedTilePanResponder.panHandlers}
        >
          <View
            style={[
              styles.tileContainer,
              { backgroundColor: draggedTile.colorCode },
            ]}
          >
            <View style={styles.imageContainerText}>
              <View>
                <Text style={styles.headerText}>{draggedTile.title}</Text>
                <Text style={styles.headerText}>{draggedTile.title2}</Text>
                <Text style={styles.headerTextAmount}>
                  {draggedTile.Amount}
                </Text>
              </View>
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={draggedTile.image}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          </View>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  HeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,

    alignItems: "center",
  },
  imagePlus: {
    width: 40,
    height: 40,
  },
  imageProfile: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  subContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    height: 40,
  },
  updateContainer: {
    width: "40%",
    height: 46,
    backgroundColor: "#f2f2f2",
    padding: 7,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 5,
  },
  DataUploadContainer: {
    width: 36,
    height: 36,
    backgroundColor: "black",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 13,
    color: "black",
    fontFamily: "Merriweather-Bold",
  },

  // modal styles

  modalContainer: {
    position: "absolute",
    top: 41,
    left: 45,
    width: width * 0.7,
    height: "45%",
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
    fontFamily: "Merriweather-Bold",
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
    color: "black",
    fontFamily: "Merriweather-Bold",
  },
  closeButton: {
    backgroundColor: "red",
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Merriweather-Bold",
  },

  floatingContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingVertical: 5,
  },
  floatingText: {
    width: "80%",
    height: 55,
    backgroundColor: "#baf4ed",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  floatText: {
    color: "black",
    fontSize: 17,
    fontFamily: "Merriweather-Bold",
  },

  // small tiles Design

  smallTilesContainer: {
    width: "100%",
  },
  borkerText: {
    color: "black",
    fontSize: 12,
    fontFamily: "Merriweather-Bold",
    marginBottom: 3,
  },

  image1: {
    width: 60,
    height: 45,
  },

  // small tiles end

  // focused Tile container

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

  modalContainer: {
    position: "absolute",
    top: 41,
    left: 45,
    width: width * 0.8,
    // height: "70%",
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 5,
    zIndex: 100,
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
    padding: 20,
    borderWidth: 1,
    borderColor: "grey",
    backgroundColor: "#eed5fa",
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
    marginTop: 7,
  },
  imageContainer: {
    width: "50%",
    height: 110,
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 20,
  },
  imageContainerText: {
    width: "50%",
    height: 110,
    alignItems: "center",
    justifyContent: "center",
  },
  draggedTile: {
    position: "absolute",
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});

export default MainScreen;
