import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableWithoutFeedback,
  ScrollView
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import Cards from "../../data-store/CardsStore";
import CardTile from "../../components/CardTile";

export default class CardsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Cards",
      headerLeft: <View></View>,
      headerRight: (
        <View style={{ marginRight: 10 }}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("AddCard");
            }}
          >
            <AntDesign name="pluscircleo" size={24} color="#fff" />
          </TouchableWithoutFeedback>
        </View>
      )
    };
  };

  state = {
    cards: []
  };

  componentDidMount = async () => {
    this.props.navigation.addListener("willFocus", () => {
      this.updateCards();
    });
  };

  updateCards = async () => {
    const cards = await Cards.getItemsAsync();
    this.setState({ cards });
  };

  renderCards = () => {
    const { cards } = this.state;

    if (cards && cards.length > 0) {
      return cards.map((card, index) => (
        <CardTile
          key={index}
          card={card}
          onPress={_card => {
            this.props.navigation.navigate("ViewCard", {
              card: _card
            });
          }}
        ></CardTile>
      ));
    } else {
      return (
        <View style={styles.dummyPointTile}>
          <Text style={{ fontSize: 14 }}>No cards added</Text>
        </View>
      );
    }
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.body}>{this.renderCards()}</View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    padding: 5,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  // Empty tile
  dummyPointTile: {
    width: "100%",
    paddingVertical: 30,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});
