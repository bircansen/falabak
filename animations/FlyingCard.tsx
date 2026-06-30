import React, { useEffect } from "react";
import { Image, StyleSheet } from "react-native";

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

import { Theme } from "../constants/theme";

interface Props {
  image: any;

  visible: boolean;

  fromX: number;
  fromY: number;

  toX: number;
  toY: number;

  fromAngle?: number;

  onFinish?: () => void;
}

export default function FlyingCard({
  image,
  visible,
  fromX,
  fromY,
  toX,
  toY,
  fromAngle = 0,
  onFinish,
}: Props) {
  const progress = useSharedValue(0);
  const rotation = useSharedValue(fromAngle);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(1);
  

  useEffect(() => {
    if (!visible) {
      opacity.value = 0;
      progress.value = 0;
      return;
    }

    progress.value = 0;
    rotation.value = fromAngle;
    opacity.value = 1;
    scale.value = 1;

    rotation.value = withTiming(
  rotation.value > 0
    ? -4
    : 4,
  {
    duration:220,
  },
  () => {
    rotation.value = withTiming(0,{
      duration:330,
    });
  }
);
   scale.value = withTiming(
  1.06,
  {
    duration:220,
  },
  () => {
    scale.value = withTiming(0.9,{
      duration:330,
    });
  }
);
    progress.value = withTiming(
  1,
  {
    duration:400,
    easing: Easing.out(Easing.exp),
  },
      (finished) => {
        if (finished && onFinish) {
          runOnJS(onFinish)();
        }
      }
    );
  }, [
    visible,
    fromX,
    fromY,
    toX,
    toY,
    fromAngle,
    onFinish,
  ]);

  const animatedStyle = useAnimatedStyle(() => {
    const x = fromX + (toX - fromX) * progress.value;

    const y =
      fromY +
      (toY - fromY) * progress.value -
      Math.sin(progress.value * Math.PI) * 95

    return {
      opacity: opacity.value,
      transform: [
        { translateX: x },
        { translateY: y },
        { rotate: `${rotation.value}deg` },
        { scale: scale.value },
      ],
    };
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.container, animatedStyle]}
    >
      <Image
        source={image}
        style={styles.image}
        resizeMode="cover"
        fadeDuration={0}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
  position: "absolute",

  top: 0,
  left: 0,

  width: 78,
  height: 126,

  zIndex: 9999,

  elevation: 999,
},

  image: {
    width: "100%",
    height: "100%",
    borderRadius: Theme.radius.sm,
  },
});