import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StartScreen from './startScreen'


const index = () => {
  return (
    <View style={styles.container}>
     <StartScreen/>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignContent: "center",
        justifyContent: "center",
      },
})