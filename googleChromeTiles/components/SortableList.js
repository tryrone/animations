import React from "react";
import { COL, SIZE } from "../config";
import Item from "./Item";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

const SortableList = ({ children }) => {
  const scrollView = useAnimatedRef();
  const scrollY = useSharedValue(0);
  const positions = useSharedValue(
    Object.assign(
      {},
      ...children?.map((child, index) => ({ [child?.props?.id]: index }))
    )
  );

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }) => {
      scrollY.value = y;
    },
  });

  return (
    <Animated.ScrollView
      ref={scrollView}
      contentContainerStyle={{
        height: Math.ceil((children.length / COL) * SIZE),
      }}
      showsVerticalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16}
      onScroll={onScroll}
    >
      {children?.map((child) => {
        return (
          <Item
            scrollView={scrollView}
            key={child?.props?.id}
            id={child?.props?.id}
            positions={positions}
            scrollY={scrollY}
          >
            {child}
          </Item>
        );
      })}
    </Animated.ScrollView>
  );
};

export default SortableList;
