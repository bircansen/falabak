import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Asset } from "expo-asset";

import { Theme } from "../constants/theme";
import { CoinProvider } from "../contexts/CoinContext";

import "react-native-gesture-handler";
import "react-native-reanimated";

import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function loadAssets() {
      await Asset.loadAsync([
        // Bottom Tabs
        require("../assets/icons/home.png"),
        require("../assets/icons/star.png"),
        require("../assets/icons/send.png"),
        require("../assets/icons/moon.png"),
        require("../assets/icons/user.png"),
        
        // Header
        require("../assets/icons/coin.png"),
        require("../assets/images/start.png"),

        // Fortune
        require("../assets/icons/coffee.png"),
        require("../assets/icons/face.png"),
        require("../assets/icons/tarot.png"),
        require("../assets/icons/hand.png"),
        require("../assets/icons/angel.png"),
        require("../assets/icons/crystal.png"),

        // Activities
        require("../assets/icons/cookie.png"),
        require("../assets/icons/fun.png"),
        require("../assets/icons/wheel.png"),
        require("../assets/icons/shake.png"),
      ]);

      setReady(true);
    }

    loadAssets();
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <CoinProvider>
          <StatusBar
            style="light"
            backgroundColor={Theme.colors.background}
          />

          <Stack
            screenOptions={{
              headerShown: false,
              animation: "fade",
              contentStyle: {
                backgroundColor: Theme.colors.background,
              },
            }}
          />
        </CoinProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}