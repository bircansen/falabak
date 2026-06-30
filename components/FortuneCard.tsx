import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import { useRouter } from "expo-router";

import { Theme } from "../constants/theme";

interface FortuneCardProps {
  title: string;
  icon: ImageSourcePropType;
  badge?: string | null;
  route?: string | null;
  cost: number;
}

export default function FortuneCard({
  title,
  icon,
  badge,
  route,
}: FortuneCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.container}
      onPress={() => route && router.push(`/${route}` as never)}
    >
      <View style={styles.card}>
        {!!badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}

        <Image
          source={icon}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>

      <Text
        numberOfLines={2}
        style={styles.title}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "30.5%",
    alignItems: "center",
    marginBottom: Theme.spacing.md,
  },

  card: {
    width: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.radius.lg,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    overflow: "hidden",
    position: "relative",
  },

  badge: {
    position: "absolute",
    top: Theme.spacing.xs,
    alignSelf: "center",
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.colors.primary,
  },

  badgeText: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.xs,
    fontWeight: Theme.typography.bold,
  },

  icon: {
    width: "44%",
    height: undefined,
    aspectRatio: 1,
  },

  title: {
    marginTop: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.xs,
    color: Theme.colors.text,
    fontSize: Theme.fontSizes.sm,
    fontWeight: Theme.typography.medium,
    textAlign: "center",
    lineHeight: 18,
    minHeight: 36,
  },
});