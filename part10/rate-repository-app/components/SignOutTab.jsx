import { useApolloClient, useQuery } from "@apollo/client";
import { Text, Pressable, StyleSheet } from "react-native";
import useAuthStorage from "../hooks/useAuthStorage";
import { getMe } from "../graphql/queries";

const styles = StyleSheet.create({
  heading: {
    color: "lightblue",
    fontWeight: "bold",
    fontSize: 20,
    margin: 10,
    padding: 5,
    marginBottom: 0,
  },
});

const SignOutTab = ({ title, setUser }) => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };
  return (
    <Pressable onPressOut={signOut}>
      <Text style={styles.heading}>{title}</Text>
    </Pressable>
  );
};

export default SignOutTab;
