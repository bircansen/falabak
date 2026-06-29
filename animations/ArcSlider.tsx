import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";

import { Theme } from "../constants/theme";

export default function ArcSlider() {
  return (
    <View style={styles.container}>
      <Svg width={340} height={90}>
        <Path
          d="M20 70 Q170 10 320 70"
          stroke={Theme.colors.arcLine}
          strokeWidth={2}
          fill="none"
        />

        <Circle
          cx="170"
          cy="32"
          r="6"
          fill={Theme.colors.blue}
          stroke={Theme.colors.arcThumbStroke}
          strokeWidth={2}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",

    alignItems: "center",
    justifyContent: "center",

    marginTop: Theme.spacing.sm,
    marginBottom: Theme.spacing.xxl,
  },
});