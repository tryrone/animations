import { View, Animated, PanResponder } from "react-native";
import React, { useRef } from "react";

const Deck = ({ data = [], renderCard = () => {} }) => {
  const panResponder = useRef(
    PanResponder.create({
      // onMoveShouldSetPanResponder: () => true,
      // onPanResponderGrant: () => {
      //   pan.setOffset({
      //     x: pan.x._value,
      //     y: pan.y._value,
      //   });
      // },
      // onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      // onPanResponderRelease: () => {
      //   pan.flattenOffset();
      // },
    })
  ).current;

  const renderCards = () => {
    return data.map((item) => {
      return renderCard(item);
    });
  };
  return <View>{renderCards()}</View>;
};

export default Deck;
