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

import { API_GetTransactions } from "../components/Endpoints";
import TransactionsTile from "../components/TransactionsTile";
import StoreLogo from "../components/StoreLogo";

export default class TransactionsScreen extends React.Component {
  static navigationOptions = {
    title: "Transactions"
  };

  state = {
    transactions: null,
    store: null
  };

  componentDidMount = async () => {
    const store = await this.props.navigation.getParam("store", null);
    this.setState({ store: store });

    if (store) {
      const transactions = await API_GetTransactions({
        storeId: store.id
      });
      this.setState({ transactions: transactions });
    }
  };

  showStoreName = () => {
    const { store } = this.state;
    if (store) {
      return store.storeName;
    } else {
      return "Loading";
    }
  };

  showStoreAddress = () => {
    const { store } = this.state;
    if (store) {
      const { addressLine1, addressLine2, city, country } = store.location;

      let address = addressLine1;

      if (addressLine2) address += "\n" + addressLine2;

      address += "\n" + city + ", " + country;

      return address;
    } else {
      return "Loading";
    }
  };

  renderTransactions = () => {
    const { transactions } = this.state;

    if (transactions && transactions.length > 0) {
      return transactions.map((transaction, index) => (
        <TransactionsTile
          key={index}
          transaction={transaction}
          onPress={_transaction => {
            this.props.navigation.navigate("Transaction", {
              transaction: _transaction,
              store: this.state.store
            });
          }}
        ></TransactionsTile>
      ));
    } else {
      return (
        <View style={styles.dummyPointTile}>
          <ActivityIndicator size={20}></ActivityIndicator>
          <Text style={{ marginTop: 10, fontSize: 14 }}>Loading</Text>
        </View>
      );
    }
  };

  render() {
    const { store } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content"></StatusBar>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.subHeader}>
            <View style={styles.storeDetailsBox}>
              <View style={styles.storeLogoBox}>
                {store && <StoreLogo store={store}></StoreLogo>}
              </View>
              <View style={styles.storeDetails}>
                <Text style={styles.storeName}>{this.showStoreName()}</Text>
                <Text style={styles.storeAddress}>
                  {this.showStoreAddress()}
                </Text>
              </View>
            </View>
            <View style={styles.tableHeader}>
              <View style={styles.fillCol}>
                <Text style={{ ...styles.tableLabel, textAlign: "left" }}>
                  Date
                </Text>
              </View>
              <View style={styles.pointsCol}>
                <Text style={styles.tableLabel}>Points</Text>
              </View>
            </View>
          </View>
          <View style={styles.body}>{this.renderTransactions()}</View>
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
    backgroundColor: "rgb(245, 243, 251)"
  },
  storeDetailsBox: {
    flexDirection: "row",
    padding: 20
  },
  storeLogoBox: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#666",
    overflow: "hidden"
  },
  storeDetails: {
    flex: 1,
    marginLeft: 15
  },
  storeName: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold"
  },
  storeAddress: {
    fontSize: 14,
    color: "#666"
  },
  // Table header styles
  tableHeader: {
    flexDirection: "row",
    padding: 20
  },
  fillCol: {
    flex: 1
  },
  pointsCol: {
    width: 100
  },
  tableLabel: {
    color: "#000",
    fontSize: 14,
    textAlign: "right"
  },
  // Body
  body: {
    paddingHorizontal: 20
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
