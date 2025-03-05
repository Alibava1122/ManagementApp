import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <Stack initialRouteName='startScreen' screenOptions={{headerShown:false}}>
        <Stack.Screen name='index' />
        <Stack.Screen name='startScreen' />
        <Stack.Screen name='loginScreen' />
        <Stack.Screen name='signupScreen'/>
    </Stack>
  )
}

export default AuthLayout

const styles = StyleSheet.create({})