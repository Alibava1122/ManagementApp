import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  ToastAndroid,
  Image,
  ScrollView,
} from 'react-native';
import { Formik } from 'formik';
import { signupValidationSchema } from '../../utils/validationSchemas';
import { Link, useRouter } from 'expo-router';
import CustomTextInput from '../../components/CustomTextInput';
import { LinearGradient } from 'expo-linear-gradient';
import LoginButtons from '../../components/LoginButtons';
import { useAuth } from '../../context/AuthContext'; 

const SignupScreen = () => {
  const router = useRouter();
  const { register, loading } = useAuth();

  const handleSignup = async (values) => {
    try {
      const { username, email, password } = values;

      // Send user data to the register API
      await register({ name:username, email, password });

      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(
          'Signup Successful',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }

      router.navigate('/(tabs)');
    } catch (error) {
      console.error('Signup error:', error);
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(
          error?.response?.data?.message || 'Signup failed',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
    }
  };

  return (
    <LinearGradient colors={['#e0f7fa', '#92dbd9']} style={{ flex: 1 }}>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View style={styles.ImageContainer}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.image}
            />
            <Text style={styles.MainText}>Andorse</Text>
          </View>
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={signupValidationSchema}
            onSubmit={handleSignup}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.form}>
                <CustomTextInput
                  Label={'Username'}
                  placeholder="Username"
                  value={values.username}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  error={errors.username}
                  touched={touched.username}
                />

                <CustomTextInput
                  Label={'Email'}
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  keyboardType="email-address"
                  error={errors.email}
                  touched={touched.email}
                />

                <CustomTextInput
                  Label={'Password'}
                  placeholder="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry
                  error={errors.password}
                  touched={touched.password}
                />

                <CustomTextInput
                  Label={'Confirm Password'}
                  placeholder="Confirm Password"
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  secureTextEntry
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
                />

                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  onPress={handleSubmit}
                  disabled={loading}
                >
                  <LinearGradient
                    style={styles.button}
                    colors={['#00a8a9', '#92dbd9', '#FFFDD0', '#00a8a9']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.buttonText}>
                      {/* {loading ? 'Signing Up...' : 'Sign Up'} */}
                      Sign Up
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                {/* Social Logins */}
                <LoginButtons
                  buttonName={'Continue with goggle'}
                  image={require('../../assets/images/goggle.png')}
                />
                <LoginButtons
                  buttonName={'Continue with facebook'}
                  image={require('../../assets/images/facebook.png')}
                />
                <LoginButtons
                  buttonName={'Continue with Microsoft'}
                  image={require('../../assets/images/micro.png')}
                />
                <LoginButtons
                  buttonName={'Continue with X'}
                  image={require('../../assets/images/x.png')}
                />
                <LoginButtons
                  buttonName={'Continue with Apple'}
                  image={require('../../assets/images/apple.png')}
                />
                <LoginButtons
                  buttonName={'Continue with Linkdin'}
                  image={require('../../assets/images/linkdin.png')}
                />
                <LoginButtons
                  buttonName={'Continue with Github'}
                  image={require('../../assets/images/git.png')}
                />
                <LoginButtons
                  buttonName={'Continue with Discord'}
                  image={require('../../assets/images/discord.png')}
                />

                <TouchableOpacity style={styles.linkButton}>
                  <Link href={'/loginScreen'}>
                    <Text style={styles.linkText}>
                      Already have an account? Login
                    </Text>
                  </Link>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  
    alignContent:'center',
    justifyContent:'center'
  
  },
  ImageContainer: {
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  MainText: {
    fontSize: 35,
    marginBottom: 10,
    fontFamily: "Merriweather-Bold",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  form: {
    width: '100%',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    width: "70%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  googleButton: {
    backgroundColor: '#DB4437',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 15,
    textAlign: "center",
    fontFamily: "Merriweather-Bold",
  },
  linkButton: {
    padding: 10,
  },
  linkText: {
    color: 'black',
    textAlign: 'center',
    fontFamily: "Merriweather-Light",
  },
});

export default SignupScreen; 