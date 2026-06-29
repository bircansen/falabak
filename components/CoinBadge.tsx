import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";

import { Theme } from "../constants/theme";
import { imageMap } from "../data/imageMap";

interface CoinBadgeProps {
  balance: number;
}

export default function CoinBadge({
  balance,
}: CoinBadgeProps) {
  return (
    <View style={styles.container}>
      <Image
        source={imageMap.coin}
        style={styles.coin}
        resizeMode="contain"
      />

      <Text style={styles.text}>
        {balance}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 78,
    height: 36,

    backgroundColor: Theme.colors.cardDark,
    borderRadius: Theme.radius.xl,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  coin: {
    width: 18,
    height: 18,

    marginRight: Theme.spacing.xs,
  },

  text: {
    color: Theme.colors.coin,

    fontSize: Theme.fontSizes.lg,

    fontWeight: "700",
  },
});