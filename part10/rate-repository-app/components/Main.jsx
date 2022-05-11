import { StyleSheet, View, Dimensions } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import { Route, Routes, Navigate } from "react-router-native";
import SignIn from "./SignIn";
import { useState, useEffect } from "react";
import SingleRepository from "./SingleRepositoryView";
import CreateReview from "./CreateReview";
import SignUp from "./SignUp";
import useAuthStorage from "../hooks/useAuthStorage";
import { useQuery } from "@apollo/client";
import { getMe } from "../graphql/queries";

const Main = () => {
  const [user, setUser] = useState("");
  const [done, setDone] = useState("");

  const authStorage = useAuthStorage();
  useEffect(async () => {
    const token = await authStorage.getAccessToken();
    if (token) {
      setUser(token);
    }
  }, []);

  const { data, error, loading } = useQuery(getMe);
  if (!loading && !done) {
    console.log(data);
    const obtainedUser = (data.me && data.me.username) || "";
    console.log("getting me", obtainedUser);
    setUser(obtainedUser);
    setDone(true);
  }

  return (
    <View style={styles.container}>
      <AppBar setUser={setUser} user={user}></AppBar>
      <Routes>
        <Route>
          <Route path="/" element={<RepositoryList />} exact />
          <Route
            path="/signIn"
            element={<SignIn setUser={setUser}></SignIn>}
            exact
          />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/createReview" element={<CreateReview></CreateReview>} />
          <Route
            path="/singleRepo/:id"
            element={<SingleRepository></SingleRepository>}
          />
          <Route path="/signUp" element={<SignUp></SignUp>} />
        </Route>
      </Routes>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get("window").height,
    backgroundColor: "#e1e4e8",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default Main;
