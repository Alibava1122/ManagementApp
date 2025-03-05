import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const LoginButtons = ({buttonName , image}) => {
  return (
    <TouchableOpacity style={{alignItems:'center' , justifyContent:'center'}}>
                <View style={styles.loginContainers}>
                <Image source={image} style={styles.goggleimage} />

                  <Text style={styles.buttonText}>{buttonName}</Text>
                </View>
              </TouchableOpacity>
  )
}

export default LoginButtons

const styles = StyleSheet.create({
    loginContainers: {
        width: "88%",
        height: 40,
        backgroundColor: "white",
        borderRadius: 50,
        justifyContent:'center',
    
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 40,
        marginBottom:10
      },
      goggleimage: {
        width: 25,
        height: 25,

      },
      buttonText: {
        marginLeft:10,
        fontSize: 15,
        textAlign: "center",
        fontFamily: "Merriweather-Bold",
      },
})