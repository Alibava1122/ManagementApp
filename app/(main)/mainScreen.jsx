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
import DraggableFlatList from "react-native-draggable-flatlist";

const { width } = Dimensions.get("window");

import { NativeModules } from 'react-native';

const { SharedStorage } = NativeModules;

const saveWidgetData = async () => {
  SharedStorage.saveData('widget_text', 'Updated from React Native');
};

const getWidgetData = () => {
  SharedStorage.getData('widget_text', (value) => {
    console.log('Widget Data:', value);
  });
};

export { saveWidgetData, getWidgetData };

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
    // {
    //   id: 1,
    //   title: "Analtics",
    //   colorCode: "#d1fbfd",
    //   image: require("../../assets/images/analyticsGraph.webp"),
    //   image2: require("../../assets/images/calender.png"),
    //   scaleAnim: new Animated.Value(1),
    //   shakeAnim: new Animated.Value(0),
    //   showDelete: false,
    //   isStatic: true,
    // },
  ]);

  const [droppedRiskTiles, setDroppedRiskTiles] = useState([
    // {
    //   id: 2,
    //   title: "Risk ",
    //   colorCode: "#d1fbfd",
    //   image: require("../../assets/images/risk.png"),
    //   scaleAnim: new Animated.Value(1),
    //   shakeAnim: new Animated.Value(0),
    //   showDelete: false,
    //   isStatic: true,
    // },
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
      expandAnim: new Animated.Value(0), 
      isExpanded: false,  
      showDelete: false,
      
    },
  ]);

  const [DroppedFocusedSecond, setDroppedFocusedSecond] = useState([
    // {
    //   id: 1,
    //   title: "One Asset",
    //   title2: "Management",
    //   colorCode: "#cfe2fe",
    //   image: require("../../assets/images/cryptograph.png"),
    //   scaleAnim: new Animated.Value(1),
    //   shakeAnim: new Animated.Value(0),
    //   showDelete: false,
    //   isStatic: true,
    // },
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

  useEffect(()=>{
    const defaultTile = {   
      id: 1,
      title: "Custom",
      title2: "Portfolio",
      colorCode: "#fcfbca",
      Amount: "£2000",
      image: require("../../assets/images/circleG.png"),
      scaleAnim: new Animated.Value(1),
      shakeAnim: new Animated.Value(0),
      expandAnim: new Animated.Value(0),
      isExpanded: false,
      showDelete: false,
    };

    setDroppedTiles([defaultTile]);

    const defaultTile1 = {  
      id: 1,
      title: "Risk ",
      colorCode: "#d1fbfd",
      image: require("../../assets/images/loss3.png"),
      scaleAnim: new Animated.Value(1),
      shakeAnim: new Animated.Value(0),
      expandAnim: new Animated.Value(0),
      isExpanded: false,
      showDelete: false,
    };
  
    setDroppedRiskTiles([defaultTile1]);

      
    const defaultTile3 = {
      id: 1,
      title: "One Asset",
      title2: "Management",
      colorCode: "#cfe2fe",
      image: require("../../assets/images/cryptograph.png"),
      scaleAnim: new Animated.Value(1),
      shakeAnim: new Animated.Value(0),
      expandAnim: new Animated.Value(0),
      isExpanded: false,
      showDelete: false,
    };
  
    setDroppedFocusedSecond([defaultTile3]);

    const defaultTile4 = {
      id: 1,  
      title: "Analtics",
      colorCode: "#d1fbfd",
      image: require("../../assets/images/analyticsGraph.webp"),
      image2: require("../../assets/images/calender.png"),
      scaleAnim: new Animated.Value(1),
      shakeAnim: new Animated.Value(0),
      expandAnim: new Animated.Value(0),
      isExpanded: false,
      showDelete: false,
    };
  
    setAnalyticsDroppedTiles([defaultTile4]);

  },[])

  const componentsData = [
    {
      id: '1',
      title:'Profile Tiles',
      component: DroppedMainTilesCard,
      props: { droppedTiles, setDroppedTiles }
    },
    {
      id: '2',
      title:'Focused Tiles',
      component: DropedFocusedCard,
      props: { DroppedFocusedSecond, setDroppedFocusedSecond }
    },
    {
      id: '3',
      title:'Analytic Tiles',
      component: DroppedAnalyticsCard,
      props: { droppedAnalyticsTiles, setAnalyticsDroppedTiles }
    },
    {
      id: '4',
      title:'Risk Tiles',
      component: DroppedRiskCard,
      props: { droppedRiskTiles, setDroppedRiskTiles }
    }
  ];
useEffect(()=>{
  setDraggedState(componentsData)
},[droppedTiles , DroppedFocusedSecond , droppedAnalyticsTiles , droppedRiskTiles])
  const [draggedState , setDraggedState] = useState(componentsData);

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
     
        <View style={{height:'90%' , backgroundColor:'#f5f5f5'}}> 
        <DraggableFlatList
      data={draggedState}
      keyExtractor={item => item.id}
      onDragEnd={({ data }) => setDraggedState(data)}
      renderItem={({ item , drag }) => {
        const Component = item.component;
        const hasData = item.props && Array.isArray(Object.values(item.props)[0]) && Object.values(item.props)[0].length > 0;
        return (
         <>
            {hasData && (
          <TouchableOpacity onLongPress={drag} style={{ width: '100%'}}>
            <Text style={styles.tilesHeading}>{item.title}</Text>
          </TouchableOpacity>
        )}
          <View style={{paddingHorizontal:20}}>
            <Component {...item.props} />
            </View>
            </>
        );
      }}
    />
 
        </View>
          {/* <DashboardDesign/> */}
         
        
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
    // padding: 20,
    paddingVertical:20
  },
  HeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical:5,

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
  tilesHeading:{
    fontSize:18,
    fontWeight:600,
    marginLeft:40,
    color:'black',
    marginBottom:5,
  }
});

export default MainScreen;





