import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { AntDesign } from "@expo/vector-icons";

import HomeScreen from "../screens/homestack/HomeScreen";
import CardsScreen from "../screens/homestack/CardsScreen";
import MyPointsScreen from "../screens/homestack/MyPointsScreen";
import SettingsScreen from "../screens/homestack/SettingsScreen";

const _defaultNavigationOptions = {
  headerLayoutPreset: "center",
  headerTitleStyle: {
    textAlign: "center",
    flex: 1,
    fontWeight: "400"
  },
  headerStyle: {
    backgroundColor: "#353941",
    elevation: 0
  },
  headerTintColor: "#fff"
};

const HomeStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          const iconName = `home`;
          return <AntDesign name={iconName} size={25} color={tintColor} />;
        }
      }
    },
    MyPoints: {
      screen: createStackNavigator(
        {
          _mypoints: MyPointsScreen
        },
        {
          defaultNavigationOptions: _defaultNavigationOptions
        }
      ),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          const iconName = `book`;
          return <AntDesign name={iconName} size={25} color={tintColor} />;
        },
        tabBarLabel: "My Points"
      }
    },
    Cards: {
      screen: createStackNavigator(
        {
          _cards: CardsScreen
        },
        {
          defaultNavigationOptions: _defaultNavigationOptions
        }
      ),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          const iconName = `idcard`;
          return <AntDesign name={iconName} size={25} color={tintColor} />;
        }
      }
    },
    Settings: {
      screen: createStackNavigator(
        {
          _settings: SettingsScreen
        },
        {
          defaultNavigationOptions: _defaultNavigationOptions
        }
      ),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          const iconName = `setting`;
          return <AntDesign name={iconName} size={25} color={tintColor} />;
        }
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#000",
      inactiveTintColor: "#999",
      showIcon: true
    }
  }
);

export default HomeStack;
