import * as React from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Keyboard,
} from "react-native";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import { initializeApp, getApp } from "firebase/app";
import {
  ApplicationVerifier,
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { TouchableWithoutFeedback } from "react-native";
import { Loader } from "../common/Loader";

export const PhoneAuthScreen = () => {
  // Ref or state management hooks
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [verificationId, setVerificationId] = React.useState("");
  const [verificationCode, setVerificationCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isInputMode, setIsInputMode] = React.useState(true);

  const app = getApp();
  const auth = getAuth(app);

  const [message, showMessage] = React.useState<{
    text: string;
    color?: string;
  }>();
  const attemptInvisibleVerification = false;

  const generateOtp = async () => {
    setLoading(true);
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        `+91${phoneNumber}`,
        recaptchaVerifier.current!
      );
      setVerificationId(verificationId);
      showMessage({
        text: "Verification code has been sent to your phone.",
      });
      setIsInputMode(false);
    } catch (err: any) {
      showMessage({ text: `Error: ${err?.message}`, color: "red" });
    }

    setLoading(false);
  };

  const confirmCode = async () => {
    setLoading(true);
    try {
      console.log("Confirm Verification Code");
      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      const userCredential = await signInWithCredential(auth, credential);
      console.log("user " + JSON.stringify(userCredential.user));
      showMessage({ text: "Phone authentication successful 👍" });
    } catch (err: any) {
      showMessage({ text: `Error: ${err?.message}`, color: "red" });
    }

    setLoading(false);
  };

  const mobileInputMode = () => {
    return (
      <>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={app.options}
          // attemptInvisibleVerification
        />
        <Text
          style={{
            marginTop: 20,
            marginVertical: 20,
            fontSize: 20,
            fontFamily: "Verdana",
          }}
        >
          Create Account or Sign in
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 10,
            height: 40,
          }}
        >
          <Text style={{ marginHorizontal: 20, fontWeight: "bold" }}>+91</Text>
          <TextInput
            style={{
              flex: 1,
              height: 50,
              fontWeight: "bold",
            }}
            placeholder="Enter a 10 digit phone number"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            maxLength={10}
            onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#841584", // This changes the background color
            padding: 10, // This adds padding
            borderRadius: 5, // This makes the corners rounded
            marginVertical: 20,
            width: "100%",
            height: 40,
          }}
          disabled={!phoneNumber}
          onPress={generateOtp}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            GENERATE OTP
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  const verificationMode = () => {
    return (
      <>
        <Text
          style={{
            marginTop: 20,
            marginVertical: 20,
            fontSize: 20,
            fontFamily: "Verdana",
            fontWeight: "bold",
          }}
        >
          VERIFY OTP
        </Text>
        <Text style={{ alignSelf: "flex-start" }}>MOBILE NUMBER</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text>+91 {phoneNumber}</Text>
          <TouchableOpacity
            onPress={() => {
              setVerificationCode("");
              setIsInputMode(true);
            }}
            style={{ padding: 10, borderRadius: 5 }}
          >
            <Text
              style={{ color: "#841584", fontSize: 12, fontWeight: "bold" }}
            >
              EDIT
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{ alignSelf: "flex-start", marginVertical: 20 }}>
          ONE TIME PASSWORD
        </Text>
        <TextInput
          style={{ marginVertical: 5, fontSize: 17 }}
          editable={!!verificationId}
          placeholder="123456"
          onChangeText={setVerificationCode}
          maxLength={6}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#841584", // This changes the background color
            padding: 10, // This adds padding
            borderRadius: 5, // This makes the corners rounded
            marginVertical: 20,
            width: "100%",
            height: 40,
          }}
          disabled={!verificationId}
          onPress={confirmCode}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            VERIFY OTP
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          flex: 1,
          padding: 20,
          marginTop: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading && <Loader />}
        {isInputMode ? mobileInputMode() : verificationMode()}
        {/* {message ? (
          <TouchableOpacity
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: "0xffffffee", justifyContent: "center" },
            ]}
            onPress={() => showMessage(undefined)}
          >
            <Text
              style={{
                color: message.color || "blue",
                fontSize: 17,
                textAlign: "center",
                margin: 20,
              }}
            >
              {message.text}
            </Text>
          </TouchableOpacity>
        ) : undefined} */}
        {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
      </View>
    </TouchableWithoutFeedback>
  );
};
