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
    height: 82,

    marginHorizontal: Theme.spacing.xs,

    borderRadius: Theme.radius.lg,

    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.xl,
    fontWeight: "700",
  },

  sub: {
    color: Theme.colors.white,
    opacity: 0.9,
    marginTop: 2,
    fontSize: Theme.fontSizes.sm,
  },

  percentBox: {
    marginTop: 14,

    backgroundColor: Theme.colors.overlay,

    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: 5,

    borderRadius: Theme.radius.md,
  },

  percent: {
    color: Theme.colors.white,
    fontWeight: "700",
    fontSize: Theme.fontSizes.sm,
  },
});