import React from "react";
import {
  Platform,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback
} from "react-native";
import StoreLogo from "../components/StoreLogo";

const PointsTile = props => {
  return (
    <View>
      {Platform.OS === "ios" ? (
        <TouchableOpacity
          onPress={() => {
            props.onPress(props.point);
          }}
        >
          {PointView(props)}
        </TouchableOpacity>
      ) : (
        <TouchableNativeFeedback
          delayPressIn={0.5}
          delayPressOut={0.5}
          onPress={() => {
            props.onPress(props.point);
          }}
        >
          {PointView(props)}
        </TouchableNativeFeedback>
      )}
    </View>
  );
};

const PointView = props => {
  const { activePoints, archivedPoints, store } = props.point;
  const { storeName, location } = store;
  const { addressLine1 } = location;

  return (
    <View style={styles.pointTile}>
      <View style={styles.iconCol}>
        <View style={styles.iconTempGraphic}>
          <StoreLogo store={store}></StoreLogo>
        </View>
      </View>
      <View style={styles.storeCol}>
        <Text style={styles.storeName}>{storeName}</Text>
        <Text style={styles.storeAddress}>{addressLine1}</Text>
      </View>
      <View style={styles.pointsCol}>
        <Text style={styles.pointsActive}>{activePoints}</Text>
      </View>
      <View style={styles.archivedCol}>
        <Text style={styles.pointsArchived}>{archivedPoints}</Text>
      </View>
    </View>
  );
};

export default PointsTile;

const styles = StyleSheet.create({
  pointTile: {
    marginHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "row",
    borderBottomColor: "rgb(191, 191, 191)",
    borderBottomWidth: 1
  },
  iconCol: {
    alignContent: "center",
    justifyContent: "center",
    marginRight: 10
  },
  storeCol: {
    flex: 1
  },
  pointsCol: {
    marginLeft: 10,
    width: 70,
    alignContent: "center",
    justifyContent: "center"
  },
  archivedCol: {
    marginLeft: 10,
    width: 70,
    alignContent: "center",
    justifyContent: "center"
  },
  iconTempGraphic: {
    width: 40,
    height: 40,
    backgroundColor: "#a0a0a0",
    borderRadius: 10,
    overflow: "hidden"
  },
  storeName: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold"
  },
  storeAddress: {
    fontSize: 12
  },
  pointsActive: {
    fontSize: 18,
    color: "#000",
    textAlign: "right"
  },
  pointsArchived: {
    fontSize: 18,
    color: "#999",
    textAlign: "right"
  }
});
