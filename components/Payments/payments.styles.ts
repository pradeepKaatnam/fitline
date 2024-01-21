import { StyleSheet } from "react-native";

const paymentsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF", // Change this to your desired background color
  },
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  filterButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#841584",
    padding: 5,
    borderRadius: 20,
  },
  filterButtonSelected: {
    borderColor: "white",
    borderWidth: 2,
  },
  filterButtonText: {
    color: "white",
    fontSize: 10,
    paddingHorizontal: 7,
  },
  paymentsDashboardContainer: {
    backgroundColor: "#F6CEFC",
    margin: 10,
    borderRadius: 8,
  },
  paymentsDashboardItem: {
    padding: 10,
    marginVertical: 2,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  paymentsDashboardItemValue: {
    fontSize: 18,
    color: "#000",
  },
  paymentsDashboardItemLabel: {
    fontSize: 14,
    color: "#888",
  },
});

export default paymentsStyles;
