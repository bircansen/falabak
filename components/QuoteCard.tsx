import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Theme } from "../constants/theme";
import { imageMap } from "../data/imageMap";

interface QuoteCardProps {
  text: string;
  author: string;
  image: string;
}

export default function QuoteCard({
  text,
  author,
  image,
}: QuoteCardProps) {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
  colors={[
    Theme.colors.quoteGradientStart,
    Theme.colors.quoteGradientEnd,
  ]}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.container}
>
        <View style={styles.circle} />
        <View style={styles.circle2} />

        <View style={styles.content}>
          <Text style={styles.title}>Yıldızlar susmaz...</Text>

          <Text style={styles.quote}>{text}</Text>

          <Text style={styles.author}>{author}</Text>
        </View>
      </LinearGradient>

      <Image
        source={imageMap[image]}
        style={styles.woman}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: Theme.spacing.screen,
    marginTop: Theme.spacing.md,
    position: "relative",
  },

  container: {
    height: 118,
    borderRadius: Theme.radius.xl,
    overflow: "hidden",
    paddingLeft: Theme.spacing.xl,
    justifyContent: "center",
  },

  content: {
    width: "60%",
    zIndex: 2,
  },

  title: {
    color: Theme.colors.quoteTitle,
    fontSize: 11,
    fontWeight: "500",
    marginBottom: Theme.spacing.sm,
  },

  quote: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.sm,
    lineHeight: 20,
    fontWeight: "500",
  },

  author: {
    marginTop: Theme.spacing.sm,
    color: Theme.colors.quoteAuthor,
    fontSize: 11,
  },

  circle: {
    position: "absolute",
    right: -45,
    top: -20,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: Theme.colors.overlayLight,
  },

  circle2: {
    position: "absolute",
    right: 10,
    top: 20,
    width: 95,
    height: 95,
    borderRadius: 48,
    backgroundColor: Theme.colors.overlayLighter,
  },

  woman: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 120,
    height: 150,
  },
});