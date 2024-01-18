import { StyleSheet } from "react-native";

export const CommonStyles = StyleSheet.create({
  disableContainer: {
    pointerEvents: "none",
    opacity: 0.4,
  },
  overlayModalContainer: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 20,
  },
  overlayModalItem: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  overlayModalItemText: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
