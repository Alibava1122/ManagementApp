import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect, Stack } from "expo-router";
import { AssetProvider } from "../context/AssetContext"; 
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider, useAuth } from "../context/AuthContext"; // Import useAuth hook
import { ChatProvider } from "../context/ChatContext";
import { PostsProvider } from "../context/PostsContext";

const RootLayoutContent = () => {
  const { user } = useAuth();  // Get the user from AuthContext
  const [islogin , setLogin ] = useState(false)



  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      {user ? (
        // If user is logged in, redirect to tabs
        <Redirect href={"/(tabs)"} />
      ) : (
        // If user is not logged in, redirect to authentication screens
        <Redirect href={"/(auth)"} />
      )}
    </>
  );
};

const RootLayout = () => {
  return (
    <AuthProvider>
      <AssetProvider>
        <ChatProvider>
          <PostsProvider>
          <RootLayoutContent />
          </PostsProvider>
        </ChatProvider>
      </AssetProvider>
    </AuthProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
