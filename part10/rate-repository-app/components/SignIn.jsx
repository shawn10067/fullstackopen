import { Text, Pressable, View } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import { StyleSheet } from "react-native";
import * as yup from "yup";
import { useSignIn } from "../hooks/useSignIn";
import useAuthStorage from "../hooks/useAuthStorage";
import { useNavigate } from "react-router-native";
import { useApolloClient, useQuery } from "@apollo/client";

// yup validation
const validationSchema = yup.object().shape({
  username: yup.string().required("username is required"),
  password: yup.string().required("password is required"),
});

// form values
const initialValues = {
  username: "",
  password: "",
};

// form style sheet
const styles = StyleSheet.create({
  signInButton: {
    width: "40%",
    backgroundColor: "#1E90FF",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  signInButtonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});

export const SignInForm = ({ onSubmit }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
      }}
    >
      <FormikTextInput name="username" placeholder="username" />
      <FormikTextInput
        secureTextEntry
        name={"password"}
        placeholder="password"
      />
      <Pressable onPress={onSubmit} style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </Pressable>
    </View>
  );
};

const SignIn = ({ setUser }) => {
  const navigate = useNavigate();
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await signIn({ username, password });
      await authStorage.setAccessToken(data);
      await apolloClient.resetStore();
      navigate("/", { replace: true });
    } catch (e) {
      console.log("dumbass error", e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
