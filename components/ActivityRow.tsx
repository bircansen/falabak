import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../constants/theme";

interface ActivityRowProps {
  title: string;
  icon?: ImageSourcePropType;
  onPress?: () => void;
}

export default function ActivityRow({
  title,
  icon,
  onPress,
}: ActivityRowProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.left}>
        {icon && (
          <Image
            source={icon}
            style={styles.icon}
            resizeMode="contain"
          />
        )}

        <Text
          numberOfLines={1}
          style={styles.title}
        >
          {title}
        </Text>
      </View>

      <View style={styles.arrowContainer}>
        <Ionicons
          name="chevron-forward"
          size={18}
          color={Theme.colors.white}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 58,
    backgroundColor: Theme.colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Theme.colors.border,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.sm,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  icon: {
    width: 28,
    height: 28,
    marginRight: 14,
  },

  title: {
    flex: 1,
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.lg,
    fontWeight: "600",
  },

  arrowContainer: {
    width: 30,
    height: 30,
    borderRadius: Theme.radius.sm,
    backgroundColor: Theme.colors.arrowBackground,

    justifyContent: "center",
    alignItems: "center",
  },
});