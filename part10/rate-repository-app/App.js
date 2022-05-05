import Main from "./components/Main";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "./utils/apolloClient";
import Constants from "expo-constants";

const apolloClient = createApolloClient();

export default function App() {
  console.log(Constants.manifest);
  return (
    <ApolloProvider client={apolloClient}>
      <NativeRouter>
        <Main></Main>
      </NativeRouter>
    </ApolloProvider>
  );
}
