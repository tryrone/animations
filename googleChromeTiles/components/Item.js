import { Dimensions, StyleSheet } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { animationConfig, COL, getOrder, getPosition, SIZE } from "../config";
import Animated, {
  scrollTo,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

const Item = ({ children, positions, id, scrollView, scrollY }) => {
  const inset = useSafeAreaInsets();
  const containerHeight =
    Dimensions.get("window")?.height - inset?.top - inset?.bottom;
  const contentHeight = (Object?.keys(positions?.value)?.length / COL) * SIZE;
  const position = getPosition(positions?.value[id]);

  const isGestureActive = useSharedValue(false);

  const translateX = useSharedValue(position?.x);
  const translateY = useSharedValue(position?.y);

  useAnimatedReaction(
    () => positions?.value[id],
    (newOrder) => {
      const newPosition = getPosition(newOrder);
      translateX.value = withTiming(newPosition.x, animationConfig);
      translateY.value = withTiming(newPosition.y, animationConfig);
    }
  );

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      isGestureActive.value = true;
      ctx.x = translateX.value;
      ctx.y = translateY.value;
    },
    onActive: ({ translationX, translationY }, ctx) => {
      translateX.value = ctx.x + translationX;
      translateY.value = ctx.y + translationY;

      const oldOrder = positions?.value[id];
      const newOrder = getOrder(translateX?.value, translateY?.value);

      if (oldOrder !== newOrder) {
        const idToSwap = Object.keys(positions?.value).find(
          (key) => positions?.value[key] === newOrder
        );
        if (idToSwap) {
          const newPositions = JSON.parse(JSON.stringify(positions?.value));
          newPositions[id] = newOrder;
          newPositions[idToSwap] = oldOrder;
          positions.value = newPositions;
        }
      }

      const lowerBound = scrollY?.value;
      const upperBound = lowerBound + containerHeight - SIZE;
      const maxScroll = contentHeight - containerHeight;
      const scrollLeft = maxScroll - scrollY?.value;

      if (translateY?.value > upperBound) {
        const diff = Math.min(translateY?.value - upperBound, scrollLeft);
        scrollY.value += diff;
        ctx.y += diff;
        translateY.value = ctx.y + translationY;
        scrollTo(scrollView, 0, scrollY?.value, false);
      }

      if (translateY?.value < lowerBound) {
        const diff = Math.min(lowerBound - translateY?.value, lowerBound);
        scrollY.value -= diff;
        ctx.y -= diff;
        translateY.value = ctx.y + translationY;
        scrollTo(scrollView, 0, scrollY?.value, false);
      }
    },

    onEnd: () => {
      const destination = getPosition(positions?.value[id]);
      translateX.value = withTiming(destination.x, animationConfig, () => {
        isGestureActive.value = false;
      });
      translateY.value = withTiming(destination.y, animationConfig);
    },
  });

  const style = useAnimatedStyle(() => {
    const zIndex = isGestureActive.value ? 100 : 0;
    const scale = isGestureActive.value ? 1.1 : 1;
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width: SIZE,
      height: SIZE,
      zIndex,
      transform: [
        {
          translateX: translateX?.value,
        },
        {
          translateY: translateY?.value,
        },
        { scale },
      ],
    };
  });

  return (
    <Animated.View style={style}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={StyleSheet?.absoluteFill}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default Item;
