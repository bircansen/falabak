import React, { useEffect } from "react";
import { Image, StyleSheet } from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { Theme } from "../constants/theme";

interface Props {
  image: any;

  visible: boolean;

  fromX: number;
  fromY: number;

  toX: number;
  toY: number;

  onFinish?: () => void;
}

export default function FlyingCard({
  image,
  visible,
  fromX,
  fromY,
  toX,
  toY,
  onFinish,
}: Props) {
  const x = useSharedValue(fromX);
  const y = useSharedValue(fromY);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (!visible) return;

    opacity.value = 1;

    x.value = withTiming(toX, { duration: 500 });

    y.value = withTiming(
      toY,
      { duration: 500 },
      (finished) => {
        if (finished && onFinish) {
          onFinish();
        }
      }
    );

    scale.value = withTiming(0.9, {
      duration: 500,
    });
  }, [visible]);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      {
        translateX: x.value,
      },
      {
        translateY: y.value,
      },
      {
        scale: scale.value,
      },
    ],
  }));

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, style]}>
      <Image
        source={image}
        style={styles.image}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",

    width: 90,
    height: 145,

    zIndex: 999,
  },

  image: {
    width: "100%",
    height: "100%",

    borderRadius: Theme.radius.xl,
  },
});