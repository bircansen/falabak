import React, { memo, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";

import Animated, { FadeIn } from "react-native-reanimated";

import { Theme } from "../constants/theme";

export interface SelectedTarotCard {
  id: string;
  name: string;
  frontImage: ImageSourcePropType;
  uprightMeaning: string;
  reversedMeaning: string;
  position: "past" | "present" | "future";
  reversed: boolean;
}

interface Props {
  cards: SelectedTarotCard[];
}

const positionLabels = {
  past: "Geçmiş",
  present: "Şimdi",
  future: "Gelecek",
} as const;

function TarotMeaning({ cards }: Props) {
  const content = useMemo(() => {
    if (cards.length !== 3) return null;

    return cards.map((card, index) => (
      <Animated.View
        key={card.id}
        entering={FadeIn.delay(index * 120).duration(350)}
        style={styles.card}
      >
        <Image
          source={card.frontImage}
          style={styles.image}
          resizeMode="cover"
          fadeDuration={0}
        />

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.position}>
              {positionLabels[card.position]}
            </Text>

            <View
              style={[
                styles.badge,
                {
                  backgroundColor: card.reversed
                    ? Theme.colors.discount
                    : Theme.colors.primary,
                },
              ]}
            >
              <Text style={styles.badgeText}>
                {card.reversed ? "TERS" : "DÜZ"}
              </Text>
            </View>
          </View>

          <Text style={styles.name}>
            {card.name}
          </Text>

          <Text style={styles.meaning}>
            {card.reversed
              ? card.reversedMeaning
              : card.uprightMeaning}
          </Text>
        </View>
      </Animated.View>
    ));
  }, [cards]);

  return (
    <View style={styles.container}>
      {content}
    </View>
  );
}

export default memo(TarotMeaning);

const styles = StyleSheet.create({
  container: {
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.xl,
  },

  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.radius.xl,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    borderWidth: 1,
    borderColor: Theme.colors.border,

    shadowColor: Theme.colors.shadow,
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 6,
  },

  image: {
    width: 78,
    height: 122,
    marginRight: Theme.spacing.md,
  },

  content: {
    flex: 1,
    justifyContent: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Theme.spacing.sm,
  },

  position: {
    color: Theme.colors.text,
    fontSize: Theme.typography.body,
    fontWeight: "700",
  },

  badge: {
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.radius.full,
  },

  badgeText: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.xs,
    fontWeight: "700",
  },

  name: {
    color: Theme.colors.text,
    fontSize: Theme.fontSizes.xl,
    fontWeight: "700",
    marginBottom: Theme.spacing.xs,
  },

  meaning: {
    color: Theme.colors.textSecondary,
    fontSize: Theme.fontSizes.md,
    lineHeight: 22,
  },
});