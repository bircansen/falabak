import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

import { Theme } from "../constants/theme";

interface ResetButtonProps {
  onPress: () => void;
}

export default function ResetButton({
  onPress,
}: ResetButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>
        Tekrar Çek
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: Theme.spacing.xl,
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.radius.lg,
    paddingVertical: Theme.spacing.lg,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.lg,
    fontWeight: "700",
  },
});