import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

import CoinBadge from "./CoinBadge";
import { Theme } from "../constants/theme";
import { Ionicons } from "@expo/vector-icons";

interface TarotHeaderProps {
  coinBalance: number;
}

export default function TarotHeader({
  coinBalance,
}: TarotHeaderProps) {
  const router = useRouter();

 return (
  <View style={styles.container}>
    <View style={styles.left}>
      <TouchableOpacity
  style={styles.backButton}
  activeOpacity={0.8}
  onPress={() => router.back()}
>
  <Ionicons
  name="chevron-back"
  size={18}
  color={Theme.colors.white}
/>
</TouchableOpacity>
    </View>

    <View style={styles.center}>
      <Image
        source={require("../assets/logo/tarot-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>

    <View style={styles.right}>
      <CoinBadge balance={coinBalance} />
    </View>
  </View>
);}

const styles = StyleSheet.create({
  container: {
    marginTop: Theme.spacing.sm,
    marginBottom: Theme.spacing.xxl,

    flexDirection: "row",
    alignItems: "center",
  },

  left: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  right: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  backButton: {
    width: 42,
    height: 42,

    borderRadius: Theme.radius.full,

    backgroundColor: Theme.colors.card,

    justifyContent: "center",
    alignItems: "center",
  },

  backIcon: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.xl,
    marginRight: Theme.spacing.xs,
  },

  backText: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.md,
    fontWeight: Theme.typography.medium,
  },

  logo: {
    width: 110,
    height: 42,
  },
});