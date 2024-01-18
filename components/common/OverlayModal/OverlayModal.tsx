import { Button, CheckBox, Text } from "@rneui/themed";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { CommonStyles } from "../common.styles";

export type OverlayModalProps = {
  onSelect: (selected: string) => void;
  onClose: () => void;
  items: { label: string; key: string }[];
  selectedItemKey?: string;
  visible?: boolean;
};

const OverlayModal: React.FC<OverlayModalProps> = (props) => {
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
            props.onClose();
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
                        checked={props.selectedItemKey === item.key}
                        onPress={() => {
                          props.onSelect(item.key);
                        }}
                        style={{ margin: 0, padding: 0 }}
                        iconType="material-community"
                        checkedIcon="checkbox-outline"
                        uncheckedIcon={"checkbox-blank-outline"}
                      />
                    </View>
                  );
                })}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default OverlayModal;
