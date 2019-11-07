import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  AsyncStorage,
  StatusBar
} from "react-native";

import ListButton from "../../components/ListButton";
import API_DeleteAccount from "../../components/Endpoints";

import SessionService from "../../services/SessionService";

export default class AccountScreen extends React.Component {
  static navigationOptions = {
    title: "Account"
  };

  state = {};

  componentDidMount = async () => {};

  handleLogoutPress = () => {
    this.props.navigation.navigate("ConfirmationModal", {
      message: "Are you sure you want to logout?",
      onConfirm: this.handleLogoutConfirm
    });
  };

  handleLogoutConfirm = async () => {
    await SessionService.destroy();
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  handlePasswordPress = () => {
    this.props.navigation.navigate("Password");
  };

  handleDeletePress = () => {
    this.props.navigation.navigate("ConfirmationModal", {
      message:
        "Are you sure you want to delete your account? This action is irreversible.",
      onConfirm: this.handleDeleteConfirm
    });
  };

  handleDeleteConfirm = async () => {
    try {
      await API_DeleteAccount();
      await AsyncStorage.clear();
      await SessionService.destroy();
      this.props.navigation.navigate("Auth");
    } catch (e) {
      console.log("Error deleting account", e);
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content"></StatusBar>
        <ScrollView contentContainerStyle={styles.container}>
          <ListButton
            title="Update Password"
            onPress={this.handlePasswordPress}
          ></ListButton>
          <ListButton
            title="Delete Account"
            onPress={this.handleDeletePress}
          ></ListButton>
          <ListButton
            title="Logout"
            onPress={this.handleLogoutPress}
          ></ListButton>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  }
});
