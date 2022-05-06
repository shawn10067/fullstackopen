import Main from "./components/Main";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "./utils/apolloClient";
import Constants from "expo-constants";
import AuthStorageContext from "./context/AuthStorageContext";
import AuthStorage from "./utils/authStorage";

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

export default function App() {
  console.log("manifest", Constants.manifest);
  return (
    <ApolloProvider client={apolloClient}>
      <AuthStorageContext.Provider value={authStorage}>
        <NativeRouter>
          <Main></Main>
        </NativeRouter>
      </AuthStorageContext.Provider>
    </ApolloProvider>
  );
}
