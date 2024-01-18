import { Button, Text } from "@rneui/themed";
import { TouchableOpacity, View } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBowser from "expo-web-browser";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import React from "react";
import { useFirebase } from "../../providers/FirebaseProvider";

export const SignInScreen: React.FC<any> = () => {
  const [userInfo, setUserInfo] = React.useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "a953568421629-tu79on98qn2evr0o4ue5l2dssle7hntn.apps.googleusercontent.com",
    webClientId:
      "953568421629-5dg5mki2mn8olltt3gn9ks5be3gns74e.apps.googleusercontent.com",
    redirectUri: "http://localhost:19006",
  });
  const { auth } = useFirebase();

  React.useEffect(() => {
    if (response?.type == "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return (
    <>
      <View>
        <Text>Pradeep</Text>
        <Button
          onPress={() => {
            promptAsync();
          }}
          style={{ marginTop: 20 }}
        >
          Press me
        </Button>
      </View>
    </>
  );
};
