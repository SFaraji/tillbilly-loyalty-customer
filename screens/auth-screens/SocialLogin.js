import React from "react";
import {
  ImageBackground,
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const SocialButton = props => {
  const boxStyles = { ...styles.socialButton, ...styles[props.provider] };
  return (
    <TouchableOpacity style={boxStyles} {...props}>
      <View style={styles.socialButtonImage}>
        {getSocialIcon(props.provider)}
      </View>
      <Text style={styles.socialButtonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const getSocialIcon = provider => {
  if (provider === "facebook") {
    return (
      <AntDesign name="facebook-square" size={20} color="#fff"></AntDesign>
    );
  } else if (provider === "google") {
    return <AntDesign name="google" size={20} color="#fff"></AntDesign>;
  }
};

export default class SocialScreen extends React.Component {
  _handleEmailSignup = () => {
    this.props.navigation.navigate("Signup");
  };

  _handleGoogleLogin = () => {
    this.props.navigation.navigate("OAuth", {
      client: "google"
    });
  };

  _handleFacebookLogin = () => {
    this.props.navigation.navigate("OAuth", {
      client: "facebook"
    });
  };

  render() {
    return (
      <ImageBackground
        style={styles.container}
        source={require("../../assets/images/login-bg.png")}
      >
        <StatusBar barStyle="dark-content" />
        <View style={styles.body}>
          {/* <View style={styles.logoArea}>
            <Image
              style={styles.logoImage}
              source={require("../../assets/icon.png")}
            ></Image>
            <Text style={styles.logoText}>TillBilly Rewards</Text>
          </View> */}
          <View style={styles.buttonsArea}>
            <SocialButton
              provider="facebook"
              title="Continue with Facebook"
              onPress={this._handleFacebookLogin}
            />
            <SocialButton
              provider="google"
              title="Continue with Google"
              onPress={this._handleGoogleLogin}
            />
            <View style={styles.footer}>
              <TouchableOpacity onPress={this._handleEmailSignup}>
                <Text style={styles.footerLink}>or use email</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 40,
    paddingBottom: 15,
    flex: 1
  },
  body: {
    flex: 1,
    marginBottom: 10,
    justifyContent: "flex-end"
  },
  logoArea: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  logoImage: {
    width: 64,
    height: 64
  },
  logoText: {
    fontSize: 16,
    color: "#666"
  },
  buttonsArea: {
    flex: 0
  },
  socialButton: {
    borderRadius: 15,
    padding: 10,
    minHeight: 50,
    justifyContent: "center",
    marginBottom: 12
  },
  facebook: {
    backgroundColor: "rgb(59,89,152)"
  },
  google: {
    backgroundColor: "rgb(66,133,244)"
  },
  twitter: {
    backgroundColor: "rgb(85,172,238)"
  },
  socialButtonText: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff"
  },
  socialButtonImage: {
    position: "absolute",
    left: 15
  },
  footer: {
    marginTop: 20,
    alignItems: "center"
  },
  footerLink: {
    color: "#fff",
    fontSize: 16,
    textDecorationLine: "underline",
    textDecorationStyle: "dotted"
  }
});
