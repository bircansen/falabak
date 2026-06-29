import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../components/Header";
import QuoteCard from "../components/QuoteCard";
import PromotionCard from "../components/PromotionCard";
import FortuneCard from "../components/FortuneCard";
import BalanceBar from "../components/BalanceBar";
import ActivityRow from "../components/ActivityRow";
import TabBar from "../components/TabBar";

import data from "../data/falabak-data.json";
import { imageMap } from "../data/imageMap";
import { Theme } from "../constants/theme";

export default function HomeScreen() {
  const tabs = data.navTabs.map((tab) => ({
    ...tab,
    icon: imageMap[tab.icon],
  }));

  const fortuneTypes = data.fortuneTypes.map((item) => ({
    ...item,
    icon: imageMap[item.icon],
  }));

  const activities = data.activities.map((item) => ({
    ...item,
    icon: imageMap[item.icon],
  }));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Header
          userName={data.user.firstName}
          coinBalance={data.user.coinBalance}
        />

        <QuoteCard
          text={data.dailyQuote.text}
          author={data.dailyQuote.author}
          image={data.dailyQuote.image}
        />

        <PromotionCard
          discountPercent={data.promotion.discountPercent}
          countdownDurationSeconds={
            data.promotion.countdownDurationSeconds
          }
        />

        <Text style={styles.sectionTitle}>
          Fal Türlerimiz
        </Text>

        <View style={styles.grid}>
          {fortuneTypes.map((item) => (
            <FortuneCard
              key={item.id}
              title={item.title}
              icon={item.icon}
              badge={item.badge}
              route={item.route}
              cost={item.cost}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>
          Yaşam Dengesi
        </Text>

        <View style={styles.balanceCard}>
          {data.lifeBalance.items.map((item) => (
            <BalanceBar
              key={item.id}
              label={item.label}
              value={item.value}
              color={item.color}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>
          Etkinlikler
        </Text>

        <View style={styles.activityContainer}>
          {activities.map((item) => (
            <ActivityRow
              key={item.id}
              title={item.title}
              icon={item.icon}
            />
          ))}

          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>
              Hepsini Görüntüle
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      <TabBar tabs={tabs} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },

  content: {
    paddingBottom: 100,
  },

  sectionTitle: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.xxl,
    fontWeight: "700",

    marginHorizontal: Theme.spacing.screen,
    marginTop: Theme.spacing.xxl,
    marginBottom: Theme.spacing.lg,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",

    paddingHorizontal: Theme.spacing.screen,
    marginBottom: Theme.spacing.sm,
  },

  balanceCard: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginHorizontal: Theme.spacing.screen,
    marginBottom: Theme.spacing.md,
  },

  activityContainer: {
    marginHorizontal: Theme.spacing.screen,
    marginBottom: Theme.spacing.xl,
  },

  viewAllButton: {
    height: 48,

    borderRadius: Theme.radius.md,

    backgroundColor: Theme.colors.primary,

    justifyContent: "center",
    alignItems: "center",

    marginTop: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },

  viewAllText: {
    color: Theme.colors.white,

    fontSize: 15,

    fontWeight: "700",
  },
});