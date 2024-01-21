import React from "react";
import {
  IPaymentsFiltersProps,
  IPaymentsFiltersState,
  PaymentFilterTypes,
} from "../payments.model";
import { TouchableOpacity, View } from "react-native";
import paymentsStyles from "../payments.styles";
import { Text } from "@rneui/themed";
import OverlayModal from "../../common/OverlayModal/OverlayModal";
import { AntDesign } from "@expo/vector-icons";

const PaymentsFilters: React.FC<IPaymentsFiltersProps> = (props) => {
  const paymentsFiltersReducer = (
    state: IPaymentsFiltersState,
    action: any
  ) => {
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

  const [state, dispatch] = React.useReducer(paymentsFiltersReducer, {
    filters: {},
    modalsVisible: {},
  } as IPaymentsFiltersState);

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

  const onSelect = (
    filterKey: PaymentFilterTypes,
    value: string | undefined
  ) => {
    dispatch({
      type: "UPDATE_FILTER",
      payload: {
        key: filterKey.toString(),
        value: value,
      },
    });
    updateModalsVisible(filterKey, false);

    const updatedFilters = {
      ...state.filters,
      [filterKey]: value,
    };
    props.onChange(updatedFilters);
  };

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

  const GetMonth = () => {
    const monthKey = state.filters[PaymentFilterTypes.MONTH];
    if (!monthKey) return months[0].label.split(" ")[0];
    const month = months.find((m) => m.key === monthKey?.toString());
    return month?.label.split(" ")[0];
  };

  return (
    <View style={paymentsStyles.filtersContainer}>
      <TouchableOpacity
        onPress={() => {
          updateModalsVisible(PaymentFilterTypes.MONTH, true);
        }}
        style={[
          paymentsStyles.filterButtonContainer,
          state.filters[PaymentFilterTypes.MONTH]
            ? paymentsStyles.filterButtonSelected
            : null,
        ]}
      >
        <Text style={paymentsStyles.filterButtonText}>{GetMonth()}</Text>
        <AntDesign
          style={{ marginHorizontal: 5 }}
          name="caretdown"
          size={8}
          color="white"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          updateModalsVisible(PaymentFilterTypes.PROGRAM, true);
        }}
        style={[
          paymentsStyles.filterButtonContainer,
          state.filters[PaymentFilterTypes.PROGRAM]
            ? paymentsStyles.filterButtonSelected
            : null,
        ]}
      >
        <Text style={paymentsStyles.filterButtonText}>Programs</Text>
        <AntDesign
          style={{ marginHorizontal: 5 }}
          name="caretdown"
          size={8}
          color="white"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          updateModalsVisible(PaymentFilterTypes.STATUS, true);
        }}
        style={[
          paymentsStyles.filterButtonContainer,
          state.filters[PaymentFilterTypes.STATUS]
            ? paymentsStyles.filterButtonSelected
            : null,
        ]}
      >
        <Text style={paymentsStyles.filterButtonText}>Status</Text>
        <AntDesign
          style={{ marginHorizontal: 5 }}
          name="caretdown"
          size={8}
          color="white"
        />
      </TouchableOpacity>
      {state.modalsVisible[PaymentFilterTypes.MONTH] && (
        <OverlayModal
          items={months}
          onSelect={(value) => onSelect(PaymentFilterTypes.MONTH, value)}
          selectedItemKey={state.filters[PaymentFilterTypes.MONTH]}
        />
      )}
      {state.modalsVisible[PaymentFilterTypes.PROGRAM] && (
        <OverlayModal
          items={programs}
          onSelect={(value) => onSelect(PaymentFilterTypes.PROGRAM, value)}
          selectedItemKey={state.filters[PaymentFilterTypes.PROGRAM]}
        />
      )}
      {state.modalsVisible[PaymentFilterTypes.STATUS] && (
        <OverlayModal
          items={status}
          onSelect={(value) => onSelect(PaymentFilterTypes.STATUS, value)}
          selectedItemKey={state.filters[PaymentFilterTypes.STATUS]}
        />
      )}
    </View>
  );
};

export default PaymentsFilters;
