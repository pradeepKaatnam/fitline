import { Button, Input, Text } from "@rneui/themed";
import { IAddMemberProps, IProgramInfo } from "../members.models";
import { StyleSheet, View } from "react-native";
import React from "react";
import { useFirebase } from "../../../providers/FirebaseProvider";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { COLLECTIONS } from "../../../models/constants";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { isNullOrEmpty } from "../../../utils/StringUtils";
import { Loader } from "../../common/Loader";
import { CommonStyles } from "../../common/common.styles";

export const AddMember: React.FC<IAddMemberProps> = (props) => {
  const { firestore } = useFirebase();
  const navigation = useNavigation();
  const [member, setMemeber] = React.useState<any>({
    fname: { value: "", error: undefined },
    lname: { value: "", error: undefined },
    mobile: { value: "", error: undefined },
    startDate: { value: new Date(), error: undefined },
    programId: { value: "", error: undefined },
  });
  const [programs, setPrograms] = React.useState<IProgramInfo[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    setLoading(true);
    try {
      const programs = (
        await getDocs(
          collection(
            firestore,
            COLLECTIONS.COMMUNITIES,
            props.communityId,
            COLLECTIONS.PROGRAMS
          )
        )
      ).docs.map((program) => {
        return { ...program.data(), id: program.id } as IProgramInfo;
      });

      setPrograms(programs);
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  const onChange = (key: string, value: any) => {
    const field = member[key];
    field.value = value;
    field.error = undefined;
    setMemeber({ ...member, [key]: { ...field } });
  };

  const saveMember = async () => {
    try {
      var isValid = true;
      if (isNullOrEmpty(member.fname.value)) {
        member.fname.error = "Required";
        isValid = false;
      }

      if (isNullOrEmpty(member.lname.value)) {
        member.lname.error = "Required";
        isValid = false;
      }

      if (isNullOrEmpty(member.mobile.value)) {
        member.mobile.error = "Required";
        isValid = false;
      }

      if (isNullOrEmpty(member.programId.value)) {
        member.programId.error = "Required";
        isValid = false;
        console.log("program error" + member.programId.error);
      }

      if (!isValid) {
        setMemeber({ ...member });
        return;
      }

      setLoading(true);
      const user = await addDoc(collection(firestore, COLLECTIONS.USERS), {
        fname: member.fname.value,
        lname: member.lname.value,
        mobile: member.mobile.value,
      });
      await addDoc(
        collection(
          firestore,
          COLLECTIONS.COMMUNITIES,
          props.communityId,
          COLLECTIONS.STUDENTS
        ),
        {
          userId: user.id,
          communityId: props.communityId,
          programId: member.programId.value,
          currentStartDate: member.startDate.value,
          isActive: true,
        }
      );

      props.onSave();
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  return (
    <>
      {loading && <Loader />}
      <View
        style={[
          { flex: 1, padding: 10, justifyContent: "flex-start" },
          loading && CommonStyles.disableContainer,
        ]}
      >
        <Dropdown
          style={[
            styles.dropdown,
            member.programId.error && { borderColor: "red", borderWidth: 1 },
          ]}
          // placeholderStyle={styles.placeholderStyle}
          // selectedTextStyle={styles.selectedTextStyle}
          // inputSearchStyle={styles.inputSearchStyle}
          // iconStyle={styles.iconStyle}
          data={programs}
          maxHeight={300}
          labelField="name"
          valueField="id"
          placeholder="Select Program"
          searchPlaceholder="Search..."
          value={member.programId.value}
          onChange={(item) => {
            onChange("programId", item.id);
          }}
        />
        <Input
          placeholder="First Name"
          onChangeText={(text) => {
            onChange("fname", text);
          }}
          errorMessage={member.fname.error}
        />
        <Input
          placeholder="Last Name"
          onChangeText={(text) => {
            onChange("lname", text);
          }}
          errorMessage={member.lname.error}
        />
        <Input
          placeholder="Mobile"
          onChangeText={(text) => {
            onChange("mobile", text);
          }}
          errorMessage={member.mobile.error}
        />
        <View style={{ flex: 1, alignContent: "flex-start" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 10,
            }}
          >
            <Text style={{ fontSize: 18, marginTop: 3 }}>Joining Date</Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={member.startDate.value}
              mode="date"
              is24Hour={true}
              onChange={(_e, selectedDate) => {
                onChange("startDate", selectedDate);
              }}
              style={{ alignSelf: "flex-start" }}
            />
          </View>
          <View style={{ flex: 6, margin: 10 }}>
            <Button onPress={saveMember}>Save</Button>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    margin: 10,
  },
});
