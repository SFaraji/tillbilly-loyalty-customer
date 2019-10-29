import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const colors = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#607d8b"
];

export default class ColorPalatte extends React.Component {
  state = {
    dimensions: null
  };

  onLayout = event => {
    let { width, height } = event.nativeEvent.layout;
    this.setState({ dimensions: { width, height } });
  };

  handleColorPress = color => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(color);
    }
  };

  renderColorBoxes = () => {
    if (!this.state.dimensions) {
      return <View></View>;
    }

    const { width } = this.state.dimensions;
    const side = width / 6;

    return colors.map((color, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          this.handleColorPress(color);
        }}
      >
        <View
          style={{
            ...styles.box,
            width: side,
            height: side
          }}
        >
          <View style={{ ...styles.boxInner, backgroundColor: color }}>
            {this.maybeRenderSelected(color)}
          </View>
        </View>
      </TouchableOpacity>
    ));
  };

  maybeRenderSelected = color => {
    let { value } = { ...this.props };
    if (color.toLowerCase() === value.toLowerCase()) {
      return <AntDesign name="checkcircleo" size={24} color="#fff" />;
    }
  };

  render() {
    return (
      <View style={styles.container} onLayout={this.onLayout}>
        {this.renderColorBoxes()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
  box: {
    padding: 5
  },
  boxInner: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  selected: {
    width: 10,
    height: 10,
    backgroundColor: "#000"
  }
});
