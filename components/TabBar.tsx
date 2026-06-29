import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";

import { Theme } from "../constants/theme";

interface TabItem {
  id: string;
  label: string;
  icon: ImageSourcePropType;
  active?: boolean;
}

interface TabBarProps {
  tabs: TabItem[];
}

export default function TabBar({ tabs }: TabBarProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            activeOpacity={0.8}
            style={[styles.item, tab.active && styles.activeItem]}
          >
            <Image
              source={tab.icon}
              resizeMode="contain"
              style={[styles.icon]}
            />

            {tab.active && (
              <Text style={[styles.label, styles.activeLabel]}>
                {tab.label}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: Theme.spacing.screenPadding,
    paddingBottom: Theme.spacing.xl,
    backgroundColor: Theme.colors.background,
  },

  container: {
    height: 64,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingLeft: Theme.spacing.md,
    paddingRight: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,

    borderRadius: Theme.radius.full,
    borderWidth: 1.5,
    borderColor: Theme.colors.border,

    backgroundColor: Theme.colors.card,
  },

  item: {
    width: 40,
    height: 40,

    justifyContent: "center",
    alignItems: "center",

    borderRadius: Theme.radius.xl,
    flexDirection: "row",
  },

  activeItem: {
    width: 116,
    height: 40,

    borderRadius: 26,

    backgroundColor: Theme.colors.primary,

    paddingHorizontal: 10,

    justifyContent: "center",
    alignItems: "center",

    gap: 5,
  },

  icon: {
    width: 22,
    height: 22,
    tintColor: Theme.colors.white,
  },

  label: {
    display: "none",
  },

  activeLabel: {
    display: "flex",

    color: Theme.colors.white,

    fontSize: 15,
    fontWeight: "400",

    includeFontPadding: false,
  },
});