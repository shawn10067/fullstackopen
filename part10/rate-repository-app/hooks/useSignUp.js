import { useMutation } from "@apollo/client";
import { createUser } from "../graphql/mutations";

export const useSignUp = () => {
  const [mutate, result] = useMutation(createUser);

  const createNewUser = async ({ username, password }) => {
    const userInfo = {
      variables: {
        newUser: {
          username,
          password,
        },
      },
    };
    console.log("user info", userInfo);
    const result = await mutate(userInfo);
    console.log("result of creation", result.data);
    const data = result.data.createUser;
    console.log("data parsed", data);
    return { data };
  };

  return [createNewUser, result];
};
