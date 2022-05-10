import Main from "./components/Main";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "./utils/apolloClient";
import Constants from "expo-constants";
import AuthStorageContext from "./context/AuthStorageContext";
import AuthStorage from "./utils/authStorage";
import { Provider as PaperProvider } from "react-native-paper";

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

export default function App() {
  console.log("manifest", Constants.manifest);
  return (
    <ApolloProvider client={apolloClient}>
      <AuthStorageContext.Provider value={authStorage}>
        <PaperProvider>
          <NativeRouter>
            <Main></Main>
          </NativeRouter>
        </PaperProvider>
      </AuthStorageContext.Provider>
    </ApolloProvider>
  );
}
