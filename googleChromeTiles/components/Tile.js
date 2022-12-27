import { View } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import { MARGIN } from "../config";

const Tile = ({ uri }) => {
  const box = {
    height: 170,
  };
  return (
    <View pointerEvents="none" style={[box, { margin: MARGIN }]}>
      <WebView
        originWhitelist={["*"]}
        source={{ uri }}
        style={{ flex: 1, borderRadius: MARGIN }}
      />
    </View>
  );
};

export default Tile;
