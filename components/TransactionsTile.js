import React from "react";
import {
  Platform,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback
} from "react-native";

const TransactionsTile = props => {
  return (
    <View>
      {Platform.OS === "ios" ? (
        <TouchableOpacity
          onPress={() => {
            props.onPress(props.transaction);
          }}
        >
          {TransactionView(props.transaction)}
        </TouchableOpacity>
      ) : (
        <TouchableNativeFeedback
          delayPressIn={0.5}
          delayPressOut={0.5}
          onPress={() => {
            props.onPress(props.transaction);
          }}
        >
          {TransactionView(props.transaction)}
        </TouchableNativeFeedback>
      )}
    </View>
  );
};

const TransactionView = transaction => {
  const { transactionType, createdAt, lineItems } = transaction;
  let points = 0;
  let totalPrice = 0;

  lineItems.forEach(item => {
    points += parseInt(item.points);
    totalPrice += parseFloat(item.totalPrice);
  });

  totalPrice = parseInt(totalPrice * 100) / 100;

  return (
    <View style={styles.transactionTile}>
      <View style={styles.transactionTileLeft}>
        <Text style={styles.transactionTileDate}>
          {new Date(createdAt).toLocaleDateString()}
        </Text>
        <Text style={styles.transactionTileItems}>
          {"$" +
            totalPrice +
            " - " +
            lineItems.length +
            (lineItems.length > 1 ? " items" : " item")}
        </Text>
        <Text style={styles.transactionTileType}>
          {transactionType === "credit" ? "Credited" : "Redeemed"}
        </Text>
      </View>
      <View style={styles.transactionTileRight}>
        <Text style={styles.transactionTilePoints}>{points + " pts"}</Text>
      </View>
    </View>
  );
};

export default TransactionsTile;

const styles = StyleSheet.create({
  // Tansaction tile styles
  transactionTile: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "rgb(191, 191, 191)",
    paddingVertical: 15
  },
  transactionTileLeft: {
    flex: 1
  },
  transactionTileDate: {
    color: "#000",
    fontSize: 14,
    marginBottom: 4
  },
  transactionTileItems: {
    color: "#aaa",
    fontSize: 12,
    marginBottom: 4
  },
  transactionTileType: {
    color: "#aaa",
    fontSize: 12
  },
  transactionTileRight: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  transactionTilePoints: {
    fontSize: 16,
    color: "#000"
  }
});
