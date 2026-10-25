import React, { useState } from "react";
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
import { ColorKey, Phone } from "../types";
import {
  PHONE_COLORS,
  COLOR_ORDER,
} from "../data/phones";
import { colors, formatPrice } from "../theme";

type Props = NativeStackScreenProps<
  SelectPhoneParamList,
  "ChooseColor"
> & {
  phone: Phone;
};

export function ChooseColorScreen({
  navigation,
  route,
  phone,
}: Props) {
  const [picked, setPicked] = useState<
    ColorKey | undefined
  >(route.params?.color);

  const [line1, line2] = phone.name.split(" - ");

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Image
          source={
            PHONE_COLORS[picked ?? phone.defaultColor].image
          }
          style={styles.thumb}
          resizeMode="contain"
        />

        <View style={styles.headerText}>
          <Text>{line1}</Text>
          <Text>{line2}</Text>

          {picked && (
            <>
              <Text>
                Màu:{" "}
                <Text style={styles.bold}>
                  {PHONE_COLORS[picked].label}
                </Text>
              </Text>

              <Text>
                Cung cấp bởi{" "}
                <Text style={styles.bold}>
                  {phone.supplier}
                </Text>
              </Text>

              <Text style={styles.bold}>
                {formatPrice(phone.price)}
              </Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.hint}>
          Chọn một màu bên dưới:
        </Text>

        <View style={styles.swatches}>
          {COLOR_ORDER.map((key) => (
            <Pressable
              key={key}
              onPress={() => setPicked(key)}
              style={[
                styles.swatch,
                {
                  backgroundColor: PHONE_COLORS[key].hex,
                },
                picked === key && styles.swatchOn,
              ]}
            />
          ))}
        </View>

        <Pressable
          style={styles.doneBtn}
          onPress={() =>
            navigation.navigate({
              name: "Product",
              params: { color: picked },
              merge: true,
            })
          }
        >
          <Text style={styles.doneText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    padding: 16,
    minHeight: 170,
  },
  thumb: {
    width: 120,
    height: 150,
  },
  headerText: {
    flex: 1,
    justifyContent: "center",
    gap: 8,
    paddingLeft: 12,
  },
  bold: {
    fontWeight: "bold",
  },
  body: {
    flex: 1,
    backgroundColor: colors.grey,
    padding: 16,
  },
  hint: {
    fontSize: 17,
    marginBottom: 18,
  },
  swatches: {
    alignItems: "center",
    gap: 14,
  },
  swatch: {
    width: 85,
    height: 85,
    borderWidth: 1,
    borderColor: "#888",
  },
  swatchOn: {
    borderWidth: 3, 
    borderColor: colors.navy,
  },
  doneBtn: {
    backgroundColor: colors.blue,
    padding: 15,
    borderRadius: 4,
    alignItems: "center",
    marginTop: "auto",
  },
  doneText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});