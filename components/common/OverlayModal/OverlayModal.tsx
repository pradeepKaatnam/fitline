import { Button, CheckBox, Text } from "@rneui/themed";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { CommonStyles } from "../common.styles";

export type OverlayModalProps = {
  onSelect: (selected: string | undefined) => void;
  items: { label: string; key: string }[];
  selectedItemKey?: string;
  visible?: boolean;
};

const OverlayModal: React.FC<OverlayModalProps> = (props) => {
  const [selectedKey, setSelectedKey] = useState<string | undefined>(
    props.selectedItemKey
  );

  const applyFilters = () => {
    props.onSelect(selectedKey);
  };

  const clearFilters = () => {
    setSelectedKey(undefined);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        // onRequestClose={() => {
        //   setModalVisible(!modalVisible);
        // }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            props.onSelect(undefined);
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={CommonStyles.overlayModalContainer}>
                <TouchableOpacity
                  onPress={clearFilters}
                  style={{
                    padding: 10,
                    borderRadius: 5,
                    alignSelf: "flex-end",
                  }}
                >
                  <Text
                    style={{
                      color: "#841584",
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    CLEAR
                  </Text>
                </TouchableOpacity>
                {props.items.map((item) => {
                  return (
                    <View style={CommonStyles.overlayModalItem} key={item.key}>
                      <Text
                        style={CommonStyles.overlayModalItemText}
                        onPress={() => {
                          props.onSelect(item.key);
                        }}
                      >
                        {item.label}
                      </Text>
                      <CheckBox
                        checked={selectedKey === item.key}
                        onPress={() => {
                          setSelectedKey(item.key);
                        }}
                        style={{ margin: 0, padding: 0 }}
                        iconType="material-community"
                        checkedIcon="checkbox-outline"
                        uncheckedIcon={"checkbox-blank-outline"}
                      />
                    </View>
                  );
                })}
                <TouchableOpacity
                  style={CommonStyles.modalApplyButton}
                  //disabled={!verificationId}
                  onPress={applyFilters}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    APPLY
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default OverlayModal;
