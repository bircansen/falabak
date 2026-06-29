import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";

interface CoinBadgeProps {
  balance: number;
}

export default function CoinBadge({
  balance,
}: CoinBadgeProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/icons/coin.png")}
        style={styles.coin}
        resizeMode="contain"
      />

      <Text style={styles.text}>
        {balance}
      </Text>
    </View>
  );
}

import { Theme } from "../constants/theme";

const styles = StyleSheet.create({
  container: {
    height: 30,

    minWidth: 56,

    paddingHorizontal: Theme.spacing.sm,

    borderRadius: Theme.radius.lg,

    backgroundColor: Theme.colors.card,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  coin: {
    width: 16,
    height: 16,

    marginRight: Theme.spacing.xs,
  },

  text: {
    color: Theme.colors.white,

    fontSize: Theme.fontSizes.md,

    fontWeight: "700",
  },
});