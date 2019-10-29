import React from "react";
import { Image } from "react-native";

const StoreLogo = props => {
  const { assetsUrl } = props.store;
  if (assetsUrl && assetsUrl.logo) {
    return (
      <Image
        style={props.style || { width: "100%", height: "100%" }}
        source={{ uri: assetsUrl.logo }}
      ></Image>
    );
  }
};

export default StoreLogo;
