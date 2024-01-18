import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Button } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import paymentsStyles from "./payments.styles";
import OverlayModal from "../common/OverlayModal/OverlayModal";
import { IPaymentsListState, PaymentFilterTypes } from "./payments.model";

const Payments: React.FC = () => {
  const paymentsReducer = (state: IPaymentsListState, action: any) => {
    switch (action.type) {
      case "UPDATE_FILTER":
        return {
          ...state,
          filters: {
            ...state.filters,
            [action.payload.key]: action.payload.value,
          },
        };
      case "UPDATE_MODALS_VISIBILE":
        return {
          ...state,
          modalsVisible: {
            ...state.modalsVisible,
            [action.payload.key]: action.payload.value,
          },
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = React.useReducer(paymentsReducer, {
    filters: {},
    modalsVisible: {},
  } as IPaymentsListState);

  const months = [
    { label: "Jan 2024", key: "jan" },
    { label: "Feb 2024", key: "feb" },
    { label: "Mar 2024", key: "mar" },
    { label: "Apr 2024", key: "apr" },
    { label: "May 2024", key: "may" },
    { label: "Jun 2024", key: "jun" },
    { label: "Jul 2024", key: "jul" },
  ];

  const programs = [
    { label: "Intermedite Yoga", key: "program1" },
    { label: "Advanced Yoga", key: "program2" },
  ];

  const status = [
    { label: "Paid", key: "paid" },
    { label: "Unpaid", key: "unpaid" },
  ];

  const onSelect = (filterKey: PaymentFilterTypes, value: string) => {
    dispatch({
      type: "UPDATE_FILTER",
      payload: {
        key: filterKey.toString(),
        value: value,
      },
    });
    updateModalsVisible(filterKey, false);
  };

  const onClose = () => {};

  const updateModalsVisible = (
    filterType: PaymentFilterTypes,
    isVisible: boolean
  ) => {
    console.log(filterType.toString());
    dispatch({
      type: "UPDATE_MODALS_VISIBILE",
      payload: {
        key: filterType.toString(),
        value: isVisible,
      },
    });
  };

  return (
    <View style={paymentsStyles.filtersContainer}>
      <TouchableOpacity
        onPress={() => {
          updateModalsVisible(PaymentFilterTypes.MONTH, true);
        }}
        style={paymentsStyles.filterButtonContainer}
      >
        <Text style={paymentsStyles.filterButtonText}>Jan</Text>
        <AntDesign
          style={{ marginHorizontal: 5 }}
          name="caretdown"
          size={10}
          color="white"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          updateModalsVisible(PaymentFilterTypes.PROGRAM, true);
        }}
        style={paymentsStyles.filterButtonContainer}
      >
        <Text style={paymentsStyles.filterButtonText}>Programs</Text>
        <AntDesign
          style={{ marginHorizontal: 5 }}
          name="caretdown"
          size={10}
          color="white"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          updateModalsVisible(PaymentFilterTypes.STATUS, true);
        }}
        style={paymentsStyles.filterButtonContainer}
      >
        <Text style={paymentsStyles.filterButtonText}>Status</Text>
        <AntDesign
          style={{ marginHorizontal: 5 }}
          name="caretdown"
          size={10}
          color="white"
        />
      </TouchableOpacity>
      {state.modalsVisible[PaymentFilterTypes.MONTH] && (
        <OverlayModal
          items={months}
          onSelect={(value) => onSelect(PaymentFilterTypes.MONTH, value)}
          onClose={onClose}
          selectedItemKey={state.filters[PaymentFilterTypes.MONTH]}
        />
      )}
      {state.modalsVisible[PaymentFilterTypes.PROGRAM] && (
        <OverlayModal
          items={programs}
          onSelect={(value) => onSelect(PaymentFilterTypes.PROGRAM, value)}
          onClose={onClose}
          selectedItemKey={state.filters[PaymentFilterTypes.PROGRAM]}
        />
      )}
      {state.modalsVisible[PaymentFilterTypes.STATUS] && (
        <OverlayModal
          items={status}
          onSelect={(value) => onSelect(PaymentFilterTypes.STATUS, value)}
          onClose={onClose}
          selectedItemKey={state.filters[PaymentFilterTypes.STATUS]}
        />
      )}
    </View>
  );
};

export default Payments;
