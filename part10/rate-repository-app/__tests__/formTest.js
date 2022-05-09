import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { SignInForm } from "../components/SignIn";

let fieldMock = {
  value: "",
};
let metaMock = {
  touched: false,
  error: "",
  value: "",
};

jest.mock("formik", () => ({
  ...jest.requireActual("formik"),
  useField: jest.fn((name) => {
    /*
    const setTouched = jest.fn();
    const setValue = jest.fn((val) => (this.value = val));
    fieldMock.value = name;
    let helperMock = {
      setTouched,
      setValue,
    };
    */
    fieldMock.value = name;
    return [
      fieldMock,
      metaMock,
      {
        setTouched: jest.fn((val) => (metaMock.touched = val)),
        setValue: jest.fn((val) => (fieldMock.value = val)),
      },
    ];
  }),
}));

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      // rendering component
      const onSubmit = jest.fn();
      const { getByPlaceholderText, getByText, debug } = render(
        <SignInForm onSubmit={onSubmit}></SignInForm>
      );

      // filling in text inputs
      const userBox = getByPlaceholderText("username");
      const passBox = getByPlaceholderText("password");
      const signInBox = getByText("Sign In");

      await waitFor(() => {
        fireEvent.changeText(userBox, "kalle");
        console.log(userBox);
      });

      await waitFor(() => {
        fireEvent.changeText(passBox, "password");
        console.log(passBox);
      });

      await waitFor(() => {
        fireEvent.press(signInBox);
      });

      //debug();

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit).toHaveBeenCalledTimes(1);

        //console.log(onSubmit.mock.calls);

        expect(onSubmit).toHaveBeenCalledWith({
          username: "kalle",
          password: "password",
        });
      });
    });
  });
});
