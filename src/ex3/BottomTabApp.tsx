import React, {
    useState,
    useEffect,
    useCallback,
  } from "react";
  
  import {
    View,
    Text,
    FlatList,
    TextInput,
    StyleSheet,
    ActivityIndicator,
    Pressable,
  } from "react-native";
  
  import { NavigationContainer } from "@react-navigation/native";
  import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
  import { Ionicons } from "@expo/vector-icons";
  
  import { Phone } from "../types";
  import { fetchPhones } from "../api/phoneApi";
  import { colors, formatPrice } from "../theme";
  
  type TabParamList = {
    Home: undefined;
    Search: undefined;
    Profile: undefined;
  };
  
  const Tab = createBottomTabNavigator<TabParamList>();
  
  const ICONS: Record<
    keyof TabParamList,
    [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]
  > = {
    Home: ["home", "home-outline"],
    Search: ["search", "search-outline"],
    Profile: ["person", "person-outline"],
  };
  
  // ====================
  // COMPONENT HIỂN THỊ SẢN PHẨM
  // ====================
  
  function PhoneCard({ phone }: { phone: Phone }) {
    return (
      <View style={styles.card}>
        <Text style={styles.name}>
          {phone.name}
        </Text>
  
        <Text style={styles.price}>
          {formatPrice(Number(phone.price))}
        </Text>
      </View>
    );
  }
  
  // ====================
  // HOME TAB
  // ====================
  
  function HomeTab({ phones }: { phones: Phone[] }) {
    return (
      <FlatList
        data={phones}
        keyExtractor={(item, index) =>
          item.id != null ? String(item.id) : String(index)
        }
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <PhoneCard phone={item} />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Chưa có sản phẩm nào
          </Text>
        }
      />
    );
  }
  
  // ====================
  // SEARCH TAB
  // ====================
  
  function SearchTab({ phones }: { phones: Phone[] }) {
    const [keyword, setKeyword] = useState("");
  
    const filteredPhones = phones.filter((phone) =>
      phone.name
        .toLowerCase()
        .includes(keyword.trim().toLowerCase())
    );
  
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Nhập từ khóa"
          value={keyword}
          onChangeText={setKeyword}
        />
  
        <FlatList
          data={filteredPhones}
          keyExtractor={(item, index) =>
            item.id != null ? String(item.id) : String(index)
          }
          renderItem={({ item }) => (
            <PhoneCard phone={item} />
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>
              Không có kết quả cho "{keyword}"
            </Text>
          }
        />
      </View>
    );
  }
  
  // ====================
  // PROFILE TAB
  // ====================
  
  function ProfileTab() {
    const name = "Nguyễn Văn An";
    const email = "an.nguyen@example.com";
  
    return (
      <View style={styles.profileContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {name.charAt(0)}
          </Text>
        </View>
  
        <Text style={styles.profileName}>
          {name}
        </Text>
  
        <Text style={styles.email}>
          {email}
        </Text>
      </View>
    );
  }
  
  // ====================
  // BOTTOM TAB APP
  // ====================
  
  export function BottomTabApp() {
    const [phones, setPhones] = useState<Phone[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    const loadPhones = useCallback(async () => {
      setLoading(true);
      setError(null);
  
      try {
        const data = await fetchPhones();
        setPhones(data);
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "Lỗi không xác định"
        );
      } finally {
        setLoading(false);
      }
    }, []);
  
    useEffect(() => {
      loadPhones();
    }, [loadPhones]);
  
    // Loading
    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.blue} />
          <Text>Đang tải dữ liệu...</Text>
        </View>
      );
    }
  
    // Error
    if (error) {
      return (
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>
  
          <Pressable
            style={styles.retryBtn}
            onPress={loadPhones}
          >
            <Text style={styles.retryText}>THỬ LẠI</Text>
          </Pressable>
        </View>
      );
    }
  
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: colors.red,
            tabBarInactiveTintColor: colors.muted,
  
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={ICONS[route.name][focused ? 0 : 1]}
                size={size}
                color={color}
              />
            ),
          })}
        >
          <Tab.Screen name="Home" options={{ title: "Trang chủ" }}>
            {() => <HomeTab phones={phones} />}
          </Tab.Screen>
  
          <Tab.Screen name="Search" options={{ title: "Tìm kiếm" }}>
            {() => <SearchTab phones={phones} />}
          </Tab.Screen>
  
          <Tab.Screen
            name="Profile"
            component={ProfileTab}
            options={{ title: "Cá nhân" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
  
  // ====================
  // STYLES
  // ====================
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: "#fff",
    },
  
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: 12,
    },
  
    list: {
      padding: 16,
      gap: 10,
    },
  
    card: {
      padding: 16,
      backgroundColor: colors.bg,
      borderRadius: 8,
      marginBottom: 10,
    },
  
    name: {
      fontSize: 16,
      fontWeight: "bold",
    },
  
    price: {
      fontSize: 15,
      color: colors.red,
      marginTop: 8,
    },
  
    input: {
      borderWidth: 1,
      borderColor: colors.line,
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
      fontSize: 16,
    },
  
    empty: {
      textAlign: "center",
      marginTop: 30,
      color: colors.muted,
    },
  
    profileContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
    },
  
    avatar: {
      width: 96,
      height: 96,
      borderRadius: 48,
      backgroundColor: colors.blue,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 16,
    },
  
    avatarText: {
      color: "#fff",
      fontSize: 40,
      fontWeight: "bold",
    },
  
    profileName: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 8,
    },
  
    email: {
      fontSize: 15,
      color: colors.muted,
    },
  
    error: {
      color: colors.red,
      textAlign: "center",
      fontSize: 16,
    },
  
    retryBtn: {
      backgroundColor: colors.blue,
      padding: 14,
      borderRadius: 6,
    },
  
    retryText: {
      color: "#fff",
      fontWeight: "bold",
    },
  });