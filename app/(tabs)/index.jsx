import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainScreen from '../(main)/mainScreen'

const index = () => {
  return (
    <View style={styles.container}>
      <MainScreen/>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "white",
  }
})