import { useMutation } from "@apollo/client";
import { authUser } from "../graphql/mutations";

export const useSignIn = () => {
  const [mutate, result] = useMutation(authUser);

  const signIn = async ({ username, password }) => {
    const cred = {
      variables: {
        credentials: {
          username,
          password,
        },
      },
    };
    console.log("cred", cred);
    const result = await mutate(cred);
    const data = result.data.authenticate.accessToken;
    return { data };
  };

  return [signIn, result];
};
