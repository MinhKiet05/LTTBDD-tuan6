import React from "react";
import {
  FlatList,
  Text,
  StyleSheet,
} from "react-native";

import { TabProps } from "./types";
import { useFavorites } from "./FavoritesContext";
import { useProducts } from "./ProductsContext";
import { ProductRow } from "./ProductRow";

export function FavoritesTab({
  navigation,
}: TabProps<"Favorites">) {
  const { ids } = useFavorites();
  const { phones } = useProducts();

  const favorites = phones.filter((phone) =>
    ids.includes(phone.id)
  );

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <ProductRow
          phone={item}
          onPress={() =>
            navigation.navigate("ProductDetails", {
              id: item.id,
            })
          }
        />
      )}
      ListEmptyComponent={
        <Text style={styles.empty}>
          Chưa có sản phẩm nào được lưu.
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    flexGrow: 1,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#777",
  },
});