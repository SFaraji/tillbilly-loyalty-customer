import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  StatusBar,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity
} from "react-native";

import StoreLogo from "../components/StoreLogo";

export default class RewardDetailScreen extends React.Component {
  static navigationOptions = {
    title: "Reward Details"
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

  redeemReward = () => {
    this.props.navigation.navigate("RewardClaim", {
      reward: this.state.reward
    });
  };

  handleRedeemPress = reward => {
    this.props.navigation.navigate("ConfirmationModal", {
      message:
        "Please let the merchant click confirm button. Do not click yourself.",
      onConfirm: () => this.confirmRedeemPress()
    });
  };

  confirmRedeemPress = async () => {
    const { reward } = this.state;
    try {
      await API_CreateTransaction(reward);
      this.props.navigation.replace("RewardClaim", {
        reward: reward
      });
    } catch (error) {
      console.log("Redeem error", error);
    }
  };

  maybeRenderRedeem = () => {
    let { activePoints, pointsRequired } = this.state.reward;
    activePoints = parseInt(activePoints);
    pointsRequired = parseInt(pointsRequired);

    if (activePoints > pointsRequired) {
      return (
        <View style={styles.actionView}>
          {Platform.OS === "ios" ? (
            <TouchableOpacity onPress={this.handleRedeemPress}>
              <View style={styles.buttonView}>
                <Text style={styles.buttonText}>Redeem</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableNativeFeedback
              delayPressIn={0.5}
              delayPressOut={0.5}
              onPress={this.handleRedeemPress}
            >
              <View style={styles.buttonView}>
                <Text style={styles.buttonText}>Redeem</Text>
              </View>
            </TouchableNativeFeedback>
          )}
          <Text
            style={{
              textAlign: "center",
              fontSize: 14,
              color: "#666",
              marginTop: 5
            }}
          >
            Please show this screen to the merchant. Do not click redeem
            yourself
          </Text>
        </View>
      );
    } else {
      return <View></View>;
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

    const { title, activePoints, pointsRequired, terms, store } = reward;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content"></StatusBar>
        <View style={styles.contentView}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.pointsView}>
              <View style={styles.pointsViewCircle}>
                <Text style={styles.activePoints}>{activePoints}</Text>
                <Text style={styles.requiredPoints}>{pointsRequired}</Text>
              </View>
            </View>
            <Text style={styles.rewardTitle}>{title}</Text>
            <View style={styles.storeHeader}>
              {/* <View style={styles.storeLogoBox}>
                <StoreLogo
                  store={store}
                  style={styles.storeLogoImage}
                ></StoreLogo>
              </View> */}
              <View style={styles.storeDetails}>
                <Text style={styles.storeName}>{store.storeName}</Text>
                <Text style={styles.storeAddress}>
                  {store.location.addressLine1}
                </Text>
              </View>
            </View>
            <View style={styles.termsField}>
              <Text style={styles.termsLabel}>Terms and conditions</Text>
              <Text style={styles.termsText}>
                {terms || "No terms or conditions specified."}
              </Text>
            </View>
          </ScrollView>
        </View>
        {this.maybeRenderRedeem()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "stretch"
  },
  contentView: {
    flex: 1
  },
  actionView: {
    padding: 20
  },
  scrollView: {
    backgroundColor: "#fff",
    padding: 20
  },
  /**
   * Reward title styles
   */
  rewardTitle: {
    fontSize: 42,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 15
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
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 4
  },
  storeAddress: {
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
    width: 200,
    height: 200,
    borderRadius: 200,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center"
  },
  activePoints: {
    fontSize: 42,
    color: "#fff",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.75)",
    marginBottom: 10
  },
  requiredPoints: {
    fontSize: 20,
    color: "#999"
  },
  /**
   * Terms view
   */
  termsField: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#f6f6f6",
    borderRadius: 10
  },
  termsLabel: {
    fontSize: 12,
    color: "#666",
    textTransform: "uppercase",
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.08)"
  },
  termsText: {
    fontSize: 16,
    color: "#000"
  },
  /**
   * Redeem button
   */
  buttonView: {
    backgroundColor: "#52cb60",
    padding: 15,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },
  buttonText: { color: "#fff", fontSize: 16 },
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
