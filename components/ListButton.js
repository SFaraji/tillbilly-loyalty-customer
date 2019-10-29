import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback
} from "react-native";

const ListButton = props => {
  return (
    <View>
      {Platform.OS === "ios" ? (
        <TouchableOpacity onPress={props.onPress}>
          {buttonView(props)}
        </TouchableOpacity>
      ) : (
        <TouchableNativeFeedback
          delayPressIn={0.5}
          delayPressOut={0.5}
          onPress={props.onPress}
        >
          {buttonView(props)}
        </TouchableNativeFeedback>
      )}
    </View>
  );
};

const buttonView = props => {
  return (
    <View style={styles.button}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </View>
  );
};

export default ListButton;

const styles = StyleSheet.create({
  button: {
    borderBottomColor: "rgb(240, 240, 240)",
    borderBottomWidth: 1,
    padding: 25
  },
  buttonText: {
    color: "#000",
    fontSize: 18
  }
});
