import React from "react";
import { ScrollView, View, StyleSheet, Text, Image, Alert } from "react-native";

import AppTextInput from "../../components/AppTextInput";
import AppButton from "../../components/AppButton";
import KeyboardShift from "../../components/KeyboardShift";
import { API_Login } from "../../components/Endpoints";

export default class LoginScreen extends React.Component {
  state = {
    inputs: {
      email: "testcustomer@tillbilly.com",
      password: "admin"
    },
    errors: {
      email: "",
      password: ""
    }
  };

  _submit = async () => {
    if (!this._validate()) return;

    const { email, password } = this.state.inputs;

    try {
      await API_Login(email, password);
      this.props.navigation.navigate("App");
    } catch (error) {
      console.log("Login error", error);

      // #TODO Handle signup errors

      let title = "An error occurred";
      let message;

      if (error.status) {
        if (error.status === 401) {
          title = "Invalid credentials";
          message = "Your email or password is incorrect.";
        } else {
          message = "Error code: " + error.status;
        }
      } else {
        message =
          "An unknown error occurred. Please contact support if this problem persists.";
      }

      Alert.alert(title, message);
    }
  };

  _gotoSignup = () => {
    this.props.navigation.navigate("Login");
  };

  _handleEmailInput = value => {
    const { inputs } = this.state;
    inputs.email = value;
    this.setState({ inputs });
  };

  _handlePasswordInput = value => {
    const { inputs } = this.state;
    inputs.password = value;
    this.setState({ inputs });
  };

  _validate = () => {
    const { errors, inputs } = this.state;
    let isValid = true;

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegex.test(inputs.email)) {
      errors.email = "Please enter a valid email";
      isValid = false;
    } else {
      errors.email = "";
    }

    if (inputs.password === "") {
      errors.password = "Please enter password";
      isValid = false;
    } else {
      errors.password = "";
    }

    this.setState({ inputs, errors });

    return isValid;
  };

  render() {
    const { inputs, errors } = this.state;

    return (
      <KeyboardShift>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={{ flex: 1 }}>
            <View style={styles.headerArea}>
              <Image
                style={styles.logo}
                source={require("../../assets/icon.png")}
              ></Image>
              <Text style={styles.headerText}>Login to your account</Text>
              <Text style={styles.headerSubText}>
                {`Don't have an account? `}
                <Text style={styles.link} onPress={this._gotoSignup}>
                  Create one
                </Text>
              </Text>
            </View>
            <View style={styles.body}>
              <AppTextInput
                label="Email"
                value={inputs.email}
                error={errors.email}
                onChangeText={this._handleEmailInput}
                textContentType="emailAddress"
              />
              <AppTextInput
                label="Password"
                value={inputs.password}
                error={errors.password}
                onChangeText={this._handlePasswordInput}
                textContentType="password"
                secureTextEntry={true}
              />
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <AppButton
              title="Login"
              color="rgb(244, 57, 56)"
              onPress={this._submit}
              noFlex={true}
            />
          </View>
        </View>
      </KeyboardShift>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-end"
  },
  headerArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 64,
    height: 64
  },
  headerText: {
    fontSize: 18,
    color: "#333",
    marginTop: 10
  },
  headerSubText: {
    fontSize: 16,
    color: "#666",
    marginTop: 7
  },
  footer: {
    padding: 20
  },
  agreeText: {
    marginTop: 15
  },
  link: {
    color: "#0099ff"
  },
  footerLink: {
    color: "#666"
  }
});
