import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

export type IOTPInputs = {
  handleChange: (otp: string) => void;
};

const OtpInputs = (props: IOTPInputs) => {
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    props.handleChange(newOtp.join(""));
  };

  return (
    <View style={styles.container}>
      {otp.map((value, index) => (
        <TextInput
          key={index}
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          value={value}
          onChangeText={(text) => handleChange(text, index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  input: {
    width: "20%",
    borderBottomWidth: 1,
    textAlign: "center",
    fontSize: 24,
  },
});

export default OtpInputs;
