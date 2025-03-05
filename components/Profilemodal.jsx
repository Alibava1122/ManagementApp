import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const ProfileModal = ({ isProfileModalVisible, setIsProfileModalVisible }) => {
  const slideAnim = new Animated.Value(-width * 0.7);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isProfileModalVisible ? 0 : -width * 0.7,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isProfileModalVisible]);

  return (
    <>
    {isProfileModalVisible && (
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.overlayTouchable}
          activeOpacity={1}
          onPress={() => setIsProfileModalVisible(false)}
        />
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          <TouchableOpacity
            onPress={() => setIsProfileModalVisible(false)}
            style={styles.closeIcon}
          >
            <AntDesign name="left" size={16} color="black" />
          </TouchableOpacity>
          <View style={styles.profileSection}>
            <Image
              source={require("../assets/images/profilepic.png")}
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>John Doe</Text>
          </View>

          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.listContainers}
              onPress={() => {
                router.navigate("(main)/settingsScreen");
                setIsProfileModalVisible(false);
              }}
            >
              <View style={styles.iconConatiner}>
                <Feather name="settings" size={22} color="black" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.buttonText}>Account</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.listContainers}
              onPress={() => {
                router.navigate("(main)/subscriptionScreen");
                setIsProfileModalVisible(false);
              }}
            >
              <View style={styles.iconConatiner}>
                <MaterialIcons name="payment" size={22} color="black" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.buttonText}>Payments & Subscriptions</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    )}
  </>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    justifyContent: "flex-start",
    zIndex: 20,
  },
  overlayTouchable: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width * 0.7,
    height: "100%",
    backgroundColor: "#fff",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    paddingTop: 30,
    borderWidth:0.2,
    
  },
  profileSection: {
    marginBottom: 20,
    paddingHorizontal: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  modalContent: {
    paddingHorizontal: 20,
  },
  listContainers: {
    borderRadius: 15,
    padding: 12,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    marginBottom: 15,
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  closeIcon: {
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
  textContainer: {
    paddingHorizontal: 15,
  },
});
