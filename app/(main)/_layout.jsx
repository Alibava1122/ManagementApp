import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
   <Stack >
    <Stack.Screen name='mainScreen'  options={{headerShown:false}}/>
    <Stack.Screen name='settingsScreen'  options={{title:"Settings",headerShown:true}}/>
    <Stack.Screen name='subscriptionScreen'  options={{title:"Payment & Subscription",headerShown:true}}/>
    <Stack.Screen name='modalScreen'  options={{headerShown:false}}/>
    <Stack.Screen name='cryptoScreen' options={{headerShown:false}}/>
    <Stack.Screen name='stocksScreen' options={{headerShown:false}}/>
    <Stack.Screen name='cashScreen' options={{headerShown:false}}/>
    <Stack.Screen name='realEstateScreen' options={{headerShown:false}}/>
    <Stack.Screen name='assetScreen' options={{headerShown:false}}/>
    <Stack.Screen name='cash-details' options={{ title:'Cash Deatils',headerShown:true}}/>
    <Stack.Screen name='crypto-details' options={{ title:'Crypto Deatils' , headerShown:true}}/>
    <Stack.Screen name='stocks-details' options={{title:'Stocks Deatils' ,headerShown:true}}/>
    <Stack.Screen name='realEstate-Detail' options={{title:'Real-Estate Deatils' ,headerShown:true}}/>
    <Stack.Screen name='postDetailsScreen' options={{title:'Deatils' ,headerShown:true}}/>
    
   

   </Stack>
  )
}

export default _layout

const styles = StyleSheet.create({})