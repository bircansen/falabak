import React from "react";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { Theme } from "../constants/theme";

interface TarotCardProps {
  image: string;
  title: string;
  selected?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

export default function TarotCard({
  image,
  title,
  selected = false,
  disabled = false,
  onPress,
}: TarotCardProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        selected && styles.selected,
      ]}
      activeOpacity={0.8}
      disabled={disabled}
      onPress={onPress}
    >
      <Image
        source={{ uri: image }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.footer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 150,

    marginRight: Theme.spacing.md,

    borderRadius: Theme.radius.lg,

    overflow: "hidden",

    backgroundColor: Theme.colors.card,

    borderWidth: 2,
    borderColor: "transparent",
  },

  selected: {
    borderColor: Theme.colors.primary,
  },

  image: {
    width: "100%",
    height: 115,
  },

  footer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: Theme.spacing.xs,
  },

  title: {
    color: Theme.colors.white,

    fontSize: Theme.fontSizes.sm,

    fontWeight: "600",

    textAlign: "center",
  },
});