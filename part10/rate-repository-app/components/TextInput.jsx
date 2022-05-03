import { TextInput as NativeTextInput, StyleSheet } from "react-native";

const TextInput = ({ style, error, ...props }) => {
  const styles = StyleSheet.create({
    basicTextEntryBox: {
      width: "80%",
      fontSize: 20,
      borderColor: error ? "#d73a4a" : "dimgrey",
      borderWidth: 2,
      margin: 5,
      marginTop: 15,
      paddingLeft: 13,
      textAlign: "left",
      height: 53,
      borderRadius: 20,
      color: "black",
    },
  });

  const textInputStyle = [styles.basicTextEntryBox, style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
