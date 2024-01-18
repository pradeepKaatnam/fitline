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
    marginHorizontal: 10,
    marginVertical: 10,
  },
  filterButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#585858",
    padding: 5,
    borderRadius: 20,
  },
  filterSelectedButtonContainer: {
    borderColor: "green",
    borderWidth: 2,
  },
  filterButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 7,
  },
});

export default paymentsStyles;
