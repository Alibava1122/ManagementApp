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
  
  const AnalyticsTilesModal = ({ isAnalyticsTilesModel, setIsAnalyticsTilesModel, onDropAnalyticsTile }) => {
    const slideAnim = useRef(new Animated.Value(-width * 0.6)).current;
    const panRefs = useRef({});
    
    const [availableTiles] = useState([
      { id: 1, title: "Analtics", colorCode:'#d1fbfd', image: require("../assets/images/analyticsGraph.webp") ,  image2: require("../assets/images/calender.png") },
      { id: 2, title: "Risk ", colorCode:'#fee0e1', image: require("../assets/images/analytics2ndgraph.png") , image2: require("../assets/images/analyticsG3.png") },
    ]);
  
    useEffect(() => {
      Animated.timing(slideAnim, {
        toValue: isAnalyticsTilesModel ? 0 : -width * 0.6,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, [isAnalyticsTilesModel]);
    useEffect(() => {
      if (isAnalyticsTilesModel) {
        Object.values(panRefs.current).forEach((pan) => {
          pan.setValue({ x: 0, y: 0 });
        });
      }
    }, [isAnalyticsTilesModel]);
  
    return (
      isAnalyticsTilesModel && (
        <Animated.View style={[styles.modalContainer, { transform: [{ translateX: slideAnim }] }]}>
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
                   
                    onDropAnalyticsTile({ ...tile, id: Date.now() }); 
                    setIsAnalyticsTilesModel(false); 
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
                    // {backgroundColor:tile.colorCode},
                    { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
                  ]}
                >
                   <View style={styles.imageContainer}>
                    <Image source={tile.image} style={styles.image} resizeMode="contain" />
                  </View>
                  <View style={styles.imageContainer}>
                    <Image source={tile.image2} style={styles.image} resizeMode="contain" />
                  </View>
                </Animated.View>
              );
            })}
  
           <View style={styles.ButtonContainer}>
           <TouchableOpacity onPress={() => setIsAnalyticsTilesModel(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
           </View>
          </View>
        </Animated.View>
      )
    );
  };
  
  export default AnalyticsTilesModal;
  
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
        padding:20
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
     ButtonContainer:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    closeButtonText: {
      color: "white",
      fontSize: 16,
      fontFamily: "Merriweather-Bold",
    },
    tileContainer: {
      height: 120,
      width: '100%',
      borderRadius: 15,
      marginBottom: 10,
      alignItems: "center",
      padding:5,
      borderWidth:1,
      backgroundColor:'white',

      borderColor:'grey',
         flexDirection:'row',
      justifyContent:'space-around',
      elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    },

  
    headerText:{
      fontSize:14,
      fontFamily: "Merriweather-Bold",
      color:'black'
  
    },
    imageContainer:{
      // width:50,
      // height:50,
      // borderRadius:15,
      // alignItems:'center',
      // justifyContent:'center',
      // marginTop:4
   
      
    },
    image: {
      width: 130,
      height: 130,
      
    },
   
  });
  