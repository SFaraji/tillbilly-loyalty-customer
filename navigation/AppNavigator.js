import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";

import { Animated, Easing, View } from "react-native";

import AuthStack from "../navigation/AuthNavigator";

import HomeStack from "../navigation/HomeStackNavigator";

import AuthLoadingScreen from "../screens/auth-screens/AuthLoadingScreen";
import ConfirmationModal from "../screens/modals/ConfirmationModal";

import RewardDetailScreen from "../screens/RewardDetailScreen";
import RewardClaimScreen from "../screens/RewardClaimScreen";
import QRScreen from "../screens/QRScreen";

import EditCardScreen from "../screens/cardStack/EditCardScreen";
import ViewCardScreen from "../screens/cardStack/ViewCardScreen";
import ScanCardScreen from "../screens/cardStack/ScanCardScreen";

import TransactionsScreen from "../screens/TransactionsScreen";
import TransactionScreen from "../screens/TransactionScreen";

import AccountScreen from "../screens/account/AccountScreen";
import PasswordScreen from "../screens/account/PasswordScreen";

import ProfileScreen from "../screens/profile/ProfileScreen";

import AboutScreen from "../screens/about/AboutScreen";

const ScreensStack = createStackNavigator(
  {
    HomeStack: {
      screen: HomeStack,
      navigationOptions: {
        header: null
      }
    },

    // Reward Screen(s)
    RewardDetails: RewardDetailScreen,

    // Reward Claim(s)
    RewardClaim: RewardClaimScreen,

    // QR Screen(s)
    QRCode: {
      screen: QRScreen,
      navigationOptions: {
        header: null
      }
    },

    // Transactions Screen(s)
    Transactions: TransactionsScreen,
    Transaction: TransactionScreen,

    // Cards Screen(s)
    AddCard: ScanCardScreen,
    EditCard: EditCardScreen,
    ViewCard: ViewCardScreen,

    // Account Screen(s)
    Account: AccountScreen,
    Password: PasswordScreen,

    // Profile Screen(s)
    Profile: ProfileScreen,

    // About Screen
    About: AboutScreen

    //
    // QRCode: QRStack
  },
  {
    // headerMode: "none",
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

const ModalStack = createStackNavigator(
  {
    Content: ScreensStack,
    // Content: HomeStack,
    // Transactions: TransactionsStack,
    // QRCode: QRStack,
    ConfirmationModal: {
      screen: ConfirmationModal
    }
  },
  {
    initialRouteName: "Content",
    headerMode: "none",
    mode: "modal",
    transparentCard: true,
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const thisSceneIndex = scene.index;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
          outputRange: [height, 0, 0]
        });
        return { transform: [{ translateY }] };
      }
    })
  }
);

const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      App: ModalStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);

export default AppNavigator;
