import React, { memo, useEffect } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { Theme } from "../constants/theme";

interface Props {
  image: any;
  angle: number;
  x: number;
  y: number;
  scale: number;
  selected: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

function FanCard({
  image,
  angle,
  x,
  y,
  scale,
  selected,
  disabled = false,
  onPress,
}: Props) {
  const scaleValue = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    scaleValue.value = withSpring(selected ? 0.9 : 1, {
      damping: 14,
      stiffness: 140,
    });

    opacity.value = withTiming(selected ? 0.25 : 1, {
      duration: 250,
    });
  }, [selected]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: x },
      { translateY: y },
      { rotate: `${angle}deg` },
      { scale: scaleValue.value * scale },
    ],
  }));

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <Pressable
        style={styles.pressable}
        disabled={disabled}
        onPress={onPress}
      >
        <Image
          source={image}
          style={styles.image}
          resizeMode="cover"
          fadeDuration={0}
        />
      </Pressable>
    </Animated.View>
  );
}

function areEqual(prev: Props, next: Props) {
  return (
    prev.selected === next.selected &&
    prev.disabled === next.disabled &&
    prev.angle === next.angle &&
    prev.x === next.x &&
    prev.y === next.y &&
    prev.scale === next.scale &&
    prev.image === next.image
  );
}

export default memo(FanCard, areEqual);

const styles = StyleSheet.create({
  card: {
    position: "absolute",

    width: 78,
    height: 126,

    borderRadius: 0,
    overflow: "hidden",

    shadowColor: Theme.colors.shadow,
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 10,
  },

  pressable: {
    flex: 1,
  },

  image: {
    width: "100%",
    height: "100%",

    borderRadius: 0,
  },
});