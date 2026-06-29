import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { Theme } from "../constants/theme";

interface TarotHeaderProps {
  coinBalance: number;
}

export default function TarotHeader({
  coinBalance,
}: TarotHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.8}
        onPress={() => router.back()}
      >
        <Ionicons
          name="chevron-back"
          size={22}
          color={Theme.colors.white}
        />
      </TouchableOpacity>

      <Image
        source={require("../assets/logo/tarot-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.coinBox}>
        <Image
          source={require("../assets/icons/coin.png")}
          style={styles.coin}
          resizeMode="contain"
        />

        <Text style={styles.coinText}>
          {coinBalance}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  marginTop: Theme.spacing.sm,
  marginBottom: Theme.spacing.xxl,

  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

  backButton: {
    width: 42,
    height: 42,

    borderRadius: Theme.radius.full,

    backgroundColor: Theme.colors.cardDark,

    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 110,
    height: 42,
  },

  coinBox: {
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

  coinText: {
    color: Theme.colors.coin,

    fontSize: Theme.fontSizes.lg,

    fontWeight: "700",
  },
});