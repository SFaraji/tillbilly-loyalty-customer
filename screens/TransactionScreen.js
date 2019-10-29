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
import StoreLogo from "../components/StoreLogo";

const LineItem = props => {
  let { itemName, points, totalPrice, quantity } = { ...props.lineItem };

  points = parseInt(points);
  totalPrice = parseFloat(totalPrice);
  totalPrice = parseInt(totalPrice * 100) / 100;

  return (
    <View style={styles.tableRow}>
      <View style={styles.fillCol}>
        <Text style={styles.tableText}>{itemName}</Text>
      </View>
      <View style={styles.fixedCol}>
        <Text style={styles.tableText}>{quantity}</Text>
      </View>
      <View style={styles.fixedCol}>
        <Text style={styles.tableText}>{points}</Text>
      </View>
      <View style={styles.fixedCol}>
        <Text style={styles.tableText}>{"$" + totalPrice}</Text>
      </View>
    </View>
  );
};

export default class TransactionScreen extends React.Component {
  static navigationOptions = {
    title: "Transaction Details",
    headerRight: <View></View>
  };

  state = {
    transaction: null,
    store: null,
    points: "Loading",
    amount: "Loading"
  };

  componentDidMount = async () => {
    const store = await this.props.navigation.getParam("store", null);
    const transaction = await this.props.navigation.getParam(
      "transaction",
      null
    );

    if (store && transaction) {
      const { lineItems } = transaction;
      let points = 0;
      let amount = 0;

      lineItems.forEach(item => {
        points += parseInt(item.points);
        amount += parseFloat(item.totalPrice);
      });

      amount = parseInt(amount * 100) / 100;

      this.setState({
        transaction: transaction,
        store: store,
        amount: amount,
        points: points
      });
    }
  };

  renderLineItems = () => {
    const { lineItems } = this.state.transaction;

    return lineItems.map((lineItem, index) => (
      <LineItem key={index} lineItem={lineItem}></LineItem>
    ));
  };

  render() {
    const { store, transaction, amount, points } = this.state;

    if (!store && !transaction) {
      return (
        <View style={styles.dummyPointTile}>
          <ActivityIndicator size={20}></ActivityIndicator>
          <Text style={{ marginTop: 10, fontSize: 14 }}>Loading</Text>
        </View>
      );
    }

    const { createdAt } = transaction;

    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content"></StatusBar>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.subHeader}>
            <View style={styles.storeDetails}>
              <View style={styles.storeLogoBox}>
                <StoreLogo store={store}></StoreLogo>
              </View>
              <Text style={styles.storeName}>{store.storeName}</Text>
              <Text style={styles.dateLabel}>
                {new Date(createdAt).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.pointAmountBox}>
              <View style={styles.pointAmountItem}>
                <Text style={styles.pointAmountText}>{"$" + amount}</Text>
              </View>
              <View style={styles.pointAmountItem}>
                <Text style={styles.pointAmountText}>{points + " pts"}</Text>
              </View>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.tableHeader}>
              <View style={styles.fillCol}>
                <Text style={styles.tableText}>Item</Text>
              </View>
              <View style={styles.fixedCol}>
                <Text style={styles.tableText}>Qty</Text>
              </View>
              <View style={styles.fixedCol}>
                <Text style={styles.tableText}>Pts</Text>
              </View>
              <View style={styles.fixedCol}>
                <Text style={styles.tableText}>Amount</Text>
              </View>
            </View>
            {this.renderLineItems()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  /**
   * Sub header styles
   */
  subHeader: {
    padding: 20,
    backgroundColor: "rgb(245, 243, 251)"
    // alignItems: "center",
    // justifyContent: "center"
  },
  storeLogoBox: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#666",
    marginBottom: 8,
    alignSelf: "center",
    overflow: "hidden"
  },
  storeName: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center"
  },
  dateLabel: {
    fontSize: 14,
    color: "#666",
    textAlign: "center"
  },
  pointAmountBox: {
    flexDirection: "row",
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: "rgba(191, 191, 191, 0.3)",
    paddingTop: 15
  },
  pointAmountItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  pointAmountText: {
    fontSize: 24,
    color: "#000"
  },
  // Body
  body: {
    padding: 25
  },
  // Table header styles
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(191, 191, 191)"
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 15
  },
  fillCol: {
    flex: 1
  },
  fixedCol: {
    width: 70,
    alignItems: "flex-end"
  },
  tableText: {
    fontSize: 15,
    color: "#333"
  },
  // Empty tile
  dummyPointTile: {
    margin: 10,
    borderRadius: 20,
    overflow: "hidden",
    paddingVertical: 30,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});
