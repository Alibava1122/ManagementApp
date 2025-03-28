import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Redirect, Stack } from "expo-router";
import { AssetProvider } from "../context/AssetContext"; 
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const RootLayout = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
  
    <AssetProvider>
      <>
        <Stack screenOptions={{ headerShown: false }} />
        {isLogin ? <Redirect href={"/(tabs)"} /> : <Redirect href={"./(auth)"} />}
      </>
    </AssetProvider>
  
  );
};

export default RootLayout;

const styles = StyleSheet.create({});