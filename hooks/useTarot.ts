import { useCallback, useMemo, useState } from "react";
import { ImageSourcePropType } from "react-native";

export interface TarotCard {
  id: string;
  name: string;
  frontImage: ImageSourcePropType;
  uprightMeaning: string;
  reversedMeaning: string;
}

export interface SelectedTarotCard extends TarotCard {
  position: "past" | "present" | "future";
  reversed: boolean;
}

const positions: SelectedTarotCard["position"][] = [
  "past",
  "present",
  "future",
];

export default function useTarot() {
  const [selectedCards, setSelectedCards] = useState<
    SelectedTarotCard[]
  >([]);

  const pickCard = useCallback((card: TarotCard) => {
    setSelectedCards((prev) => {
      if (prev.length >= 3) return prev;

      if (prev.some((item) => item.id === card.id)) {
        return prev;
      }

      return [
        ...prev,
        {
          ...card,
          position: positions[prev.length],
          reversed: Math.random() >= 0.5,
        },
      ];
    });
  }, []);

  const resetCards = useCallback(() => {
    setSelectedCards([]);
  }, []);

  const { pastCard, presentCard, futureCard } = useMemo(() => {
    return {
      pastCard: selectedCards.find(
        (card) => card.position === "past"
      ),
      presentCard: selectedCards.find(
        (card) => card.position === "present"
      ),
      futureCard: selectedCards.find(
        (card) => card.position === "future"
      ),
    };
  }, [selectedCards]);

  const isCompleted = useMemo(
    () => selectedCards.length === 3,
    [selectedCards]
  );

  return {
    selectedCards,
    pastCard,
    presentCard,
    futureCard,
    isCompleted,
    pickCard,
    resetCards,
  };
}