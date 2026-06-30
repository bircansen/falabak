import * as Haptics from "expo-haptics";
import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
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
import FlyingCard from "../animations/FlyingCard";

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

  const slotRefs = [
    useRef<View>(null),
    useRef<View>(null),
    useRef<View>(null),
  ];

  const [revealed, setRevealed] =
    useState(false);

  const [loadingReading, setLoadingReading] =
    useState(false);

  const [imagesReady, setImagesReady] =
    useState(false);

  const [flyingCard, setFlyingCard] =
    useState<{
      image: any;
      fromX: number;
      fromY: number;
      toX: number;
      toY: number;
      angle: number;
      card: TarotCard;
    } | null>(null);

  const [hiddenCards, setHiddenCards] = useState<string[]>([]);

  const TAROT_COST =
    data.tarotReading.cost;

  const {
    coinBalance,
    setCoinBalance,
  } = useCoin();

  useEffect(() => {
    async function preloadImages() {
      try {
        await Asset.loadAsync(
          Object.values(
            imageMap
          ) as number[]
        );
      } finally {
        setImagesReady(true);
      }
    }

    preloadImages();
  }, []);

  const cards =
    useMemo<TarotCard[]>(() => {
      return data.tarotCards.map(
        (item: any) => ({
          id: item.id,
          name: item.name,
          frontImage:
            imageMap[item.id],
          uprightMeaning:
            item.uprightMeaning,
          reversedMeaning:
            item.reversedMeaning,
        })
      );
    }, []);

  const selectedIds = useMemo(
  () => [...selectedCards.map((c) => c.id), ...hiddenCards],
  [selectedCards, hiddenCards]
);

  const handleSelectCard =
    useCallback(
      async (
        card: TarotCard,
        position: {
          x: number;
          y: number;
          angle: number;
        }
      ) => {
        await Haptics.selectionAsync();
        setHiddenCards((prev) => [...prev, card.id]);

        const slotIndex =
          selectedCards.length;

        const slot =
          slotRefs[
            slotIndex
          ]?.current;

        if (!slot) return;

        slot.measureInWindow(
          (
            x,
            y,
            width,
            height
          ) => {
            const CARD_WIDTH = 78;
            const CARD_HEIGHT = 126;
            setFlyingCard({
              image: require("../assets/cards/card-back.png"),

              fromX:
                position.x,

              fromY:
                position.y,

              toX:
              x + (width - CARD_WIDTH) / 2,

              toY:
              y + (height - CARD_HEIGHT) / 2,
              angle:
                position.angle,

              card,
            });
          }
        );
      },
      [selectedCards]
    );

  const handleFlyingFinished =
  useCallback(() => {
    if (!flyingCard) return;

    pickCard(flyingCard.card);
    setFlyingCard(null);
  }, [
    flyingCard,
    pickCard,
  ]);

  const handleReveal =
    useCallback(async () => {
      if (loadingReading)
        return;

      if (
        coinBalance <
        TAROT_COST
      ) {
        Alert.alert(
          "Yetersiz Jeton",
          `Tarot falı açmak için ${TAROT_COST} jetona ihtiyacınız var.`
        );
        return;
      }

      setLoadingReading(true);

      setCoinBalance(
        (prev) =>
          prev - TAROT_COST
      );

      if (!imagesReady) {
        await Asset.loadAsync(
          Object.values(
            imageMap
          ) as number[]
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
  colors={Theme.colors.backgroundGradient}
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
          <View ref={slotRefs[0]} collapsable={false}>
            <TarotSlot
              title="Geçmiş"
              image={pastCard?.frontImage}
              revealed={revealed}
              loading={loadingReading}
            />
          </View>

          <View ref={slotRefs[1]} collapsable={false}>
            <TarotSlot
              title="Şimdi"
              image={presentCard?.frontImage}
              revealed={revealed}
              loading={loadingReading}
            />
          </View>

          <View ref={slotRefs[2]} collapsable={false}>
            <TarotSlot
              title="Gelecek"
              image={futureCard?.frontImage}
              revealed={revealed}
              loading={loadingReading}
            />
          </View>
        </View>

        <View style={styles.selectTitleContainer}>
  <Text style={styles.selectTitle}>
    {!revealed
      ? isCompleted
        ? "Kartları Aç"
        : "Kart Seç"
      : ""}
  </Text>
</View>

<View
  style={[
    styles.fanContainer,
    revealed && {
      height: 0,
      marginTop: 0,
      marginBottom: 0,
    },
  ]}
>
  {!revealed &&
    (!isCompleted ? (
      <TarotFan
        cards={cards}
        selectedCards={selectedIds}
        onSelect={handleSelectCard}
        disabled={
          loadingReading ||
          flyingCard !== null
        }
      />
    ) : (
      <TouchableOpacity
        activeOpacity={0.85}
        disabled={
          loadingReading ||
          !imagesReady ||
          flyingCard !== null
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
    ))}
</View>
        {flyingCard && (
          <FlyingCard
            image={flyingCard.image}
            visible
            fromX={flyingCard.fromX}
            fromY={flyingCard.fromY}
            toX={flyingCard.toX}
            toY={flyingCard.toY}
            fromAngle={flyingCard.angle}
            onFinish={handleFlyingFinished}
          />
        )}

        {loadingReading && <TarotSkeleton />}

        {!loadingReading &&
          revealed && (
            <>
              <TarotMeaning
                cards={selectedCards}
              />

              <View
                style={
                  styles.resetContainer
                }
              >
                <ResetButton
                  onPress={() => {
                  setLoadingReading(false);

                  setRevealed(false);

                  setFlyingCard(null);

                  setHiddenCards([]);

                  resetCards();
}}
                />
              </View>
            </>
          )}
      </ScrollView>
    </SafeAreaView>
  </LinearGradient>
);}
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
  marginTop: Theme.spacing.xxl,
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

  fanContainer: {
  width: "100%",
  height: 235,

  justifyContent: "flex-end",
  alignItems: "center",

  marginTop: -Theme.spacing.radiusSmall, 
  marginBottom: Theme.spacing.sm,        
},

  resetContainer: {
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.xl,
  },
});