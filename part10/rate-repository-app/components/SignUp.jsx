import { Text, Pressable, View } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import { StyleSheet } from "react-native";
import * as yup from "yup";
import { useSignUp } from "../hooks/useSignUp";
import { useNavigate } from "react-router-native";

// yup validation
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(1, "The username must be longer")
    .max(30, "The username has to be shorter"),
  password: yup
    .string()
    .required()
    .min(5, "The password must be longer")
    .max(50, "The password has to be shorter"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required("Password has to match."),
});

// form values
const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

// form style sheet
const styles = StyleSheet.create({
  submitButton: {
    width: "40%",
    backgroundColor: "#1E90FF",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});

// review form
export const SignUpForm = ({ onSubmit }) => {
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
      <FormikTextInput name="password" placeholder="password" secureTextEntry />
      <FormikTextInput
        name="passwordConfirmation"
        placeholder="confirm"
        secureTextEntry
      />
      <Pressable onPress={onSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </Pressable>
    </View>
  );
};

// review creation element
const SignUp = () => {
  const navigate = useNavigate();
  const [createNewUser] = useSignUp();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await createNewUser({
        username,
        password,
      });
      navigate(`/`, { replace: true });
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
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;
