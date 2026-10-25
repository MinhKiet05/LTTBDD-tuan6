import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

type Props = {
  message: string;
  onRetry: () => void;
};

export function ErrorBox({
  message,
  onRetry,
}: Props) {
  return (
    <View style={styles.container}>

      <Text style={styles.error}>
        {message}
      </Text>

      <Pressable
        style={styles.button}
        onPress={onRetry}
      >
        <Text style={styles.buttonText}>
          THỬ LẠI
        </Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  error: {
    color: "red",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },

  button: {
    backgroundColor: "#4F63C8",
    padding: 14,
    borderRadius: 6,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});