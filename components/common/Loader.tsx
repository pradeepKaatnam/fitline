import { ActivityIndicator, ColorValue, View } from "react-native";

export type ILoader = {
  color?: ColorValue | undefined;
  size?: number | "small" | "large" | undefined;
};

export const Loader: React.FC<ILoader> = (props) => {
  return (
    <>
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size={props.size} color={props.color} />
      </View>
    </>
  );
};
