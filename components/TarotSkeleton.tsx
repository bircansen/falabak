import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { Theme } from "../constants/theme";

export default function TarotSkeleton() {
  const translateX = useSharedValue(-180);
  const opacity = useSharedValue(0.75);

  useEffect(() => {
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
  }, []);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, textStyle]}>
        🔮 Kartların enerjisi okunuyor...
      </Animated.Text>

      <Text style={styles.subtitle}>
        Geçmiş • Şimdi • Gelecek
      </Text>

      {[1, 2, 3].map((item) => (
        <View key={item} style={styles.card}>
          <View style={styles.imagePlaceholder} />

          <View style={styles.content}>
            <View
              style={[
                styles.line,
                styles.smallLine,
              ]}
            />

            <View
              style={[
                styles.line,
                styles.mediumLine,
              ]}
            />

            <View
              style={[
                styles.line,
                styles.longLine,
              ]}
            />

            <View
              style={[
                styles.line,
                styles.mediumLine,
              ]}
            />
          </View>

          <Animated.View
            pointerEvents="none"
            style={[
              styles.shimmer,
              shimmerStyle,
            ]}
          >
            <LinearGradient
              colors={[
                "transparent",
                "rgba(255,255,255,0.15)",
                "transparent",
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.xl,
  },

  title: {
    color: Theme.colors.text,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    marginTop: Theme.spacing.xs ?? 6,
    marginBottom: Theme.spacing.lg,

    color: Theme.colors.textSecondary,
    textAlign: "center",
    fontSize: 14,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",

    overflow: "hidden",

    backgroundColor: Theme.colors.card,

    borderWidth: 1,
    borderColor: Theme.colors.border,

    borderRadius: Theme.radius.xl,

    padding: Theme.spacing.md,

    marginBottom: Theme.spacing.md,
  },

  imagePlaceholder: {
    width: 78,
    height: 122,

    borderRadius: Theme.radius.lg,

    backgroundColor: Theme.colors.cardDark,
  },

  content: {
    flex: 1,
    marginLeft: Theme.spacing.md,
  },

  line: {
    height: 12,

    marginBottom: Theme.spacing.sm,

    borderRadius: Theme.radius.full,

    backgroundColor: Theme.colors.cardDark,
  },

  smallLine: {
    width: "35%",
  },

  mediumLine: {
    width: "70%",
  },

  longLine: {
    width: "95%",
  },

  shimmer: {
    position: "absolute",

    top: 0,
    bottom: 0,

    width: 140,
  },
});