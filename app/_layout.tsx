import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Asset } from "expo-asset";

import { Theme } from "../constants/theme";

import "react-native-gesture-handler";
import "react-native-reanimated";

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
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
}