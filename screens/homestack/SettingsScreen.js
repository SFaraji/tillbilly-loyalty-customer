import React from "react";
import { StyleSheet, ScrollView, StatusBar } from "react-native";

import ListButton from "../../components/ListButton";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings"
  };

  handleAccountPress = () => {
    this.props.navigation.navigate("Account");
  };

  handleProfilePress = () => {
    this.props.navigation.navigate("Profile");
  };

  handleAboutPress = () => {
    this.props.navigation.navigate("About");
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <ListButton title="About" onPress={this.handleAboutPress}></ListButton>
        <ListButton
          title="Profile"
          onPress={this.handleProfilePress}
        ></ListButton>
        <ListButton
          title="Account"
          onPress={this.handleAccountPress}
        ></ListButton>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
