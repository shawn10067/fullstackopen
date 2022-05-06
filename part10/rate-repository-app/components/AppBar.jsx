import {
  View,
  StyleSheet,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";
import AppBarTab from "./AppBarTab";
import Constants from "expo-constants";
import useAuthStorage from "../hooks/useAuthStorage";
import { useEffect } from "react";
import SignOutTab from "./SignOutTab";

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

const AppBar = ({ setUser, user }) => {
  const authStorage = useAuthStorage();
  useEffect(async () => {
    const token = await authStorage.getAccessToken();
    if (token) {
      setUser(token);
    }
  }, []);

  return (
    <View style={styles.container} onP>
      <ScrollView horizontal>
        <AppBarTab title={"Home"} link={"/"}></AppBarTab>
        {user != "" ? (
          <SignOutTab title={"Sign Out"} setUser={setUser}></SignOutTab>
        ) : (
          <AppBarTab title={"Sign In"} link={"/signIn"}></AppBarTab>
        )}
      </ScrollView>
    </View>
  );
};

/*<AppBarTab title={"I am Sia's"} link={"/"}></AppBarTab>*/

export default AppBar;
