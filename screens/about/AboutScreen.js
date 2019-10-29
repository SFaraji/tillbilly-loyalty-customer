import React from "react";
import { View, Text, StyleSheet, Linking, ScrollView } from "react-native";
import Licenses from "../../data-store/Licenses";

export default class AboutScreen extends React.Component {
  static navigationOptions = {
    title: "About"
  };

  state = {
    licenses: []
  };

  componentDidMount = () => {
    let licenses = Object.keys(Licenses).map(key => {
      const { licenseUrl } = Licenses[key];
      const [name, version] = key.split("@");
      return {
        name,
        version,
        link: licenseUrl
      };
    });

    this.setState({ licenses });
  };

  renderLicenses = () => {
    const { licenses } = this.state;

    return licenses.map((license, index) => (
      <View key={index}>
        <Text style={styles.paragraph}>{license.name}</Text>
        <Text style={styles.small}>{"v" + license.version}</Text>
        <Text style={styles.link}>{license.link}</Text>
      </View>
    ));
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.contentBox}>
          <Text style={styles.title}>TillBilly - Loyalty Rewards</Text>
          <Text style={styles.subtitle}>Eat. Drink. Earn. Get Rewards</Text>
          <Text style={styles.small}>Version 1.0</Text>
          <Text style={styles.paragraph}>
            Earn points with every purchase and redeem them for rewards at your
            favourite café or restaurant. Goodbye paper loyalty cards - hello
            TillBilly!
          </Text>
          <Text style={styles.paragraph}>
            Loyalty cards suck! Be it paper stamp cards from cafes or plastic
            cards with barcode, they simply add bulk to your wallet, are often
            misplaced and tells you nothing about how many points do you have.
          </Text>
          <Text style={styles.paragraph}>
            TillBilly will turn your favourite café and restaurants’ boring
            loyalty rewards program into an engaging experience just like a game
            - where you earn points with selected purchases and track your
            unlocked and upcoming rewards in real time.
          </Text>
          <Text style={styles.paragraph}>
            And guess what, you can also store all those barcode plastic cards
            as virtual cards within the app and ditch those paper receipts for
            TillBilly Digital Receipts.
          </Text>
          <Text style={styles.paragraph}>
            Keep your wallet clutter free - In a way we can say this app will
            help you lose weight ;)
          </Text>
          <Text
            style={{ ...styles.paragraph, ...styles.link }}
            onPress={() => {
              Linking.openURL("https://tillbilly.com/terms");
            }}
          >
            Terms of service
          </Text>
          <Text
            style={{ ...styles.paragraph, ...styles.link }}
            onPress={() => {
              Linking.openURL("https://tillbilly.com/privacy");
            }}
          >
            Privacy policy
          </Text>
        </View>
        <View style={styles.separator}></View>
        <View style={styles.contentBox}>
          <Text style={styles.title}>Third Party Licenses</Text>
          {this.renderLicenses()}
        </View>
        <View style={{ paddingVertical: 40 }}></View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 25
  },
  contentBox: {},
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginVertical: 20
  },
  title: {
    fontSize: 22
  },
  subtitle: {
    fontSize: 18,
    color: "#666"
  },
  paragraph: {
    fontSize: 16,
    marginTop: 15
  },
  small: {
    fontSize: 14,
    color: "#aaa"
  },
  link: {
    color: "#0099ff"
  }
});
