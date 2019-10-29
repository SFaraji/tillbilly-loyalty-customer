import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableHighlight
} from "react-native";
import Barcode from "react-native-barcode-builder";

// https://expo.github.io/vector-icons/
import { Feather } from "@expo/vector-icons";

export default class ViewCardScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const card = navigation.getParam("card", null);
    return {
      headerTitle: card.name || "Card Details",
      headerRight: (
        <TouchableHighlight
          style={{ paddingRight: 10 }}
          onPress={navigation.getParam("handleEditPress")}
        >
          <Feather name="edit-2" size={22} color="#000"></Feather>
        </TouchableHighlight>
      )
    };
  };

  state = {
    card: null
  };

  async componentDidMount() {
    const card = await this.props.navigation.getParam("card", null);

    this.props.navigation.setParams({ handleEditPress: this.handleEditPress });

    this.setState({ card });
  }

  handleEditPress = () => {
    this.props.navigation.replace("EditCard", {
      cardData: this.state.card
    });
  };

  render() {
    const { card } = this.state;
    if (!card) return <View></View>;

    const { number, color, notes } = card;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content"></StatusBar>
        <View style={styles.aboveFold}>
          <Barcode value={number} format="CODE128" />
          <Text style={styles.number}>{number}</Text>
        </View>
        <View style={styles.belowFold}>
          <Text style={styles.notes}>{notes || "No notes added"}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  aboveFold: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  number: {
    fontSize: 20,
    color: "#000",
    marginTop: 25,
    letterSpacing: 2
  },
  belowFold: {
    padding: 15,
    backgroundColor: "rgb(245, 243, 251)"
  },
  notes: {
    fontSize: 14,
    color: "#999"
  }
});
