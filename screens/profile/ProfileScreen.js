import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert
} from "react-native";

import SessionService from "../../services/SessionService";
import { ImageUploader } from "../../services/UploaderService";

import AppTextInput from "../../components/AppTextInput";
import AppButton from "../../components/AppButton";
import KeyboardShift from "../../components/KeyboardShift";
import { API_UpdateProfile } from "../../components/Endpoints";

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: "Profile"
  };

  state = {
    image: null,
    user: null,
    userData: {
      firstName: "",
      lastName: "",
      displayName: ""
    },
    displayNameError: null,
    imageUploading: false,
    uploadUri: null
  };

  async componentDidMount() {
    const user = SessionService.user;
    const userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.displayName
    };

    let image = null;
    if (user.assetsUrl) {
      image = user.assetsUrl.avatar;
    }

    this.setState({ user, userData, image });
  }

  handleAvatarPress = async () => {
    ImageUploader.upload({
      onStart: result =>
        this.setState({ imageUploading: true, uploadUri: result.uri }),
      onError: () => this.setState({ imageUploading: false }),
      onComplete: () => this.setState({ imageUploading: false })
    });
  };

  submit = async () => {
    let userData = { ...this.state.userData };
    const { id } = this.state.user;

    if (userData.displayName === "") {
      this.setState({ displayNameError: "Display name cannot be empty" });
      return;
    }

    try {
      let _userData = await API_UpdateProfile(id, userData);

      SessionService.update(_userData);

      this.props.navigation.pop();
    } catch (error) {
      console.log("User update error", error);

      // #TODO Handle signup errors
      // let m =
      // "Status: " +
      // error.status +
      // "\n" +
      // "Message: " +
      // (error.message || error.statusText);
      // ToastAndroid.show(m, ToastAndroid.LONG);

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

  handleTextInput = (value, prop) => {
    let userData = { ...this.state.userData };
    userData[prop] = value;
    this.setState({ userData: userData });

    if (prop === "displayName") {
      if (value !== "") {
        this.setState({ displayNameError: null });
      }
    }
  };

  handleCancel = () => {
    this.props.navigation.pop();
  };

  getAvatar = () => {
    const { image, uploadUri } = this.state;

    if (uploadUri) {
      return { uri: uploadUri };
    } else if (image) {
      return { uri: image };
    } else {
      return require("../../assets/images/temp-avatar.png");
    }
  };

  render() {
    const { userData, imageUploading, displayNameError } = this.state;

    return (
      <KeyboardShift>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.subheader}>
              <TouchableOpacity onPress={this.handleAvatarPress}>
                <View style={styles.subheaderinner}>
                  <View style={styles.avatarFrame}>
                    <Image
                      style={styles.avatarImage}
                      source={this.getAvatar()}
                    />
                  </View>
                  <View style={styles.avatarButton}>
                    <Text>Tap to change profile picture</Text>
                  </View>
                </View>
              </TouchableOpacity>
              {imageUploading && (
                <View style={styles.avatarLoading}>
                  <ActivityIndicator
                    size="small"
                    color="#fff"
                    style={{ position: "relative" }}
                  ></ActivityIndicator>
                </View>
              )}
            </View>
            <View style={styles.body}>
              <AppTextInput
                onChangeText={value => {
                  this.handleTextInput(value, "displayName");
                }}
                error={displayNameError}
                value={userData.displayName}
                // label={"Display name" + "\n" + "This is shown to the merchant"}
                label="Display name"
              />
              <AppTextInput
                onChangeText={value => {
                  this.handleTextInput(value, "firstName");
                }}
                value={userData.firstName}
                label="First name"
              />
              <AppTextInput
                onChangeText={value => {
                  this.handleTextInput(value, "lastName");
                }}
                value={userData.lastName}
                label="Last name"
              />
            </View>
          </ScrollView>
          <View style={styles.buttonBox}>
            <AppButton title="Update" onPress={this.submit} />
            <View style={styles.gutter} />
            <AppButton
              title="Cancel"
              color="rgb(244, 57, 56)"
              onPress={this.handleCancel}
            />
          </View>
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
    backgroundColor: "rgb(245, 243, 251)",
    alignItems: "center"
  },
  subheaderinner: {
    alignItems: "center",
    justifyContent: "center"
  },
  avatarFrame: {
    overflow: "hidden",
    borderRadius: 100,
    marginTop: 20
  },
  avatarImage: {
    width: 160,
    height: 160
  },
  avatarLoading: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  avatarButton: {
    marginVertical: 20
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
