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
import { useQuery } from "@apollo/client";
import { getMe } from "../graphql/queries";

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

  const { data, error, loading } = useQuery(getMe);
  if (!loading) {
    console.log(data);
    const obtainedUser = (data.me && data.me.username) || "";
    console.log("getting me", obtainedUser);
    setUser(obtainedUser);
  }

  return (
    <View style={styles.container} onP>
      <ScrollView horizontal>
        <AppBarTab title={"Home"} link={"/"}></AppBarTab>
        {user != "" ? (
          <AppBarTab title={"Create Review"} link={"/createReview"}></AppBarTab>
        ) : null}
        {user != "" ? (
          <AppBarTab title={"Reviews"} link={"/myReviews"}></AppBarTab>
        ) : null}
        {user != "" ? (
          <SignOutTab title={"Sign Out"} setUser={setUser}></SignOutTab>
        ) : (
          <AppBarTab title={"Sign In"} link={"/signIn"}></AppBarTab>
        )}
        {user == "" ? (
          <AppBarTab title={"Sign Up"} link={"/signUp"}></AppBarTab>
        ) : null}
      </ScrollView>
    </View>
  );
};

/*<AppBarTab title={"I am Sia's"} link={"/"}></AppBarTab>*/

export default AppBar;
