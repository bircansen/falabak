import React, { memo, useMemo } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import FanCard from "./FanCard";

export interface TarotCard {
  id: string;
  name: string;
  frontImage: any;
  uprightMeaning: string;
  reversedMeaning: string;
}

interface Props {
  cards: TarotCard[];
  selectedCards: string[];
  onSelect: (card: TarotCard) => void;
  disabled?: boolean;
}

function TarotFan({
  cards,
  selectedCards,
  onSelect,
  disabled = false,
}: Props) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const selectedSet = useMemo(
    () => new Set(selectedCards),
    [selectedCards]
  );

  const layout = useMemo(() => {
    const count = cards.length;

    const radius = Math.min(width, height) * 0.45;
    const angleRange = Math.min(95, count * 16);

    return {
      radius,
      startAngle: -angleRange / 2,
      endAngle: angleRange / 2,
    };
  }, [cards.length, width, height]);

  return (
    <View
      style={[
        styles.container,
        {
          height: height * 0.33,
          paddingBottom: insets.bottom + height * 0.015,
        },
      ]}
    >
      {cards.map((card, index) => {
        const progress =
          cards.length === 1
            ? 0.5
            : index / (cards.length - 1);

        const angle =
          layout.startAngle +
          (layout.endAngle - layout.startAngle) * progress;

        const rad = (angle * Math.PI) / 180;

        const x = Math.sin(rad) * layout.radius;

        // Kartların yayı biraz düzleştirildi
        const y =
          (1 - Math.cos(rad)) * layout.radius * 0.8;

        const selected = selectedSet.has(card.id);

        return (
          <FanCard
            key={card.id}
            image={require("../assets/cards/card-back.png")}
            angle={angle}
            x={x}
            y={y}
            scale={1}
            selected={selected}
            disabled={disabled || selected}
            onPress={
              selected
                ? undefined
                : () => onSelect(card)
            }
          />
        );
      })}
    </View>
  );
}

export default memo(TarotFan);

const styles = StyleSheet.create({
  container: {
    width: "100%",

    alignItems: "center",
    justifyContent: "flex-end",

    overflow: "visible",
  },
});