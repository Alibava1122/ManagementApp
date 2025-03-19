import React from 'react';
import { View, Text, TouchableOpacity, Image, Animated, Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';

const { width } = Dimensions.get("window");

const DraggableTilesModal = ({
  isTilesModalVisible,
  setIsTilesModalVisible,
  availableTiles,
  panRefs,
  createModalPanResponder,
  draggedTile,
  dragPosition,
  draggedTilePanResponder
}) => {
  return (
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
                <Text style={styles.headerTextAmount}>{draggedTile.Amount}</Text>
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
  modalContainer: {
    position: "absolute",
    top: 41,
    left: 45,
    width: width * 0.8,
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
});

export default DraggableTilesModal; 