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
