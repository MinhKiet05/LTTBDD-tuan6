import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";

import { RootProps } from "./types";
import { useProducts } from "./ProductsContext";
import { useFavorites } from "./FavoritesContext";

import { ColorKey } from "../types";
import { PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";

export function ProductDetailsScreen({
  route,
}: RootProps<"ProductDetails">) {
  const { id } = route.params;

  const { phones } = useProducts();
  const { has, toggle } = useFavorites();

  const phone = phones.find((item) => item.id === id);

  if (!phone) {
    return (
      <View style={styles.center}>
        <Text>Không tìm thấy sản phẩm #{id}</Text>
      </View>
    );
  }

  const saved = has(phone.id);

  const color: ColorKey =
    phone.defaultColor && phone.defaultColor in PHONE_COLORS
      ? phone.defaultColor
      : "blue";

  return (
    <ScrollView style={styles.container}>
      <Image
        source={PHONE_COLORS[color].image}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.name}>{phone.name}</Text>

      <View style={styles.rating}>
        <Stars value={Number(phone.rating)} />

        <Text style={styles.review}>
          ({phone.reviewCount} đánh giá)
        </Text>
      </View>

      <Text style={styles.price}>
        {formatPrice(Number(phone.price))}
      </Text>

      <Text style={styles.supplier}>
        Cung cấp bởi: {phone.supplier}
      </Text>

      <Pressable
        style={[
          styles.favoriteButton,
          saved && styles.savedButton,
        ]}
        onPress={() => toggle(phone.id)}
      >
        <Text style={styles.favoriteText}>
          {saved ? "♥ Đã lưu" : "♡ Lưu vào yêu thích"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 12,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 12,
  },
  review: {
    color: "#777",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.red,
    marginTop: 16,
  },
  supplier: {
    fontSize: 15,
    marginTop: 12,
  },
  favoriteButton: {
    backgroundColor: colors.blue,
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    alignItems: "center",
  },
  savedButton: {
    backgroundColor: colors.red,
  },
  favoriteText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});