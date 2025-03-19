import { Tabs } from "expo-router";
import { Ionicons , Feather  , MaterialIcons} from "@expo/vector-icons";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";

console.log("Tabs Layout Loaded!"); // Debugging ke liye

export default function TabLayout() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{flex:1}}>
      <Tabs screenOptions={{ 
      headerShown: false , 
      tabBarActiveTintColor: '#00a7a8', 
      tabBarInactiveTintColor: 'gray',

     }}>
      <Tabs.Screen 
        name="index"
        options={{ 
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="caidashboard"
        options={{ 
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="edit" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="community"
        options={{ 
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="groups" size={size} color={color} />
          ),
        }}
      />
       <Tabs.Screen 
        name="search"
        options={{ 
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
    <View>
    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.floatingContainer}>
        <View style={styles.floatingText}>
        <Ionicons
            name="search"
            size={24}
            color={modalVisible ? "#00a7a8" : "gray"}
          />
        </View>
      </TouchableOpacity>



      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor="gray"
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingContainer: {
    position: "absolute",
    bottom: 11, 
    right: 20,
    backgroundColor: 'white',
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  modalContainer: {
    flex: 1,
  
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", 
  },
  modalContent: {
    width: "80%",
    height:100,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "black",
  },
  closeButton: {
    marginLeft: 10,
    padding: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
 
});