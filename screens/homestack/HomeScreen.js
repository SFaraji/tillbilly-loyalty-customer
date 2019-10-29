import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Image,
  StatusBar,
  RefreshControl
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import SessionService from "../../services/SessionService";
import Rewards from "../../data-store/RewardsStore";
import UpcomingRewards from "../../data-store/UpcomingRewardStore";

import RewardTile from "../../components/RewardTile";

export default class HomeScreen extends React.Component {
  state = {
    user: undefined,
    dimensions: undefined,
    displayName: "Loading",
    rewards: [],
    upcomingRewards: [],
    refreshing: false
  };

  onLayout = event => {
    let { width, height } = event.nativeEvent.layout;
    this.setState({ dimensions: { width, height } });
  };

  componentDidMount = () => {
    this.props.navigation.addListener("willFocus", () => {
      this.updateRewards();
    });
  };

  updateRewards = async () => {
    const rewards = await Rewards.getItemsAsync();
    const upcomingRewards = await UpcomingRewards.getItemsAsync();

    this.setState({
      user: SessionService.user,
      rewards: rewards,
      upcomingRewards: upcomingRewards
    });

    this.getRewardsFromServer();
  };

  getRewardsFromServer = async () => {
    const rewards = await Rewards.getRewardsFromServerAsync({
      sort: "unlocked",
      expand: "store"
    });

    const upcomingRewards = await UpcomingRewards.getRewardsFromServerAsync({
      sort: "close",
      expand: "store"
    });

    this.setState({ rewards: rewards, upcomingRewards: upcomingRewards });
  };

  handleQRPress = () => {
    this.props.navigation.navigate("QRCode");
  };

  renderQrButton = () => {
    return (
      <TouchableHighlight onPress={this.handleQRPress}>
        <View style={styles.qrbutton}>
          <AntDesign name="qrcode" size={128} color="#fff"></AntDesign>
        </View>
      </TouchableHighlight>
    );
  };

  renderBgGraphic = () => {
    if (!this.state.dimensions) {
      return <View></View>;
    }

    const { width, height } = this.state.dimensions;
    const radius = width / 2;
    const radiusH = radius * Math.sqrt(2);
    const centerOffsetY = height - radius;
    const bleed = radiusH - centerOffsetY;
    const borderRadius = 80;
    const borderRadiusH = borderRadius * Math.sqrt(2);
    const extraBleed = borderRadiusH - borderRadius;

    return (
      <View
        style={{
          position: "absolute",
          borderRadius: borderRadius,
          backgroundColor: "#353941",
          top: -bleed + extraBleed,
          left: -radius / 2,
          width: radius * 2,
          height: radius * 2,
          transform: [{ rotate: "45deg" }]
        }}
      ></View>
    );
  };

  renderDisplayName = () => {
    const { user } = this.state;
    if (user) {
      let name = user.displayName;

      if (user.firstName) {
        name = user.firstName;
      }

      return name;
    } else {
      return "Loading";
    }
  };

  renderRewardTiles = upcoming => {
    let rewards = upcoming ? this.state.upcomingRewards : this.state.rewards;

    if (rewards && rewards.length > 0) {
      return rewards.map((reward, index) => (
        <RewardTile
          key={index}
          reward={reward}
          onPress={_reward => {
            this.props.navigation.navigate("RewardDetails", {
              reward: _reward
            });
          }}
          onRedeem={_reward => {
            console.log("Redeem", _reward);
          }}
        />
      ));
    } else if (rewards && rewards.length === 0) {
      return (
        <View style={styles.dummyRewardTile}>
          <Text>No rewards</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.dummyRewardTile}>
          <Text>Loading Rewards</Text>
        </View>
      );
    }
  };

  getAvatar = () => {
    const { user } = this.state;

    if (user) {
      const { assetsUrl } = user;
      if (assetsUrl) {
        return { uri: assetsUrl.avatar };
      } else {
        return require("../../assets/images/temp-avatar.png");
      }
    } else {
      return require("../../assets/images/temp-avatar.png");
    }
  };

  onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.getRewardsFromServer();
    this.setState({ refreshing: false });
  };

  render() {
    // console.log(this.state);

    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          ></RefreshControl>
        }
      >
        <StatusBar barStyle="dark-content"></StatusBar>
        <View style={styles.topSection} onLayout={this.onLayout}>
          {this.renderBgGraphic()}
          <View style={styles.topSectionSplit}>
            <View style={styles.topSectionLeft}>
              <Image source={this.getAvatar()} style={styles.avatar}></Image>
              <Text style={styles.topSectionText}>hello</Text>
              <Text style={styles.topSectionText}>
                {this.renderDisplayName()}
              </Text>
            </View>
            <View style={styles.topSectionRight}>{this.renderQrButton()}</View>
          </View>
        </View>
        <View style={styles.bottomSection}>
          <Text style={styles.sectionTitle}>Unlocked Rewards</Text>
          <View>{this.renderRewardTiles()}</View>
          <Text style={styles.sectionTitle}>Upcoming Rewards</Text>
          <View>{this.renderRewardTiles(true)}</View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  topSection: {
    paddingHorizontal: 25,
    paddingTop: 100,
    paddingBottom: 50
  },
  topSectionSplit: {
    flexDirection: "row"
  },
  topSectionLeft: {
    flex: 1
  },
  avatar: {
    width: 64,
    height: 64,
    marginBottom: 40,
    borderRadius: 100
  },
  topSectionText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "300",
    marginTop: -7
  },
  topSectionRight: {
    flex: 0
  },
  qrbutton: {
    backgroundColor: "#4ab8e1",
    padding: 15,
    borderRadius: 40
  },
  // Bottom section styles
  bottomSection: {
    paddingHorizontal: 15,
    paddingBottom: 50
  },
  sectionTitle: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    fontSize: 16,
    marginBottom: 10,
    marginTop: 20
  },
  // Empty tile
  dummyRewardTile: {
    margin: 10,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    paddingVertical: 30,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});
