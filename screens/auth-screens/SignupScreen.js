import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Linking
} from "react-native";
import { API_Signup } from "../../components/Endpoints";

import AppTextInput from "../../components/AppTextInput";
import AppButton from "../../components/AppButton";
import KeyboardShift from "../../components/KeyboardShift";

export default class SignupScreen extends React.Component {
  state = {
    inputs: {
      displayName: "TestCustomer",
      inputEmail: "testcustomer@tillbilly.com",
      inputPassword_1: "admin",
      inputPassword_2: ""
    },
    errors: {
      displayName: "",
      inputEmail: "",
      inputPassword_1: "",
      inputPassword_2: ""
    }
  };

  _submit = async () => {
    if (!this._validate()) return;

    const { inputEmail, displayName, inputPassword_1 } = this.state.inputs;

    try {
      await API_Signup(displayName, inputEmail, inputPassword_1);

      this.props.navigation.navigate("Home");
    } catch (error) {
      console.log("Signup error", error);

      const { errors: _errors } = error;
      let { errors } = this.state;

      if (_errors) {
        _errors.forEach(e => {
          if (e.field === "emailAddress") {
            errors.inputEmail = "Email already exists";
            this.setState({ errors });
          }
        });
      } else {
        if (error.status === 500) {
          console.log("Internal Server Error");
        }
      }
    }
  };

  _validate = () => {
    const { errors, inputs } = this.state;
    let isValid = true;

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (inputs.displayName === "") {
      errors.displayName = "Display name cannot be empty";
      isValid = false;
    } else {
      errors.displayName = "";
    }

    // if (!/[a-zA-Z0-9]/.test(inputs.displayName)) {
    //   errors.displayName = "Display name cannot contain special characters";
    //   isValid = false;
    // } else {
    //   errors.displayName = "";
    // }

    if (!emailRegex.test(inputs.inputEmail)) {
      errors.inputEmail = "Please enter a valid email";
      isValid = false;
    } else {
      errors.inputEmail = "";
    }

    if (inputs.inputPassword_1 !== inputs.inputPassword_2) {
      errors.inputPassword_2 = "Passwords do not match";
      isValid = false;
    } else {
      errors.inputPassword_2 = "";
    }

    if (inputs.inputPassword_1 === "") {
      errors.inputPassword_1 = "Password cannot be empty";
      isValid = false;
    } else {
      errors.inputPassword_1 = "";
    }

    if (
      inputs.inputPassword_1.length < 5 ||
      inputs.inputPassword_1.length > 128
    ) {
      errors.inputPassword_1 =
        "Password must be between 5 and 128 characters in length";
      isValid = false;
    } else {
      errors.inputPassword_1 = "";
    }

    this.setState({ inputs, errors });

    return isValid;
  };

  _gotoLogin = () => {
    this.props.navigation.navigate("Login");
  };

  _handleEmailInput = value => {
    const inputs = { ...this.state.inputs };
    inputs.inputEmail = value;
    this.setState({ inputs });
  };

  _handleDisplayNameInput = value => {
    const inputs = { ...this.state.inputs };
    inputs.displayName = value;
    this.setState({ inputs });
  };

  _handlePasswordInput_1 = value => {
    const inputs = { ...this.state.inputs };
    inputs.inputPassword_1 = value;
    this.setState({ inputs });
  };

  _handlePasswordInput_2 = value => {
    const inputs = { ...this.state.inputs };
    inputs.inputPassword_2 = value;
    this.setState({ inputs });
  };

  render() {
    const { inputs, errors } = this.state;

    return (
      <KeyboardShift>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.body}>
            <AppTextInput
              label="Email"
              value={inputs.inputEmail}
              error={errors.inputEmail}
              onChangeText={this._handleEmailInput}
              textContentType="emailAddress"
            />
            <AppTextInput
              label="Display Name"
              value={inputs.displayName}
              error={errors.displayName}
              onChangeText={this._handleDisplayNameInput}
              textContentType="none"
            />
            <AppTextInput
              label="Password"
              value={inputs.inputPassword_1}
              error={errors.inputPassword_1}
              onChangeText={this._handlePasswordInput_1}
              textContentType="password"
              secureTextEntry={true}
            />
            <AppTextInput
              label="Confirm Password"
              value={inputs.inputPassword_2}
              error={errors.inputPassword_2}
              onChangeText={this._handlePasswordInput_2}
              textContentType="password"
              secureTextEntry={true}
            />
            <AppButton
              title="Signup"
              color="rgb(244, 57, 56)"
              onPress={this._submit}
            />
            <View style={styles.agreeText}>
              <Text>
                {`By signing up for an account you agree to TillBilly's `}
                <Text
                  style={styles.link}
                  onPress={() => {
                    Linking.openURL("https://tillbilly.com/terms");
                  }}
                >
                  terms of service
                </Text>
                {` and `}
                <Text
                  style={styles.link}
                  onPress={() => {
                    Linking.openURL("https://tillbilly.com/privacy");
                  }}
                >
                  privacy policy
                </Text>
              </Text>
            </View>
            <View style={styles.footer}>
              <Text>Already have a customer account?</Text>
              <TouchableOpacity onPress={this._gotoLogin}>
                <Text style={styles.footerLink}>Login</Text>
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
  agreeText: {
    marginTop: 15
  },
  link: {
    color: "#0099ff"
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

/**
 * 
 * isAlphanumeric: function(value) {
      value = value.trim();
      return /\w/.test(value);
    },

    isEmpty: function(value) {
      value = value.trim();
      return value.length > 0 ? false : true;
    },

    isNumber: function(value) {
      if (typeof value === "number") {
        return true;
      }
      value = value.trim();
      return /^-*[0-9]+$/.test(value);
    },

    isAlphabet: function(value) {
      value = value.trim();
      return /[a-zA-Z]/.test(value);
    },

    isEmail: function(value) {
      value = value.trim();
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      );
    },
 * 
 */
