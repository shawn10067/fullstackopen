import { View, StyleSheet, Text } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 5,
    backgroundColor: "#24292e",
    width: 400,
    alignItems: "center",
    paddingBottom: 10,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container} onP>
      <Text style={{ color: "white", fontWeight: "bold" }}>I Am Sia's</Text>
    </View>
  );
};

export default AppBar;
