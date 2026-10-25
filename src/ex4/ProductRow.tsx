import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  Image,
} from "react-native";

import { Phone, ColorKey } from "../types";
import { PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";

type Props = {
  phone: Phone;
  onPress: () => void;
};

export function ProductRow({ phone, onPress }: Props) {
  const color: ColorKey =
    phone.defaultColor && phone.defaultColor in PHONE_COLORS
      ? phone.defaultColor
      : "blue";

  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Image
        source={PHONE_COLORS[color].image}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.info}>
        <Text style={styles.name}>{phone.name}</Text>

        <Text style={styles.price}>
          {formatPrice(Number(phone.price))}
        </Text>

        <Text style={styles.hint}>Nhấn để xem chi tiết →</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  image: {
    width: 85,
    height: 100,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
  },
  price: {
    color: colors.red,
    fontWeight: "bold",
    marginTop: 8,
  },
  hint: {
    color: "#777",
    marginTop: 8,
    fontSize: 12,
  },
});