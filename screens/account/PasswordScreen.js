import React from "react";
import { StyleSheet, View, ScrollView, StatusBar } from "react-native";

import AppTextInput from "../../components/AppTextInput";
import AppButton from "../../components/AppButton";
import KeyboardShift from "../../components/KeyboardShift";

import SessionService from "../../services/SessionService";
import { API_UpdateProfile } from "../../components/Endpoints";

export default class PasswordScreen extends React.Component {
  static navigationOptions = {
    title: "Update Password",
    headerRight: <View></View>
  };

  state = {
    inputs: {
      password1: {
        value: "",
        error: ""
      },
      password2: {
        value: "",
        error: ""
      }
    }
  };

  handlePasswordInput = (value, prop) => {
    let { inputs } = this.state;
    inputs[prop].value = value;
    this.setState({ inputs });
  };

  handleSubmit = async () => {
    if (!this.validate()) return;

    let { password1 } = this.state.inputs;

    const user = SessionService.user;
    const userData = {
      password: password1.value
    };

    try {
      let _userData = await API_UpdateProfile(user.id, userData);
      console.log("P Update", _userData);

      SessionService.create(_userData);

      this.props.navigation.pop();
    } catch (error) {
      console.log("Password update error", error);

      // #TODO Handle signup errors
      // if (error.status) {
      //   let m =
      //     "Status: " +
      //     error.status +
      //     "\n" +
      //     "Message: " +
      //     (error.message || error.statusText);
      //   ToastAndroid.show(m, ToastAndroid.LONG);
      // }

      let title = "An error occurred";
      let message;

      if (error.status) {
        message = "Error code: " + error.status;
      } else {
        message =
          "An unknown error occurred. Please contact support if this problem persists.";
      }

      Alert.alert(title, message);
    }
  };

  handleCancel = () => {
    this.props.navigation.goBack();
  };

  validate = () => {
    let isValid = true;
    let { inputs } = this.state;
    let { password1, password2 } = inputs;

    if (password1.value !== password2.value) {
      password2.error = "Passwords do not match";
      isValid = false;
    } else {
      password2.error = "";
    }

    if (password1.value === "") {
      password1.error = "Password cannot be empty";
      isValid = false;
    } else {
      password1.error = "";
    }

    if (password1.value.length < 5 || password1.value.length > 128) {
      password1.error =
        "Password must be between 5 and 128 characters in length";
      isValid = false;
    } else {
      password1.error = "";
    }

    this.setState({ inputs });

    return isValid;
  };

  render() {
    const { password1, password2 } = this.state.inputs;

    return (
      <KeyboardShift>
        <StatusBar barStyle="dark-content"></StatusBar>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.body}>
            {/* <AppTextInput
              label="Current Password"
              value={oldPassword}
              textContentType="password"
              secureTextEntry={true}
              onChangeText={value => {
                this.handlePasswordInput(value, "oldPassword");
              }}
            /> */}
            <AppTextInput
              label="New Password"
              value={password1.value}
              error={password1.error}
              textContentType="password"
              secureTextEntry={true}
              onChangeText={value => {
                this.handlePasswordInput(value, "password1");
              }}
            />
            <AppTextInput
              label="Re Enter New Password"
              value={password2.value}
              error={password2.error}
              textContentType="password"
              secureTextEntry={true}
              onChangeText={value => {
                this.handlePasswordInput(value, "password2");
              }}
            />
          </View>
        </ScrollView>
        <View style={styles.buttonBox}>
          <AppButton title="Update" onPress={this.handleSubmit} />
          <View style={styles.gutter} />
          <AppButton
            title="Cancel"
            color="rgb(244, 57, 56)"
            onPress={this.handleCancel}
          />
        </View>
      </KeyboardShift>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  body: {
    flex: 1,
    padding: 20
  },
  subheader: {
    flexDirection: "column",
    padding: 25,
    backgroundColor: "rgb(245, 243, 251)",
    alignItems: "center"
  },
  iconImage: {
    width: 140,
    height: 140
  },
  addButton: {
    borderBottomColor: "rgb(244, 57, 56)",
    borderBottomWidth: 0.25,
    padding: 10,
    backgroundColor: "rgb(11,17,35)",
    borderRadius: 15,
    overflow: "hidden",
    marginLeft: 15
  },
  addButtonText: {
    width: 30,
    height: 30,
    fontSize: 30,
    color: "#fff",
    textAlign: "center"
  },
  buttonBox: {
    flexDirection: "row",
    width: "100%",
    padding: 20
  },
  gutter: {
    width: 10,
    flex: 0
  }
});
