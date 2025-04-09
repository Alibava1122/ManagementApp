import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Redirect, Stack } from "expo-router";
import { AssetProvider } from "../context/AssetContext"; 
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from "../context/AuthContext";

const RootLayout = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
  
    <AuthProvider>
      <>
        <Stack screenOptions={{ headerShown: false }} />
        {isLogin ? <Redirect href={"/(tabs)"} /> : <Redirect href={"./(auth)"} />}
      </>
    </AuthProvider>
  
  );
};

export default RootLayout;

const styles = StyleSheet.create({});