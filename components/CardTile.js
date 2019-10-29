import React from "react";
import {
  Platform,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback
} from "react-native";

const CardTile = props => {
  return (
    <View style={styles.outer}>
      {Platform.OS === "ios" ? (
        <TouchableOpacity
          onPress={() => {
            props.onPress(props.card);
          }}
        >
          {CardView(props.card)}
        </TouchableOpacity>
      ) : (
        <TouchableNativeFeedback
          delayPressIn={0.5}
          delayPressOut={0.5}
          onPress={() => {
            props.onPress(props.card);
          }}
        >
          {CardView(props.card)}
        </TouchableNativeFeedback>
      )}
    </View>
  );
};

const CardView = card => {
  const { name, color } = card;
  return (
    <View style={{ ...styles.tileInner, backgroundColor: color }}>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

export default CardTile;

const styles = StyleSheet.create({
  outer: {
    width: "50%",
    padding: 5,
    height: 125,
    maxHeight: 125,
    overflow: "hidden"
  },
  tileInner: {
    height: "100%",
    backgroundColor: "#f0f0f0",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  name: {
    fontSize: 18,
    color: "#fff"
  }
});
