import React, { useState } from "react";

import {
  View,
  Text,
  Switch,
  StyleSheet,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../theme";

// ==========================
// 1. KHAI BÁO KIỂU NAVIGATION
// ==========================

type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

// ==========================
// 2. HOME SCREEN
// ==========================

function HomeScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.big}>Xin chào 👋</Text>

      <Text style={styles.muted}>
        Chào mừng đến với ứng dụng!
      </Text>
    </View>
  );
}

// ==========================
// 3. PROFILE SCREEN
// ==========================

function ProfileScreen() {
  return (
    <View style={styles.center}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>NA</Text>
      </View>

      <Text style={styles.big}>
        Nguyễn Văn An
      </Text>

      <Text style={styles.muted}>
        an.nguyen@example.com
      </Text>
    </View>
  );
}

// ==========================
// 4. SETTINGS SCREEN
// ==========================

function SettingsScreen() {
  const [notify, setNotify] = useState(true);
  const [dark, setDark] = useState(false);

  return (
    <View
      style={[
        styles.settingsContainer,
        dark && styles.darkBackground,
      ]}
    >
      <Text
        style={[
          styles.settingsTitle,
          dark && styles.darkText,
        ]}
      >
        Cài đặt
      </Text>

      {/* Bật / tắt thông báo */}
      <View style={styles.settingRow}>
        <Text
          style={[
            styles.settingText,
            dark && styles.darkText,
          ]}
        >
          Nhận thông báo
        </Text>

        <Switch
          value={notify}
          onValueChange={setNotify}
          trackColor={{
            false: "#ccc",
            true: colors.blue,
          }}
          thumbColor="#fff"
        />
      </View>

      {/* Bật / tắt giao diện tối */}
      <View style={styles.settingRow}>
        <Text
          style={[
            styles.settingText,
            dark && styles.darkText,
          ]}
        >
          Giao diện tối
        </Text>

        <Switch
          value={dark}
          onValueChange={setDark}
          trackColor={{
            false: "#ccc",
            true: colors.blue,
          }}
          thumbColor="#fff"
        />
      </View>

      {/* Hiển thị trạng thái */}
      <Text
        style={[
          styles.status,
          dark && styles.darkText,
        ]}
      >
        Thông báo: {notify ? "BẬT" : "TẮT"}
        {" · "}
        Giao diện: {dark ? "tối" : "sáng"}
      </Text>
    </View>
  );
}

// ==========================
// 5. DRAWER NAVIGATOR
// ==========================

export function DrawerApp() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            drawerActiveTintColor: colors.red,
            drawerInactiveTintColor: "#666",

            headerTintColor: colors.red,

            drawerIcon: ({ color, size, focused }) => {
              const icons: Record<
                keyof DrawerParamList,
                keyof typeof Ionicons.glyphMap
              > = {
                Home: focused ? "home" : "home-outline",
                Profile: focused ? "person" : "person-outline",
                Settings: focused ? "settings" : "settings-outline",
              };

              return (
                <Ionicons
                  name={icons[route.name]}
                  size={size}
                  color={color}
                />
              );
            },
          })}
        >
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Trang chủ",
            }}
          />

          <Drawer.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              title: "Cá nhân",
            }}
          />

          <Drawer.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              title: "Cài đặt",
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

// ==========================
// 6. STYLES
// ==========================

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },

  big: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },

  muted: {
    fontSize: 15,
    color: "#777",
    marginTop: 8,
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.blue,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  avatarText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },

  settingsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  settingsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },

  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  settingText: {
    fontSize: 16,
  },

  status: {
    marginTop: 30,
    fontSize: 15,
    color: "#666",
    textAlign: "center",
  },

  darkBackground: {
    backgroundColor: "#1e1e1e",
  },

  darkText: {
    color: "#fff",
  },
});