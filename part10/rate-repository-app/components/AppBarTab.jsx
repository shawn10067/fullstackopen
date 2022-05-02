import { Text, Pressable, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  heading: {
    color: "lightblue",
    fontWeight: "bold",
    fontSize: 20,
    margin: 10,
    padding: 5,
    marginBottom: 0,
  },
});

const AppBarTab = ({ title }) => {
  return (
    <Pressable
      onPressIn={() => console.log(`you pressed ${title}`)}
      onPressOut={() => console.log(`you let go of ${title}`)}
    >
      <Text style={styles.heading}>{title}</Text>
    </Pressable>
  );
};

export default AppBarTab;
