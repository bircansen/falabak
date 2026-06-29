import * as Haptics from "expo-haptics";
import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { Asset } from "expo-asset";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { Theme } from "../constants/theme";
import data from "../data/falabak-data.json";
import { imageMap } from "../data/imageMap";

import TarotHeader from "../components/TarotHeader";
import TarotSlot from "../components/TarotSlot";
import TarotMeaning from "../components/TarotMeaning";
import TarotSkeleton from "../components/TarotSkeleton";
import ResetButton from "../components/ResetButton";

import TarotFan from "../animations/TarotFan";
import ArcSlider from "../animations/ArcSlider";

import useTarot, {
  TarotCard,
} from "../hooks/useTarot";

import { useCoin } from "../contexts/CoinContext";

export default function TarotScreen() {
  const {
    selectedCards,
    pastCard,
    presentCard,
    futureCard,
    isCompleted,
    pickCard,
    resetCards,
  } = useTarot();

  const [revealed, setRevealed] = useState(false);
  const [loadingReading, setLoadingReading] =
    useState(false);

  const [imagesReady, setImagesReady] =
    useState(false);

const TAROT_COST = data.tarotReading.cost;

const { coinBalance, setCoinBalance } = useCoin();

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

  const cards = useMemo<TarotCard[]>(() => {
    return data.tarotCards.map((item: any) => ({
      id: item.id,
      name: item.name,
      frontImage: imageMap[item.id],
      uprightMeaning: item.uprightMeaning,
      reversedMeaning: item.reversedMeaning,
    }));
  }, []);

  const selectedIds = useMemo(
    () => selectedCards.map((c) => c.id),
    [selectedCards]
  );
  const handleSelectCard = useCallback(
  async (card: TarotCard) => {
    await Haptics.selectionAsync();
    pickCard(card);
  },
  [pickCard]
);

  const handleReveal = useCallback(async () => {
  if (loadingReading) return;

  if (coinBalance < TAROT_COST) {
    Alert.alert(
      "Yetersiz Jeton",
      `Tarot falı açmak için ${TAROT_COST} jetona ihtiyacınız var.`
    );
    return;
  }

  setLoadingReading(true);

  setCoinBalance((prev) => prev - TAROT_COST);

  if (!imagesReady) {
    await Asset.loadAsync(
      Object.values(imageMap) as number[]
    );
  }

  setTimeout(() => {
    setRevealed(true);
    setLoadingReading(false);
  }, 900);
}, [
  loadingReading,
  imagesReady,
  coinBalance,
  TAROT_COST,
]);
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
            coinBalance={coinBalance}
          />

          <View style={styles.slotRow}>
            <TarotSlot
  title="Geçmiş"
  image={pastCard?.frontImage}
  revealed={revealed}
  loading={loadingReading}
/>

<TarotSlot
  title="Şimdi"
  image={presentCard?.frontImage}
  revealed={revealed}
  loading={loadingReading}
/>

<TarotSlot
  title="Gelecek"
  image={futureCard?.frontImage}
  revealed={revealed}
  loading={loadingReading}
/>
          </View>

          <View style={styles.selectTitleContainer}>
            <Text style={styles.selectTitle}>
              Kart Seç
            </Text>
          </View>

          <TarotFan
  cards={cards}
  selectedCards={selectedIds}
  onSelect={handleSelectCard}
  disabled={loadingReading}
/>

          <ArcSlider />

          {isCompleted &&
            !revealed &&
            !loadingReading && (
              <TouchableOpacity
                activeOpacity={0.85}
                disabled={
                  loadingReading || !imagesReady
                }
                style={[
                  styles.revealButton,
                  loadingReading &&
                    styles.disabledButton,
                ]}
                onPress={handleReveal}
              >
                <Text style={styles.revealText}>
                  🔮 Kartları Aç
                </Text>
              </TouchableOpacity>
            )}

          {loadingReading && <TarotSkeleton />}

          {!loadingReading &&
            revealed && (
              <>
                <TarotMeaning
                  cards={selectedCards}
                />

                <View style={styles.resetContainer}>
                  <ResetButton
                    onPress={() => {
                      setLoadingReading(false);
                      setRevealed(false);
                      resetCards();
                    }}
                  />
                </View>
              </>
            )}
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
    paddingBottom: Theme.spacing.xxl, 
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
    color: Theme.colors.white,

    fontSize: Theme.fontSizes.display,

    fontWeight: "700",

    letterSpacing: 0.3,
  },

  disabledButton: {
    opacity: 0.65,
  },

  revealButton: {
    marginTop: Theme.spacing.sm,
    marginBottom: Theme.spacing.lg,

    alignSelf: "center",

    minWidth: 220,
    height: 56,

    paddingHorizontal: Theme.spacing.lg,

    borderRadius: Theme.radius.xl,

    backgroundColor: Theme.colors.primary,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: Theme.colors.primary,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 8,
  },

  revealText: {
    color: Theme.colors.white,

    fontSize: Theme.fontSizes.lg,

    fontWeight: "700",

    letterSpacing: 0.4,
  },

  resetContainer: {
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.xl,
  },
});