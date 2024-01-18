import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useFirebase } from "../../providers/FirebaseProvider";
import { collection, getDocs } from "firebase/firestore";
import { Card } from "@rneui/base";
import { Button, Icon, Text } from "@rneui/themed";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Members } from "../Members/Members";
import { AddMember } from "../Members/AddMember/AddMember";
import { PhoneAuthScreen } from "../Auth/PhoneAuthScreen";
import Payments from "../Payments/Payments";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Admin should be able to switch between communities.

export const Home: React.FC<any> = (props) => {
  return (
    <>
      <NavigationContainer>
        {/* <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen name="SignIn" component={PhoneAuthScreen} />
          <Stack.Screen name="Fitline" component={RootStack} />
        </Stack.Navigator> */}
        <RootStack />
      </NavigationContainer>
    </>
  );
};

const RootStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <CustomTabBarIcon name={route.name} color={color} size={size} />
        ),
        tabBarLabel: () => null, // Hide default labels
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const HomeStack = () => {
  const { user } = useFirebase();
  const communityId = user!.communityInfo.myCommunitites[0];

  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        contentStyle: {
          //backgroundColor: "#E6E6FA",
        },
      })}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Members"
        component={MembersScreen}
        options={({ navigation }) => ({
          headerRight: () => <Icon name="person-add" />,
        })}
      />
      <Stack.Screen name="AddMember" component={AddMemberScreen} />
      <Stack.Screen name="Payments" component={PaymentsScreen} />
    </Stack.Navigator>
  );
};

const MembersScreen = ({ navigation, route }: any) => {
  const communityId = route.params?.communityId;
  return <Members communityId={communityId} navigation={navigation} />;
};

const AddMemberScreen = ({ navigation, route }: any) => {
  const communityId = route.params?.communityId;
  const onSave = route.params?.onSave;
  return (
    <AddMember
      communityId={communityId}
      navigation={navigation}
      onSave={onSave}
    />
  );
};

const PaymentsScreen = () => {
  return <Payments />;
};

const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Screen3" component={Screen3} />
      <Stack.Screen name="Screen4" component={Screen4} />
    </Stack.Navigator>
  );
};

const HomeScreen = (props: any) => {
  const { user, firestore } = useFirebase();

  const handleCardPress = (cardName: string) => {
    const communityId = user!.communityInfo.myCommunitites[0];
    if (cardName == "members") {
      props.navigation.navigate("Members", { communityId: communityId });
    }

    if (cardName == "payments") {
      props.navigation.navigate("Payments", { name: "Jane" });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.section1}>
          <TouchableWithoutFeedback
            onPress={() => {
              handleCardPress("members");
            }}
          >
            <Card containerStyle={styles.cardContainer}>
              <Text style={{ fontWeight: "bold" }}>Members</Text>
            </Card>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              handleCardPress("payments");
            }}
          >
            <Card containerStyle={styles.cardContainer}>
              <Text style={{ fontWeight: "bold" }}>Payments</Text>
            </Card>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.section2}></View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    flex: 1,
    alignContent: "flex-start",
    marginTop: 20,
  },
  cardContainer: {
    width: "35%",
    height: "60%",
    minWidth: "30%",
    maxWidth: "40%",
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    backgroundColor: "#a2b9bc",
    borderRadius: 15,
  },
  section1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderStyle: "solid",
    //borderWidth: 5,
  },
  section2: {
    flex: 3,
  },
});

const Screen3 = (props: any) => {
  return (
    <>
      <Button
        title="Go to Screen4"
        onPress={() => props.navigation.navigate("Screen4", { name: "Jane" })}
      />
      <Text>Hello 3!</Text>
    </>
  );
};

const Screen4 = () => {
  return <Text>Hello Screen 4!</Text>;
};

const CustomTabBarIcon = ({
  name,
  color,
  size,
}: {
  name: string;
  color: string;
  size: number;
}) => {
  let iconName;

  // Determine the icon name based on the tab route name
  if (name === "Home") {
    iconName = "assistant-navigation";
  } else if (name === "Settings") {
    iconName = "bakery-dining";
  }

  // Render the Material Community Icons component
  return (
    <>
      <Icon name={iconName!} size={size} color={color} />
      <Text>Home</Text>
    </>
  );
};
