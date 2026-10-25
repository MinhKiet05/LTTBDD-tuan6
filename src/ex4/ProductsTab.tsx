import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from "react-native";

import { TabProps } from "./types";
import { ProductRow } from "./ProductRow";
import { useProducts } from "./ProductsContext";

export function ProductsTab({
  navigation,
}: TabProps<"Products">) {
  const { phones, loading, error, reload } = useProducts();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Đang tải sản phẩm...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>

        <Pressable onPress={reload} style={styles.button}>
          <Text style={styles.buttonText}>THỬ LẠI</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      data={phones}
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
        <Text>Chưa có sản phẩm nào.</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  button: {
    backgroundColor: "#4F63C8",
    padding: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});