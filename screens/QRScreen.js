import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import QRCode from "react-native-qrcode";
import SessionService from "../services/SessionService";

export default class QRScreen extends React.Component {
  state = {
    user: undefined
  };

  componentDidMount = () => {
    this.setState({ user: SessionService.user });
  };

  handleBack = () => {
    this.props.navigation.pop();
  };

  renderQrCode = () => {
    const { user } = this.state;

    if (!user) {
      return <Text>Loading</Text>;
    }

    const qrString =
      "tbloyalty://" +
      JSON.stringify({
        qrId: user.qrId
      });

    return (
      <View>
        <QRCode
          value={qrString}
          size={300}
          bgColor="#000"
          fgColor="white"
        ></QRCode>
        <Text style={styles.qrText}>Show this code to the merchant</Text>
      </View>
    );
  };

  render() {
    return (
      <TouchableWithoutFeedback
        style={styles.container}
        onPress={this.handleBack}
      >
        <View style={styles.container}>{this.renderQrCode()}</View>
      </TouchableWithoutFeedback>
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
  qrText: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 15
  }
});
