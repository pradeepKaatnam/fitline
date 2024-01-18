import { Avatar, Badge, Icon, ListItem, Text } from "@rneui/themed";
import { IMemebersProps } from "./members.models";
import React from "react";
import { useFirebase } from "../../providers/FirebaseProvider";
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { COLLECTIONS } from "../../models/constants";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { Loader } from "../common/Loader";
import { CommonStyles } from "../common/common.styles";

export const Members: React.FC<IMemebersProps> = (props) => {
  const { firestore } = useFirebase();
  const [students, setStudents] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count

    props.navigation.setOptions({
      headerRight: () => (
        <Icon
          name="person-add"
          onPress={() => {
            props.navigation.navigate("AddMember", {
              communityId: props.communityId,
              onSave: loadData,
            });
          }}
        />
      ),
    });
  }, [props.navigation]);

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(
          firestore,
          COLLECTIONS.COMMUNITIES,
          props.communityId,
          COLLECTIONS.STUDENTS
        )
      );
      const students = (await getDocs(q)).docs.map((s) => {
        return { ...s.data(), id: s.id } as any;
      });

      const programs = (
        await getDocs(
          collection(
            firestore,
            COLLECTIONS.COMMUNITIES,
            props.communityId,
            COLLECTIONS.PROGRAMS
          )
        )
      ).docs.map((s) => {
        return { ...s.data(), programId: s.id } as any;
      });

      const userIds = students.map((s: any) => s.userId);
      const userProfilesQuery = query(
        collection(firestore, COLLECTIONS.USERS),
        where(documentId(), "in", userIds)
      );
      const profiles = (await getDocs(userProfilesQuery)).docs.map((p) => {
        return { ...p.data(), userId: p.id } as any;
      });

      const studentsByProgram: { programName: string; students: any[] }[] = [];
      programs.forEach((p: any) => {
        const program = {
          programName: p.name,
          students: [] as any[],
          isExpanded: false,
        };

        program.students = students
          .filter((s) => s.programId === p.programId)
          .map((s) => {
            const profile = profiles.find((p) => s.userId == p.userId);
            return {
              ...profile,
              ...s,
            };
          });

        studentsByProgram.push(program);
      });

      setStudents(studentsByProgram);
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  const setIsExpanded = (programName: string, isExpanded: boolean) => {
    const newRes: any[] = [];
    students.forEach((student) => {
      if (student.programName == programName) {
        student.isExpanded = isExpanded;
      }
      newRes.push({ ...student });
    });

    setStudents(newRes);
  };

  return (
    <>
      {loading && <Loader />}
      <ScrollView
        style={[{ flex: 1 }, loading && CommonStyles.disableContainer]}
      >
        {students.map((item, index) => (
          <ListItem.Accordion
            key={index}
            content={
              <ListItem.Content>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text key={index + "Text"} style={{ marginRight: 10 }}>
                    {item.programName}
                  </Text>
                  <Badge value={item.students.length ?? 0} status="primary" />
                </View>
              </ListItem.Content>
            }
            isExpanded={item.isExpanded}
            onPress={() => {
              setIsExpanded(item.programName, !item.isExpanded);
            }}
          >
            {item.students.map((student: any, ind: number) => (
              <ListItem key={student.studentId}>
                <Avatar
                  rounded
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/32.jpg",
                  }}
                  key={student.studentId + "Avatar"}
                />
                <ListItem.Content>
                  <ListItem.Title>
                    {student.fname} {student.lname}
                  </ListItem.Title>
                  <ListItem.Subtitle>{student.mobile}</ListItem.Subtitle>
                  <ListItem.Subtitle key={student.studentId + +"subtitle"}>
                    Active: {student.currentStartDate?.toDate()?.toDateString()}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
          </ListItem.Accordion>
        ))}
      </ScrollView>
    </>
  );
};
