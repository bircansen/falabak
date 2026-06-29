import React, { memo, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { Theme } from "../constants/theme";

interface TarotSlotProps {
  title: string;
  image?: ImageSourcePropType;
  revealed: boolean;
  loading?: boolean;
}

const SLOT_IMAGE = require("../assets/cards/slot-empty.png");
const CARD_BACK = require("../assets/cards/card-back.png");

function TarotSlot({
  title,
  image,
  revealed,
  loading = false,
}: TarotSlotProps) {
  const scale = useSharedValue(0.96);

const translateX = useSharedValue(-180);
const opacity = useSharedValue(0.75);

  useEffect(() => {
    scale.value = withSpring(image ? 1 : 0.96, {
      damping: 14,
      stiffness: 150,
    });
  }, [image]);

  useEffect(() => {
  if (loading) {
    translateX.value = withRepeat(
      withTiming(320, {
        duration: 1200,
      }),
      -1,
      false
    );

    opacity.value = withRepeat(
      withSequence(
        withTiming(1, {
          duration: 900,
        }),
        withTiming(0.75, {
          duration: 900,
        })
      ),
      -1,
      true
    );
  } else {
    cancelAnimation(translateX);
    cancelAnimation(opacity);

    translateX.value = -180;
    opacity.value = 0.75;
  }

  return () => {
    cancelAnimation(translateX);
    cancelAnimation(opacity);
  };
}, [loading]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const skeletonStyle = useAnimatedStyle(() => ({
  opacity: opacity.value,
}));

const shimmerStyle = useAnimatedStyle(() => ({
  transform: [
    {
      translateX: translateX.value,
    },
  ],
}));

  const displayImage = !image
    ? SLOT_IMAGE
    : revealed
    ? image
    : CARD_BACK;

  return (
  <View style={styles.container}>
    <Animated.View
      style={[styles.slot, animatedStyle]}
    >
      <Image
        source={displayImage}
        style={styles.card}
        resizeMode="cover"
        fadeDuration={0}
      />

      {loading && image && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.loadingOverlay,
            skeletonStyle,
          ]}
        >
          <Animated.View
            style={[
              styles.shimmer,
              shimmerStyle,
            ]}
          >
            <LinearGradient
              colors={[
                "transparent",
                Theme.colors.white, //overlay
                "transparent",
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        </Animated.View>
      )}
    </Animated.View>

    <Text style={styles.title}>
      {title}
    </Text>
  </View>
); 
}
export default memo(TarotSlot);

const styles = StyleSheet.create({
  container: {
    width: 92,
    alignItems: "center",
  },

  slot: {
    width: 82,
    height: 128,

    overflow: "hidden",

    backgroundColor: Theme.colors.cardDark,

    borderWidth: 1,
    borderColor: Theme.colors.border,

    shadowColor: Theme.colors.shadow,
    shadowOpacity: 0.28,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: Theme.spacing.xs + 1,
    },

    elevation: 8,
  },

  card: {
    width: "100%",
    height: "100%",
  },

  loadingOverlay: {
  ...StyleSheet.absoluteFillObject,
  overflow: "hidden",
  backgroundColor: Theme.colors.cardDark,
},

  shimmer: {
  position: "absolute",
  top: 0,
  bottom: 0,
  width: 140,
},

  title: {
    marginTop: Theme.spacing.sm,
    color: Theme.colors.text,
    fontSize: Theme.fontSizes.md,
    fontWeight: "700",
    textAlign: "center",
  },
});