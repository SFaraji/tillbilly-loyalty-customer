import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class RewardClaimScreen extends React.Component {
  static navigationOptions = {
    title: "Reward Claimed"
  };

  state = {
    reward: null
  };

  componentDidMount = async () => {
    const reward = await this.props.navigation.getParam("reward", null);

    if (reward) {
      this.setState({
        reward: reward
      });
    }
  };

  render() {
    const { reward } = this.state;

    if (!reward) {
      return (
        <View style={styles.loadingTile}>
          <ActivityIndicator size={20}></ActivityIndicator>
          <Text style={{ marginTop: 10, fontSize: 14 }}>Loading</Text>
        </View>
      );
    }

    const { title, store } = reward;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content"></StatusBar>
        <View style={styles.pointsView}>
          <View style={styles.pointsViewCircle}>
            <Ionicons
              name="md-checkmark-circle-outline"
              size={128}
              color="#52cb60"
            />
          </View>
        </View>
        <Text style={styles.rewardTitle}>{title}</Text>
        <View style={styles.storeHeader}>
          <View style={styles.storeDetails}>
            <Text style={styles.storeName}>{store.storeName}</Text>
            <Text style={styles.storeAddress}>
              {store.location.addressLine1}
            </Text>
          </View>
        </View>
        <Text style={styles.merchantMessage}>
          Please show this screen to the merchant.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  /**
   * Reward title styles
   */
  rewardTitle: {
    textAlign: "center",
    fontSize: 42,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 10
  },
  /**
   * Store details styles
   */
  storeHeader: {
    flexDirection: "row"
  },
  storeLogoBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#666",
    alignSelf: "center",
    overflow: "hidden"
  },
  storeLogoImage: {
    width: 40,
    height: 40
  },
  storeDetails: {
    // marginLeft: 15,
    flex: 1
  },
  storeName: {
    textAlign: "center",
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 4
  },
  storeAddress: {
    textAlign: "center",
    fontSize: 14,
    color: "#666"
  },
  /**
   * Points View
   */
  pointsView: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20
  },
  pointsViewCircle: {
    // backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center"
  },
  /**
   * Merchant message
   */
  merchantMessage: {
    fontSize: 16,
    color: "#333",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.4)",
    marginTop: 25
  },
  /**
   * Loading tile
   */
  loadingTile: {
    margin: 10,
    borderRadius: 20,
    overflow: "hidden",
    paddingVertical: 30,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});
