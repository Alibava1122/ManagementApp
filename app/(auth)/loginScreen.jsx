import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ToastAndroid,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { Formik } from "formik";
import { useRouter } from "expo-router";

import { loginValidationSchema } from "../../utils/validationSchemas";
import { Link } from "expo-router";
import CustomTextInput from "../../components/CustomTextInput";
import { LinearGradient } from "expo-linear-gradient";
import LoginButtons from "../../components/LoginButtons";
import { useAuth } from "../../context/AuthContext"; 

const LoginScreen = () => {
  const router = useRouter();
  const { login, error } = useAuth(); 

  const handleLogin = async (values) => {
    try {
      await login(values); 
      if (Platform.OS === "android") {
        ToastAndroid.showWithGravity(
          "Login Successful",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
      router.replace('/(tabs)');
    } catch (err) {
      if (Platform.OS === "android") {
        ToastAndroid.showWithGravity(
          error || "Login Failed",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
      } else {
        alert(error || "Login Failed");
      }
    }
  };

  return (
    <LinearGradient colors={["#e0f7fa", "#92dbd9"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <SafeAreaView style={styles.container}>
          <View style={styles.ImageContainer}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.image}
            />
            <Text style={styles.MainText}>Andorse</Text>
          </View>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginValidationSchema}
            onSubmit={handleLogin}
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
                  Label={"Email"}
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  keyboardType="email-address"
                  error={errors.email}
                  touched={touched.email}
                />

                <CustomTextInput
                  Label={"Password"}
                  placeholder="Password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  secureTextEntry
                  error={errors.password}
                  touched={touched.password}
                />

                <TouchableOpacity
                  style={styles.ButtonContainer}
                  onPress={handleSubmit}
                >
                  <LinearGradient
                    style={styles.button}
                    colors={["#00a8a9", "#92dbd9", "#FFFDD0", "#00a8a9"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.buttonText}>Login</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ alignItems: "flex-end", marginBottom: 10 }}
                >
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>

                {/* Social Buttons */}
                <LoginButtons
                  buttonName={"Continue with Google"}
                  image={require("../../assets/images/goggle.png")}
                />
                <LoginButtons
                  buttonName={"Continue with Facebook"}
                  image={require("../../assets/images/facebook.png")}
                />
                <LoginButtons
                  buttonName={"Continue with Microsoft"}
                  image={require("../../assets/images/micro.png")}
                />
                <LoginButtons
                  buttonName={"Continue with X"}
                  image={require("../../assets/images/x.png")}
                />
                <LoginButtons
                  buttonName={"Continue with Apple"}
                  image={require("../../assets/images/apple.png")}
                />
                <LoginButtons
                  buttonName={"Continue with LinkedIn"}
                  image={require("../../assets/images/linkdin.png")}
                />
                <LoginButtons
                  buttonName={"Continue with GitHub"}
                  image={require("../../assets/images/git.png")}
                />
                <LoginButtons
                  buttonName={"Continue with Discord"}
                  image={require("../../assets/images/discord.png")}
                />

                <TouchableOpacity style={styles.linkButton}>
                  <Text style={styles.linkText}>
                    <Link href={"/signupScreen"}>
                      {" "}
                      Don't have an account? Sign up
                    </Link>
                  </Text>
                </TouchableOpacity>

                <View style={styles.TermsContainer}>
                  <Text style={styles.PloicyText}>
                    By continuing agree to Terms of{" "}
                  </Text>
                  <Text style={styles.PloicyText}>
                    Service and Privacy Policy
                  </Text>
                </View>
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
    alignContent: "center",
    justifyContent: "center",
  },
  LogoConatiner: {
    // width:30,
    // height:30,
    backgroundColor: "white",
  },
  
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  form: {
    width: "100%",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    width: "70%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  googleButton: {
    backgroundColor: "#DB4437",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
 
  linkButton: {
    padding: 10,
  },
  linkText: {
    color: "black",
    textAlign: "center",
    fontFamily: "Merriweather-Light",
  },
  PloicyText: {
    fontSize:12,
    color: "black",
    textAlign: "center",
    fontFamily: "Merriweather-Light",
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
  ButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop:10
  },
  forgotText: {
    fontSize: 13,
    fontFamily: "Merriweather-Light",
  },
  buttonText: {
    fontSize: 15,
    textAlign: "center",
    fontFamily: "Merriweather-Bold",
  },
  TermsContainer:{
    alignItems:'center',
    justifyContent:'center'
  }
});

export default LoginScreen;
