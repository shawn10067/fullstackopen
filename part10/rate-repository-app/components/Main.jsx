import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import { Route, Routes, Navigate } from "react-router-native";
import SignIn from "./SignIn";

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar></AppBar>
      <Routes>
        <Route>
          <Route path="/" element={<RepositoryList />} exact />
          <Route path="/signIn" element={<SignIn></SignIn>} exact />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1e4e8",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default Main;
