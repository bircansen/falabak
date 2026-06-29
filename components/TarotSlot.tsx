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
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
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
  const shimmerX = useSharedValue(-100);

  useEffect(() => {
    scale.value = withSpring(image ? 1 : 0.96, {
      damping: 14,
      stiffness: 150,
    });
  }, [image]);

  useEffect(() => {
    if (loading) {
      shimmerX.value = withRepeat(
        withTiming(180, {
          duration: 1000,
        }),
        -1,
        false
      );
    } else {
      shimmerX.value = -100;
    }
  }, [loading]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: shimmerX.value,
      },
      {
        rotate: "20deg",
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
          <View
            pointerEvents="none"
            style={styles.loadingOverlay}
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
                  "rgba(255,255,255,0.18)",
                  "transparent",
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />
            </Animated.View>
          </View>
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
      height: 5,
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
  },

  shimmer: {
    position: "absolute",

    top: -40,
    bottom: -40,
    left: -20,

    width: 55,
  },

  title: {
    marginTop: Theme.spacing.sm,

    color: Theme.colors.text,

    fontSize: Theme.fontSizes.md,

    fontWeight: "700",

    textAlign: "center",
  },
});