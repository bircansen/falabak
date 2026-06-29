import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Theme } from "../constants/theme";
import { useCountdown } from "../hooks/useCountdown";

interface PromotionCardProps {
  discountPercent: number;
  countdownDurationSeconds: number;
}

export default function PromotionCard({
  discountPercent,
  countdownDurationSeconds,
}: PromotionCardProps) {
  const {
    hours,
    minutes,
    seconds,
    expired,
  } = useCountdown(countdownDurationSeconds);

  return (
    <LinearGradient
      colors={["#20294A", "#1A223F"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.discountContainer}>
        <View style={styles.discountWrapper}>
          <Image
            source={require("../assets/images/item.png")}
            resizeMode="contain"
            style={styles.discountImage}
          />

          <View style={styles.discountContent}>
            <Text style={styles.percent}>
              %{discountPercent}
            </Text>

            <Text style={styles.discountText}>
              İndirim
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Image
          source={require("../assets/images/text.png")}
          resizeMode="contain"
          style={styles.titleImage}
        />

        <Text style={styles.timer}>
          {expired
            ? "Süre doldu"
            : `${hours} Saat : ${minutes} Dakika : ${seconds} Saniye`}
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 84,
    marginHorizontal: Theme.spacing.screenPadding,
    marginTop: Theme.spacing.xl,

    flexDirection: "row",
    alignItems: "center",

    borderRadius: Theme.radius.xl,
    borderWidth: 2,
    borderColor: Theme.colors.border,

    overflow: "hidden",
  },

  discountContainer: {
    width: 126,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  discountWrapper: {
    width: 61,
    height: 73.5,
    justifyContent: "center",
    alignItems: "center",
  },

  discountImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  discountContent: {
    justifyContent: "center",
    alignItems: "center",
  },

  percent: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.xxl,
    fontWeight: "600",
    lineHeight: 30,
    textAlign: "center",
    letterSpacing: 0.2,
  },

  discountText: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.md,
    fontWeight: "500",
    lineHeight: 30,
    textAlign: "center",
    letterSpacing: 0.14,
    marginTop: -Theme.spacing.sm,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingRight: 35,
    gap: Theme.spacing.md,
  },

  titleImage: {
    width: 104,
    height: 21.3,
  },

  timer: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.lg,
    fontWeight: "600",
    lineHeight: 16,
  },
});