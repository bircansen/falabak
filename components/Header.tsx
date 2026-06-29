import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import CoinBadge from "./CoinBadge";
import { Theme } from "../constants/theme";

interface HeaderProps {
  userName: string;
  coinBalance: number;
}

export default function Header({
  userName,
  coinBalance,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons
            name="notifications"
            size={22}
            color={Theme.colors.white}
          />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/start.png")}
            style={styles.logoIcon}
            resizeMode="contain"
          />

          <Text style={styles.logo}>FalaBak</Text>
        </View>

        <CoinBadge balance={coinBalance} />
      </View>

      <View style={styles.welcome}>
        <Text style={styles.welcomeText}>Hoş Geldin,</Text>

        <Text style={styles.name}>{userName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Theme.spacing.screenPadding,
    paddingTop: Theme.spacing.xl,
    marginBottom: Theme.spacing.xxl,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Theme.colors.card,
    justifyContent: "center",
    alignItems: "center",
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoIcon: {
    width: 22,
    height: 22,
    marginRight: Theme.spacing.xs,
  },

  logo: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.title,
    fontWeight: "700",
  },

  welcome: {
    marginTop: Theme.spacing.xxl,
  },

  welcomeText: {
    color: Theme.colors.textSecondary,
    fontSize: Theme.fontSizes.lg,
  },

  name: {
    color: Theme.colors.white,
    fontSize: 28,
    fontWeight: "700",
    marginTop: Theme.spacing.xs,
  },
});