import { Text, Pressable, View } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import { StyleSheet } from "react-native";
import * as yup from "yup";
import { useCreateReview } from "../hooks/useCreateReview";
import { useNavigate } from "react-router-native";

// yup validation
const validationSchema = yup.object().shape({
  repositoryName: yup.string().required("Repository name is required"),
  ownerName: yup.string().required("Owner name is required"),
  rating: yup
    .number()
    .required("Rating is required")
    .max(100, "Maximum is 100")
    .min(0, "Minimum is zero"),
  text: yup.string(),
});

// form values
const initialValues = {
  repositoryName: "",
  ownerName: "",
  rating: "0",
  text: "",
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
export const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
      }}
    >
      <FormikTextInput name="repositoryName" placeholder="repository" />
      <FormikTextInput name="ownerName" placeholder="owner" />
      <FormikTextInput name="rating" placeholder={"0"} />
      <FormikTextInput name="text" placeholder={"text"} multiline />
      <Pressable onPress={onSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </Pressable>
    </View>
  );
};

// review creation element
const CreateReview = () => {
  const navigate = useNavigate();
  const [createNewReview] = useCreateReview();

  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;
    try {
      const { data } = await createNewReview({
        repositoryName,
        ownerName,
        rating,
        text,
      });
      console.log("id", data.id);

      navigate(`/singleRepo/${data.id}`, { replace: true });
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
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default CreateReview;
