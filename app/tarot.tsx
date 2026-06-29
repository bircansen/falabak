import { ScrollView, View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { Theme } from "../constants/theme";
import React, { useState, useEffect, } from "react";  
import { Asset } from "expo-asset";
 import data from "../data/falabak-data.json"; 
 import { imageMap } from "../data/imageMap"; 
 import TarotHeader from "../components/TarotHeader"; 
 import TarotSlot from "../components/TarotSlot";


export default function TarotScreen() {
  const [imagesReady, setImagesReady] =
    useState(false);

  useEffect(() => {
    async function preloadImages() {
      try {
        await Asset.loadAsync(
          Object.values(imageMap) as number[]
        );
      } finally {
        setImagesReady(true);
      }
    }

    preloadImages();
  }, []);

  useEffect(() => {
    if (!imagesReady) return;
  }, [imagesReady]);

  return (
    <LinearGradient
      colors={["#0F1733", "#1D2F5D", "#27457B"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <TarotHeader
            coinBalance={data.user.coinBalance}
          />

          <View style={styles.slotRow}>
            <TarotSlot
              title="Geçmiş"
              image={undefined}
              revealed={false}
            />

            <TarotSlot
              title="Şimdi"
              image={undefined}
              revealed={false}
            />

            <TarotSlot
              title="Gelecek"
              image={undefined}
              revealed={false}
            />
          </View>

          <View style={styles.selectTitleContainer}>
            <Text style={styles.selectTitle}>
              Kart Seç
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },

  content: {
  paddingHorizontal: Theme.spacing.lg,
  paddingTop: Theme.spacing.sm,
  paddingBottom: 60,
},

slotRow: {
  marginTop: Theme.spacing.xxl,
  marginBottom: Theme.spacing.xxl,

  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
},

  selectTitleContainer: {
    alignItems: "center",
    marginBottom: Theme.spacing.xxl,
  },

  selectTitle: {
    fontSize: Theme.fontSizes.display,
    fontWeight: "700",
    color: Theme.colors.white,
    letterSpacing: 0.3,
  },
});