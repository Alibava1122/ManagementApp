import { Tabs } from "expo-router";
import { Ionicons , Feather  , MaterialIcons} from "@expo/vector-icons";
import { Text, View } from "react-native";

console.log("Tabs Layout Loaded!"); // Debugging ke liye

export default function TabLayout() {
  return (
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
        name="chat"
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
  );
}