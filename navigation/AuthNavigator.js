import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "react-navigation";

import LoginScreen from "../screens/auth-screens/LoginScreen";
import SignupScreen from "../screens/auth-screens/SignupScreen";
import SocialLogin from "../screens/auth-screens/SocialLogin";
import OAuthScreen from "../screens/auth-screens/OAuthScreen";

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: SocialLogin,
      navigationOptions: {
        header: null
      }
    },
    EmailLogin: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      }
    },
    Signup: {
      screen: SignupScreen,
      navigationOptions: {
        header: null
      }
    },
    OAuth: OAuthScreen
  },
  {
    initialRouteName: "Login",
    // headerMode: "none"
    defaultNavigationOptions: {
      headerLayoutPreset: "center",
      headerTitleStyle: {
        textAlign: "center",
        flex: 1,
        fontWeight: "400"
      },
      headerTintColor: "#000",
      headerRight: <View></View>
    }
  }
);

export default AuthStack;
