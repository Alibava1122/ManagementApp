import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
   <Stack >
    <Stack.Screen name='mainScreen'  options={{headerShown:false}}/>
    <Stack.Screen name='settingsScreen'  options={{title:"Settings",headerShown:true}}/>
    <Stack.Screen name='subscriptionScreen'  options={{title:"Payment & Subscription",headerShown:true}}/>
    {/* <Stack.Screen name='modalScreen'  options={{headerShown:false}}/> */}
    <Stack.Screen name='cryptoScreen' options={{ title:'Crypto Portfolio' , headerShown:true}}/>
    <Stack.Screen name='stocksScreen' options={{ title:'Stocks Portfolio' ,headerShown:true}}/>
    <Stack.Screen name='cashScreen' options={{title:'Cash Portfolio' , headerShown:true}}/>
    <Stack.Screen name='realEstateScreen' options={{ title:'Real-Estate Portfolio' , headerShown:false}}/>
    <Stack.Screen name='assetScreen' options={{headerShown:true}}/>
    <Stack.Screen name='cash-details' options={{ title:'Cash Deatils',headerShown:true}}/>
    <Stack.Screen name='crypto-details' options={{ title:'Crypto Deatils' , headerShown:true}}/>
    <Stack.Screen name='stocks-details' options={{title:'Stocks Deatils' ,headerShown:true}}/>
    <Stack.Screen name='realEstate-Detail' options={{title:'Real-Estate Deatils' ,headerShown:true}}/>
    <Stack.Screen name='postDetailsScreen' options={{title:'Deatils' ,headerShown:true}}/>
    <Stack.Screen name='communityPostsScreen' options={{title:'Posts' ,headerShown:false}}/>
    <Stack.Screen name='chat' options={{title:'Posts' ,headerShown:false}}/>
    
   

   </Stack>
  )
}

export default _layout

const styles = StyleSheet.create({})