import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { WebView } from "react-native-webview";
import API from "../../constants/Config";
import { API_GetCustomer } from "../../components/Endpoints";
import Constants from "expo-constants";
import SessionService from "../../services/SessionService";

const getUrlParamByName = (search, name) => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");

  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(search);

  return results === null
    ? false
    : decodeURIComponent(results[1].replace(/\+/g, ""));
};

export default class OAuthScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const client = navigation.getParam("client", null);

    return {
      headerTitle:
        client === "google"
          ? "Google Login"
          : "Facebook Login" || "Card Details"
    };
  };

  state = {
    client: null,
    userAgent: null,
    success: false
  };

  componentDidMount() {
    const client = this.props.navigation.getParam("client", null);
    this.setState({ client });
    this.setUserAgent();
  }

  setUserAgent = async () => {
    const userAgent = await Constants.getWebViewUserAgentAsync();
    this.setState({ userAgent });
  };

  handleWebViewNavigationStateChange = newNavState => {
    const { success } = this.state;
    let { url } = { ...newNavState };
    if (!url) return;

    if (url.includes("?authStatus=success") && !success) {
      this.webView.stopLoading();
      this.setState({ success: true });

      let search = url.split("?")[1];

      // const authToken = url.replace(/^(.+authToken=)(.+?)($|&)/, "$2");
      const authToken = getUrlParamByName(search, "authToken");
      const userId = getUrlParamByName(search, "userId");

      console.log(authToken);
      console.log(userId);

      this.getCustomerInfo(userId, authToken);
    } else if (url.includes("?authStatus=cancelled")) {
      this.props.navigation.pop();
    }
  };

  getCustomerInfo = async (userId, authToken) => {
    try {
      const userData = await API_GetCustomer(userId, authToken);
      await SessionService.createWithTokenAndUser(authToken, userData);
      this.props.navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Login Error", "There was an error logging in.");
      console.log("OAuth Error", error);
      this.props.navigation.pop();
    }
  };

  render() {
    const { client, userAgent } = this.state;

    if (!client || !userAgent) {
      return <View style={styles.container}></View>;
    }

    const uri = API.oAuthBase + "?authclient=" + client + "&userType=customer";

    return (
      <View style={styles.container}>
        <WebView
          userAgent={userAgent}
          ref={ref => {
            this.webView = ref;
          }}
          source={{
            uri: uri
          }}
          onNavigationStateChange={this.handleWebViewNavigationStateChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  }
});
