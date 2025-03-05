import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

const AndorseScreen = () => {
    const [fontsLoaded] = useFonts({
        'Merriweather-Bold': require('../../assets/fonts/Merriweather-Bold.ttf'),
        'Merriweather-Regular': require('../../assets/fonts/Merriweather-Regular.ttf'),
        'Merriweather-Light': require('../../assets/fonts/Merriweather-Light.ttf'),
     
      });
    
      if (!fontsLoaded) {
        return null; 
      }
    
      SplashScreen.hideAsync();
  return (
    <LinearGradient colors={['#e0f7fa', '#92dbd9']} style={styles.container}>
      <View 
      style={styles.ImageContainer}>
        <Image source={require('../../assets/images/logo.png')} style={styles.image} />
        </View>
      <Text style={styles.text}>Andorse</Text>
      <Text style={styles.Subtext}>Ai Asset Navigation</Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={()=>{router.navigate('/loginScreen')}}>
        <LinearGradient
          
          colors={['#00a8a9', '#92dbd9', '#FFFDD0' , "#00a8a9"]}
          style={styles.button}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.buttonText}>Start Now</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageContainer:{
    padding:5,
  
  },
  image: {
    width: 240,
    height: 240,
    marginBottom: 20,
  },
  text: {
    fontSize: 45,
    marginBottom: 10,
    fontFamily: 'Merriweather-Bold',
  },
  Subtext:{
    fontSize: 32,
    fontFamily: 'Merriweather-Regular',

    marginBottom: 20,

  },
  buttonContainer: {
    width: '80%',
  },
  button: {
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Merriweather-Bold',
   
  },
});

export default AndorseScreen;