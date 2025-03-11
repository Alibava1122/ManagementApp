import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const HistoryModal = ({ isHistoryModalVisible, setIsHistoryModalVisible }) => {
  const slideAnim = new Animated.Value(-width * 0.7);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isHistoryModalVisible ? 0 : -width * 0.7,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isHistoryModalVisible]);

  const ChatMessage = [
    {
      id: 1,
      chat: "Hello! How are you doing today?",
    },
    {
      id: 2,
      chat: "Just finished a workout.",
    },
    {
      id: 3,
      chat: "Did you see the latest episode.",
    },
    {
      id: 4,
      chat: "I need a coffee ASAP.",
    },
    {
      id: 5,
      chat: "What are your weekend plans?",
    },
    {
      id: 6,
      chat: "Working on a new project.",
    },
    {
      id: 7,
      chat: "Just read an amazing book.",
    },
    {
      id: 8,
      chat: "Let's meet up later for dinner.",
    },
    {
      id: 9,
      chat: "Coding late into the night again!",
    },
    {
      id: 10,
      chat: "Life is an adventure!",
    },
    {
      id: 11,
      chat: "Just read an amazing book.",
    },
    {
      id: 12,
      chat: "Let's meet up later for dinner.",
    },
    {
      id: 13,
      chat: "Coding late into the night again!",
    },
    {
      id: 14,
      chat: "Life is an adventur.",
    },
    {
      id: 15,
      chat: "Let's meet up later for dinner.",
    },
    {
      id: 16,
      chat: "Coding late into the.",
    },
    {
      id: 17,
      chat: "Life is an adventure.",
    },
  ];

  return (
    <>
      {isHistoryModalVisible && (
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.overlayTouchable}
            activeOpacity={1}
            onPress={() => setIsHistoryModalVisible(false)}
          />
          <Animated.View
            style={[
              styles.modalContainer,
              { transform: [{ translateX: slideAnim }] },
            ]}
          >
            <TouchableOpacity
              onPress={() => setIsHistoryModalVisible(false)}
              style={styles.closeIcon}
            >
              <AntDesign name="left" size={16} color="black" />
            </TouchableOpacity>

            <View style={styles.headerTextContainer}>
              <Text style={styles.text}>Chats</Text>
            </View>

            
              <ScrollView style={styles.listContainer}>
                {ChatMessage.map((chat, index) => (
                  <View key={chat.id} style={styles.historyTextContainer}>
                    <Text style={styles.historytext}>{chat.chat}</Text>
                  </View>
                ))}
              </ScrollView>
           
          </Animated.View>
        </View>
      )}
    </>
  );
};

export default HistoryModal;

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
    width: width * 0.8,
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
    borderWidth: 0.2,
  },

  closeIcon: {
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
  headerTextContainer: {
    height: 30,
    borderBottomWidth: 0.6,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 14,
    color: "grey",
    fontFamily: "Merriweather-Bold",
  },
  listContainer: {
    height: "100%",
    width: "100%",
    paddingHorizontal: 10,
  },
  historyTextContainer: {
    width: "100%",
    height: "50",
    paddingHorizontal: 10,
    marginTop: 10,
    justifyContent: "center",
    borderRadius:12,
    backgroundColor:'#F5F5F5',
    marginBottom:3
  },
  historytext: {
    fontSize: 15,
    color: "#404040",
    fontWeight:500,
    
  },
});
