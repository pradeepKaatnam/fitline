import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import {
  IPaymentInfo,
  IPaymentsDispatchActions,
  IPaymentsListState,
  IScheduledPayment,
  PAYMENTS_ACTIONS,
  PaymentFilterTypes,
  PaymentStatus,
} from "./payments.model";
import PaymentsFilters from "./PaymentsFilters/PaymentsFilters";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Badge,
  Button,
  Dialog,
  Icon,
  ListItem,
  Overlay,
  Text,
} from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";
import { Timestamp } from "firebase/firestore";
import paymentsStyles from "./payments.styles";

const Payments: React.FC = () => {
  const programs: { programId: string; programName: string }[] = [
    {
      programId: "1234567890",
      programName: "Test Program",
    },
  ];

  const paymentsReducer = (
    state: IPaymentsListState,
    action: IPaymentsDispatchActions
  ) => {
    switch (action.type) {
      case PAYMENTS_ACTIONS.SET_PAYMENTS_DATA:
        return {
          ...state,
          ...action.data,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = React.useReducer(paymentsReducer, {
    payments: [] as IPaymentInfo[],
    error: undefined,
    loading: false,
    showDialogue: false,
  } as IPaymentsListState);

  const onFiltersChange = (filters: {
    [key in PaymentFilterTypes]: string;
  }) => {
    console.log(filters);
  };

  useEffect(() => {
    const pays = [
      {
        communityId: "1234567890",
        programId: "1234567890",
        userId: "1234567890",
        userName: "Test User",
        frequency: "Monthly",
        amount: 100.0,
        scheduledDate: Timestamp.now(),
        status: "Pending",
        metadata: {
          transactionId: "value1",
          notes: "value2",
        },
      },
      {
        communityId: "1234567890",
        programId: "1234567890",
        userId: "1234567891",
        userName: "Test User 2",
        frequency: "Monthly",
        amount: 100.0,
        scheduledDate: Timestamp.now(),
        status: "Pending",
        metadata: {
          transactionId: "value1",
          notes: "value2",
        },
      },
      {
        communityId: "1234567890",
        programId: "1234567890",
        userId: "1234567894",
        userName: "Test User 3",
        frequency: "Monthly",
        amount: 100.0,
        scheduledDate: Timestamp.now(),
        paidDate: Timestamp.now(),
        status: "Paid",
        metadata: {
          paidDate: Timestamp.now(),
          trasactionId: "value1",
          notes: "value2",
          paymentMethod: "Cash",
        },
      },
    ] as IScheduledPayment[];

    const payments1: { programId: string; data: IScheduledPayment[] }[] = [];
    const isExpanded: { programId: string; isExpanded: boolean }[] = [];

    pays.forEach((payment) => {
      const program = payments1.find((p) => p.programId == payment.programId);
      if (program) {
        program.data.push(payment);
      } else {
        payments1.push({
          programId: payment.programId,
          data: [payment],
        });

        isExpanded.push({
          programId: payment.programId,
          isExpanded: false,
        });
      }
    });

    dispatch({
      type: PAYMENTS_ACTIONS.SET_PAYMENTS_DATA,
      data: {
        payments: payments1,
        isExpanded: isExpanded,
      },
    });
    // fetch payments
  }, []);

  const markAsPaid = () => {};

  const getProgramName = (programId: string) => {
    const program = programs.find((p) => p.programId == programId);
    return program?.programName;
  };

  const isExpanded = (programId: string) => {
    return state.isExpanded?.find((p: any) => p.programId == programId)
      ?.isExpanded;
  };

  const setIsExpanded = (programId: string, isExpanded: boolean) => {
    const newRes: any[] = [];
    state.isExpanded?.forEach((item: any) => {
      if (item.programId == programId) {
        item.isExpanded = isExpanded;
      }
      newRes.push({ ...item });
    });

    dispatch({
      type: PAYMENTS_ACTIONS.SET_PAYMENTS_DATA,
      data: {
        isExpanded: newRes,
      },
    });
  };

  const toggleDialog = (showDialog: boolean) => {
    dispatch({
      type: PAYMENTS_ACTIONS.SET_PAYMENTS_DATA,
      data: {
        showDialogue: showDialog,
      },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={paymentsStyles.paymentsDashboardContainer}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 10,
            marginLeft: 26,
          }}
        >
          This Month
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <View style={{ justifyContent: "flex-start" }}>
            <Text style={[paymentsStyles.paymentsDashboardItem]}>
              Possible Earnings
            </Text>
            <Text style={paymentsStyles.paymentsDashboardItem}>
              Total Earnings
            </Text>
            <Text style={[paymentsStyles.paymentsDashboardItem]}>
              Pending Earnings
            </Text>
          </View>
          <View>
            <Text style={paymentsStyles.paymentsDashboardItem}>₹ 0</Text>
            <Text style={paymentsStyles.paymentsDashboardItem}>₹ 0</Text>
            <Text style={paymentsStyles.paymentsDashboardItem}>₹ 0</Text>
          </View>
        </View>
        {/* <View style={paymentsStyles.paymentsDashboardItem}>
          <Text style={paymentsStyles.paymentsDashboardItemValue}>₹ 0</Text>
          <Text style={paymentsStyles.paymentsDashboardItemLabel}>
            Total Due
          </Text>
        </View>
        <View style={paymentsStyles.paymentsDashboardItem}>
          <Text style={paymentsStyles.paymentsDashboardItemValue}>₹ 0</Text>
          <Text style={paymentsStyles.paymentsDashboardItemLabel}>
            Total Paid
          </Text>
        </View>
        <View style={paymentsStyles.paymentsDashboardItem}>
          <Text style={paymentsStyles.paymentsDashboardItemValue}>₹ 0</Text>
          <Text style={paymentsStyles.paymentsDashboardItemLabel}>
            Total Pending
          </Text>
        </View> */}
      </View>
      <PaymentsFilters onChange={onFiltersChange} />
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          {state.payments?.map((paymentInfo: IPaymentInfo) => {
            return (
              <ListItem.Accordion
                key={paymentInfo.programId}
                content={
                  <ListItem.Content>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ marginRight: 10 }}>
                        {getProgramName(paymentInfo.programId)}
                      </Text>
                    </View>
                  </ListItem.Content>
                }
                isExpanded={isExpanded(paymentInfo.programId)}
                onPress={() => {
                  setIsExpanded(
                    paymentInfo.programId,
                    !isExpanded(paymentInfo.programId)
                  );
                }}
              >
                {paymentInfo.data?.map((payment) => {
                  return (
                    <ListItem
                      key={payment.userId}
                      bottomDivider
                      containerStyle={{
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                      }}
                      onPress={() => {
                        toggleDialog(true);
                      }}
                    >
                      <ListItem.Content>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "flex-start",
                              alignItems: "center",
                            }}
                          >
                            <MaterialIcons
                              name="payment"
                              size={45}
                              color="black"
                            />
                            <View
                              style={{
                                justifyContent: "flex-start",
                                alignItems: "center",
                                marginLeft: 10,
                              }}
                            >
                              <Text>{payment.userName}</Text>
                              <Text></Text>
                            </View>
                          </View>

                          <View>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                alignItems: "center",
                              }}
                            >
                              <FontAwesome
                                name="rupee"
                                size={12}
                                color="black"
                              />
                              <Text style={{ marginLeft: 5, fontSize: 15 }}>
                                {payment.amount}
                              </Text>
                            </View>
                            <Text
                              style={[
                                payment.status == PaymentStatus.UNPAID
                                  ? { color: "red" }
                                  : { color: "green" },
                                { alignSelf: "flex-end" },
                              ]}
                            >
                              {payment.status}
                            </Text>
                          </View>
                        </View>

                        {payment.status == "Paid" && (
                          <View
                            style={{
                              marginHorizontal: 5,
                              marginVertical: 10,
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                              width: "100%",
                            }}
                          >
                            <Text>
                              {payment.metadata?.paidDate
                                ? payment.metadata.paidDate
                                    .toDate()
                                    .toLocaleDateString(undefined, {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })
                                : payment
                                    .paidDate!.toDate()
                                    .toLocaleDateString(undefined, {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}
                            </Text>
                            {payment.metadata?.paymentMethod && (
                              <Text style={{ marginRight: 5 }}>
                                {payment.metadata.paymentMethod}
                              </Text>
                            )}
                          </View>
                        )}
                      </ListItem.Content>
                    </ListItem>
                  );
                })}
              </ListItem.Accordion>
            );
          })}
        </ScrollView>
      </View>

      <Overlay
        isVisible={state.showDialogue!}
        onBackdropPress={() => toggleDialog(false)}
        style={{ width: "100%", height: "50%" }}
      >
        <Text>Hello!</Text>
        <Text>Welcome to React Native Elements</Text>
        <Button
          icon={
            <Icon
              name="wrench"
              type="font-awesome"
              color="white"
              size={25}
              iconStyle={{ marginRight: 10 }}
            />
          }
          title="Start Building"
          onPress={() => toggleDialog(false)}
        />
      </Overlay>

      <Dialog
        isVisible={false}
        onBackdropPress={() => {
          toggleDialog(false);
        }}
      >
        <View style={{ padding: 10 }}>
          <Text>Are you sure you want to mark this payment as paid?</Text>
        </View>
        <Dialog.Actions>
          <Dialog.Button
            title="CONFIRM"
            onPress={() => {
              console.log(`Option was selected!`);
            }}
          />
          <Dialog.Button
            title="CANCEL"
            onPress={() => {
              toggleDialog(false);
            }}
          />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

export default Payments;
