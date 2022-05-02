import { View, StyleSheet, Platform, Dimensions } from "react-native";
import AppBarTab from "./AppBarTab";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingVertical: Platform.OS === "ios" ? 0 : Constants.statusBarHeight + 10,
    backgroundColor: "#24292e",
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: 10,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container} onP>
      <AppBarTab title={"I am Sia's"}></AppBarTab>
      <AppBarTab title={"Salam"}></AppBarTab>
    </View>
  );
};

export default AppBar;
