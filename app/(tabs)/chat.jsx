import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Chat = () => {
  return (
    <View style={styles.container}>
      <Text> UpComing chat</Text>
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    alignItems:'center',
    justifyContent:'center'
  },
})