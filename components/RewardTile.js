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

const RewardTile = props => {
  const { store } = props.reward;

  return (
    <View>
      <View style={styles.rewardTileOuter}>
        {Platform.OS === "ios" ? (
          <TouchableOpacity
            onPress={() => {
              props.onPress(props.reward);
            }}
          >
            <View style={{ flex: 1 }}>{RewardView(props)}</View>
          </TouchableOpacity>
        ) : (
          <TouchableNativeFeedback
            delayPressIn={0.5}
            delayPressOut={0.5}
            onPress={() => {
              props.onPress(props.reward);
            }}
          >
            <View style={{ flex: 1 }}>{RewardView(props)}</View>
          </TouchableNativeFeedback>
        )}
      </View>
      <View style={styles.logoBox}>
        <StoreLogo store={store} style={styles.logoImage}></StoreLogo>
      </View>
    </View>
  );
};

const RewardView = props => {
  const { activePoints, pointsRequired, title, store } = props.reward;
  const { storeName, location } = store;
  const { addressLine1 } = location;

  return (
    <View style={styles.rewardTile}>
      <View style={styles.rtHeaderRow}>
        <View style={styles.rtHeaderRowLeft}>
          <Text style={styles.storeName}>{storeName || "Store Name"}</Text>
          <Text style={styles.storeAddress}>
            {addressLine1 || "Store Address"}
          </Text>
        </View>
        <View style={styles.rtHeaderRowRight}>
          <Text style={styles.pointsText}>
            {activePoints + "/" + pointsRequired + " pts"}
          </Text>
        </View>
      </View>
      <View style={styles.rtBottomRow}>
        <View style={styles.rtBottomRowLeft}>
          <Text style={styles.rewardTitle}>{title}</Text>
        </View>
        <View style={styles.rtBottomRowRight}>{maybeRenderRedeem(props)}</View>
      </View>
    </View>
  );
};

const maybeRenderRedeem = props => {
  let { activePoints, pointsRequired } = props.reward;
  activePoints = parseInt(activePoints);
  pointsRequired = parseInt(pointsRequired);

  if (activePoints > pointsRequired) {
    return (
      <View style={styles.redeemButton}>
        {Platform.OS === "ios" ? (
          <TouchableOpacity
            onPress={() => {
              props.onRedeem(props.reward);
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.redeemButtonText}>Redeem</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableNativeFeedback
            delayPressIn={0.5}
            delayPressOut={0.5}
            onPress={() => {
              props.onRedeem(props.reward);
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.redeemButtonText}>Redeem</Text>
            </View>
          </TouchableNativeFeedback>
        )}
      </View>
    );
  } else {
    return <View></View>;
  }
};

export default RewardTile;

const styles = StyleSheet.create({
  rewardTileOuter: {
    margin: 10,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#f6f6f6"

    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 10
    // },
    // shadowOpacity: 0.51,
    // shadowRadius: 13.16,

    // elevation: 20
  },
  logoBox: {
    position: "absolute",
    left: 5,
    top: 5,
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: "#999",
    elevation: 21
  },
  logoImage: {
    width: 45,
    height: 45,
    borderRadius: 10
  },
  rewardTile: {
    paddingVertical: 15,
    paddingLeft: 50,
    paddingRight: 20
  },
  rtHeaderRow: {
    flexDirection: "row",
    marginBottom: 10
  },
  rtHeaderRowLeft: {
    flex: 1,
    alignItems: "flex-start"
  },
  storeName: {
    fontSize: 14
  },
  storeAddress: {
    fontSize: 12,
    color: "#333"
  },
  rtHeaderRowRight: {
    flex: 0,
    alignItems: "flex-start"
  },
  pointsText: {
    fontSize: 17
  },
  rtBottomRow: {
    flexDirection: "row",
    marginTop: 10
  },
  rtBottomRowLeft: {
    flex: 1,
    justifyContent: "flex-end"
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: "bold"
  },
  rtBottomRowRight: {
    flex: 0,
    justifyContent: "flex-end"
  },
  redeemButton: {
    overflow: "hidden",
    backgroundColor: "#52cb60",
    borderRadius: 7
  },
  redeemButtonText: {
    color: "#fff",
    fontSize: 13,
    paddingVertical: 5,
    paddingHorizontal: 17,
    textAlign: "center"
  }
});
