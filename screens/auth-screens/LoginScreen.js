import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ToastAndroid
} from "react-native";

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

      if (error.status) {
        let m =
          "Status: " +
          error.status +
          "\n" +
          "Message: " +
          (error.message || error.statusText);
        ToastAndroid.show(m, ToastAndroid.LONG);
      }
    }
  };

  _gotoSignup = () => {
    this.props.navigation.navigate("Signup");
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
        <ScrollView contentContainerStyle={styles.container}>
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
            <AppButton
              title="Login"
              color="rgb(244, 57, 56)"
              onPress={this._submit}
            />
            <View style={styles.footer}>
              <Text>Don't have a customer account?</Text>
              <TouchableOpacity onPress={this._gotoSignup}>
                <Text style={styles.footerLink}>Create one now!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardShift>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 40,
    flexGrow: 1,
    justifyContent: "flex-end"
  },
  body: {
    // justifyContent: "flex-end"
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
    borderTopColor: "#e0e0e0",
    borderTopWidth: 1,
    paddingTop: 20
  },
  footerLink: {
    color: "#666"
  }
});
