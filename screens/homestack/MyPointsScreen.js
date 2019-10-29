import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  StatusBar
} from "react-native";

import PointsTile from "../../components/PointsTile";
import Points from "../../data-store/PointsStore";

export default class MyPointsScreen extends React.Component {
  static navigationOptions = {
    title: "My Points"
  };

  state = {
    refreshing: false,
    pointsArray: []
  };

  componentDidMount = () => {
    this.props.navigation.addListener("willFocus", () => {
      this.updatePoints();
    });
  };

  updatePoints = async () => {
    const pointsArray = await Points.getItemsAsync();
    this.setState({ pointsArray, pointsArray });

    this.getPointsFromServer();
  };

  getPointsFromServer = async () => {
    const pointsArray = await Points.getPointsFromServerAsync();
    this.setState({ pointsArray, pointsArray });
  };

  renderPoints = () => {
    const { pointsArray } = this.state;

    if (pointsArray && pointsArray.length > 0) {
      return pointsArray.map((point, index) => (
        <PointsTile
          key={index}
          point={point}
          onPress={_point => {
            this.props.navigation.navigate("Transactions", {
              store: _point.store
            });
          }}
        ></PointsTile>
      ));
    } else if (pointsArray && pointsArray.length === 0) {
      return (
        <View style={styles.dummyPointTile}>
          <Text style={{ marginTop: 10, fontSize: 16 }}>
            No transactions yet
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.dummyPointTile}>
          <ActivityIndicator size={20}></ActivityIndicator>
          <Text style={{ marginTop: 10, fontSize: 16 }}>Loading</Text>
        </View>
      );
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content"></StatusBar>
        <View style={styles.tableHeader}>
          <View style={styles.fillCol}>
            <Text style={{ ...styles.tableLabel, textAlign: "left" }}>
              Merchant
            </Text>
          </View>
          <View style={styles.pointsCol}>
            <Text style={styles.tableLabel}>Current pts</Text>
          </View>
          <View style={styles.pointsCol}>
            <Text style={styles.tableLabel}>Archived</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          <View>{this.renderPoints()}</View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#353941",
    padding: 20
  },
  fillCol: {
    flex: 1
  },
  pointsCol: {
    width: 80
  },
  tableLabel: {
    color: "#4ab8e1",
    fontSize: 14,
    textAlign: "right"
  },
  // Empty tile
  dummyPointTile: {
    margin: 10,
    borderRadius: 20,
    overflow: "hidden",
    // backgroundColor: "#f0f0f0",
    paddingVertical: 30,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});
