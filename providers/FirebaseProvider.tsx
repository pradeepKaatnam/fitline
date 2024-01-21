// FirebaseContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { UserInfo } from "../models/common.model";
import { COLLECTIONS } from "../models/constants";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Loader } from "../components/common/Loader";
import { Home } from "../components/Home/Home";
import { PhoneAuthScreen } from "../components/Auth/PhoneAuthScreen";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_MmVI38pulLcRXqx1ym6RU63vF8fNblM",
  authDomain: "smaple-project.firebaseapp.com",
  databaseURL: "https://smaple-project.firebaseio.com",
  projectId: "smaple-project",
  storageBucket: "smaple-project.appspot.com",
  //messagingSenderId: 'sender-id',
  //appId: 'app-id',
  //measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

interface FirebaseContextProps {
  user: UserInfo | undefined; // Replace 'any' with your user type
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  firestore: Firestore; // Replace 'any' with your Firestore type
  auth: Auth;
}

const FirebaseContext = createContext<FirebaseContextProps | undefined>(
  undefined
);

interface FirebaseProviderProps {
  children: ReactNode;
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<UserInfo>({
    firstName: "Pradeep",
    lastName: "Kaatnam",
    communityInfo: {
      enrollments: [
        {
          communityId: "",
          programId: "",
        },
      ],
      myCommunitites: ["dfOM8xNN7A6zT0a52Bp2"],
    },
  });
  const [loading, setLoading] = useState(true);
  const [isSignedInUser, setIsSignedInUser] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log("Got the auth call back " + JSON.stringify(authUser));
      loadUserDetails(authUser);
    });

    // Cleanup function to unsubscribe from the listener
    return () => unsubscribe();
  }, []);

  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const loadUserDetails = async (authUser: any) => {
    setLoading(true);
    //await wait(10000);
    try {
      if (authUser) {
        const userDocRef = doc(firestore, COLLECTIONS.USERS, authUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          //setUser(userDoc.data() as UserInfo);
          console.log("User already exists " + JSON.stringify(userDoc.data()));
          setUser({
            firstName: "Pradeep",
            lastName: "Kaatnam",
            communityInfo: {
              enrollments: [
                {
                  communityId: "",
                  programId: "",
                },
              ],
              myCommunitites: ["dfOM8xNN7A6zT0a52Bp2"],
            },
          });
        } else {
          await setDoc(userDocRef, {
            mobile: authUser.phoneNumber,
          });
        }
        setIsSignedInUser(true);
      } else {
        setIsSignedInUser(false);
      }
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  const signIn = async (email: string, password: string) => {
    try {
      //await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const signOut = () => {
    auth.signOut();
  };

  const value: FirebaseContextProps = {
    user,
    signIn,
    signOut,
    firestore,
    auth,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {loading && <Loader />}
      {!loading && (isSignedInUser && user ? <Home /> : <PhoneAuthScreen />)}
      {/* <Home /> */}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = (): FirebaseContextProps => {
  const context = useContext(FirebaseContext);

  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }

  return context;
};
