import { StyleSheet, Animated, View } from "react-native";
import React, { useEffect, useRef } from "react";

const Ball = () => {
  const move = useRef(new Animated.ValueXY(0, 0)).current;

  useEffect(() => {
    Animated.spring(move, {
      toValue: { x: 200, y: 500 },
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{ transform: [{ translateX: move.x }, { translateY: move.y }] }}
    >
      <View style={styles.circle} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: "black",
  },
});

export default Ball;
