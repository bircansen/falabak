import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Theme } from "../constants/theme";

interface BalanceBarProps {
  label: string;
  value: number;
  color: string;
}

export default function BalanceBar({
  label,
  value,
  color,
}: BalanceBarProps) {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: color,
        },
      ]}
    >
      <Text style={styles.title}>
        {label}
      </Text>

      <Text style={styles.sub}>
        Seviye
      </Text>

      <View style={styles.percentBox}>
        <Text style={styles.percent}>
          %{value}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 74,

    marginHorizontal: Theme.spacing.xs,

    borderRadius: Theme.radius.lg,

    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.md,
    fontWeight: Theme.typography.medium,
  },

  sub: {
    color: Theme.colors.white,
    opacity: 0.9,
    marginTop: Theme.spacing.xxs,
    fontSize: Theme.fontSizes.xs,
  },

  percentBox: {
    marginTop: Theme.spacing.sm,

    backgroundColor: Theme.colors.whiteOverlayLight,

    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,

    borderRadius: Theme.radius.md,
  },

  percent: {
    color: Theme.colors.white,
    fontWeight: Theme.typography.medium,
    fontSize: Theme.fontSizes.xs,
  },
});