import React from "react";
import { ActivityIndicator, StyleSheet, ImageBackground } from "react-native";
import SessionService from "../../services/SessionService";

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsyc();
  }

  _bootstrapAsyc = async () => {
    const sessionReady = await SessionService.initialize();

    if (sessionReady.exists) {
      this.props.navigation.navigate("Home");
      // this.props.navigation.navigate("Profile");
    } else {
      this.props.navigation.navigate("Auth");
    }
  };

  render() {
    return (
      <ImageBackground
        source={require("../../assets/splash.png")}
        style={styles.container}
      >
        <ActivityIndicator
          color="rgb(244, 57, 56)"
          size={30}
          style={styles.activity}
        />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  activity: {
    transform: [{ translateY: 100 }]
  }
});
