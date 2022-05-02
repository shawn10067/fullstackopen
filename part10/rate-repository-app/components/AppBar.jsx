import {
  View,
  StyleSheet,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";
import AppBarTab from "./AppBarTab";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignSelf: "flex-start",
    paddingVertical: Platform.OS === "ios" ? 5 : Constants.statusBarHeight + 10,
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
      <ScrollView horizontal>
        <AppBarTab title={"Home"} link={"/"}></AppBarTab>
        <AppBarTab title={"Sign In"} link={"/signIn"}></AppBarTab>
      </ScrollView>
    </View>
  );
};

/*<AppBarTab title={"I am Sia's"} link={"/"}></AppBarTab>*/

export default AppBar;
