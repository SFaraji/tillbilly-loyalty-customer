import React from "react";
import { StyleSheet, Text, View, StatusBar, ScrollView } from "react-native";

import KeyboardShift from "../../components/KeyboardShift";
import AppTextInput from "../../components/AppTextInput";
import AppButton from "../../components/AppButton";
import ColorPalette from "../../components/ColorPalatte";

import Cards from "../../data-store/CardsStore";

export default class EditCardScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const scanData = navigation.getParam("scanData", null);
    return {
      title: scanData ? "Add Card" : "Edit Card",
      headerRight: <View></View>
    };
  };

  state = {
    existing: false,
    cardData: {
      id: "",
      name: "",
      number: "",
      color: "#03a9f4",
      notes: ""
    }
  };

  async componentDidMount() {
    const scanData = await this.props.navigation.getParam("scanData", null);
    const cardData = await this.props.navigation.getParam("cardData", null);

    if (scanData) {
      this.setState({
        cardData: {
          name: "",
          number: scanData,
          color: "#03a9f4",
          notes: ""
        }
      });
    } else if (cardData) {
      this.setState({
        existing: true,
        cardData: cardData
      });
    }
  }

  handleTextInput = (value, prop) => {
    let cardData = { ...this.state.cardData };
    cardData[prop] = value;
    this.setState({ cardData: cardData });
  };

  handleCancel = () => {
    const { existing } = this.state;

    if (existing) {
      this.props.navigation.navigate("ConfirmationModal", {
        message: "Are you sure you want to delete this card?",
        onConfirm: this.handleCardRemove
      });
    } else {
      this.props.navigation.goBack();
    }
  };

  handleCardRemove = async () => {
    const { cardData } = this.state;
    await Cards.removeCard(cardData);
    this.props.navigation.goBack();
  };

  handleSubmit = async () => {
    let { existing, cardData } = this.state;

    if (existing) {
      await Cards.updateItemAsync(cardData);
    } else {
      cardData.id = new Date().getTime();
      await Cards.addCard(this.state.cardData);
    }
    this.props.navigation.goBack();
  };

  handleColorChange = color => {
    let cardData = { ...this.state.cardData };
    cardData.color = color;
    this.setState({ cardData: cardData });
  };

  renderColorPicker = () => {
    let { color } = this.state.cardData;
    return <ColorPalette onChange={this.handleColorChange} value={color} />;
  };

  render() {
    const { cardData, existing } = this.state;
    const { name, number, notes, color } = cardData;

    return (
      <KeyboardShift>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <ScrollView>
            {/* <View style={styles.subheader}>
              <View style={styles.cardView}>
                <Text style={styles.cardName}>{name || "No name"}</Text>
                <Text style={styles.cardNumber}>
                  {number || "SCANNED CARD NUMBER"}
                </Text>
              </View>
            </View> */}
            <View style={styles.body}>
              <View style={{ marginBottom: 25 }}>
                <Text
                  style={{
                    paddingLeft: 10,
                    marginBottom: 5,
                    color: "rgb(166, 166, 166)"
                  }}
                >
                  Tile Color
                </Text>
                {this.renderColorPicker()}
              </View>
              <AppTextInput
                onChangeText={value => {
                  this.handleTextInput(value, "name");
                }}
                value={name}
                label="Card Name"
              />
              <AppTextInput
                onChangeText={value => {
                  this.handleTextInput(value, "number");
                }}
                value={number}
                label="Card Number"
              />
              <AppTextInput
                label="Notes"
                multiline={true}
                numberOfLines={5}
                value={notes}
                onChangeText={value => {
                  this.handleTextInput(value, "notes");
                }}
              />
            </View>
          </ScrollView>
          <View style={styles.buttonBox}>
            <AppButton
              title={existing ? "Update" : "Add"}
              onPress={this.handleSubmit}
            />
            <View style={styles.gutter} />
            <AppButton
              title={existing ? "Delete" : "Cancel"}
              color="rgb(244, 57, 56)"
              onPress={this.handleCancel}
            />
          </View>
        </View>
      </KeyboardShift>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  body: {
    flex: 1,
    padding: 20
  },
  subheader: {
    padding: 20
  },
  cardView: {
    width: "100%",
    borderRadius: 7,
    backgroundColor: "#333",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20
  },
  cardName: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 5
  },
  cardNumber: {
    fontSize: 18,
    color: "#eee",
    letterSpacing: 2
  },
  addButton: {
    borderBottomColor: "rgb(244, 57, 56)",
    borderBottomWidth: 0.25,
    padding: 10,
    backgroundColor: "rgb(11,17,35)",
    borderRadius: 15,
    overflow: "hidden",
    marginLeft: 15
  },
  addButtonText: {
    width: 30,
    height: 30,
    fontSize: 30,
    color: "#fff",
    textAlign: "center"
  },
  buttonBox: {
    flexDirection: "row",
    width: "100%",
    padding: 20
  },
  gutter: {
    width: 10,
    flex: 0
  }
});
