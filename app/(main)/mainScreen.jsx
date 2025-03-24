import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Dimensions,
  Vibration,
  FlatList,
  Touchable,
} from "react-native";
import TilesModal from "../../components/TilesModal";
import ProfileModal from "../../components/Profilemodal";
import { AntDesign, Feather } from "@expo/vector-icons";

import AnalyticsTilesModal from "../../components/AnalyticsTilesModal";
import FocusedFirstModel from "../../components/FocusedFirstModel";
import RiskTilesModal from "../../components/RiskTilesModal";
import { router } from "expo-router";
import DropedFocusedCard from "../../components/DropedFocusedCard";
import DroppedAnalyticsCard from "../../components/DroppedAnalyticsCard";
import DroppedRiskCard from "../../components/DroppedRiskCard";
import DroppedMainTilesCard from "../../components/DroppedMainTilesCard";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

const MainScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNamesModel, setIsModelNames] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isTilesModalVisible, setIsTilesModalVisible] = useState(false);
  const [isAnalyticsTilesModel, setIsAnalyticsTilesModel] = useState(false);
  const [isRiskTilesModel, setIsRiskTilesModel] = useState(false);

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

  const [droppedAnalyticsTiles, setAnalyticsDroppedTiles] = useState([
    {
      id: 1,
      title: "Analtics",
      colorCode: "#d1fbfd",
      image: require("../../assets/images/analyticsGraph.webp"),
      image2: require("../../assets/images/calender.png"),
      scaleAnim: new Animated.Value(1),
      shakeAnim: new Animated.Value(0),
      showDelete: false,
      isStatic: true,
    },
  ]);

  const [droppedRiskTiles, setDroppedRiskTiles] = useState([
    {
      id: 2,
      title: "Risk ",
      colorCode: "#d1fbfd",
      image: require("../../assets/images/risk.png"),
      scaleAnim: new Animated.Value(1),
      shakeAnim: new Animated.Value(0),
      showDelete: false,
      isStatic: true,
    },
  ]);
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

  const [DroppedFocusedSecond, setDroppedFocusedSecond] = useState([
    {
      id: 1,
      title: "One Asset",
      title2: "Management",
      colorCode: "#cfe2fe",
      image: require("../../assets/images/cryptograph.png"),
      scaleAnim: new Animated.Value(1),
      shakeAnim: new Animated.Value(0),
      showDelete: false,
      isStatic: true,
    },
  ]);

  const handleDropTile = (tile) => {
    setDroppedTiles((prevTiles) => [
      ...prevTiles,
      {
        ...tile,
        scaleAnim: new Animated.Value(1),
        shakeAnim: new Animated.Value(0),
        showDelete: false,
      },
    ]);
  };

  const handleDropAnalyticsTile = (tile) => {
    setAnalyticsDroppedTiles((prevTiles) => {
      if (prevTiles.length >= 5) return prevTiles;
      return [
        ...prevTiles,
        {
          ...tile,
          scaleAnim: new Animated.Value(1),
          shakeAnim: new Animated.Value(0),
          showDelete: false,
        },
      ];
    });
  };
  const handleDropRiskTile = (tile) => {
    setDroppedRiskTiles((prevTiles) => {
      if (prevTiles.length >= 5) return prevTiles;
      return [
        ...prevTiles,
        {
          ...tile,
          scaleAnim: new Animated.Value(1),
          shakeAnim: new Animated.Value(0),
          showDelete: false,
        },
      ];
    });
  };

  const handleDropFocusedSecondTile = (tile) => {
    setDroppedFocusedSecond((prevTiles) => {
      if (prevTiles.length >= 1) return prevTiles;
      return [
        ...prevTiles,
        {
          ...tile,
          scaleAnim: new Animated.Value(1),
          shakeAnim: new Animated.Value(0),
          showDelete: false,
        },
      ];
    });
  };

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
            style={styles.image}
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
      <View  style={styles.floatingContainer}>
        <TouchableOpacity onPress={()=>router.navigate("/chat")} style={styles.floatingContainer}>
          <View style={styles.floatingText}>
            <Text style={styles.floatText}>ANDORSE AI</Text>
          </View>
        </TouchableOpacity>
        </View>
        <GestureHandlerRootView>
        <ScrollView style={styles.container}>
          
          {/* first flatList    */}

         <View >
         <DroppedMainTilesCard
            droppedTiles={droppedTiles}
            setDroppedTiles={setDroppedTiles}
          />
         </View>

         <View >
         {DroppedFocusedSecond.length == 0 ? null : (
            <>
              <DropedFocusedCard
                DroppedFocusedSecond={DroppedFocusedSecond}
                setDroppedFocusedSecond={setDroppedFocusedSecond}

              />
            </>
          )}
         </View>

         <View >
         <DroppedAnalyticsCard
            droppedAnalyticsTiles={droppedAnalyticsTiles}
            setAnalyticsDroppedTiles={setAnalyticsDroppedTiles}
          />
         </View>

         <View >
         <DroppedRiskCard
            droppedRiskTiles={droppedRiskTiles}
            setDroppedRiskTiles={setDroppedRiskTiles}
          />
         </View>

          <View style={{ marginBottom: 90 }}></View>

          {/* <DashboardDesign/> */}
         
        </ScrollView>
        </GestureHandlerRootView>
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

      <TilesModal
        isTilesModalVisible={isTilesModalVisible}
        setIsTilesModalVisible={setIsTilesModalVisible}
        onDropTile={handleDropTile}
      />
      <ProfileModal
        isProfileModalVisible={isProfileModalVisible}
        setIsProfileModalVisible={setIsProfileModalVisible}
      />
      <FocusedFirstModel
        isNamesModel={isNamesModel}
        setIsModelNames={setIsModelNames}
        DropingFocusedSecondModelTile={handleDropFocusedSecondTile}
      />

      <AnalyticsTilesModal
        isAnalyticsTilesModel={isAnalyticsTilesModel}
        setIsAnalyticsTilesModel={setIsAnalyticsTilesModel}
        onDropAnalyticsTile={handleDropAnalyticsTile}
      />

      <RiskTilesModal
        isRiskTilesModel={isRiskTilesModel}
        setIsRiskTilesModel={setIsRiskTilesModel}
        onDropRiskTile={handleDropRiskTile}
      />
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
  image: {
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
});

export default MainScreen;





