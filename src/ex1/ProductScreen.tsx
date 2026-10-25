import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { SelectPhoneParamList } from "./SelectPhoneApp";
import { Phone } from "../types";
import { PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";

type Props = NativeStackScreenProps<
  SelectPhoneParamList,
  "Product"
> & {
  phone: Phone;
};

export function ProductScreen({
  navigation,
  route,
  phone,
}: Props) {
  const picked = route.params?.color;
  const shown = picked ?? phone.defaultColor;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.imageWrap}>
        <Image
          source={PHONE_COLORS[shown].image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{phone.name}</Text>

        <View style={styles.row}>
          <Stars value={phone.rating} />
          <Text style={styles.review}>
            (Xem {phone.reviewCount} đánh giá)
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.price}>
            {formatPrice(phone.price)}
          </Text>
          <Text style={styles.oldPrice}>
            {formatPrice(phone.oldPrice)}
          </Text>
        </View>

        <Text style={styles.badge}>{phone.badge}</Text>

        <Pressable
          style={styles.chooseBtn}
          onPress={() =>
            navigation.navigate("ChooseColor", {
              color: picked,
            })
          }
        >
          <Text style={styles.chooseText}>
            {picked
              ? "4 MÀU-CHỌN LOẠI"
              : "4 MÀU-CHỌN MÀU"}
          </Text>

          <Text style={styles.arrow}>{">"}</Text>
        </Pressable>
      </View>

      <Pressable
        style={styles.buyBtn}
        onPress={() => {
          // Bài 1 chỉ yêu cầu dựng giao diện nút.
        }}
      >
        <Text style={styles.buyText}>CHỌN MUA</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  imageWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "95%",
    height: "95%",
  },
  info: {
    gap: 14,
    paddingBottom: 20,
  },
  name: {
    fontSize: 17,
    color: colors.text,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  review: {
    fontSize: 13,
    color: colors.muted,
  },
  price: {
    fontSize: 19,
    fontWeight: "bold",
    color: colors.text,
  },
  oldPrice: {
    textDecorationLine: "line-through",
    color: colors.muted,
  },
  badge: {
    color: colors.red,
    fontWeight: "bold",
    fontSize: 12,
  },
  chooseBtn: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 6,
    padding: 14,
    alignItems: "center",
    position: "relative",
  },
  chooseText: {
    fontWeight: "bold",
  },
  arrow: {
    position: "absolute",
    right: 12,
    top: 12,
    fontSize: 18, 
  },
  buyBtn: {
    backgroundColor: colors.red,
    padding: 16,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 10,
  },
  buyText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});