import React from "react";
import { FirebaseProvider } from "./providers/FirebaseProvider";
import { Home } from "./components/Home/Home";
import { Icon } from "@rneui/base";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, StyleSheet, View } from "react-native";
import { SignInScreen } from "./components/Auth/SignInScreen";
import * as Google from "expo-auth-session/providers/google";
import * as WebBowser from "expo-web-browser";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { PhoneAuthScreen } from "./components/Auth/PhoneAuthScreen";

WebBowser.maybeCompleteAuthSession();

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <FirebaseProvider>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="white"
          networkActivityIndicatorVisible={true}
        />
        <Home />
      </FirebaseProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF", // Change this to your desired background color
  },
});
